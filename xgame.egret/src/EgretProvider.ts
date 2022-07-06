/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-18
*************************************************/
/// <reference path="./ui/interfaces/IUIManager.ts" />
/// <reference path="./ui/interfaces/IUIManagerInternal.ts" />

module egretx {
    export class EgretProvider extends xgame.XObject implements xgame.IServiceProvider {
        public constructor(private main: egret.DisplayObjectContainer) {
            super();
        }
        public priority: number = 100;
        public async onInit(game: xgame.IXGame): Promise<boolean> {
            return true;
        }
        public async onStart(game: xgame.IXGame): Promise<boolean> {
            game.getService<IDragonBonesManagerInternal>(IDragonBonesManagerInternal).initialize();
            game.getService<IAnimationManagerInternal>(IAnimationManagerInternal).initialize();
            game.getService<ITimelineManagerInternal>(ITimelineManagerInternal).initialize();
            game.getService<IAudioManagerInternal>(IAudioManagerInternal).initialize();
            game.getService<IResourceManagerInternal>(IResourceManagerInternal).initialize();
            game.getService<IHttpManagerInternal>(IHttpManagerInternal).initialize();
            game.getService<ISocketManagerInternal>(ISocketManagerInternal).initialize();
            game.getService<IUIManagerInternal>(IUIManagerInternal).initialize();
            game.getService<ITouchManagerInternal>(ITouchManagerInternal).initialize();
            return true;
        }
        public onServiceRegister(game: xgame.IXGame): void {
            game.singleton(IDragonBonesManager, DragonBonesManager).withInstance(DragonBonesManager.Instance()).setAlias(IDragonBonesManagerInternal);
            console.log("[EgretProvider]: 注册管理器{0}".format(xgame.getQualifiedClassName(DragonBonesManager)));
            game.singleton(IAnimationManager, AnimationManager).withInstance(AnimationManager.Instance()).setAlias(IAnimationManagerInternal);
            console.log("[EgretProvider]: 注册管理器{0}".format(xgame.getQualifiedClassName(AnimationManager)));
            game.singleton(ITimelineManager, TimelineManager).withInstance(TimelineManager.Instance()).setAlias(ITimelineManagerInternal);
            console.log("[EgretProvider]: 注册管理器{0}".format(xgame.getQualifiedClassName(TimelineManager)));
            game.singleton(IAudioManager, AudioManager).withInstance(AudioManager.Instance()).setAlias(IAudioManagerInternal);
            console.log("[EgretProvider]: 注册管理器{0}".format(xgame.getQualifiedClassName(AudioManager)));
            game.singleton(IResourceManager, ResourceManager).withInstance(ResourceManager.Instance()).setAlias(IResourceManagerInternal);
            console.log("[EgretProvider]: 注册管理器{0}".format(xgame.getQualifiedClassName(ResourceManager)));
            game.singleton(IHttpManager, HttpManager).withInstance(HttpManager.Instance()).setAlias(IHttpManagerInternal);
            console.log("[EgretProvider]: 注册管理器{0}".format(xgame.getQualifiedClassName(HttpManager)));
            game.singleton(ISocketManager, SocketManager).withInstance(SocketManager.Instance()).setAlias(ISocketManagerInternal);
            console.log("[EgretProvider]: 注册管理器{0}".format(xgame.getQualifiedClassName(SocketManager)));
            game.singleton(IUIManager, UIManager).withInstance(new UIManager(this.main)).setAlias(IUIManagerInternal);
            console.log("[EgretProvider]: 注册管理器{0}".format(xgame.getQualifiedClassName(UIManager)));
            game.singleton(ITouchManager, TouchManager).withInstance(new TouchManager(this.main)).setAlias(ITouchManagerInternal);
            console.log("[EgretProvider]: 注册管理器{0}".format(xgame.getQualifiedClassName(TouchManager)));
        }
    }
}