/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-05
*************************************************/
module egretx {
    export let ITimelineManager = Symbol.for("ITimelineManager");
    export interface ITimelineManager {
        getOrCreateTimeline(name?: string): Timeline;
    }
}