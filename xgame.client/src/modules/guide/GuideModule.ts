/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-08
*************************************************/
module ro {
    export class GuideModule extends xgame.XObject implements IModule {
        public onRegister(game: xgame.IXGame): void {
            let uiManager = game.getService<egretx.IUIManager>(egretx.IUIManager);
            uiManager.register(GuidePage.NAME, GuidePage);

            let guideManager = game.getService<egretx.IGuideManager>(egretx.IGuideManager);
            guideManager.guideHelper = GuideHelper.Instance();
            guideManager.addTask(new DemoGuideTask());
        }
    }
}