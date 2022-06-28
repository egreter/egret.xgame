/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-01
*************************************************/
module pomelo {
    const EVENT_IO_ERROR: string = "IO_ERROR";
    const EVENT_CLOSE: string = "CLOSE";
    const EVENT_KICK: string = "KICK";
    const EVENT_HEART_BEAT_TIMEOUT: string = 'HEART_BEAT_TIMEOUT';
    export class Pomelo {

        static DEBUG: boolean = true;

        private JS_WS_CLIENT_TYPE: string = 'js-websocket';
        private JS_WS_CLIENT_VERSION: string = '0.0.5';

        private socket: egret.WebSocket = null;
        private callbacks: any = {};
        private handlers: { [key: number]: Function } = {};
        // Map from request id to route
        private routeMap = {};

        private heartbeatInterval: number = 0;
        private heartbeatTimeout: number = 0;
        private nextHeartbeatTimeout: number = 0;
        private gapThreshold: number = 100;
        private heartbeatId: number = 0;
        private heartbeatTimeoutId: number = 0;

        private handshakeCallback: Function = null;
        private handshakeBuffer: IHandShake;
        private initCallback: Function = null;

        private $callbacks: any = {};

        private reqId: number = 0;


        private $packetParser: IPacketParser;
        private $messageParser: IMessageParser;

        constructor() {
            if (!console.group) {
                console.group = console.log;
                console.groupEnd = function () { console.log("----") };
                console.info = console.log;
                console.warn = console.log;
                console.error = console.log;
            }

            this.$messageParser = new MessageParser();
            this.$packetParser = new PacketParser();

            this.socket = null;
            this.callbacks = {};
            this.handlers = {};
            // Map from request id to route
            this.routeMap = {};

            this.heartbeatInterval = 0;
            this.heartbeatTimeout = 0;
            this.nextHeartbeatTimeout = 0;
            this.gapThreshold = 100;
            this.heartbeatId = null;
            this.heartbeatTimeoutId = null;

            this.handshakeCallback = null;

            this.handshakeBuffer = {
                sys: {
                    type: this.JS_WS_CLIENT_TYPE,
                    version: this.JS_WS_CLIENT_VERSION
                },
                user: {
                }
            };

            this.initCallback = null;
            this.reqId = 0;
            this.handlers[PacketType.HANDSHAKE] = this.onHandShake;
            this.handlers[PacketType.HEARTBEAT] = this.onHearBeat;
            this.handlers[PacketType.DATA] = this.onData;
            this.handlers[PacketType.KICK] = this.onKick;
        }


        public init(options: IOptions, cb: Function): void {
            console.log("init", options);
            this.initCallback = cb;
            let host = options.host;
            let port = options.port;
            //
            //var url = 'ws://' + host;
            //if(port) {
            //    url +=  ':' + port;
            //}
            this.handshakeBuffer.user = options.user;
            this.handshakeCallback = options.handshakeCallback;
            this.initWebSocket(host, port, cb);
        }
        private initWebSocket(host: string, port: number, cb: Function): void {
            console.log("[Pomelo] connect to:", host, port);
            this.socket = new egret.WebSocket();
            this.socket.type = egret.WebSocket.TYPE_BINARY;
            this.socket.addEventListener(egret.Event.CONNECT, this.onConnect, this);
            this.socket.addEventListener(egret.Event.CLOSE, this.onClose, this);
            this.socket.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onIOError, this);
            this.socket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onMessage, this);
            this.socket.connect(host, port);
        }


        public on(event: string, fn: Function) {
            (this.$callbacks[event] = this.$callbacks[event] || []).push(fn);
        }
        public request(route: string, cb: Function): void
        public request(route: string, msg: any, cb: Function): void
        public request(route: string, msg: any, cb?: Function): void {
            if (arguments.length === 2 && typeof msg === 'function') {
                cb = msg;
                msg = {};
            } else {
                msg = msg || {};
            }
            route = route || msg.route;
            if (!route) {
                return;
            }
            this.reqId++;
            if (this.reqId > 127) {
                this.reqId = 1;
            }
            let reqId = this.reqId;
            if (Pomelo.DEBUG) {
                console.group("REQUEST:");
                console.info("Route:", route);
                console.log("Id:", reqId);
                console.log("Param:", msg);
                console.groupEnd();
            }
            this.sendMessage(reqId, route, msg);
            this.callbacks[reqId] = cb;
            this.routeMap[reqId] = route;
        }

        public notify(route: string, msg: any): void {
            this.sendMessage(0, route, msg);
        }

        private onMessage(event: egret.Event): void {
            let bytes = new egret.ByteArray();
            this.socket.readBytes(bytes);
            this.processPackage(this.$packetParser.decode(bytes));

        }
        private sendMessage(reqId: number, route: string, msg: any): void {
            let bytes: egret.ByteArray;
            bytes = this.$messageParser.encode(reqId, route, msg);
            bytes = this.$packetParser.encode(PacketType.DATA, bytes);
            this.send(bytes);
        }

        private onConnect(e: egret.Event): void {
            console.log("[Pomelo] connect success", e);
            this.socket.writeBytes(this.$packetParser.encode(PacketType.HANDSHAKE, Protocol.strencode(JSON.stringify(this.handshakeBuffer))));
            this.socket.flush();
        }

        private onClose(e: egret.Event): void {
            console.error("[Pomelo] connect close:", e);
            this.emit(EVENT_CLOSE, e);
        }

        private onIOError(e: egret.Event): void {
            this.emit(EVENT_IO_ERROR, e);
            console.error('socket error: ', e);
        }

        private onKick(event: any) {
            this.emit(EVENT_KICK, event);
        }
        private onData(buffer: egret.ByteArray) {
            //probuff decode
            let message = this.$messageParser.decode(buffer);
            if (message.id > 0) {
                message.route = this.routeMap[message.id];
                delete this.routeMap[message.id];
                if (!message.route) {
                    return;
                }
            }
            //msg.body = this.deCompose(msg);
            this.processMessage(message);
        }

        private processMessage(message: IMessage) {
            if (!message.id) {
                // server push message
                if (Pomelo.DEBUG) {
                    console.group("EVENT:");
                    console.info("Route:", message.route);
                    console.info("Msg:", message.body);
                    console.groupEnd();
                }
                this.emit(message.route, message.body);
                return;
            }
            if (Pomelo.DEBUG) {
                console.group("RESPONSE:");
                console.info("Id:", message.id);
                console.info("Msg:", message.body);
                console.groupEnd();
            }
            //if have a id then find the callback function with the request
            let cb = this.callbacks[message.id];
            delete this.callbacks[message.id];
            if (typeof cb !== 'function') {
                return;
            }
            if (message.body && message.body.code == 500) {
                let obj: any = { "code": 500, "desc": "服务器内部错误", "key": "INTERNAL_ERROR" };
                message.body.error = obj;
            }
            cb(message.body);
            return;
        }

        private onHearBeat(data: any): void {
            if (!this.heartbeatInterval) {
                // no heartbeat
                return;
            }
            let obj = this.$packetParser.encode(PacketType.HEARTBEAT);
            if (this.heartbeatTimeoutId) {
                egret.clearTimeout(this.heartbeatTimeoutId);
                this.heartbeatTimeoutId = null;
            }
            if (this.heartbeatId) {
                // already in a heartbeat interval
                return;
            }
            let self = this;
            self.heartbeatId = egret.setTimeout(function () {
                self.heartbeatId = null;
                self.send(obj);
                self.nextHeartbeatTimeout = Date.now() + self.heartbeatTimeout;
                self.heartbeatTimeoutId = egret.setTimeout(self.heartbeatTimeoutCb.bind(self, data), self, self.heartbeatTimeout);
            }, self, self.heartbeatInterval);
        }
        private heartbeatTimeoutCb(data: any) {
            let gap = this.nextHeartbeatTimeout - Date.now();
            if (gap > this.gapThreshold) {
                this.heartbeatTimeoutId = egret.setTimeout(this.heartbeatTimeoutCb, this, gap);
            } else {
                console.error('server heartbeat timeout', data);
                this.emit(EVENT_HEART_BEAT_TIMEOUT, data);
                this._disconnect();
            }
        }
        public off(event?: string, fn?: any) {
            this.removeAllListeners(event, fn);
        }
        public removeAllListeners(event?: string, fn?: any) {
            // all
            if (0 == arguments.length) {
                this.$callbacks = {};
                return;
            }
            // specific event
            var callbacks = this.$callbacks[event];
            if (!callbacks) {
                return;
            }
            // remove all handlers
            if (event && !fn) {
                delete this.$callbacks[event];
                return;
            }
            // remove specific handler
            var i = this.index(callbacks, fn._off || fn);
            if (~i) {
                callbacks.splice(i, 1);
            }
            return;
        }
        private index(arr: any[], obj: any) {
            if ([].indexOf) {
                return arr.indexOf(obj);
            }
            for (let i = 0; i < arr.length; ++i) {
                if (arr[i] === obj) {
                    return i;
                }
            }
            return -1;
        }
        public disconnect(): void {
            this._disconnect();
        }
        private _disconnect(): void {
            console.warn("[Pomelo] client disconnect ...");
            if (this.socket && this.socket.connected) this.socket.close();
            this.socket = null;
            if (this.heartbeatId) {
                egret.clearTimeout(this.heartbeatId);
                this.heartbeatId = null;
            }
            if (this.heartbeatTimeoutId) {
                egret.clearTimeout(this.heartbeatTimeoutId);
                this.heartbeatTimeoutId = null;
            }

        }
        private processPackage(packet: IPacket): void {
            let handler: Function = this.handlers[packet.type];
            if (handler) {
                handler.apply(this, [packet.body]);
            }
        }
        private onHandShake(resp: egret.ByteArray) {
            let data: IHandShake = JSON.parse(Protocol.strdecode(resp));
            if (data.code === Results.OLD_CLIENT) {
                this.emit(EVENT_IO_ERROR, 'client version not fullfill');
                return;
            }
            if (data.code !== Results.OK) {
                this.emit(EVENT_IO_ERROR, 'handshake fail');
                return;
            }
            this.handshakeInit(data);
            let o = this.$packetParser.encode(PacketType.HANDSHAKE_ACK);
            this.send(o);
            if (this.initCallback) {
                this.initCallback(data);
                this.initCallback = null;
            }
        }
        private handshakeInit(data: IHandShake): void {
            if (data.sys) {
                RouteDicts.init(data.sys.dict);
                Protobuf.init(data.sys.protos);
            }
            if (data.sys && data.sys.heartbeat) {
                this.heartbeatInterval = data.sys.heartbeat * 1000;   // heartbeat interval
                this.heartbeatTimeout = this.heartbeatInterval * 2;        // max heartbeat timeout
            } else {
                this.heartbeatInterval = 0;
                this.heartbeatTimeout = 0;
            }
            if (typeof this.handshakeCallback === 'function') {
                this.handshakeCallback(data.user);
            }
        }
        private send(byte: egret.ByteArray): void {
            if (this.socket && this.socket.connected) {
                this.socket.writeBytes(byte);
                this.socket.flush();
            }
        }
        //private deCompose(msg){
        //    return JSON.parse(Protocol.strdecode(msg.body));
        //}
        private emit(event: string, ...args: any[]): Pomelo {
            let params = [].slice.call(arguments, 1);
            let callbacks = this.$callbacks[event];

            if (callbacks) {
                callbacks = callbacks.slice(0);
                for (var i = 0, len = callbacks.length; i < len; ++i) {
                    callbacks[i].apply(this, params);
                }
            }
            return this;
        }


    }
}