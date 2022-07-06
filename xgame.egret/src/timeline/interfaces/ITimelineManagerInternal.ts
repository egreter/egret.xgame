/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-05
*************************************************/
module egretx {
    export let ITimelineManagerInternal = Symbol.for("ITimelineManagerInternal");
    export interface ITimelineManagerInternal {
        initialize(): void;
    }
}