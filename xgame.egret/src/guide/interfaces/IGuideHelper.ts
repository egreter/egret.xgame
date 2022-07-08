/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-08
*************************************************/
module egretx {
    export interface IGuideHelper {
        /**
         * 开始引导
         * @param taskID 
         * @param index 步骤index
         */
        beginGuide(taskID: number, index?: number): void;
        /**
         * 结束引导
         * @param taskID 
         * @param index 步骤index
         */
        endGuide(taskID: number, index?: number): void;
        /**
         * 强制取消引导
         * @param taskID 
         */
        cancelGuide(taskID: number): void;
    }
}