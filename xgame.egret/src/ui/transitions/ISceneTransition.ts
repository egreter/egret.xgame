/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-01-26
*************************************************/
module egretx {
    export let ISceneTransition = Symbol.for("ISceneTransition");
    export interface ISceneTransition extends xgame.IXObject {
        start(scene: egret.DisplayObject): Promise<void>;
    }
}