/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-08
*************************************************/
module egretx {
    export let IGuideManager = Symbol.for("IGuideManager");
    export interface IGuideManager extends xgame.IXObject {
        guideHelper: IGuideHelper;
        readonly isStarted: boolean;
        readonly isPaused: boolean;
        readonly activityTask: GuideTask;
        /**
         * 获取引导任务
         * @param id 
         */
        getTask(id: number): GuideTask;
        /**
         * 获取引导步骤
         * @param id 
         * @param index 
         * @returns 
         */
        getStep(id: number, index: number): GuideStep;
        /**
         * 添加引导任务
         * @param task 
         */
        addTask(task: GuideTask): GuideTask;
        /**
         * 开始引导流程
         */
        start(): void;
        /**
         * 清除所有注入数据
         * @param taskID 如果提供了taskID，则只清除该taskID的数据
         */
        clearValues(taskID?: number): void;
        /**
         * 注入或移除引导数据
         * @param key 
         * @param value 
         * @param taskID 
         */
        injectValue<T extends keyof IGuideInjectValue>(key: T, value: IGuideInjectValue[T], taskID?: number): void;
        /**
         * 获取管理器注入的数据
         * @param key 
         * @param defaultValue 
         * @param taskID 
         */
        /**
         * 移除注入数据
         * @param key 
         * @param taskID 
         */
        removeValue<T extends keyof IGuideInjectValue>(key: T, taskID?: number): void;
        retrieveValue<T extends keyof IGuideInjectValue>(key: T, defaultValue?: IGuideInjectValue[T], taskID?: number): IGuideInjectValue[T];
        /**
         * 暂停，只在当前空闲状态生效
         * @returns 
         */
        pause(): void;
        /**
         * 恢复，只在当前空闲状态生效
         * @returns 
         */
        resume(): void;
        /**
         * 强制取消当前引导任务，如果成功，将暂停引导流程
         */
        cancelActiveTask(): boolean;
    }
}