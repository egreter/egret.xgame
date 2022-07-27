/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-08
*************************************************/
module egretx {
    export enum GuideStepState {
        Ready = 0,
        Running,
        Completed
    }
    export class GuideStep extends xgame.XObject implements xgame.IDisposable {
        public checkBegin: () => boolean;
        public checkComplete: () => boolean
        /**
         * @param parent 所属引导任务
         * @param index 第几步
         */
        public constructor(public parent: GuideTask, public index: number, public params: IGuideStepParams) {
            super();
        }
        public get taskID(): number {
            return this.parent && this.parent.ID;
        }
        public get target(): keyof IGuideInjectValue {
            return this.params.target;
        }
        public get tips(): string {
            return this.params.tips;
        }
        private $state: GuideStepState = GuideStepState.Ready;
        public get state(): GuideStepState {
            return this.$state;
        }
        /**
         * 设置状态
         * @param value 
         */
        public setState(value: GuideStepState): void {
            this.$state = value;
        }
        /**
         * 状态重置
         */
        public reset(): void {
            this.$state = GuideStepState.Ready;
        }
        /**
         * 更新，只要引导未完成，都会调用此方法
         */
        public advanceTime(): void {

        }
        /**
         * 释放
         */
        public dispose(): void {

        }
        /**
         * 当步骤开始时
         */
        public onBegin(): void {
            GuideManager.Instance().guideHelper.beginGuideStep(this.parent.ID, this.index);
        }
        /**
         * 当步骤完成时
         */
        public onComplete(): void {
            GuideManager.Instance().guideHelper.endGuideStep(this.parent.ID, this.index);
        }
    }
}