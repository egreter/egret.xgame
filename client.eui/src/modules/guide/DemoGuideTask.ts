/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-08
*************************************************/

import { inject } from "../../decorators/inject";
import { LoginScene } from "../login/LoginScene";
import { MainMenuPluginUI } from "../main/MainMenuPluginUI";
import { MainPage } from "../main/MainPage";
import { GuideID } from "./GuideID";

declare global {
    module egretx {
        interface IGuideInjectValue {
            //登录场景
            loginScene: LoginScene;
            //开始游戏按钮
            btn_game: eui.Button;
            //是否点击了开始游戏按钮
            flag_btn_game_clicked: boolean;
            //主界面引导索引
            main_index: number;

            mainMenu: MainMenuPluginUI;

            btn_0: eui.Button;
            btn_1: eui.Button;
            btn_2: eui.Button;
            btn_3: eui.Button;
            flag_main_btn_0_clicked: boolean;
            flag_main_tips_closed: boolean;
            flag_main_btn_1_clicked: boolean;
            flag_main_menu_closed: boolean;
            flag_main_btn_2_clicked: boolean;
            flag_main_bag_closed: boolean;
            flag_main_btn_3_clicked: boolean;


            mainPage: MainPage;
            main_btn_back: eui.Button;
            flag_main_btn_back_clicked: boolean;
            main_alert: euix.Alert;
            flag_main_alert_clicked: boolean;
        }
    }

}
/**
 * 引导演示任务
 */
export class DemoGuideTask extends egretx.GuideTask {
    @inject(egretx.IGuideManager)
    public guideManager: egretx.IGuideManager;
    @inject(euix.IUIManager)
    public uiManager: euix.IUIManager;
    public constructor() {
        super(GuideID.Demo, egretx.GuideTaskType.Force);
    }
    public checkBegin(): boolean {
        if (super.checkBegin()) {
            if (this.guideManager.retrieveValue("loginScene")) {
                return true;
            }
        }
        return false;
    }
    public onComplete(): void {
        super.onComplete();
        this.guideManager.removeValue("flag_main_alert_clicked");
        euix.tips("恭喜你完成了引导演示任务！");
    }
    public onInit(): void {
        this.addStep({
            checkBegin: () => {
                let btn_game = this.guideManager.retrieveValue("btn_game", null);
                if (btn_game && btn_game.visible) {
                    return true;
                }
                return false;
            },
            checkComplete: () => {
                if (this.guideManager.retrieveValue("flag_btn_game_clicked")) {
                    return true;
                }
                return false;
            },
            target: "btn_game",
            tips: "点击这里开始游戏"
        });
        this.addStep({
            target: "btn_0",
            checkBegin: () => {
                if (this.uiManager.entityManager.stackCount == 0 && this.guideManager.retrieveValue("btn_0") && this.guideManager.retrieveValue("main_index") == 0) {
                    return true;
                }
            },
            checkComplete: () => {
                if (this.guideManager.retrieveValue("flag_main_btn_0_clicked")) {
                    return true;
                }
                return false;
            },
            tips: "点这里演示弹出提示界面!"
        });
        this.addStep({
            target: null,
            checkBegin: () => {
                if (this.guideManager.retrieveValue("flag_main_btn_0_clicked")) {
                    return true;
                }
                return false;
            },
            checkComplete: () => {
                if (this.guideManager.retrieveValue("flag_main_tips_closed")) {
                    return true;
                }
                return false;
            }
        });
        this.addStep({
            target: "btn_1",
            checkBegin: () => {
                if (this.uiManager.entityManager.stackCount == 0 && this.guideManager.retrieveValue("btn_1") && this.guideManager.retrieveValue("main_index") == 1) {
                    return true;
                }
            },
            checkComplete: () => {
                if (this.guideManager.retrieveValue("flag_main_btn_1_clicked")) {
                    return true;
                }
                return false;
            },
            tips: "点这里演示演示弹出菜单!"
        });
        this.addStep({
            target: null,
            checkBegin: () => {
                if (this.guideManager.retrieveValue("flag_main_btn_1_clicked")) {
                    return true;
                }
                return false;
            },
            checkComplete: () => {
                if (this.guideManager.retrieveValue("flag_main_menu_closed")) {
                    return true;
                }
                return false;
            }
        });
        this.addStep({
            target: "btn_2",
            checkBegin: () => {
                if (this.uiManager.entityManager.stackCount == 0 && this.guideManager.retrieveValue("btn_2") && this.guideManager.retrieveValue("main_index") == 2) {
                    return true;
                }
            },
            checkComplete: () => {
                if (this.guideManager.retrieveValue("flag_main_btn_2_clicked")) {
                    return true;
                }
                return false;
            },
            tips: "点这里打开背包弹出窗口!"
        });
        this.addStep({
            target: null,
            checkBegin: () => {
                if (this.guideManager.retrieveValue("flag_main_btn_2_clicked")) {
                    return true;
                }
                return false;
            },
            checkComplete: () => {
                if (this.guideManager.retrieveValue("flag_main_bag_closed")) {
                    return true;
                }
                return false;
            }
        });
        this.addStep({
            target: "btn_3",
            checkBegin: () => {
                if (this.uiManager.entityManager.stackCount == 0 && this.guideManager.retrieveValue("btn_3") && this.guideManager.retrieveValue("main_index") == 3) {
                    return true;
                }
            },
            checkComplete: () => {
                if (this.guideManager.retrieveValue("flag_main_btn_3_clicked")) {
                    return true;
                }
                return false;
            },
            tips: "点这里演示打开全屏界面!"
        });
        this.addStep({
            target: "main_btn_back",
            checkBegin: () => {
                if (this.guideManager.retrieveValue("main_btn_back")) {
                    return true;
                }
            },
            checkComplete: () => {
                if (this.guideManager.retrieveValue("flag_main_btn_back_clicked")) {
                    return true;
                }
                return false;
            },
            tips: "点这里返回主场景!"
        });
        this.addStep({
            target: "alert_button_0",
            checkBegin: () => {
                if (this.guideManager.retrieveValue("mainPage") && this.guideManager.retrieveValue("alert_name") == "main_alert" && this.guideManager.retrieveValue("alert_button_0")) {
                    return true;
                }
            },
            checkComplete: () => {
                if (this.guideManager.retrieveValue("flag_main_alert_clicked")) {
                    return true;
                }
                return false;
            },
            tips: "点这里二次确认!"
        });
    }
}
