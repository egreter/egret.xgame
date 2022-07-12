/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-08
*************************************************/

import { inject } from "../../decorators/inject";
import { GuidePage, IGuideParams } from "./GuidePage";

export class GuideHelper extends xgame.Singleton implements egretx.IGuideHelper {
    @inject(egretx.IGuideManager)
    public guideManager: egretx.IGuideManager;
    @inject(euix.IUIManager)
    public uiManager: euix.IUIManager;
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
        this.uiManager.openUIWithLayer(GuidePage, euix.UILayerID.Layer_11_Guide, params);
    }
    public endGuide(taskID: number, index: number): void {
        this.uiManager.closeUI(GuidePage.NAME);
    }
    public cancelGuide(taskID: number): void {
    }
}