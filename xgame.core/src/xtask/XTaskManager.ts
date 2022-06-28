/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-20
*************************************************/
/// <reference path="../utils/Singleton.ts" />
/// <reference path="../scheduler/SchedulerManager.ts" />
/// <reference path="./interfaces/IXTaskManager.ts" />
/// <reference path="./interfaces/IXTaskManagerInternal.ts" />

module xgame {
    @impl(IXTaskManager)
    export class XTaskManager extends xgame.Singleton implements IXTaskManager, IXTaskManagerInternal {
        public mainTask: MainTask;
        private isRunning: boolean = true;
        public constructor() {
            super();
        }
        public initialize(): void {
            this.mainTask = new MainTask();
            SchedulerManager.Instance().registerUpdate(this.onUpdate, this);
        }
        private onUpdate(): void {
            if (!this.isRunning) {
                return;
            }
            this.mainTask.mainLoop();
        }
        public addTask<T extends IXTask>(onMainRunning: boolean, task: new (mode?: XTaskMode, life?: number) => T): T;
        public addTask(onMainRunning: boolean, task: IXTask): IXTask;
        public addTask(onMainRunning: boolean, task: any, life: number = 0): any {
            let item = this.mainTask.addTask(task, life);
            item.onMainRunning = onMainRunning;
            return item;
        }
        public removeTask(task: IXTask): void;
        public removeTask(hashCode: number): void;
        public removeTask(task: any): void {
            this.mainTask.removeTask(task);
        }
        public pause(): void {
            this.isRunning = false;
        }
        public resume(): void {
            this.isRunning = true;
        }
    }
}