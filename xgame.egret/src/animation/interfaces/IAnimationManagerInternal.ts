/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-05
*************************************************/
module egretx {
    export let IAnimationManagerInternal = Symbol.for("IAnimationManagerInternal");
    export interface IAnimationManagerInternal {
        initialize(): void;
    }
}