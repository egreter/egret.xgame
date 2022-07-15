/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-18
*************************************************/
/// <reference path="./ui/interfaces/IUIManager.ts" />
/// <reference path="./ui/interfaces/IUIManagerInternal.ts" />

module euix {
    export class EUIProvider extends xgame.XObject implements xgame.IServiceProvider {
        public constructor(private main: egret.DisplayObjectContainer) {
            super();
        }
        public priority: number = 100;
        public async onInit(game: xgame.IXGame): Promise<boolean> {
            return true;
        }
        public async onStart(game: xgame.IXGame): Promise<boolean> {
            game.getService<IUIManagerInternal>(IUIManagerInternal).initialize();
            game.getService<ITouchManagerInternal>(ITouchManagerInternal).initialize();
            return true;
        }
        public onServiceRegister(game: xgame.IXGame): void {
            game.singleton(IUIManager, UIManager).withInstance(new UIManager(this.main)).setAlias(IUIManagerInternal);
            console.log("[EUIProvider]: 注册管理器{0}".format(xgame.getQualifiedClassName(UIManager)));
            game.singleton(ITouchManager, TouchManager).withInstance(new TouchManager(this.main)).setAlias(ITouchManagerInternal);
            console.log("[EUIProvider]: 注册管理器{0}".format(xgame.getQualifiedClassName(TouchManager)));
        }
    }
}