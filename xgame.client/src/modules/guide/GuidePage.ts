/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-08
*************************************************/
/// <reference path="./GuideArrow.ts" />

module ro {
    export interface IGuideParams {
        target: egret.DisplayObject;
        taskID: number;
        index: number;
        tips?: string;
        guideType: egretx.GuideTaskType;
    }
    let target_bounds = new egret.Rectangle();
    export class GuidePage extends egretx.PluginPage {
        public static NAME: string = "GuidePage";
        public com_arrow: GuideArrow;
        private g_hit: eui.Group;
        private bitmap: egret.Bitmap;
        public constructor(public params: IGuideParams) {
            super("resource/skins/guide/GuidePageSkin.exml");
            this.left = this.right = this.top = this.bottom = 0;
        }
        public onInit(): void {
            super.onInit();
            this.uiManager.stage.addEventListener(egret.Event.RESIZE, this.onStageResizeHandler, this);
        }
        public onClose(): void {
            if (this.bitmap && this.bitmap.texture) {
                this.bitmap.texture.dispose();
                this.bitmap.texture = undefined;
            }
            this.uiManager.stage.removeEventListener(egret.Event.RESIZE, this.onStageResizeHandler, this);
            super.onClose();
        }
        private onStageResizeHandler(): void {
            this.com_arrow.visible = false;
            egret.setTimeout(() => {
                this.placeWithTarget();
            }, this, 100);
        }
        public onOpen(): void {
            super.onOpen();
            if (this.params.guideType == egretx.GuideTaskType.Force) {
                this.bitmap = new egret.Bitmap();
                this.bitmap.pixelHitTest = true;
                this.bitmap.touchEnabled = true;
                this.addChildAt(this.bitmap, 1);
                this.addClick(this.bitmap, () => {
                    egretx.tips("不要乱点哦，请跟着引导指示进行操作!");
                }, this);
            }
            else {
                this.touchChildren = false;
                this.touchEnabled = false;
            }
            if (this.params.tips) {
                this.com_arrow.setTips(this.params.tips);
            }
            this.placeWithTarget();

        }
        private shape: egret.Shape;
        protected placeWithTarget(): void {
            let gap = 10;
            let com_arrow = this.com_arrow;
            let target = this.params.target;
            let stage = this.uiManager.stage;
            let screenWidth = stage.stageWidth;
            let screenHeight = stage.stageHeight;
            target.getTransformedBounds(this, target_bounds);
            let hw = target.width * target.scaleX;
            let hh = target.height * target.scaleY;
            let tw = this.com_arrow.width;
            let th = this.com_arrow.height;
            let left = target_bounds.x;
            let top = target_bounds.y;
            let right = left + hw;
            let bottom = top + hh;
            if (this.params.guideType == egretx.GuideTaskType.Force) {
                if (!this.shape) {
                    this.shape = new egret.Shape();
                    this.shape.blendMode = egret.BlendMode.ERASE;
                    this.g_hit.addChild(this.shape);
                }
                this.shape.graphics.clear();
                this.shape.x = left;
                this.shape.y = top;
                this.shape.graphics.beginFill(0xFF0000, 1);
                this.shape.graphics.drawRect(0, 0, hw, hh);
                this.shape.graphics.endFill();

                let renderTexture: egret.RenderTexture = new egret.RenderTexture();
                renderTexture.drawToTexture(this.g_hit);
                if (this.bitmap.texture) {
                    this.bitmap.texture.dispose();
                    this.bitmap.texture = undefined;
                }
                this.bitmap.texture = renderTexture;
            }

            //尝试放置到下边
            if (screenHeight - bottom - 2 * gap >= th) {
                com_arrow.y = bottom + gap;
                com_arrow.x = left + hw / 2 - tw / 2;
                let offset = 0;
                if (com_arrow.x < 0) {
                    offset = com_arrow.x;
                    com_arrow.x = 0;
                }
                else if (com_arrow.x + tw > screenWidth) {
                    offset = com_arrow.x + tw - screenWidth;
                    com_arrow.x = screenWidth - tw;
                }
                com_arrow.setDirection(egretx.UIDirection.BOTTOM, offset);
            }
            //尝试放置到上边
            else if (top - 2 * gap >= th) {
                com_arrow.y = top - gap - th;
                com_arrow.x = left + hw / 2 - tw / 2;
                let offset = 0;
                if (com_arrow.x < 0) {
                    offset = com_arrow.x;
                    com_arrow.x = 0;
                }
                else if (com_arrow.x + tw > screenWidth) {
                    offset = com_arrow.x + tw - screenWidth;
                    com_arrow.x = screenWidth - tw;
                }
                com_arrow.setDirection(egretx.UIDirection.TOP, offset);
            }
            com_arrow.visible = true;
        }
    }
}