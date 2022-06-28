/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-25
*************************************************/
/// <reference path="../common/DropdownList.ts" />
/// <reference path="../common/DropdownListGroup.ts" />

module ro {
    export class LoginScene extends egretx.Scene {
        @xgame.inject(egretx.IUIManager)
        public uiManager: egretx.IUIManager;
        public btn_game: eui.Button;
        public lab_username: eui.Label;
        public g_username: eui.Label;
        @xgame.inject(IUserData)
        public user: IUserData;
        public list_server: DropdownList;
        
        //private net = new pomelo.Pomelo();
        public constructor() {
            super("resource/skins/login/LoginSceneSkin.exml");
        }
        public onOpen(): void {
            super.onOpen();
            /*
            this.net.init(<pomelo.IOptions>{ host: "127.0.0.1", port: 3010 }, () => {
                this.net.request("connector.entryHandler.entry", "hello!!!", (resp: any) => {
                    console.log("entry:", resp);
                });
                this.net.request("connector.entryHandler.publish", "hello!!!", (resp: any) => {
                    console.log("publish:", resp);
                });
                this.net.request("connector.entryHandler.subscribe", "hello!!!", (resp: any) => {
                    console.log("subscribe:", resp);
                });
            });
            */
            
            this.g_username.visible = false;
            this.btn_game.visible = false;
            this.list_server.visible = false;
            this.addClick(this.btn_game, () => {
                this.uiManager.replaceScene(MainScene);
            }, this);
            egret.callLater(() => {
                platform.login().then((info) => {
                    this.user.platUsername = info.username;
                    this.btn_game.visible = true;
                    this.g_username.visible = true;
                    this.list_server.visible = true;
                    this.list_server.popupTextAlign = egret.HorizontalAlign.LEFT;
                    this.list_server.source = egretx.DropdownList.toSource(["服务器100", "服务器1000", "服务器10000", "服务器10000", "服务器100000"]);
                    this.list_server.selectedIndex = 2;
                    this.lab_username.text = "当前登录账号: {0}".format(info.username);
                });
            }, this);
        }
        public onSceneChanging(): void {
            super.onSceneChanging();
        }
    }
}