/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-04
*************************************************/
module egretx {
    export let IResourceManagerInternal = Symbol.for("IResourceManagerInternal");
    export interface IResourceManagerInternal {
        initialize(): void;
    }
}