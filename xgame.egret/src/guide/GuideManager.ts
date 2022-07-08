/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-08
*************************************************/
module egretx {
    export class GuideManager extends xgame.Singleton implements IGuideManager, IGuideManagerInternal {
        //引导助手，用户自定义实现引导内容
        public guideHelper: IGuideHelper;
        //引导任务集
        public readonly tasks = new xgame.Dictionary<number, GuideTask>();
        //帧调度
        private disposableGroup = new xgame.DisposableGroup();
        //注入的引导数据
        private values = new xgame.Dictionary<string, any>();
        //已完成的引导ID
        private completedIDList: number[] = [];
        public constructor() {
            super();
        }
        /**
         * 初始化
         */
        public initialize(): void {
            this.disposableGroup.registerUpdate(this.advanceTime, this);
        }
        public isCompleted(id: number): boolean {
            return this.completedIDList.indexOf(id) >= 0;
        }
        /**
         * 获取引导任务
         * @param id 
         */
        public getTask(id: number): GuideTask {
            return this.tasks.get(id);
        }
        /**
         * 获取引导步骤
         * @param id 
         * @param index 
         * @returns 
         */
        public getStep(id: number, index: number): GuideStep {
            if (this.tasks.containsKey(id)) {
                return this.tasks.get(id).getStep(index);
            }
        }
        /**
         * 添加引导任务
         * @param task 
         * @returns 
         */
        public addTask(task: GuideTask): GuideTask {
            if (task.ID && !this.tasks.containsKey(task.ID)) {
                this.tasks.add(task.ID, task);
                xgame.injectInstance(task);
                task.onInit();
            }
            else {
                throw new Error("添加引导任务({0})失败".format(task.ID));
            }
            return task;
        }
        /**
         * 清除所有注入数据
         * @param taskID 如果提供了taskID，则只清除该taskID的数据
         */
        public clearValues(taskID?: number): void {
            if (taskID) {
                if (this.tasks.containsKey(taskID)) {
                    this.tasks.get(taskID).clearValues();
                }
            }
            else {
                this.values.clear();
            }
        }
        /**
         * 注入或移除引导数据
         * @param key 
         * @param value 
         * @param taskID 
         */
        public injectValue<T extends keyof IGuideInjectValue>(key: T, value: IGuideInjectValue[T], taskID?: number): void {
            if (taskID) {
                if (this.tasks.containsKey(taskID)) {
                    this.tasks.get(taskID).injectValue(key, value);
                }
            }
            else {
                this.values.set(key, value);
            }
        }
        /**
         * 移除注入数据
         * @param key 
         * @param taskID 
         */
        public removeValue<T extends keyof IGuideInjectValue>(key: T, taskID?: number): void {
            if (taskID) {
                if (this.tasks.containsKey(taskID)) {
                    this.tasks.get(taskID).removeValue(key);
                }
            }
            else {
                this.values.remove(key);
            }
        }
        /**
         * 获取管理器注入的数据
         * @param key 
         * @param defaultValue 
         * @param taskID 
         */
        public retrieveValue<T extends keyof IGuideInjectValue>(key: T, defaultValue?: IGuideInjectValue[T], taskID?: number): IGuideInjectValue[T] {
            if (taskID) {
                if (this.tasks.containsKey(taskID)) {
                    return this.tasks.get(taskID).retrieveValue(key, defaultValue);
                }
            }
            else {
                if (this.values.containsKey(key)) {
                    return this.values.get(key);
                }
            }
            return defaultValue;
        }
        private isFirstClean = true;
        /**
         * 帧驱动
         */
        private advanceTime(): void {
            if (!this.isStarted) {
                return;
            }
            if (this.isPaused) {
                return;
            }
            //如果没有首次清理，把已经完成的引导任务从队列中移除掉
            if (this.isFirstClean) {
                this.isFirstClean = false;
                this.tasks.forValues((task) => {
                    if (task.checkRemoveWithCompleted()) {
                        this.tasks.remove(task.ID);
                        if (this.completedIDList.indexOf(task.ID) == -1) {
                            this.completedIDList.push(task.ID);
                        }
                        task.dispose();
                    }
                }, this, true);
            }
            //如果当前正在引导中
            if (this.activityTask) {
                //如果当前引导任务已经完成，清理并释放
                if (this.activityTask.checkComplete()) {
                    this.activityTask.onComplete();
                    this.tasks.remove(this.activityTask.ID);
                    if (this.completedIDList.indexOf(this.activityTask.ID) == -1) {
                        this.completedIDList.push(this.activityTask.ID);
                    }
                    this.activityTask.dispose();
                    this.$activityTask = undefined;
                }
                else {
                    this.activityTask.advanceTime();
                }
                return;
            }
            //检查是否有引导可以开始
            this.tasks.forValues((task) => {
                //如果有引导能开始，跳出循环
                if (task.checkBegin()) {
                    this.$activityTask = task;
                    task.onBegin();
                    return true;
                }
            }, this);
        }
        private $activityTask: GuideTask;
        public get activityTask(): GuideTask {
            return this.$activityTask;
        }
        public setActivityTask(value: GuideTask): void {
            this.$activityTask = value;
        }
        private $isStarted: boolean = false;
        public get isStarted(): boolean {
            return this.$isStarted;
        }
        /**
         * 开始引导流程
         */
        public start(): void {
            if (this.isStarted) {
                return;
            }
            this.$isStarted = true;
        }
        private $isPaused: boolean = false;
        public get isPaused(): boolean {
            return this.$isPaused;
        }
        /**
         * 暂停，只在当前空闲状态生效
         * @returns 
         */
        public pause(): void {
            if (!this.isStarted) {
                return;
            }
            if (this.activityTask) {
                return;
            }
            if (this.isPaused) {
                return;
            }
            this.$isPaused = true;
        }
        /**
         * 恢复，只在当前空闲状态生效
         * @returns 
         */
        public resume(): void {
            if (!this.isStarted) {
                return;
            }
            if (this.activityTask) {
                return;
            }
            if (!this.isPaused) {
                return;
            }
            this.$isPaused = false;
        }
        /**
         * 强制取消当前引导任务，如果成功，将暂停引导流程
         */
        public cancelActiveTask(): boolean {
            if (this.isStarted && this.activityTask && this.activityTask.state != GuideTaskState.Completed) {
                this.activityTask.onCancel();
                this.guideHelper.cancelGuide(this.activityTask.ID);
                this.$activityTask = undefined;
                this.pause();
                return true;
            }
            return false;
        }
    }
}