/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-11
*************************************************/

import { IPlatUser } from "../../Platform";

export class LoginWindow extends euix.Window {
    public static NAME: string = "LoginPage";
    public btn_login: eui.Button;
    public com_input: eui.TextInput;
    public constructor(private loginDeferred: xgame.Deferred<IPlatUser>) {
        super("resource/skins/login/LoginPageSkin.exml");
        this.flags &= ~euix.UIFlags.closeByMask;
    }
    private index = 0;
    public onOpen(): void {
        super.onOpen();

        this.com_input.maxChars = 20;
        this.com_input.restrict = "a-zA-Z0-9_";
        this.com_input.text = "gmron707";
        let str = "请输入用户名";
        this.addClick(this.btn_login, () => {
            if (this.com_input.text.length == 0) {
                euix.tips(str);
                return;
            }
            this.loginDeferred.resolve({ username: this.com_input.text });
            this.close();
        }, this);
    }
}