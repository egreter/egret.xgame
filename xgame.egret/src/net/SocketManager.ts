/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-01
*************************************************/
/// <reference path="./interfaces/ISocketManager.ts" />

module egretx {
    @impl(ISocketManager)
    export class SocketManager extends xgame.Singleton implements ISocketManager, ISocketManagerInternal {
        public defaultInstanceName: string = "main";
        public defaultSocketHelper: ISocketHelper;
        //失败尝试重连次数
        public retryMaxTiems: number = 3;
        //失败重连间隔(毫秒)
        public retryDelayTime: number = 5000;
        //回包超时检测(毫秒)
        public sendTimeout: number = 10000;
        //心跳探针间隔(毫秒)
        public heartBeatCheckTimeout: number = 10000;
        protected instances = new xgame.Dictionary<string, SocketInstance>();
        public constructor() {
            super();
        }
        public initialize(): void {

        }
        public getOrCreateInstance(name?: string, helper?: ISocketHelper): SocketInstance {
            name = name || this.defaultInstanceName;
            if (!this.instances.containsKey(name)) {
                let instance = new SocketInstance(this, name, helper || this.defaultSocketHelper);
                this.instances.push(name, instance);
            }
            return this.instances.get(name);
        }
    }
}