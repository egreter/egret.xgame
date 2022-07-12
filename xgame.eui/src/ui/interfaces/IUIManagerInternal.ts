/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-08
*************************************************/
module euix {
    export let IUIManagerInternal = Symbol.for("euix.IUIManagerInternal");
    export interface IUIManagerInternal {
        initialize(): void;
    }
}