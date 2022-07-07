/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-20
*************************************************/

/// <reference path="./interfaces/IServiceProvider.ts" />
/// <reference path="./XGameExtensions.ts" />


module xgame {
    @impl(IServiceProvider)
    export class XProvider extends XObject implements IServiceProvider {
        public constructor() {
            super();
        }
        public priority: number = 99999;
        public async onInit(game: IXGame): Promise<boolean> {
            return true;
        }
        public async onStart(game: IXGame): Promise<boolean> {
            game.getService<IXTaskManagerInternal>(IXTaskManagerInternal).initialize();
            game.getService<IPlayableManagerInternal>(IPlayableManagerInternal).initialize();
            return true;
        }
        public onServiceRegister(game: IXGame): void {
            //注册实用类
            game.singleton(IDateTimeManager, DateTimeManager).withInstance(DateTimeManager.Instance());
            console.log("[XProvider]: 注册管理器{0}".format(getQualifiedClassName(DateTimeManager)));
            game.singleton(IPoolManager, PoolManager).withInstance(PoolManager.Instance());
            console.log("[XProvider]: 注册管理器{0}".format(getQualifiedClassName(PoolManager)));
            game.singleton(IEventManager, EventManager).withInstance(EventManager.Instance());
            console.log("[XProvider]: 注册管理器{0}".format(getQualifiedClassName(EventManager)));
            game.singleton(ISchedulerManager, SchedulerManager).withInstance(SchedulerManager.Instance());
            console.log("[XProvider]: 注册管理器{0}".format(getQualifiedClassName(SchedulerManager)));
            game.singleton(IXTaskManager, XTaskManager).withInstance(XTaskManager.Instance()).setAlias(IXTaskManagerInternal);
            console.log("[XProvider]: 注册管理器{0}".format(getQualifiedClassName(XTaskManager)));
            game.singleton(IPlayableManager, PlayableManager).withInstance(PlayableManager.Instance()).setAlias(IPlayableManagerInternal);
            console.log("[XProvider]: 注册管理器{0}".format(getQualifiedClassName(PlayableManager)));
        }
    }
}