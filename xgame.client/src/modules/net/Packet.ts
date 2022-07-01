/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-01
*************************************************/
module ro {
    /**
     * 自定义网络数据包
     */
    export class Packet extends xgame.XObject implements egretx.IPacket {
        public guid: number;
        public cmd: number;
        public buffer: egret.ByteArray;
        public first: boolean;
        public type: string;
        public message: any;
        public fromPoolHashCode: number;
        public deferred: xgame.Deferred<any>;
        public abort(): void {
            this.message = { result: -1 };
            this.onResponse();
        }
        public onResponse(): void {
            if (this.message) {
                if (this.deferred) {
                    this.deferred.resolve(this.message);
                }
                let define = NetManager.Instance().getDefine(this.cmd);
                if (define && define.callback) {
                    define.callback.dispatch(this.message);
                }
            }
        }
        public release(): void {
            
        }
        public dispose(): void {
            this.guid = 0;
            this.buffer = null;
            this.cmd = 0;
            this.type = null;
            this.message = null;
            this.deferred = null;
            this.first = false;
        }
    }
}