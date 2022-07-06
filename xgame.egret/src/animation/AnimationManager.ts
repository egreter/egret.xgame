/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-05
*************************************************/
module egretx {
    /**
     * 帧动画管理器
     */
    export class AnimationManager extends xgame.Singleton implements IAnimationManager, IAnimationManagerInternal {
        //当前正在播放的动画对象集
        public readonly playingClips = new xgame.Dictionary<number, AnimationClip>();
        public constructor() {
            super();
        }
        public initialize(): void {

        }
        public readonly pools = new xgame.PoolGroup<AnimationClip>("AnimationClip");
        /**
         * 从对象池中取出一个动画
         * @param key 
         * @param movieClipName 
         */
        public fetch(key: string, movieClipName?: string): AnimationClip {
            movieClipName = movieClipName || key;
            const id: string = "{0}:{1}".format(key, movieClipName);
            let clip = this.pools.fetch(id, AnimationClip, () => new AnimationClip(key, movieClipName), this);
            this.playingClips.add(clip.hashCode, clip);
            return clip;
        }
        /**
         * 回收动画对象
         * @param clip 
         */
        public recycle(clip: AnimationClip): void {
            this.playingClips.remove(clip.hashCode);
            const id: string = "{0}:{1}".format(clip.key, clip.movieClipname);
            this.pools.recycle(id, AnimationClip, clip);
        }
        /**
         * 释放指定的动画对象及资源
         * @param key 
         */
        public release(key: string): void {
            let pools = this.pools.pools;
            pools.forKeys((id: string) => {
                let id_list: string[] = id.split(":");
                if (id_list[0] == key) {
                    this._release(id);
                }
            }, this, true);

        }
        private _release(id: string): void {
            if (this.pools.getPool(id, AnimationClip).expired) {
                this.pools.release(id, AnimationClip);
                const key = id.split(":")[0];
                if (this.factories.containsKey(key)) {
                    this.factories.remove(key);
                    console.log("AnimationManager.clearMovieClipDataFactory({0})".format(key));
                }
                ResourceManager.Instance().getOrCreateGroup(ResourceType.MovieClip).release(key);
            }
        }
        /**
         * 释放全部可以释放的动画对象及资源
         */
        public releases(): void {
            let pools = this.pools.pools;
            pools.forKeys((id: string) => {
                this._release(id);
            }, this, true);
        }
        /**
         * 根据key获取动画相关资源，默认动画文件前缀相同
         * @param key 
         * @returns 
         */
        public getRes(key: string): IRes {
            let res = <IRes>{};
            res.json = key + "_json";
            res.texture = key + "_png";
            return res;
        }
        public readonly factories = new xgame.Dictionary<string, egret.MovieClipDataFactory>();
        /**
         * 构建动画帧数据
         * @param key 
         * @param movieClipName 
         * @returns 
         */
        public generateMovieClipData(key: string, movieClipName?: string): egret.MovieClipData {
            movieClipName = movieClipName || key;
            let res = this.getRes(key);
            if (!RES.hasRes(res.json) || !RES.hasRes(res.texture)) {
                console.warn("动画{0}的资源没有加载".format(key));
                return null;
            }
            let factory = this.factories.get(key);
            if (!factory) {
                factory = new egret.MovieClipDataFactory(RES.getRes(res.json), RES.getRes(res.texture));
                this.factories.add(key, factory);
            }
            movieClipName = movieClipName || key;
            return factory.generateMovieClipData(movieClipName);
        }
    }
}