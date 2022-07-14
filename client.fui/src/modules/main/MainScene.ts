/*
 * @Author: rontian i@ronpad.com
 * @Date: 2022-07-13 09:30:47
 * @LastEditors: rontian i@ronpad.com
 * @LastEditTime: 2022-07-13 10:39:57
 * @FilePath: /xgame.core/Users/rontian/Documents/Spaces/Egret/XGamePackage/egret.xgame/client.fui/src/modules/main/MainScene.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-25
*************************************************/

import { event } from "../../decorators/event";
import { inject } from "../../decorators/inject";
import { EventModule } from "../events/EventModule";
import { MainEvent } from "../events/MainEvent";
import { MainMenuPluginUI } from "./MainMenuPluginUI";

export class MainScene extends fui.Scene<fairygui.GObject> {
    @inject(fui.IUIManager)
    public uiManager: fui.IUIManager;
    @inject(egretx.IAudioManager)
    public audioManager: egretx.IAudioManager;
    @inject(egretx.IAnimationManager)
    public animationManager: egretx.IAnimationManager;
    @inject(egretx.IDragonBonesManager)
    public dragonBonesManager: egretx.IDragonBonesManager;
    public constructor() {
        super("demo", "MainScene");
    }
    private dragonBody: egretx.Armature;
    public onOpen(): void {
        super.onOpen();
        //循环播放背景音乐
        this.audioManager.background.play("music_mp3", 0);
        this.uiManager.openUIWithLayer(MainMenuPluginUI, fui.UILayerID.Layer_4_SceneFrame);
        let mc = this.animationManager.fetch("chunli", "test");
        mc.x = 220;
        mc.y = 480;
        (this.view.displayObject as egret.DisplayObjectContainer).addChild(mc);
        mc.play(-1, "attack");

        this.createDragonBones();

    }

    private async createDragonBones(): Promise<void> {
        this.dragonBody = this.dragonBonesManager.fetch("dragon_boy", "DragonBoy");
        await this.dragonBody.createArmature();
        if (this.dragonBody.display) {
            this.dragonBody.display.x = this.dragonBody.display.y = 480;
            this.dragonBody.setParent(this.view.displayObject as egret.DisplayObjectContainer);
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