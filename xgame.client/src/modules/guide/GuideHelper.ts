/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-08
*************************************************/
/// <reference path="./GuidePage.ts" />

module ro {
    export class GuideHelper extends xgame.Singleton implements egretx.IGuideHelper {
        @inject(egretx.IGuideManager)
        public guideManager: egretx.IGuideManager;
        @inject(egretx.IUIManager)
        public uiManager: egretx.IUIManager;
        public constructor() {
            super();
            xgame.injectInstance(this);
        }
        public beginGuide(taskID: number, index: number): void {
            let task = this.guideManager.getTask(taskID);
            let step = this.guideManager.getStep(taskID, index);
            let params = <IGuideParams>{
                target: this.guideManager.retrieveValue(step.target),
                taskID: taskID, index: index,
                guideType: task.taskType,
                tips: step.tips
            };
            this.uiManager.openUIWithLayer(GuidePage, egretx.UILayerID.Layer_11_Guide, params);
        }
        public endGuide(taskID: number, index: number): void {
            this.uiManager.closeUI(GuidePage.NAME);
        }
        public cancelGuide(taskID: number): void {
        }
    }
}