/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-04
*************************************************/
module egretx {
    /**
     * 资源管理器
     */
    export class ResourceManager extends xgame.Singleton implements IResourceManager, IResourceManagerInternal {
        public static DEBUG: boolean = true;
        public readonly groups = new xgame.Dictionary<string, ResourceGroup<any>>();
        public constructor() {
            super();
        }
        public initialize(): void {
            this.groups.add(ResourceType.MovieClip, new MovieClipResourceGroup(this));
            this.groups.add(ResourceType.DragonBones, new DragonBonesResourceGroup(this));
        }
        public getOrCreateGroup<T>(name: string, factory?: () => ResourceGroup<T>): ResourceGroup<T> {
            let group = this.groups.get(name);
            if (!group && factory) {
                group = factory();
                this.groups.add(name, group);
            }
            return group;
        }
        private loadQueues = new xgame.Dictionary<string, ILoader>();
        public async loadResAsync(key: string): Promise<any> {
            if (!RES.hasRes(key)) {
                throw new Error("资源配置:{0}找不到".format(key));
            }
            if (RES.getRes(key)) {
                return RES.getRes(key);
            }
            let loader: ILoader;
            if (!this.loadQueues.containsKey(key)) {
                loader = { key: key, deferred: new xgame.Deferred<any>() };
                this.loadQueues.add(key, loader);
                RES.getResAsync(key).then(() => {
                    loader = this.loadQueues.remove(key);
                    loader.deferred.resolve(RES.getRes(key));
                });
            }
            else {
                loader = this.loadQueues.get(key);
            }
            return loader.deferred.promise;
        }

        public destroyRes(key: string): boolean {
            if (RES.getRes(key)) {
                if (ResourceManager.DEBUG) {
                    console.log("ResourceManager.destroyRes({0})".format(key));
                }
                return RES.destroyRes(key, true);
            }
            return false;
        }
    }
}