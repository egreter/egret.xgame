/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-01-26
*************************************************/
module egretx {
    export class UIScaleTransition extends xgame.XObject implements IUITransition {
        public constructor(protected duration: number = 300) {
            super();
        }
        public start(ui: egret.DisplayObject, fadeOut: boolean = false): Promise<void> {
            return new Promise((resolve, reject) => {
                egret.Tween.removeTweens(ui);
                let from: number = 0;
                let to: number = ui.scaleX;
                let ease = egret.Ease.backOut;
                if (fadeOut) {
                    from = ui.scaleX;
                    to = 0;
                    ease = egret.Ease.backIn;
                }
                ui.scaleX = ui.scaleY = from;
                let tw = egret.Tween.get(ui);
                tw.to({ scaleX: to, scaleY: to }, this.duration, ease).call(() => {
                    resolve();
                });
            });
        }
    }
}