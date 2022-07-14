/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-06-28
*************************************************/

import { IModule } from "../core/IModule";
import { MainMenuPluginUI } from "./MainMenuPluginUI";
import { MainPage } from "./MainPage";


export class MainModule extends xgame.XObject implements IModule {
    public onRegister(game: xgame.IXGame): void {
        console.log("注册主模块.");
        let uiManager = game.getService<fui.IUIManager>(fui.IUIManager);
        uiManager.register(MainPage.NAME, MainPage);
        uiManager.register(MainMenuPluginUI.NAME, MainMenuPluginUI);
    }
}