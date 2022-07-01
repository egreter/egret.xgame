/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-01
*************************************************/
module egretx {
    export let ISocketManager = Symbol.for("ISocketManager");
    export interface ISocketManager extends xgame.IXObject {
        defaultInstanceName: string;
        defaultSocketHelper: ISocketHelper;
        //失败尝试重连次数
        retryMaxTiems: number;
        //失败重连间隔(毫秒)
        retryDelayTime: number;
        //回包超时检测(毫秒)
        sendTimeout: number;
        //心跳探针间隔(毫秒)
        heartBeatCheckTimeout: number;
        getOrCreateInstance(name?: string, helper?: ISocketHelper): SocketInstance;
    }
    export let ISocketManagerInternal = Symbol.for("ISocketManagerInternal");
    export interface ISocketManagerInternal extends xgame.IXObject {
        initialize(): void;
    }
}