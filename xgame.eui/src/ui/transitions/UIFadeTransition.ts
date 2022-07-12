/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-01-26
*************************************************/
module euix {
    export class UIFadeTransition extends xgame.XObject implements IUITransition {
        public constructor(protected duration: number = 500) {
            super();
        }
        public start(ui: egret.DisplayObject, fadeOut: boolean = false): Promise<void> {
            return new Promise((resolve, reject) => {
                egret.Tween.removeTweens(ui);
                let from: number = 0;
                let to: number = 1;
                let ease = egret.Ease.cubicOut;
                if (fadeOut) {
                    from = 1;
                    to = 0;
                    ease = egret.Ease.cubicIn;
                }
                ui.alpha = from;
                let tw = egret.Tween.get(ui);
                tw.to({ alpha: to }, this.duration, ease).call(() => {
                    resolve();
                });
            });
        }
    }
}