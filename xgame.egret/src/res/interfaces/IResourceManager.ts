/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-04
*************************************************/
module egretx {
    export let IResourceManager = Symbol.for("IResourceManager");
    export interface IResourceManager extends xgame.IXObject {
        getOrCreateGroup<T>(name: string, factory?: () => ResourceGroup<T>): ResourceGroup<T>;
    }
}