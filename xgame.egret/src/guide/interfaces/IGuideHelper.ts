/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-08
*************************************************/
module egretx {
    export interface IGuideHelper {
        /**
         * 开始引导步骤
         * @param taskID 
         * @param index 步骤index
         */
        beginGuideStep(taskID: number, index: number): void;
        /**
         * 结束引导步骤
         * @param taskID 
         * @param index 步骤index
         */
        endGuideStep(taskID: number, index: number): void;
        /**
         * 强制取消引导
         * @param taskID 
         */
        cancelGuide(taskID: number): void;
        /**
         * 开始引导任务
         * @param taskID 
         */
        beginGuide(taskID: number): void;
        /**
         * 结束引导任务
         * @param taskID 
         */
        endGuide(taskID: number): void;
    }
}