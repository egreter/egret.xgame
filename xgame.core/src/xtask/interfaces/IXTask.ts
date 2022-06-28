/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-20
*************************************************/
/// <reference path="../../core/XObject.ts" />
/// <reference path="../structs/XTaskMode.ts" />
/// <reference path="../structs/XTaskState.ts" />
/// <reference path="../structs/XTaskResult.ts" />
/// <reference path="../structs/XTaskLifeMode.ts" />


module xgame {
    export let IXTask = Symbol.for("IXTask");
    export interface IXTask extends xgame.IXObject {
        name: string;
        mode: XTaskMode;
        state: XTaskState;
        result: XTaskResult;
        lifeMode: XTaskLifeMode;

        onMainRunning: boolean;

        parent: IXTask;
        root: IXTask;

        lifeCount: number;

        childCount: number;

        addTask<T extends IXTask>(task: new () => T): T;
        addTask(task: IXTask): IXTask;
        removeTask(hashCode: number): void;
        removeTask(task: IXTask): void;
        //主循环
        mainLoop(): void;
        //生命周期
        initialize(): void;
        validate(): boolean;
        execute(): Promise<void>;
        update(): void;
        selfComplete(result?: XTaskResult): void;
        complete(): void;
        failure(): void;
        reset(): void;
    }
}