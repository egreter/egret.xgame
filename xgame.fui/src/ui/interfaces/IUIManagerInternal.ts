/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-08
*************************************************/
module fui {
    export let IUIManagerInternal = Symbol.for("fgui.IUIManagerInternal");
    export interface IUIManagerInternal {
        initialize(): void;
    }
}