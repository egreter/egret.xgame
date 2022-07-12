/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-27
*************************************************/
/// <reference path="./ISceneTransition.ts" />
/// <reference path="../interfaces/IUIManager.ts" />


module euix {
    @xgame.impl(ISceneTransition)
    export class SceneTransition extends xgame.XObject implements ISceneTransition {
        @xgame.inject(IUIManager)
        public uiManager: IUIManager;
        public constructor() {
            super();
            xgame.injectInstance(this);
        }
        public async start(scene: egret.DisplayObject): Promise<void> {

        }
    }
}