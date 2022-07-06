/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-05
*************************************************/
module egretx {
    export let IAnimationManager = Symbol.for("IAnimationManager");
    export interface IAnimationManager extends xgame.IXObject {
        /**
         * 从对象池中取出一个动画
         * @param key 
         * @param movieClipName 
         */
        fetch(key: string, movieClipName?: string): AnimationClip;
        /**
         * 回收动画对象
         * @param clip 
         */
        recycle(clip: AnimationClip): void;
        /**
         * 释放指定的动画对象及资源
         * @param key 
         */
        release(key: string): void;
        /**
         * 释放全部可以释放的动画对象及资源
         */
        releases(): void;
        /**
         * 根据key获取动画相关资源，默认动画文件前缀相同
         * @param key 
         * @returns 
         */
        getRes(key: string): IRes;
        /**
         * 构建动画帧数据
         * @param key 
         * @param movieClipName 
         * @returns 
         */
        generateMovieClipData(key: string, movieClipName?: string): egret.MovieClipData;
    }
}