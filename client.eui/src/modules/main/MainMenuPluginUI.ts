/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-06-29
*************************************************/

import { event } from "../../decorators/event";
import { inject } from "../../decorators/inject";
import { injectable } from "../../decorators/injectable";
import { EventModule } from "../events/EventModule";
import { MainEvent } from "../events/MainEvent";
import { BagWindow } from "./BagWindow";
import { MainPage } from "./MainPage";
import { TipsPage } from "./TipsPage";

@injectable()
export class MainMenuPluginUI extends euix.PluginPage {
    public static NAME: string = "MainMenuPluginUI";
    @inject(euix.IUIManager)
    public uiManager: euix.IUIManager;
    @inject(xgame.IEventManager)
    public eventManager: xgame.IEventManager;
    @inject(egretx.IAudioManager)
    public audioManager: egretx.IAudioManager;
    @inject(xgame.ITimelineManager)
    public timelineManager: xgame.ITimelineManager;
    @inject(egretx.IAnimationManager)
    public animationManager: egretx.IAnimationManager;
    public btn_0: eui.Button;
    public btn_1: eui.Button;
    public btn_2: eui.Button;
    public btn_3: eui.Button;
    public btn_4: eui.Button;
    public btn_5: eui.Button;
    public btn_6: eui.Button;
    public btn_7: eui.Button;
    public btn_8: eui.Button;
    public btn_9: eui.Button;
    public btn_10: eui.Button;
    public btn_11: eui.Button;
    public btn_12: eui.Button;
    public btn_13: eui.Button;
    public btn_14: eui.Button;
    public btn_15: eui.Button;
    public constructor() {
        super("resource/skins/main/MainMenuPluginSkin.exml")
    }
    private selectedIndex: number = 0;
    public onOpen(): void {
        super.onOpen();
        this.injectGuideValue("main_index", 0);
        this.injectGuideValue("btn_0", this.btn_0);
        this.injectGuideValue("btn_1", this.btn_1);
        this.injectGuideValue("btn_2", this.btn_2);
        this.injectGuideValue("btn_3", this.btn_3);
        //全局事件监听
        //this.eventManager.addEventListener(EventModule.MAIN, MainEvent.BAG_OPENED, this.onBagOpened, this);
        this.addClick(this.btn_0, () => {
            //this.audioManager.ui.play("effect_mp3", 1);
            this.uiManager.openPopup(TipsPage, this.btn_0);
            this.injectGuideValue("flag_main_btn_0_clicked", true);
            this.injectGuideValue("main_index", 1);
        }, this);
        this.addClick(this.btn_1, () => {

            //this.audioManager.ui.play("killed_mp3", 1);
            //egretx.showPopupMenu(this.btn_1, ["第一级", "第二级", "第三级"]).addOnce((v) => {
            euix.showPopupMenu(this.btn_1, euix.PopupMenu.toOptions(["第一级", "第二级", "第三级"], this.selectedIndex)).addOnce((v) => {
                if (v) {
                    this.selectedIndex = v.index;
                }
                this.injectGuideValue("flag_main_menu_closed", true);
            }, this);
            this.injectGuideValue("flag_main_btn_1_clicked", true);
            this.injectGuideValue("main_index", 2);
        }, this);
        this.addClick(this.btn_2, () => {
            //this.audioManager.effect.play("effect2_mp3", 1);
            this.uiManager.openUI(BagWindow);
            this.injectGuideValue("flag_main_btn_2_clicked", true);
            this.injectGuideValue("main_index", 3);
        }, this);
        this.addClick(this.btn_3, () => {
            //this.audioManager.effect.play("refine_mp3", 1);
            this.uiManager.openUI(MainPage);
            this.injectGuideValue("flag_main_btn_3_clicked", true);
        }, this);
        this.addClick(this.btn_4, () => {
            this.timelineManager.getOrCreateTimeline().timeScale = 0.5;
        }, this);
        this.addClick(this.btn_5, () => {
            this.timelineManager.getOrCreateTimeline().timeScale = 3;
        }, this);
        this.addClick(this.btn_10, () => {
            this.timelineManager.getOrCreateTimeline().timeScale = 1;
        }, this);
        this.addClick(this.btn_6, () => {
            this.audioManager.ui.play("refine_mp3", 1);
            euix.tips("UI音频只能同时播放一个声音，多个播放后者会替换前者！");
        }, this);
        this.addClick(this.btn_7, () => {
            this.audioManager.effect.play("effect_mp3", 1);
            euix.tips("特效音频能同时播放3个声音，当没有空闲播放器时，其他播放将被忽略。");
        }, this);
        this.addClick(this.btn_8, () => {
            let mc = this.animationManager.fetch("888888", "mc");
            console.log("播放动画(888888)=>hashCode:" + mc.hashCode);
            mc.frameRate = 8 + Math.floor(Math.random() * 22);
            mc.horizontalCenter = 320 - Math.floor(Math.random() * 640);
            mc.verticalCenter = 320 - Math.floor(Math.random() * 640);
            mc.mc_scaleX = mc.mc_scaleY = 1 + Math.floor(Math.random() * 100) / 100;
            this.uiManager.currentScene.uiPage.addChild(mc);
            mc.playWithAutoRemove("skill");
        }, this);
        this.addClick(this.btn_9, () => {
            this.animationManager.release("888888");
        }, this);



        this.addClick(this.btn_11, () => {
            this.eventManager.dispatchEvent(EventModule.MAIN, MainEvent.PLAY_ANIMATION, "stand");
        }, this);
        this.addClick(this.btn_12, () => {
            this.eventManager.dispatchEvent(EventModule.MAIN, MainEvent.PLAY_ANIMATION, "walk");
        }, this);
        this.addClick(this.btn_13, () => {
            this.eventManager.dispatchEvent(EventModule.MAIN, MainEvent.PLAY_ANIMATION, "jump");
        }, this);
        this.addClick(this.btn_14, () => {
            this.eventManager.dispatchEvent(EventModule.MAIN, MainEvent.PLAY_ANIMATION, "fall");
        }, this);
        this.addClick(this.btn_15, () => {
            this.eventManager.dispatchEvent(EventModule.MAIN, MainEvent.RELEASE_DRAGONBONES);
        }, this);
    }
    //全局事件侦听的另外一种写法，默认只有egretx.UIPage支持，其他的需要自己调用xgame.IEventSubject接口启用生命周期
    @event(MainEvent.BAG_OPENED, EventModule.MAIN)
    public onBagOpened(event: MainEvent): void {
        console.log("=======================>", event.data);
    }
}