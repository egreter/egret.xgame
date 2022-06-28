/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-19
*************************************************/
module egretx {
    export let ITouchManagerInternal = Symbol.for("ITouchManagerInternal");
    export interface ITouchManagerInternal {
        initialize(): void;
    }
}