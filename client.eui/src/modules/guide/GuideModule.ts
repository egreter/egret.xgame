/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-08
*************************************************/

import { IModule } from "../core/IModule";
import { DemoGuideTask } from "./DemoGuideTask";
import { GuideHelper } from "./GuideHelper";
import { GuidePage } from "./GuidePage";

export class GuideModule extends xgame.XObject implements IModule {
    public onRegister(game: xgame.IXGame): void {
        let uiManager = game.getService<euix.IUIManager>(euix.IUIManager);
        uiManager.register(GuidePage.NAME, GuidePage);

        let guideManager = game.getService<egretx.IGuideManager>(egretx.IGuideManager);
        guideManager.guideHelper = GuideHelper.Instance();
        guideManager.addTask(new DemoGuideTask());
    }
}