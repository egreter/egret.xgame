/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-04
*************************************************/
module egretx {
    export let IAudioManagerInternal = Symbol.for("IAudioManagerInternal");
    export interface IAudioManagerInternal {
        initialize(): void;
    }
}