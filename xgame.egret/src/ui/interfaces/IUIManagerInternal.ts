/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-08
*************************************************/
module egretx {
    export let IUIManagerInternal = Symbol.for("IUIManagerInternal");
    export interface IUIManagerInternal {
        initialize(): void;
    }
}