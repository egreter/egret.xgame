/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-20
*************************************************/
/// <reference path="./XTask.ts" />
/// <reference path="../interfaces/IXTask.ts" />


module xgame {
    @impl(IXTask)
    export class MainTask extends XTask {
        public isLocked: boolean = false;
        private $idWithLocked: number = 0;
        public constructor() {
            super(XTaskMode.Parallel, 0);
            this.name = "MainTask";
            this.isMain = true;
        }
        public isLockTask(task: IXTask): boolean {
            return task.onMainRunning && task.parent == this && this.isLocked && this.$idWithLocked != task.hashCode;
        }
        public lock(task: IXTask): void {
            this.simple(() => {
                this.isLocked = true;
                this.$idWithLocked = task.hashCode;
            }, this);
        }
        public unlock(task: IXTask): void {
            this.simple(() => {
                this.isLocked = false;
                this.$idWithLocked = 0;
            }, this);
        }
        public initialize(): void {
            this.setTaskState(XTaskState.SelfCompleted);
        }
        public validate(): boolean {
            return true;
        }
        public reset(): void {

        }
        public complete(): void {

        }
    }
}