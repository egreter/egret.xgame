/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-11
*************************************************/

import { IPlatUser } from "../../Platform";

export class LoginWindow extends fui.Window<fairygui.GObject> {
    public static NAME: string = "LoginWindow";
    @fui.fairy_ui()
    public btn_login: fairygui.GButton;
    @fui.fairy_ui()
    public com_input: fairygui.GTextInput;
    public constructor(private loginDeferred: xgame.Deferred<IPlatUser>) {
        super("demo", "LoginWindow");
        this.flags &= ~fui.UIFlags.closeByMask;
    }
    private index = 0;
    public onOpen(): void {
        super.onOpen();
        this.com_input.restrict = "a-zA-Z0-9_";
        this.com_input.text = "gmron707";
        let str = "请输入用户名";
        this.addClick(this.btn_login, () => {
            if (this.com_input.text.length == 0) {
                fui.tips(str);
                return;
            }
            this.loginDeferred.resolve({ username: this.com_input.text });
            this.close();
        }, this);
    }
}