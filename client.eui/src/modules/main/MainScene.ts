/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-25
*************************************************/

import { event } from "../../decorators/event";
import { inject } from "../../decorators/inject";
import { DropdownList } from "../common/DropdownList";
import { DropdownListGroup } from "../common/DropdownListGroup";
import { EventModule } from "../events/EventModule";
import { MainEvent } from "../events/MainEvent";
import { MainMenuPluginUI } from "./MainMenuPluginUI";

export class MainScene extends euix.Scene {
    @inject(euix.IUIManager)
    public uiManager: euix.IUIManager;
    @inject(egretx.IAudioManager)
    public audioManager: egretx.IAudioManager;
    @inject(egretx.IAnimationManager)
    public animationManager: egretx.IAnimationManager;
    @inject(egretx.IDragonBonesManager)
    public dragonBonesManager: egretx.IDragonBonesManager;
    public com_options: DropdownListGroup;
    public constructor() {
        super("resource/skins/main/MainSceneSkin.exml");
    }
    private dragonBody: egretx.Armature;
    public onOpen(): void {
        super.onOpen();
        //循环播放背景音乐
        this.audioManager.background.play("music_mp3", 0);
        this.uiManager.openUIWithLayer(MainMenuPluginUI, euix.UILayerID.Layer_4_SceneFrame);
        this.com_options.popupItemHeight = 30;
        this.com_options.source = [
            { selectedIndex: 0, source: DropdownList.toSource(["学校一", "学校二", "学校三"]) },
            { selectedIndex: 1, source: DropdownList.toSource(["六年级", "七年级", "八年级", "九年级"]) },
            { selectedIndex: 2, source: DropdownList.toSource(["学号1号", "学号2号", "学号3号", "学号4号", "学号5号"]) },
        ];
        let mc = this.animationManager.fetch("chunli", "test");
        mc.horizontalCenter = 0;
        mc.verticalCenter = 0;
        this.addChild(mc);
        mc.play(-1, "attack");

        this.createDragonBones();

    }

    private async createDragonBones(): Promise<void> {
        this.dragonBody = this.dragonBonesManager.fetch("dragon_boy", "DragonBoy");
        await this.dragonBody.createArmature();
        if (this.dragonBody.display) {
            this.dragonBody.display.x = this.dragonBody.display.y = 480;
            this.dragonBody.setParent(this);
            this.dragonBody.armature.animation.play("walk");
        }
    }

    @event(MainEvent.PLAY_ANIMATION, EventModule.MAIN)
    public playAnimation(event: egret.Event): void {
        let animationName: string = event.data;
        if (animationName && this.dragonBody && this.dragonBody.armature) {
            this.dragonBody.armature.animation.play(animationName);
        }
    }
    @event(MainEvent.RELEASE_DRAGONBONES, EventModule.MAIN)
    public releaseDragonBones(event: egret.Event): void {
        if (this.dragonBody) {
            this.dragonBonesManager.recycle(this.dragonBody);
            this.dragonBody = null;
        }
        this.dragonBonesManager.releases();
    }
    public onSceneChanging(): void {
        super.onSceneChanging();
    }
}