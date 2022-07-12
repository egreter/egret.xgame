/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-25
*************************************************/

import { inject } from "../../decorators/inject";
import { DebugPlatform } from "../../Platform";
import { DropdownList } from "../common/DropdownList";
import { MainScene } from "../main/MainScene";
import { NetManager } from "../net/NetManager";
import { IUserData } from "./UserData";


export class LoginScene extends euix.Scene {
    public btn_game: eui.Button;
    public lab_username: eui.Label;
    public g_username: eui.Label;
    @inject(IUserData)
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
        DebugPlatform;
        this.injectGuideValue("loginScene", this);
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
        this.injectGuideValue("btn_game", this.btn_game);
        this.list_server.visible = false;
        this.addClick(this.btn_game, () => {
            this.injectGuideValue("flag_btn_game_clicked", true);
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
                    euix.tips("登录成功");
                    this.uiManager.replaceScene(MainScene);
                }
            }, this);
            //使用主网络实例进行连接，连接成功后，会自动发送登录请求(由SocketHelper决定)
            NetManager.Instance().main.connect();
            */
            this.uiManager.replaceScene(MainScene);
            let ui = new eui.Button();
        }, this);
        egret.callLater(() => {
            window.platform.login().then((info) => {
                this.user.platUsername = "{0}99130".format(info.username);
                NetManager.Instance().main.setURI("ws://10.10.0.88:83/s99130/{0}".format(this.user.platUsername));
                this.btn_game.visible = true;
                this.g_username.visible = true;
                this.list_server.visible = true;
                this.list_server.popupTextAlign = egret.HorizontalAlign.LEFT;
                this.list_server.source = euix.DropdownList.toSource(["服务器100", "服务器1000", "服务器10000", "服务器10000", "服务器100000"]);
                this.list_server.selectedIndex = 2;
                this.lab_username.text = "当前登录账号: {0}".format(info.username);
            });
        }, this);
    }
    public onSceneChanging(): void {
        super.onSceneChanging();
    }
}