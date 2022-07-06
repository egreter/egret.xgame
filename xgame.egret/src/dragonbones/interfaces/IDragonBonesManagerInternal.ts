/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-05
*************************************************/
module egretx {
    export let IDragonBonesManagerInternal = Symbol.for("IDragonBonesManagerInternal");
    export interface IDragonBonesManagerInternal {
        initialize(): void;
    }
}