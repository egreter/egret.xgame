/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-18
*************************************************/

module fui {
    export class FGUIProvider extends xgame.XObject implements xgame.IServiceProvider {
        public constructor(private main: egret.DisplayObjectContainer) {
            super();
        }
        public priority: number = 100;
        public async onInit(game: xgame.IXGame): Promise<boolean> {
            return true;
        }
        public async onStart(game: xgame.IXGame): Promise<boolean> {
            game.getService<ITouchManagerInternal>(ITouchManagerInternal).initialize();
            game.getService<IUIManagerInternal>(IUIManagerInternal).initialize();
            return true;
        }
        public onServiceRegister(game: xgame.IXGame): void {
            game.singleton(ITouchManager, TouchManager).withInstance(new TouchManager(this.main)).setAlias(ITouchManagerInternal);
            console.log("[FGUIProvider]: 注册管理器{0}".format(xgame.getQualifiedClassName(TouchManager)));
            game.singleton(IUIManager, UIManager).withInstance(new UIManager(this.main)).setAlias(IUIManagerInternal);
            console.log("[FGUIProvider]: 注册管理器{0}".format(xgame.getQualifiedClassName(UIManager)));
        }
    }
}