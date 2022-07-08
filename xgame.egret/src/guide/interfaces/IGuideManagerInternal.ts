/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-08
*************************************************/
module egretx {
    export let IGuideManagerInternal = Symbol.for("IGuideManagerInternal");
    export interface IGuideManagerInternal {
        initialize(): void;
    }
}