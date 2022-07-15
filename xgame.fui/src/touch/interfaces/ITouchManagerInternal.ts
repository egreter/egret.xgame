/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-19
*************************************************/
module fui {
    export let ITouchManagerInternal = Symbol.for("fui.ITouchManagerInternal");
    export interface ITouchManagerInternal {
        initialize(): void;
    }
}