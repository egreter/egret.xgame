/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-20
*************************************************/
/// <reference path="./Scheduler.ts" />


module xgame {
    export let ISchedulerManager = Symbol.for("ISchedulerManager");
    export interface ISchedulerManager {

        registerPreUpdate(action: () => void, thisObject?: any, order?: number): Scheduler;
        removePreUpdate(scheduler: Scheduler): void;
        removePreUpdate(hashCode: number): void;

        registerUpdate(action: () => void, thisObject?: any, order?: number): Scheduler;
        removeUpdate(scheduler: Scheduler): void;
        removeUpdate(hashCode: number): void;

        registerPostUpdate(action: () => void, thisObject?: any, order?: number): Scheduler;
        removePostUpdate(scheduler: Scheduler): void;
        removePostUpdate(hashCode: number): void;

        registerTimer(timeout: number, action: () => void, thisObject?: any, times?: number, order?: number): Scheduler;
        removeTimer(scheduler: Scheduler): void;
        removeTimer(hashCode: number): void;
    }
}