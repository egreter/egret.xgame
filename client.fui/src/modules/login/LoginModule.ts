/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-06-28
*************************************************/

import { IModule } from "../core/IModule";
import { LoginWindow } from "./LoginWindow";
import { IUserData, UserData } from "./UserData";

export class LoginModule extends xgame.XObject implements IModule {
    public onRegister(game: xgame.IXGame): void {
        console.log("注册登录模块.");
        game.singleton(IUserData, UserData);
        let uiManager = game.getService<fui.IUIManager>(fui.IUIManager);
        uiManager.register(LoginWindow.NAME, LoginWindow);
    }
}