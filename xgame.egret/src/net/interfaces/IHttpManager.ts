/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-01
*************************************************/
module egretx {
    export let IHttpManager = Symbol.for("IHttpManager");
    export interface IHttpManager extends xgame.IXObject {
        sendRequest<T>(uri: string, method?: string, values?: Array<string[]>, isJSON?: boolean): Promise<T | undefined>;
        sendRequest<T>(options: IRequestOptions): Promise<T | undefined>;
    }
    export let IHttpManagerInternal = Symbol.for("IHttpManagerInternal");
    export interface IHttpManagerInternal extends xgame.IXObject {
        initialize(): void;
    }
}