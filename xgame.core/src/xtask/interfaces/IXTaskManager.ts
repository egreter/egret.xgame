/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-20
*************************************************/
/// <reference path="../../interfaces/IXObject.ts" />

module xgame {
    export let IXTaskManager = Symbol.for("IXTaskManager");
    export interface IXTaskManager extends xgame.IXObject {
        addTask<T extends IXTask>(onMainRunning: boolean, task: new (mode?: XTaskMode, life?: number) => T): T;
        addTask(onMainRunning: boolean, task: IXTask): IXTask;

        removeTask(task: IXTask): void;
        removeTask(hashCode: number): void;

        pause(): void;
        resume(): void;
    }
}