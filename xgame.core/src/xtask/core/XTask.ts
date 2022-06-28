/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-20
*************************************************/
/// <reference path="../../core/Locker.ts" />
/// <reference path="../../utils/Dictionary.ts" />
/// <reference path="../structs/XTaskResult.ts" />
/// <reference path="../interfaces/IXTask.ts" />


module xgame {
    import Dictionary = xgame.Dictionary;
    @impl(IXTask)
    export class XTask extends xgame.Locker implements IXTask {
        public name: string;
        public mode: XTaskMode;
        public state: XTaskState;
        public result: XTaskResult;
        public lifeMode: XTaskLifeMode;
        public onMainRunning: boolean;
        public parent: IXTask;
        public get root(): IXTask {
            let parent = <XTask>this;
            while (parent) {
                if (parent && parent.isRoot) {
                    return parent;
                }
                parent = <XTask>parent.parent;
            }
        }
        public lifeCount: number;
        public get childCount(): number {
            return this.children.length;
        }
        public isMain: boolean = false;
        public isRoot: boolean = false;

        protected children = new Dictionary<number, XTask>();
        protected countCompleted: number = 0;
        protected walkIndex: number = 0;
        protected currentChildComplete: number = 0;
        protected currentComplete: number = 0;

        private $delegate: IXTaskDelegate;
        private $forRemoves: number[] = [];
        private $forResets: number[] = [];

        public constructor(mode: XTaskMode = XTaskMode.Parallel, life: number = 0) {
            super();
            this.setTaskState(XTaskState.UnInitialize);
            this.mode = mode;
            this.lifeCount = life;
            this.result = XTaskResult.Invalidate;
            this.lifeMode = life > 0 ? XTaskLifeMode.Limit : XTaskLifeMode.Infinite;
        }

        public setDelegate(delegate: IXTaskDelegate): void {
            this.$delegate = delegate;
        }

        public addTask<T extends IXTask>(task: new () => T, mode?: XTaskMode, life?: number): T;
        public addTask(task: IXTask): IXTask;
        public addTask(task: any, mode: XTaskMode = XTaskMode.Parallel, life: number = 0): any {
            this.simple(() => {
                let item: XTask = task;
                if (typeof (task) == "function") {
                    item = new task(mode, life);
                }
                item.parent = this;
                if (this.isMain) {
                    item.isRoot = true;
                }
                this.children.add(item.hashCode, item);
            }, this);
        }
        public removeTask(hashCode: number): void;
        public removeTask(task: IXTask): void;
        public removeTask(task: any): void {
            this.simple(() => {
                let hashCode: number = task;
                if (typeof (task) != "number") {
                    hashCode = task.hashCode;
                }
                if (this.children.containsKey(hashCode)) {
                    let value = this.children.remove(hashCode);
                    value.parent = undefined;
                }
            }, this);
        }
        public mainLoop(): void {
            this.checkRemoves();
            this.checkResets();
            if (this.state == XTaskState.SelfCompleted && this.childCount > 0) {
                this.currentChildComplete = 0;
                this.currentComplete = this.childCount;
                if (this.mode == XTaskMode.Selector) {
                    this.currentComplete = 1;
                }
                for (let i = this.walkIndex; i < this.childCount; i++) {
                    let task = this.children.indexValue(i);
                    this.walkTask(task);
                    if (this.mode == XTaskMode.Sequence || this.mode == XTaskMode.RacingSequence) {
                        if (this.mode == XTaskMode.Sequence && task.state != XTaskState.Completed) {
                            break;
                        }
                        if (task.state == XTaskState.Executing) {
                            this.walkIndex = i;
                            break;
                        }
                        if (task.state == XTaskState.Completed) {
                            if (this.walkIndex < this.childCount - 1) {
                                this.walkIndex++;
                            }
                            break;
                        }
                    }
                    else if (this.mode == XTaskMode.Selector) {
                        if (task.state == XTaskState.Validated || task.state == XTaskState.Executing) {
                            this.walkIndex = i;
                            break;
                        }
                        if (task.state == XTaskState.SelfCompleted || task.state == XTaskState.Completed) {
                            break;
                        }
                    }
                }
                this.CheckComplete();
            }
        }
        public initialize(): void {
            this.setTaskState(XTaskState.Initialized);
            this.walkIndex = 0;
            this.currentChildComplete = 0;
            this.currentComplete = 0;
            if (this.$delegate && this.$delegate.initialize) {
                this.$delegate.initialize(this);
            }
        }
        public validate(): boolean {
            if (this.$delegate && this.$delegate.validate) {
                return this.$delegate.validate(this);
            }
            return true;
        }
        public async execute(): Promise<void> {

        }
        public update(): void {
            if (this.$delegate && this.$delegate.update) {
                this.$delegate.update(this);
            }
        }
        public selfComplete(result: XTaskResult = XTaskResult.Success): void {
            this.setTaskState(XTaskState.SelfCompleted);
            this.result = result;
            if (this.$delegate && this.$delegate.selfComplete) {
                this.$delegate.selfComplete(this);
            }
        }
        public complete(): void {
            this.setTaskState(XTaskState.Completed);
            this.countCompleted++;
            let parent = <XTask>this.parent;
            if (parent && parent.isMain && this.onMainRunning) {
                XTaskManager.Instance().mainTask.unlock(this);
            }
            if (this.$delegate && this.$delegate.complete) {
                this.$delegate.complete(this);
            }
        }
        public failure(): void {
            this.setTaskState(XTaskState.Failured);
            let parent = <XTask>this.parent;
            if (parent && parent.isMain && this.onMainRunning) {
                XTaskManager.Instance().mainTask.unlock(this);
            }
            if (this.$delegate && this.$delegate.failure) {
                this.$delegate.failure(this);
            }
        }
        public reset(): void {
            this.result = XTaskResult.Invalidate;
            this.setTaskState(XTaskState.Initialized);
            this.walkIndex = 0;
            this.currentChildComplete = 0;
            this.currentComplete = 0;
            this.children.forValues((value) => {
                value.reset();
            });
            if (this.$delegate && this.$delegate.reset) {
                this.$delegate.reset(this);
            }
        }

        //================================================
        //protected functions
        //================================================
        protected setTaskState(state: XTaskState): void {
            this.simple(() => {
                this.state = state;
            }, this);
        }
        protected async internalExecute(): Promise<void> {
            this.setTaskState(XTaskState.Executing);
            let parent = <XTask>this.parent;
            if (parent.isMain && this.onMainRunning) {
                XTaskManager.Instance().mainTask.lock(this);
            }
            await this.execute();
            if (this.$delegate && this.$delegate.execute) {
                await this.$delegate.execute(this);
            }
        }
        protected walkTask(task: XTask): void {
            let isMainLocked = this.isMain && XTaskManager.Instance().mainTask.isLockTask(task);
            switch (task.state) {
                case XTaskState.UnInitialize:
                    task.initialize();
                    break;
                case XTaskState.Initialized:
                    if (!isMainLocked) {
                        if (task.validate()) {
                            task.state = XTaskState.Validated;
                        }
                    }
                    break;
                case XTaskState.Validated:
                    if (!isMainLocked) {
                        task.internalExecute();
                    }
                    break;
                case XTaskState.Executing:
                    if (!isMainLocked) {
                        task.update();
                    }
                    break;
                case XTaskState.SelfCompleted:
                    if (task.childCount == 0) {
                        if (task.result == XTaskResult.Success) {
                            task.complete();
                        }
                        else {
                            task.failure();
                        }
                    }
                    break;
                case XTaskState.Completed:
                    this.currentChildComplete++;
                    let removed = false;
                    if (task.result == XTaskResult.Success && task.lifeMode == XTaskLifeMode.Limit) {
                        task.lifeCount--;
                        if (task.lifeCount <= 0) {
                            removed = true;
                        }
                    }
                    if (!removed) {
                        if (this.isMain) {
                            this.$forResets.push(task.hashCode);
                        }
                    }
                    else {
                        this.$forRemoves.push(task.hashCode);
                    }
                    break;
                case XTaskState.Failured:
                    break;
                default:
                    break;
            }
            task.mainLoop();
        }
        protected get isSelfCompleteSucceed(): boolean {
            return this.state == XTaskState.SelfCompleted && this.result == XTaskResult.Success;
        }
        protected CheckComplete(): void {
            if (this.isSelfCompleteSucceed && this.childCount > 0) {
                if (this.mode == XTaskMode.Sequence || this.mode == XTaskMode.RacingSequence) {
                    let last = this.children.last().value;
                    if (last.state == XTaskState.Completed) {
                        this.complete();
                    }
                }
                else {
                    if (this.currentChildComplete >= this.currentComplete) {
                        this.complete();
                    }
                }
            }
        }
        //================================================
        //private functions
        //================================================
        private checkResets(): void {
            while (this.$forResets.length) {
                let hashCode = this.$forResets.shift();
                if (this.children.containsKey(hashCode)) {
                    let value = this.children.get(hashCode);
                    value.reset();
                }
            }
        }
        private checkRemoves(): void {
            while (this.$forRemoves.length) {
                let hashCode = this.$forRemoves.shift();
                this.removeTask(hashCode);
            }
        }
    }
}