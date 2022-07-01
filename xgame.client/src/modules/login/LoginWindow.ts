/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-11
*************************************************/
module ro {
    export class LoginWindow extends egretx.Window {
        public static NAME: string = "LoginPage";
        public btn_login: eui.Button;
        public com_input: eui.TextInput;
        @xgame.inject(egretx.IUIManager)
        public uiManager: egretx.IUIManager;
        public constructor(private loginDeferred: xgame.Deferred<IPlatUser>) {
            super("resource/skins/login/LoginPageSkin.exml");
            this.flags &= ~egretx.UIFlags.closeByMask;
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
                    egretx.TipsManager.Instance().append(str);
                    return;
                }
                this.loginDeferred.resolve({ username: this.com_input.text });
                this.close();
            }, this);
        }
    }
}