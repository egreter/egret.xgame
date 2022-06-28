/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-06-28
*************************************************/
/// <reference path="./MainPage.ts" />

module ro {
    export class MainModule extends xgame.XObject implements IModule {
        public onRegister(game: xgame.IXGame): void {
            console.log("注册主模块.");
            let uiManager = game.getService<egretx.IUIManager>(egretx.IUIManager);
            uiManager.register(MainPage.NAME, MainPage);
            uiManager.register(MainMenuPluginUI.NAME, MainMenuPluginUI);
        }
    }
}