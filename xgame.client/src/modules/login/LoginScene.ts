/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-25
*************************************************/
/// <reference path="../common/DropdownList.ts" />
/// <reference path="../common/DropdownListGroup.ts" />
/// <reference path="../net/NetManager.ts" />


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
        @inject(egretx.IHttpManager)
        public http: egretx.IHttpManager;
        @inject(egretx.ISocketManager)
        public socket: egretx.ISocketManager;
        @inject(xgame.IDateTimeManager)
        public dateTimeManager: xgame.IDateTimeManager;
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
            //从Centre获取服务器信息及服务器列表
            this.http.sendRequest("http://10.10.0.88/serverlist/",
                egret.HttpMethod.POST,
                [["platform", "sandbox"],
                ["notice", "1"],
                ["uid", "0"],
                ["packtype", "2"],
                ["version", "94"]], true).then((ret) => {
                    console.log(ret);
                });
            //设置服务器时间戳
            //this.dateTimeManager.setNowTimestamp(Math.floor(new Date().valueOf() / 1000), 28800);
            let info = this.dateTimeManager.getDateInfo();
            console.log(info.string, info);
            this.g_username.visible = false;
            this.btn_game.visible = false;
            this.list_server.visible = false;
            this.addClick(this.btn_game, () => {
                let req = new ro3.LoginReq();
                req.uid = this.user.platUsername;
                req.platform = 2;
                let buffer = ro3.LoginReq.encode(req).finish();
                console.log("ro3.LoginReq序列化:", buffer);
                req = ro3.LoginReq.decode(buffer);
                console.log("ro3.LoginReq反序列化:", req);
                //连接服务器测试
                /*
                NetManager.Instance().on("CMD_LOGIN").addOnce((resp) => {
                    if (resp.result != ro3.LoginResp.LoginRet.FAIL) {
                        egretx.tips("登录成功");
                        this.uiManager.replaceScene(MainScene);
                    }
                }, this);
                //使用主网络实例进行连接，连接成功后，会自动发送登录请求(由SocketHelper决定)
                NetManager.Instance().main.connect();
                */
                this.uiManager.replaceScene(MainScene);
            }, this);
            egret.callLater(() => {
                platform.login().then((info) => {
                    this.user.platUsername = "{0}99130".format(info.username);
                    NetManager.Instance().main.setURI("ws://10.10.0.88:83/s99130/{0}".format(this.user.platUsername));
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