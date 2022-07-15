/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-19
*************************************************/
module fui {
    export interface ITouchHandler {
        listeners: xgame.Signal1<egret.TouchEvent>;
        happend?: boolean;
        identifier?: number;
        time?: number;
    }
}