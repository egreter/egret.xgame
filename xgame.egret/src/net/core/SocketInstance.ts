/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-01
*************************************************/
module egretx {
    export enum SocketState {
        Closed,
        Connecting,
        Connected
    }
    export enum SocketCloseCode {
        Close,
        IOError,
        Failed,
    }
    /**
     * 网络连接实例的实现类
     */
    export class SocketInstance extends xgame.XObject {
        private uri: string;
        private guidCount = 0;
        private generateGUID(): number {
            return ++this.guidCount;
        }
        private isInited: boolean = false;
        private happendConnected: boolean = false;
        private isReconnect: boolean = false;
        private $state: SocketState;
        public get state(): SocketState {
            return this.$state;
        }
        private disposableGroup = new xgame.DisposableGroup();
        private recvQueues: IPacket[] = [];
        public constructor(public manager: SocketManager, public readonly name: string, public socketHelper: ISocketHelper) {
            super();
        }
        private sendTimeoutStamp: number = 0;
        private lastestRecvStamp: number = 0;
        private checkHeartBeat: boolean = false;
        private onAdvanceTime(): void {
            while (this.recvQueues.length) {
                let packet = this.recvQueues.shift();
                //是当前请求的回应
                if (packet.guid && this.current && this.current.guid == packet.guid) {
                    if (this.socketHelper.needSendLoginPacket() && this.socketHelper.isLoginRespPacket(packet)) {
                        if (this.socketHelper.isLoginSuccess(packet)) {
                            this.isReconnect = true;
                        }
                    }
                    this.current = null;
                    this.sendQueues.shift();
                }
                this.socketHelper.receivePacket(packet);
            }
            if (this.state == SocketState.Connected) {
                //检查是否可以发送数据包
                if (!this.current && this.sendQueues.length) {
                    this.current = this.sendQueues[0];
                    this._sendPacket(this.current);
                    this.sendTimeoutStamp = xgame.Time.Instance().passedTime + this.manager.sendTimeout;
                }
                //检查超时
                if (this.current && this.sendTimeoutStamp < xgame.Time.Instance().passedTime) {
                    this._close();
                    this.connect();
                }
                //检查心跳
                if (this.socketHelper.enableHeartBeatCheck()) {
                    if (!this.checkHeartBeat && xgame.Time.Instance().getTimeStamp() - this.lastestRecvStamp > this.manager.heartBeatCheckTimeout) {
                        this.checkHeartBeat = true;
                        this.socketHelper.sendHeartBeatPacket();
                    }
                }
            }
        }
        private _sendPacket(packet: IPacket): void {
            this.socketHelper.showAnimation();
            let buffer = this.socketHelper.encodePacket(packet);
            if (buffer && buffer.length) {
                this.socket.writeBytes(buffer);
            }
        }
        private current: IPacket;
        private sendQueues: IPacket[] = [];
        public sendPacket(packet: IPacket): void {
            packet.guid = this.generateGUID();
            if (packet.first) {
                for (let i = this.sendQueues.length - 1; i >= 0; i++) {
                    if (this.socketHelper.isLoginRespPacket(this.sendQueues[i])) {
                        this.sendQueues.splice(i, 1);
                    }
                }
                this.sendQueues.unshift(packet);
            }
            else {
                this.sendQueues.push(packet);
            }
        }
        public setURI(host: string, port: number, wss?: boolean): void
        public setURI(uri: string): void
        public setURI(host_or_uri: string, port?: number, wss?: boolean): void {
            if (port) {
                this.uri = wss ? "wss://" : "ws://" + host_or_uri + ":" + port;
            }
            else {
                this.uri = host_or_uri;
            }
        }
        private socket: egret.WebSocket;
        private init(): void {
            if (this.isInited) {
                return;
            }
            this.isInited = true;
            this.guidCount = Math.floor(xgame.Time.Instance().getTimeStamp() / 1000);
            this.cleanQueues();
            this.disposableGroup.registerUpdate(this.onAdvanceTime, this);
            this.socket = new egret.WebSocket();
            this.socket.type = egret.WebSocket.TYPE_BINARY;
            this.socket.addEventListener(egret.Event.CONNECT, this.onConnectHandler, this);
            this.socket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onReceiveHandler, this);
            this.socket.addEventListener(egret.Event.CLOSE, this.onCloseHandler, this);
            this.socket.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onIOErrorHandler, this);
            this.$state = SocketState.Closed;
        }
        private callback_onConnected = new xgame.Signal0();
        public onConnected(): xgame.Signal0 {
            return this.callback_onConnected;
        }
        private onConnectHandler(event: egret.Event): void {
            this.$state = SocketState.Connected;
            this.socketHelper.hideAnimation();
            this.callback_onConnected.dispatch();
            this.happendConnected = true;
            if (this.socketHelper.needSendLoginPacket()) {
                this.sendLoginPacket();
            }
        }
        private sendLoginPacket(): void {
            let packet = this.socketHelper.generateLoginPacket(this.isReconnect);
            if (packet) {
                packet.first = true;
                this.sendPacket(packet);
            }
        }
        private callback_onKickOut = new xgame.Signal0();
        public onKickOut(): xgame.Signal0 {
            return this.callback_onKickOut;
        }
        private onReceiveHandler(event: egret.ProgressEvent): void {
            this.socketHelper.hideAnimation();
            this.lastestRecvStamp = xgame.Time.Instance().getTimeStamp();
            let buffer = new egret.ByteArray();
            this.socket.readBytes(buffer);
            let packets = this.socketHelper.decodePackets(buffer);
            if (packets && packets.length) {
                let packet = packets[0];
                if (this.socketHelper.isDataLocked(packet)) {
                    egret.setTimeout(() => {
                        this.current = null;
                    }, this, 100);
                }
                else if (this.socketHelper.isKickOutPacket(packet)) {
                    this.callback_onKickOut.dispatch();
                }
                else {
                    this.recvQueues.push(packet);
                    if (this.socketHelper.isHeartBeatPacket(packet)) {
                        this.checkHeartBeat = false;
                    }
                }
                if (packets.length > 1) {
                    for (let i = 1; i < packets.length; i++) {
                        this.recvQueues.push(packets[i]);
                    }
                }
            }
        }
        private callback_onClosed = new xgame.Signal1<SocketCloseCode>();
        public onClosed(): xgame.Signal1<SocketCloseCode> {
            return this.callback_onClosed;
        }
        private reconnectTimerID: number = 0;
        private onCloseHandler(event: egret.Event): void {
            this.callback_onClosed.dispatch(SocketCloseCode.Close);
            if (this.state == SocketState.Connecting) {
                // 1.链接失败/出错
                // 2.超时
                // 暂停一定时间后重试
                this.reconnectTimerID = egret.setTimeout(() => {
                    this._connect();
                }, this, this.manager.retryDelayTime);
            } else if (this.state == SocketState.Connected) {
                // 1.中途掉线
                // 2.服务器踢下线
                // 3.数据包异常
                this.$state = SocketState.Closed;
                this.connect();
            }
        }
        private onIOErrorHandler(event: egret.IOErrorEvent): void {
            this.socketHelper.hideAnimation();
            this.cleanQueues(true);
            this.$state = SocketState.Closed;
            this.callback_onClosed.dispatch(SocketCloseCode.IOError);
        }
        private callback_onConnecting = new xgame.Signal1<number>();
        public onConnecting(): xgame.Signal1<number> {
            return this.callback_onConnecting;
        }
        private retryCount: number = 0;
        public connect(): void {
            if (!this.socketHelper) {
                throw new Error("没有实现网络助手ISocketHelper");
            }
            if (!this.isInited) {
                this.init();
            }
            if (this.state != SocketState.Closed) {
                return;
            }
            this.socketHelper.showAnimation();
            this.retryCount = 0;
            this.$state = SocketState.Connecting;
            this._connect();
        }
        private _connect(): void {
            if (this.state != SocketState.Connecting) {
                return;
            }
            if (this.retryCount < this.manager.retryMaxTiems) {
                if (this.happendConnected) {
                    this.callback_onConnecting.dispatch(this.retryCount + 1);
                }
                this.socket.connectByUrl(this.uri);
                this.retryCount++;
            } else {
                this.cleanQueues();
                this.$state = SocketState.Closed;
                this.socketHelper.hideAnimation();
                this.callback_onClosed.dispatch(SocketCloseCode.Failed);
            }
        }
        private cleanQueues(revc?: boolean): void {
            while (this.sendQueues.length > 0) {
                let packet = this.sendQueues.pop();
                packet.abort();
            }
            if (revc) {
                this.recvQueues.length = 0;
            }
        }
        public close(): void {
            if (this.state != SocketState.Closed) {
                this._close();
            }
        }
        private _close(): void {
            if (this.state != SocketState.Closed) {
                this.$state = SocketState.Closed;
                if (this.socket) {
                    this.socket.close();
                }
            }
            if (this.reconnectTimerID) {
                egret.clearTimeout(this.reconnectTimerID);
                this.reconnectTimerID = 0;
            }
        }
        private callback_onShutdown = new xgame.Signal0();
        public onShutdown(): xgame.Signal0 {
            return this.callback_onShutdown;
        }
        public shutdown(): void {
            this.guidCount = Math.floor(xgame.Time.Instance().getTimeStamp() / 1000);
            if (this.socket) {
                this.socket.removeEventListener(egret.Event.CONNECT, this.onConnectHandler, this);
                this.socket.removeEventListener(egret.ProgressEvent.SOCKET_DATA, this.onReceiveHandler, this);
                this.socket.removeEventListener(egret.Event.CLOSE, this.onCloseHandler, this);
                this.socket.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.onIOErrorHandler, this);
            }
            this.close();
            this.cleanQueues(true);
            this.isInited = false;
            this.happendConnected = false;
            this.isReconnect = false;
            this.socket = null;
            this.$state = SocketState.Closed;
            this.callback_onShutdown.dispatch();
        }
    }
}