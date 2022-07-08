/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-08
*************************************************/
module egretx {
    export enum GuideTaskState {
        Ready = 0,
        Running,
        Completed
    }
    export enum GuideTaskType {
        Weak = 0,
        Force
    }
    export interface IGuideStepParams {
        target: keyof IGuideInjectValue;
        checkBegin: () => boolean;
        checkComplete: () => boolean;
        tips?: string;
    }
    export class GuideTask extends xgame.XObject implements xgame.IDisposable {
        private values = new xgame.Dictionary<string, any>();
        public readonly steps = new xgame.Dictionary<number, GuideStep>();
        /**
         * 构造函数
         * @param ID 任务id
         * @param taskType 引导类型
         * @param frontID 前置引导ID，如果设置刚需要等待前置引导完成才能开始
         */
        public constructor(public ID: number, public taskType: GuideTaskType = GuideTaskType.Weak, public frontID?: number) {
            super();
        }
        public getStep(index: number): GuideStep {
            return this.steps.get(index);
        }
        public addStep(step: GuideStep): void
        public addStep(params: IGuideStepParams): void
        public addStep(step_or_params: GuideStep | IGuideStepParams): void {
            let step: GuideStep;
            if (step_or_params instanceof GuideStep) {
                step = step_or_params;
                step.index = this.steps.length;
                step.parent = this;
            }
            else {
                step = new GuideStep(this, this.steps.length, step_or_params);
                step.checkBegin = step_or_params.checkBegin;
                step.checkComplete = step_or_params.checkComplete;
            }
            this.steps.add(step.index, step);
        }
        /**
         * 当前激活的引导步骤
         */
        private $activeIndex: number = -1;
        public get activeIndex(): number {
            return this.$activeIndex;
        }
        public setActiveIndex(value: number): void {
            this.$activeIndex = value;
            //如果是弱引导，重置其他步骤
            this.steps.forValues((step) => {
                if (step.index != value && this.taskType == GuideTaskType.Weak) {
                    step.reset();
                }
            }, this, true);
        }
        /**
         * 当任务被添加到队列时
         */
        public onInit(): void {

        }
        /**
         * 检查引导任务是不是已经完成需要移除
         * @returns 
         */
        public checkRemoveWithCompleted(): boolean {
            return false;
        }
        /**
         * 如果引导未开始，检查是否可以开始引导
         * @returns 
         */
        public checkBegin(): boolean {
            if (this.frontID && !GuideManager.Instance().isCompleted(this.frontID)) {
                return false;
            }
            return true;
        }
        /**
         * 当引导开始时调用
         */
        public onBegin(): void {
            this.$state = GuideTaskState.Running;
        }
        /**
         * 如果引导进行中，检查引导是否完成了
         * @returns 
         */
        public checkComplete(): boolean {
            //如果最后一个步骤完成，说明整个引导任务完成了
            if (this.steps.last().value.state == GuideStepState.Completed) {
                return true;
            }
            return false;
        }
        /**
         * 当引导结束时调用
         */
        public onComplete(): void {
            this.$state = GuideTaskState.Completed;
        }
        /**
         * 当被强制取消时
         */
        public onCancel(): void {
            this.$activeIndex = -1;
            this.steps.forValues((step) => {
                step.reset();
            }, this);
        }
        /**
         * 状态重置
         */
        public reset(): void {
            this.$state = GuideTaskState.Ready;
            this.values.clear();
            this.$activeIndex = -1;
        }
        /**
         * 更新
         */
        public advanceTime(): void {
            if (this.activeIndex >= 0) {
                let step = this.getStep(this.activeIndex);
                if (step.state === GuideStepState.Ready) {
                    if (step.checkBegin()) {
                        step.setState(GuideStepState.Running);
                        step.onBegin();
                    }
                }
                else if (step.state === GuideStepState.Running) {
                    step.advanceTime();
                    if (step.checkComplete()) {
                        step.setState(GuideStepState.Completed);
                        step.onComplete();
                        if (step.index < this.steps.length - 1) {
                            this.$activeIndex++;
                        }
                    }
                }
            }
            else {
                this.steps.forValues((step) => {
                    if (this.activeIndex == -1) {
                        if (step.checkBegin()) {
                            step.setState(GuideStepState.Running);
                            step.onBegin();
                            this.$activeIndex = step.index;
                            return true;
                        }
                    }
                }, this, true);
            }
        }
        /**
         * 释放
         */
        public dispose(): void {
            this.steps.clear((step) => {
                step.dispose();
            });
            this.values.clear();
        }
        private $state: GuideTaskState = GuideTaskState.Ready;
        public get state(): GuideTaskState {
            return this.$state;
        }
        /**
         * 设置状态
         * @param value 
         */
        public setState(value: GuideTaskState): void {
            this.$state = value;
        }
        /**
         * 清除所有注入数据
         */
        public clearValues(): void {
            this.values.clear();
        }
        /**
         * 注入或移除引导数据
         * @param key 
         * @param value 
         * @param taskID 
         */
        public injectValue<T extends keyof IGuideInjectValue>(key: T, value: IGuideInjectValue[T]): void {
            this.values.set(key, value);
        }
        public removeValue<T extends keyof IGuideInjectValue>(key: T): void {
            this.values.remove(key);
        }
        /**
         * 获取管理器注入的数据
         * @param key 
         * @param defaultValue 
         * @param taskID 
         */
        public retrieveValue<T extends keyof IGuideInjectValue>(key: T, defaultValue?: IGuideInjectValue[T]): IGuideInjectValue[T] {
            if (this.values.containsKey(key)) {
                return this.values.get(key);
            }
            return defaultValue;
        }
    }
}