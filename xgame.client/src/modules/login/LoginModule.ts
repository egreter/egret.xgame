/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-06-28
*************************************************/
/// <reference path="./UserData.ts" />

module ro {
    export class LoginModule extends xgame.XObject implements IModule {
        public onRegister(game: xgame.IXGame): void {
            console.log("注册登录模块.");
            game.singleton(IUserData, UserData);
            let uiManager = game.getService<egretx.IUIManager>(egretx.IUIManager);
            uiManager.register(LoginWindow.NAME, LoginWindow);
        }
    }
}