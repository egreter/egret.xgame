/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-01-26
*************************************************/
module egretx {
    export interface IUITransition extends xgame.IXObject {
        start(ui: egret.DisplayObject, fadeOut?: boolean): Promise<void>;
    }
}