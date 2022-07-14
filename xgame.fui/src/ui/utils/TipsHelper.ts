/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-17
*************************************************/
/// <reference path="../structs/UIDirection.ts" />
/// <reference path="../structs/UIAlign.ts" />

module fui {
    let hud_bounds = new egret.Rectangle();
    let tips_bounds = new egret.Rectangle();
    export class TipsHelper {
        public static placeTipsWithHUD(tips: Popup<fairygui.GObject>, hud: fairygui.GObject, gap: number = 10): void {
            let uiManager = xgame.that.getService<IUIManager>(IUIManager);
            let stage = uiManager.stage;
            let direction = tips.uiDirection;
            let align = tips.uiAlign;
            let screenWidth = stage.stageWidth;
            let screenHeight = stage.stageHeight;
            tips.view.displayObject.getBounds(tips_bounds, true);
            hud.displayObject.getTransformedBounds(tips.view.parent.displayObject, hud_bounds);
            let hw = hud.width * hud.scaleX;
            let hh = hud.height * hud.scaleY;
            let tw = tips.view.width;
            let th = tips.view.height;
            let left = hud_bounds.x;
            let top = hud_bounds.y;
            let right = left + hw;
            let bottom = top + hh;
            //尝试放置到下边
            if (tips.allowUIDirection(UIDirection.BOTTOM) && ((screenHeight - bottom - 2 * gap >= th && direction == UIDirection.ANY) || direction == UIDirection.BOTTOM)) {
                tips.view.y = bottom + gap;
                if (align == UIAlign.LEFT) {
                    tips.view.x = left;
                }
                else if (align == UIAlign.RIGHT) {
                    tips.view.x = right - tw;
                }
                else {
                    tips.view.x = left + hw / 2 - tw / 2;
                }
                tips.fixedUIDirection(UIDirection.BOTTOM);
            }
            //尝试放置到上边
            else if (tips.allowUIDirection(UIDirection.TOP) && ((top - 2 * gap >= th && direction == UIDirection.ANY) || direction == UIDirection.TOP)) {
                tips.view.y = top - gap - th;
                if (align == UIAlign.LEFT) {
                    tips.view.x = left;
                }
                else if (align == UIAlign.RIGHT) {
                    tips.view.x = right - tw;
                }
                else {
                    tips.view.x = left + hw / 2 - tw / 2;
                }
                tips.fixedUIDirection(UIDirection.TOP);
            }
            //尝试放置到右边
            else if (tips.allowUIDirection(UIDirection.RIGHT) && ((screenWidth - right - 2 * gap >= tw && direction == UIDirection.ANY) || direction == UIDirection.RIGHT)) {
                tips.view.x = right + gap;
                if (align == UIAlign.TOP) {
                    tips.view.y = top;
                }
                else if (align == UIAlign.BOTTOM) {
                    tips.view.y = top + hh - th;
                }
                else {
                    tips.view.y = top + hh / 2 - th / 2;
                }
                tips.fixedUIDirection(UIDirection.RIGHT);
            }
            //尝试放置到左边
            else if (tips.allowUIDirection(UIDirection.LEFT) && ((left - 2 * gap >= tw && direction == UIDirection.ANY) || direction == UIDirection.LEFT)) {
                tips.view.x = left - gap - tw;
                if (align == UIAlign.TOP) {
                    tips.view.y = top;
                }
                else if (align == UIAlign.BOTTOM) {
                    tips.view.y = top + hh - th;
                }
                else {
                    tips.view.y = top + hh / 2 - th / 2;
                }
                tips.fixedUIDirection(UIDirection.LEFT);
            }
            tips.view.x += tips.offset.x;
            tips.view.y += tips.offset.y;
            tips.view.visible = true;
        }
    }
}