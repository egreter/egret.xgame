/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-18
*************************************************/
declare namespace xgame {
    interface XGame {
        useEgret(main: egret.DisplayObjectContainer): void;
    }
}
declare module egretx {
    enum SBState {
        INVALID = 0,
        H_HEAD = 1,
        H_MID = 2,
        H_TAIL = 4,
        V_HEAD = 8,
        V_MID = 16,
        V_TAIL = 32,
    }
}
declare namespace eui {
    interface Group {
        onResizeChanged(): xgame.Signal0;
        onHS(): xgame.Signal1<egretx.SBState>;
        onVS(): xgame.Signal1<egretx.SBState>;
    }
    interface DataGroup {
        replaceAll(items: any[], reset?: boolean | number): void;
        scrollToIndex(index: number): void;
        setItemWidth(width: number): void;
        setItemHeight(height: number): void;
        getScroller(): eui.Scroller;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-18
*************************************************/
declare module egretx {
    class EgretProvider extends xgame.XObject implements xgame.IServiceProvider {
        private main;
        constructor(main: egret.DisplayObjectContainer);
        priority: number;
        onInit(game: xgame.IXGame): Promise<boolean>;
        onStart(game: xgame.IXGame): Promise<boolean>;
        onServiceRegister(game: xgame.IXGame): void;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-05
*************************************************/
declare module egretx {
    /**
     * 帧动画管理器
     */
    class AnimationManager extends xgame.Singleton implements IAnimationManager, IAnimationManagerInternal {
        readonly playingClips: xgame.Dictionary<number, AnimationClip>;
        constructor();
        initialize(): void;
        readonly pools: xgame.PoolGroup<AnimationClip>;
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
        private _release(id);
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
        readonly factories: xgame.Dictionary<string, egret.MovieClipDataFactory>;
        /**
         * 构建动画帧数据
         * @param key
         * @param movieClipName
         * @returns
         */
        generateMovieClipData(key: string, movieClipName?: string): egret.MovieClipData;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-05
*************************************************/
declare module egretx {
    /**
     * 帧动画剪辑
     */
    class AnimationClip extends eui.Component implements xgame.IPoolable {
        private $mc;
        readonly mc: MovieClip;
        key: string;
        movieClipname: string;
        actionName: string;
        protected data: egret.MovieClipData;
        protected frameActions: Array<FrameActionItem>;
        constructor(key: string, movieClipname?: string, actionName?: string);
        private $timeline;
        readonly timeline: string;
        setTimeline(value: string): void;
        fromPoolHashCode: number;
        release(): void;
        dispose(): void;
        private $frameRate;
        frameRate: number;
        private $timeScale;
        timeScale: number;
        private $scale;
        scale: number;
        private $mc_scaleX;
        mc_scaleX: number;
        private $mc_scaleY;
        mc_scaleY: number;
        addFrameAction(action: Function, thisObject?: any, frame?: number): void;
        removeFrameActions(frame?: number): void;
        private callback_preload;
        preload(): xgame.Signal0;
        playWithAutoRemove(actionName?: string): void;
        play(playTimes?: number, actionName?: string): void;
        protected loadMC(is_preload?: boolean): Promise<void>;
        private onFrameLabelEvent(event);
        private onLoopCompleteEvent(event);
        private onCompleteEvent(event);
        initMC(mcData: egret.MovieClipData, is_preload?: boolean): void;
        private $playTimes;
        protected _play(): void;
        stop(): void;
        reset(): void;
        removeSelf(): void;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-05
*************************************************/
declare module egretx {
    class FrameAction {
        name: string;
        private $items;
        private $frame;
        once: boolean;
        frame: number;
        constructor(frame?: number);
        protected hasAction(action: Function, thisObject?: any): number;
        addAction(action: Function, thisObject?: any): void;
        removeAction(action: Function, thisObject?: any): void;
        removeActions(): void;
        executeActions(target: MovieClip, frameID: number): void;
        readonly numActions: number;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-05
*************************************************/
declare module egretx {
    class FrameActionItem {
        action: Function;
        thisObject: any;
        frame: number;
        constructor(action: Function, thisObject?: any, frame?: number);
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-05
*************************************************/
declare module egretx {
    /**
     * 从egret.MoveClip修改而来
     */
    class MovieClip extends egret.DisplayObject implements xgame.IAnimatable {
        static DISPATCH_ENABLE: boolean;
        private $actions;
        frameAction: FrameAction;
        private $timeline;
        readonly timeline: string;
        setTimeline(value: string): void;
        $texture: egret.Texture;
        private offsetPoint;
        $movieClipData: egret.MovieClipData;
        /**
         * @private
         */
        private frames;
        /**
         * @private
         */
        $totalFrames: number;
        /**
         * @version Egret 2.4
         * @platform Web,Native
         * @private
         */
        frameLabels: any[];
        /**
         * @private
         */
        $frameLabelStart: number;
        /**
         * @private
         */
        $frameLabelEnd: number;
        /**
         * @version Egret 2.4
         * @platform Web,Native
         * @private
         */
        frameEvents: any[];
        /**
         * @private
         */
        private frameIntervalTime;
        /**
         * @private
         */
        $eventPool: string[];
        $isPlaying: boolean;
        /**
         * @private
         */
        private isStopped;
        /**
         * @private
         */
        private playTimes;
        /**
         * @private
         */
        $currentFrameNum: number;
        /**
         * @private
         */
        $nextFrameNum: number;
        /**
         * @private
         */
        private displayedKeyFrameNum;
        /**
         * @private
         */
        private passedTime;
        /**
         * @private
         */
        private $frameRate;
        private invokeActions;
        /**
         * 创建新的 MovieClip 实例。创建 MovieClip 之后，调用舞台上的显示对象容器的addElement方法。
         * @param movieClipData {movieClipData} 被引用的 movieClipData 对象
         * @version Egret 2.4
         * @platform Web,Native
         */
        constructor(movieClipData?: egret.MovieClipData, invokeActions?: Array<FrameActionItem>);
        setData(movieClipData?: egret.MovieClipData, invokeActions?: FrameActionItem[]): void;
        setInvokeActions(invokeActions: FrameActionItem[]): void;
        private $timeScale;
        timeScale: number;
        protected createNativeDisplayObject(): void;
        /**
         * @private
         */
        $smoothing: boolean;
        /**
         * Whether or not is smoothed when scaled.
         * @version Egret 3.0
         * @platform Web
         * @language en_US
         */
        /**
         * 控制在缩放时是否进行平滑处理。
         * @version Egret 3.0
         * @platform Web
         * @language zh_CN
         */
        smoothing: boolean;
        /**
         * @private
         *
         */
        $init(): void;
        private fillMovieFrames();
        /**
         * @private
         *
         */
        $reset(): void;
        /**
         * @private
         *
         */
        private _initFrame();
        /**
         * @private
         */
        $updateRenderNode(): void;
        /**
         * @private
         */
        $measureContentBounds(bounds: egret.Rectangle): void;
        /**
         * @private
         *
         * @param stage
         * @param nestLevel
         */
        $onAddToStage(stage: egret.Stage, nestLevel: number): void;
        /**
         * @private
         *
         */
        $onRemoveFromStage(): void;
        /**
         * @private
         * 返回帧标签为指定字符串的FrameLabel对象
         * @param labelName {string} 帧标签名
         * @param ignoreCase {boolean} 是否忽略大小写，可选参数，默认false
         * @returns {egret.FrameLabel} FrameLabel对象
         */
        private getFrameLabelByName(labelName, ignoreCase?);
        /**
         * @private
         * 根据帧标签，设置开始和结束的帧数
         * @param labelName {string} 帧标签名
         */
        private getFrameStartEnd(labelName);
        /**
         * @private
         * 返回指定序号的帧的FrameLabel对象
         * @param frame {number} 帧序号
         * @returns {egret.FrameLabel} FrameLabel对象
         */
        private getFrameLabelByFrame(frame);
        /**
         * @private
         * 返回指定序号的帧对应的FrameLabel对象，如果当前帧没有标签，则返回前面最近的有标签的帧的FrameLabel对象
         * @method egret.MovieClip#getFrameLabelForFrame
         * @param frame {number} 帧序号
         * @returns {egret.FrameLabel} FrameLabel对象
         */
        private getFrameLabelForFrame(frame);
        /**
         * 继续播放当前动画
         * @param playTimes {number} 播放次数。 参数为整数，可选参数，>=1：设定播放次数，<0：循环播放，默认值 0：不改变播放次数(MovieClip初始播放次数设置为1)，
         * @version Egret 2.4
         * @platform Web,Native
         */
        play(playTimes?: number): void;
        /**
         * 暂停播放动画
         * @version Egret 2.4
         * @platform Web,Native
         */
        stop(): void;
        /**
         * 将播放头移到前一帧并停止
         * @version Egret 2.4
         * @platform Web,Native
         */
        prevFrame(): void;
        /**
         * 跳到后一帧并停止
         * @version Egret 2.4
         * @platform Web,Native
         */
        nextFrame(): void;
        /**
         * 将播放头移到指定帧并播放
         * @param frame {any} 指定帧的帧号或帧标签
         * @param playTimes {number} 播放次数。 参数为整数，可选参数，>=1：设定播放次数，<0：循环播放，默认值 0：不改变播放次数，
         * @version Egret 2.4
         * @platform Web,Native
         */
        gotoAndPlay(frame: string | number, playTimes?: number): void;
        /**
         * 将播放头移到指定帧并停止
         * @param frame {any} 指定帧的帧号或帧标签
         * @version Egret 2.4
         * @platform Web,Native
         */
        gotoAndStop(frame: string | number): void;
        /**
         * @private
         *
         * @param frame
         */
        private gotoFrame(frame);
        /**
         * @private
         */
        private lastTime;
        advanceTime(time: number): void;
        /**
         * @private
         *
         */
        private advanceFrame();
        /**
         * @private
         *
         */
        private constructFrame();
        /**
         * @private
         *
         */
        $renderFrame(): void;
        /**
         * @private
         *
         */
        private handlePendingEvent();
        /**
         * MovieClip 实例中帧的总数
         * @version Egret 2.4
         * @platform Web,Native
         */
        readonly totalFrames: number;
        /**
         * MovieClip 实例当前播放的帧的序号
         * @version Egret 2.4
         * @platform Web,Native
         */
        readonly currentFrame: number;
        /**
         * MovieClip 实例当前播放的帧的标签。如果当前帧没有标签，则 currentFrameLabel返回null。
         * @version Egret 2.4
         * @platform Web,Native
         */
        readonly currentFrameLabel: string;
        /**
         * 当前播放的帧对应的标签，如果当前帧没有标签，则currentLabel返回包含标签的先前帧的标签。如果当前帧和先前帧都不包含标签，currentLabel返回null。
         * @version Egret 2.4
         * @platform Web,Native
         */
        readonly currentLabel: string;
        /**
         * MovieClip 实例的帧频
         * @version Egret 2.4
         * @platform Web,Native
         */
        frameRate: number;
        /**
         * MovieClip 实例当前是否正在播放
         * @version Egret 2.4
         * @platform Web,Native
         */
        readonly isPlaying: boolean;
        /**
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * MovieClip数据源
         */
        movieClipData: egret.MovieClipData;
        /**
         * @private
         *
         * @param value
         */
        private setMovieClipData(value, force?);
        /**
         * @private
         *
         * @param value
         */
        private setPlayTimes(value);
        /**
         * @private
         *
         * @param value
         */
        private setIsStopped(value);
        private getActionAt(frame);
        addFrameAction(frame: number, action: Function, thisObject?: any): void;
        removeFrameAction(frame: number, action: Function, thisObject?: any): void;
        removeFrameActions(frame?: number): void;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-05
*************************************************/
declare module egretx {
    let IAnimationManager: symbol;
    interface IAnimationManager extends xgame.IXObject {
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
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-05
*************************************************/
declare module egretx {
    let IAnimationManagerInternal: symbol;
    interface IAnimationManagerInternal {
        initialize(): void;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-04
*************************************************/
declare module egretx {
    /**
     * 音频管理器
     */
    class AudioManager extends xgame.Singleton implements IAudioManager, IAudioManagerInternal {
        /**
         * 创建音频播放器实例，默认使用WebAudio
         */
        createAudioInstance?: (type?: string) => Audio;
        /**
         * 重定向音频地址
         */
        redirectURL: (url: string) => string;
        constructor();
        /**
         * 背景音乐频道
         */
        background: MusicAudioChannel;
        /**
         * ui音频
         */
        ui: MusicAudioChannel;
        /**
         * 特效频道
         */
        effect: EffectAudioChannel;
        initialize(): void;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-04
*************************************************/
declare module egretx {
    enum AudioToggleState {
        OFF = 0,
        ON = 1,
    }
    /**
     * 音频频道
     */
    class AudioChannel extends xgame.XObject {
        channelType: AudioChannelType;
        constructor(channelType: AudioChannelType);
        protected callback_onPlayCompleted: xgame.Signal1<string>;
        onPlayCompleted(): xgame.Signal1<string>;
        private $toggleState;
        readonly toggleState: AudioToggleState;
        toggleOn(): void;
        toggleOff(): void;
        private $volume;
        readonly volume: number;
        setVolume(volume: number): void;
        protected key: string;
        protected playTimes: number;
        play(key: string, playTimes?: number): void;
        pause(): void;
        resume(): void;
        stop(): void;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-05
*************************************************/
declare module egretx {
    class EffectAudioChannel extends AudioChannel {
        static instanceMax: number;
        protected freeAudioes: Audio[];
        protected playAudioes: Audio[];
        constructor();
        play(key: string, playTimes?: number): void;
        pause(): void;
        resume(): void;
        stop(): void;
        private releaseAudio(audio);
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-05
*************************************************/
declare module egretx {
    class MusicAudioChannel extends AudioChannel {
        constructor();
        protected main: Audio;
        play(key: string, playTimes?: number): void;
        pause(): void;
        resume(): void;
        stop(): void;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-04
*************************************************/
declare module egretx {
    class Audio extends xgame.XObject {
        type: string;
        protected key: string;
        protected playTimes: number;
        constructor(type?: string);
        protected readonly info: RES.ResourceInfo;
        load(): Promise<boolean>;
        play(key: string, startTime?: number, playTimes?: number): Promise<void>;
        pause(): void;
        resume(): void;
        stop(): void;
        protected $volume: number;
        readonly volume: number;
        setVolume(volume: number): void;
        destroy(): void;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-04
*************************************************/
declare module egretx {
    enum AudioChannelType {
        BACKGORUND = 0,
        EFFECT = 1,
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-04
*************************************************/
declare module egretx {
    /**
     * 默认的音频播放器
     */
    class WebAudio extends Audio {
        private sound;
        private loadDeferred;
        constructor(type?: string);
        load(): Promise<boolean>;
        protected onIOError(event: egret.IOErrorEvent): void;
        protected onLoadComplete(event: egret.Event): void;
        protected soundChannel: egret.SoundChannel;
        private playDeferred;
        play(key: string, startTime?: number, playTimes?: number): Promise<void>;
        private _play(position);
        protected onSoundComplete(): void;
        position: number;
        private $isPaused;
        readonly isPaused: boolean;
        pause(): void;
        resume(): void;
        protected clearChannel(): void;
        stop(): void;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-04
*************************************************/
declare module egretx {
    let IAudioManager: symbol;
    interface IAudioManager extends xgame.IXObject {
        createAudioInstance?: (type?: string) => Audio;
        redirectURL: (url: string) => string;
        background: MusicAudioChannel;
        ui: MusicAudioChannel;
        effect: EffectAudioChannel;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-04
*************************************************/
declare module egretx {
    let IAudioManagerInternal: symbol;
    interface IAudioManagerInternal {
        initialize(): void;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-17
*************************************************/
declare module egretx {
    const event: typeof xgame.event;
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-17
*************************************************/
declare module egretx {
    const impl: typeof xgame.impl;
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-17
*************************************************/
declare module egretx {
    const inject: typeof xgame.inject;
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-17
*************************************************/
declare module egretx {
    const injectable: typeof xgame.injectable;
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-05
*************************************************/
declare module egretx {
    /**
     * 龙骨动画管理器
     */
    class DragonBonesManager extends xgame.Singleton implements IDragonBonesManager, IDragonBonesManagerInternal, xgame.IAnimatable {
        factory: dragonBones.EgretFactory;
        constructor();
        advanceTime(time: number): void;
        initialize(): void;
        readonly pools: xgame.PoolGroup<Armature>;
        fetch(key: string, armatureName: string, texture?: string): Armature;
        recycle(armature: Armature): void;
        release(key: string): void;
        private _release(id);
        releases(): void;
        addClock(armture: Armature): void;
        removeClock(armture: Armature): void;
        parseDragonBones(key: string, texture?: string): void;
        clearDragonBones(key: string, texture?: string): void;
        buildArmature(key: string, armtureName: string): dragonBones.Armature;
        getRes(key: string, texture?: string): IRes;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-06
*************************************************/
declare module egretx {
    class Armature extends xgame.XObject implements xgame.IPoolable {
        key: string;
        armatureName: string;
        texture: string;
        constructor(key: string, armatureName: string, texture?: string);
        readonly id: string;
        setParent(parent: egret.DisplayObjectContainer): void;
        removeSelf(): void;
        fromPoolHashCode: number;
        release(): void;
        dispose(): void;
        protected $armature: dragonBones.Armature;
        readonly armature: dragonBones.Armature;
        readonly display: egret.DisplayObject;
        createArmature(): Promise<void>;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-05
*************************************************/
declare module egretx {
    let IDragonBonesManager: symbol;
    interface IDragonBonesManager extends xgame.IXObject {
        fetch(key: string, armatureName: string, texture?: string): Armature;
        recycle(armature: Armature): void;
        release(key: string): void;
        releases(): void;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-05
*************************************************/
declare module egretx {
    let IDragonBonesManagerInternal: symbol;
    interface IDragonBonesManagerInternal {
        initialize(): void;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-08
*************************************************/
declare module egretx {
    class GuideManager extends xgame.Singleton implements IGuideManager, IGuideManagerInternal {
        guideHelper: IGuideHelper;
        readonly tasks: xgame.Dictionary<number, GuideTask>;
        private disposableGroup;
        private values;
        private completedIDList;
        constructor();
        /**
         * 初始化
         */
        initialize(): void;
        isCompleted(id: number): boolean;
        /**
         * 获取引导任务
         * @param id
         */
        getTask(id: number): GuideTask;
        /**
         * 获取引导步骤
         * @param id
         * @param index
         * @returns
         */
        getStep(id: number, index: number): GuideStep;
        /**
         * 添加引导任务
         * @param task
         * @returns
         */
        addTask(task: GuideTask): GuideTask;
        /**
         * 清除所有注入数据
         * @param taskID 如果提供了taskID，则只清除该taskID的数据
         */
        clearValues(taskID?: number): void;
        /**
         * 注入或移除引导数据
         * @param key
         * @param value
         * @param taskID
         */
        injectValue<T extends keyof IGuideInjectValue>(key: T, value: IGuideInjectValue[T], taskID?: number): void;
        /**
         * 移除注入数据
         * @param key
         * @param taskID
         */
        removeValue<T extends keyof IGuideInjectValue>(key: T, taskID?: number): void;
        /**
         * 获取管理器注入的数据
         * @param key
         * @param defaultValue
         * @param taskID
         */
        retrieveValue<T extends keyof IGuideInjectValue>(key: T, defaultValue?: IGuideInjectValue[T], taskID?: number): IGuideInjectValue[T];
        private isFirstClean;
        /**
         * 帧驱动
         */
        private advanceTime();
        private $activityTask;
        readonly activityTask: GuideTask;
        setActivityTask(value: GuideTask): void;
        private $isStarted;
        readonly isStarted: boolean;
        /**
         * 开始引导流程
         */
        start(): void;
        private $isPaused;
        readonly isPaused: boolean;
        /**
         * 暂停，只在当前空闲状态生效
         * @returns
         */
        pause(): void;
        /**
         * 恢复，只在当前空闲状态生效
         * @returns
         */
        resume(): void;
        /**
         * 强制取消当前引导任务，如果成功，将暂停引导流程
         */
        cancelActiveTask(): boolean;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-08
*************************************************/
declare module egretx {
    enum GuideStepState {
        Ready = 0,
        Running = 1,
        Completed = 2,
    }
    class GuideStep extends xgame.XObject implements xgame.IDisposable {
        parent: GuideTask;
        index: number;
        params: IGuideStepParams;
        checkBegin: () => boolean;
        checkComplete: () => boolean;
        /**
         * @param parent 所属引导任务
         * @param index 第几步
         */
        constructor(parent: GuideTask, index: number, params: IGuideStepParams);
        readonly taskID: number;
        readonly target: keyof IGuideInjectValue;
        readonly tips: string;
        private $state;
        readonly state: GuideStepState;
        /**
         * 设置状态
         * @param value
         */
        setState(value: GuideStepState): void;
        /**
         * 状态重置
         */
        reset(): void;
        /**
         * 更新，只要引导未完成，都会调用此方法
         */
        advanceTime(): void;
        /**
         * 释放
         */
        dispose(): void;
        /**
         * 当步骤开始时
         */
        onBegin(): void;
        /**
         * 当步骤完成时
         */
        onComplete(): void;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-08
*************************************************/
declare module egretx {
    enum GuideTaskState {
        Ready = 0,
        Running = 1,
        Completed = 2,
    }
    enum GuideTaskType {
        Weak = 0,
        Force = 1,
    }
    interface IGuideStepParams {
        target: keyof IGuideInjectValue;
        checkBegin: () => boolean;
        checkComplete: () => boolean;
        tips?: string;
    }
    class GuideTask extends xgame.XObject implements xgame.IDisposable {
        ID: number;
        taskType: GuideTaskType;
        frontID: number;
        private values;
        readonly steps: xgame.Dictionary<number, GuideStep>;
        /**
         * 构造函数
         * @param ID 任务id
         * @param taskType 引导类型
         * @param frontID 前置引导ID，如果设置刚需要等待前置引导完成才能开始
         */
        constructor(ID: number, taskType?: GuideTaskType, frontID?: number);
        getStep(index: number): GuideStep;
        addStep(step: GuideStep): void;
        addStep(params: IGuideStepParams): void;
        /**
         * 当前激活的引导步骤
         */
        private $activeIndex;
        readonly activeIndex: number;
        setActiveIndex(value: number): void;
        /**
         * 当任务被添加到队列时
         */
        onInit(): void;
        /**
         * 检查引导任务是不是已经完成需要移除
         * @returns
         */
        checkRemoveWithCompleted(): boolean;
        /**
         * 如果引导未开始，检查是否可以开始引导
         * @returns
         */
        checkBegin(): boolean;
        /**
         * 当引导开始时调用
         */
        onBegin(): void;
        /**
         * 如果引导进行中，检查引导是否完成了
         * @returns
         */
        checkComplete(): boolean;
        /**
         * 当引导结束时调用
         */
        onComplete(): void;
        /**
         * 当被强制取消时
         */
        onCancel(): void;
        /**
         * 状态重置
         */
        reset(): void;
        /**
         * 更新
         */
        advanceTime(): void;
        /**
         * 释放
         */
        dispose(): void;
        private $state;
        readonly state: GuideTaskState;
        /**
         * 设置状态
         * @param value
         */
        setState(value: GuideTaskState): void;
        /**
         * 清除所有注入数据
         */
        clearValues(): void;
        /**
         * 注入或移除引导数据
         * @param key
         * @param value
         * @param taskID
         */
        injectValue<T extends keyof IGuideInjectValue>(key: T, value: IGuideInjectValue[T]): void;
        removeValue<T extends keyof IGuideInjectValue>(key: T): void;
        /**
         * 获取管理器注入的数据
         * @param key
         * @param defaultValue
         * @param taskID
         */
        retrieveValue<T extends keyof IGuideInjectValue>(key: T, defaultValue?: IGuideInjectValue[T]): IGuideInjectValue[T];
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-08
*************************************************/
declare module egretx {
    interface IGuideHelper {
        /**
         * 开始引导步骤
         * @param taskID
         * @param index 步骤index
         */
        beginGuideStep(taskID: number, index: number): void;
        /**
         * 结束引导步骤
         * @param taskID
         * @param index 步骤index
         */
        endGuideStep(taskID: number, index: number): void;
        /**
         * 强制取消引导
         * @param taskID
         */
        cancelGuide(taskID: number): void;
        /**
         * 开始引导任务
         * @param taskID
         */
        beginGuide(taskID: number): void;
        /**
         * 结束引导任务
         * @param taskID
         */
        endGuide(taskID: number): void;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-08
*************************************************/
declare module egretx {
    interface IGuideInjectValue {
        alert_name?: string;
        alert_button_0?: eui.Button;
        alert_button_1?: eui.Button;
        alert_button_2?: eui.Button;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-08
*************************************************/
declare module egretx {
    let IGuideManager: symbol;
    interface IGuideManager extends xgame.IXObject {
        guideHelper: IGuideHelper;
        readonly isStarted: boolean;
        readonly isPaused: boolean;
        readonly activityTask: GuideTask;
        /**
         * 获取引导任务
         * @param id
         */
        getTask(id: number): GuideTask;
        /**
         * 获取引导步骤
         * @param id
         * @param index
         * @returns
         */
        getStep(id: number, index: number): GuideStep;
        /**
         * 添加引导任务
         * @param task
         */
        addTask(task: GuideTask): GuideTask;
        /**
         * 开始引导流程
         */
        start(): void;
        /**
         * 清除所有注入数据
         * @param taskID 如果提供了taskID，则只清除该taskID的数据
         */
        clearValues(taskID?: number): void;
        /**
         * 注入或移除引导数据
         * @param key
         * @param value
         * @param taskID
         */
        injectValue<T extends keyof IGuideInjectValue>(key: T, value: IGuideInjectValue[T], taskID?: number): void;
        /**
         * 获取管理器注入的数据
         * @param key
         * @param defaultValue
         * @param taskID
         */
        /**
         * 移除注入数据
         * @param key
         * @param taskID
         */
        removeValue<T extends keyof IGuideInjectValue>(key: T, taskID?: number): void;
        retrieveValue<T extends keyof IGuideInjectValue>(key: T, defaultValue?: IGuideInjectValue[T], taskID?: number): IGuideInjectValue[T];
        /**
         * 暂停，只在当前空闲状态生效
         * @returns
         */
        pause(): void;
        /**
         * 恢复，只在当前空闲状态生效
         * @returns
         */
        resume(): void;
        /**
         * 强制取消当前引导任务，如果成功，将暂停引导流程
         */
        cancelActiveTask(): boolean;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-08
*************************************************/
declare module egretx {
    let IGuideManagerInternal: symbol;
    interface IGuideManagerInternal {
        initialize(): void;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-01
*************************************************/
declare module egretx {
    let IHttpManager: symbol;
    interface IHttpManager extends xgame.IXObject {
        sendRequest<T>(uri: string, method?: string, values?: Array<string[]>, isJSON?: boolean): Promise<T | undefined>;
        sendRequest<T>(options: IRequestOptions): Promise<T | undefined>;
    }
    let IHttpManagerInternal: symbol;
    interface IHttpManagerInternal extends xgame.IXObject {
        initialize(): void;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-01
*************************************************/
declare module egretx {
    interface IRequestOptions {
        uri: string;
        method?: string;
        headers?: Array<string[]>;
        values?: Array<string[]>;
        isJSON?: boolean;
    }
    class HttpManager extends xgame.Singleton implements IHttpManager, IHttpManagerInternal {
        private pools;
        constructor();
        initialize(): void;
        sendRequest<T>(uri: string, method?: string, values?: Array<string[]>, isJSON?: boolean): Promise<T | undefined>;
        sendRequest<T>(options: IRequestOptions): Promise<T | undefined>;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-01
*************************************************/
declare module egretx {
    let ISocketManager: symbol;
    interface ISocketManager extends xgame.IXObject {
        defaultInstanceName: string;
        defaultSocketHelper: ISocketHelper;
        retryMaxTiems: number;
        retryDelayTime: number;
        sendTimeout: number;
        heartBeatCheckTimeout: number;
        getOrCreateInstance(name?: string, helper?: ISocketHelper): SocketInstance;
    }
    let ISocketManagerInternal: symbol;
    interface ISocketManagerInternal extends xgame.IXObject {
        initialize(): void;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-01
*************************************************/
declare module egretx {
    class SocketManager extends xgame.Singleton implements ISocketManager, ISocketManagerInternal {
        defaultInstanceName: string;
        defaultSocketHelper: ISocketHelper;
        retryMaxTiems: number;
        retryDelayTime: number;
        sendTimeout: number;
        heartBeatCheckTimeout: number;
        protected instances: xgame.Dictionary<string, SocketInstance>;
        constructor();
        initialize(): void;
        getOrCreateInstance(name?: string, helper?: ISocketHelper): SocketInstance;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-01
*************************************************/
declare module egretx {
    class HttpRequest extends xgame.XObject implements xgame.IPoolable {
        uri: string;
        method: string;
        reconnectTimes: number;
        protected headers: xgame.Dictionary<string, string>;
        protected values: xgame.Dictionary<string, string | number>;
        constructor(uri?: string, method?: string);
        fromPoolHashCode: number;
        release(): void;
        dispose(): void;
        setUri(uri: string): void;
        setMethod(method?: string): void;
        setHeader(key: string, value: string): void;
        setValue(key: string, value: string | number): void;
        send<T>(isJSON?: boolean): Promise<T | undefined>;
        request(): Promise<string | boolean>;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-01
*************************************************/
declare module egretx {
    enum SocketState {
        Closed = 0,
        Connecting = 1,
        Connected = 2,
    }
    enum SocketCloseCode {
        Close = 0,
        IOError = 1,
        Failed = 2,
    }
    /**
     * 网络连接实例的实现类
     */
    class SocketInstance extends xgame.XObject {
        manager: SocketManager;
        readonly name: string;
        socketHelper: ISocketHelper;
        private uri;
        private guidCount;
        private generateGUID();
        private isInited;
        private happendConnected;
        private isReconnect;
        private $state;
        readonly state: SocketState;
        private disposableGroup;
        private recvQueues;
        constructor(manager: SocketManager, name: string, socketHelper: ISocketHelper);
        private sendTimeoutStamp;
        private lastestRecvStamp;
        private checkHeartBeat;
        private onAdvanceTime();
        private _sendPacket(packet);
        private current;
        private sendQueues;
        sendPacket(packet: IPacket): void;
        setURI(host: string, port: number, wss?: boolean): void;
        setURI(uri: string): void;
        private socket;
        private init();
        private callback_onConnected;
        onConnected(): xgame.Signal0;
        private onConnectHandler(event);
        private sendLoginPacket();
        private callback_onKickOut;
        onKickOut(): xgame.Signal0;
        private onReceiveHandler(event);
        private callback_onClosed;
        onClosed(): xgame.Signal1<SocketCloseCode>;
        private reconnectTimerID;
        private onCloseHandler(event);
        private onIOErrorHandler(event);
        private callback_onConnecting;
        onConnecting(): xgame.Signal1<number>;
        private retryCount;
        connect(): void;
        private _connect();
        private cleanQueues(revc?);
        close(): void;
        private _close();
        private callback_onShutdown;
        onShutdown(): xgame.Signal0;
        shutdown(): void;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-01
*************************************************/
declare module egretx {
    interface IPacket extends xgame.IPoolable {
        guid?: number;
        cmd?: number;
        buffer?: egret.ByteArray;
        first?: boolean;
        type?: string;
        message?: any;
        abort(): void;
        onResponse(): void;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-01
*************************************************/
declare module egretx {
    interface ISocketHelper extends xgame.IXObject {
        decodePackets(data: egret.ByteArray): IPacket[];
        encodePacket(packet: IPacket): egret.ByteArray;
        hideAnimation(): void;
        showAnimation(): void;
        needSendLoginPacket(): boolean;
        isLoginRespPacket(packet: IPacket): boolean;
        isLoginSuccess(packet: IPacket): boolean;
        generateLoginPacket(reconnect: boolean): IPacket;
        enableHeartBeatCheck(): boolean;
        isHeartBeatPacket(packet: IPacket): boolean;
        sendHeartBeatPacket(): void;
        isKickOutPacket(packet: IPacket): boolean;
        isDataLocked(packet: IPacket): boolean;
        receivePacket(packet: IPacket): void;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-04
*************************************************/
declare module egretx {
    /**
     * 资源管理器
     */
    class ResourceManager extends xgame.Singleton implements IResourceManager, IResourceManagerInternal {
        static DEBUG: boolean;
        readonly groups: xgame.Dictionary<string, ResourceGroup<any>>;
        constructor();
        initialize(): void;
        getOrCreateGroup<T>(name: string, factory?: () => ResourceGroup<T>): ResourceGroup<T>;
        private loadQueues;
        loadResAsync(key: string): Promise<any>;
        destroyRes(key: string): boolean;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-04
*************************************************/
declare module egretx {
    /**
     * 资源组
     */
    class ResourceGroup<T> extends xgame.XObject {
        manager: ResourceManager;
        readonly resourceType: string;
        readonly keys: xgame.Dictionary<string, string[]>;
        constructor(manager: ResourceManager, resourceType: string);
        createInstance(key: string): T;
        load(key: string, ...args: any[]): Promise<any>;
        release(key: string): void;
        readonly statistics: {
            [key: string]: number;
        };
        private $memory;
        readonly memory: number;
        protected addMemory(key: string, w: number, h: number): void;
        protected removeMemory(key: string): void;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-04
*************************************************/
declare module egretx {
    class DragonBonesResourceGroup extends ResourceGroup<dragonBones.Armature> {
        constructor(manager: ResourceManager);
        load(key: string, skeleton?: string): Promise<any>;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-04
*************************************************/
declare module egretx {
    class MovieClipResourceGroup extends ResourceGroup<egret.MovieClip> {
        constructor(manager: ResourceManager);
        load(key: string): Promise<void>;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-04
*************************************************/
declare module egretx {
    /**
     * 资源组类型，可以扩展自己的资源组
     */
    enum ResourceType {
        UI = "UI",
        MovieClip = "MovieClip",
        DragonBones = "DragonBones",
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-05
*************************************************/
declare module egretx {
    interface ILoader {
        key: string;
        deferred: xgame.Deferred<any>;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-04
*************************************************/
declare module egretx {
    interface IRes {
        texture: string;
        json: string;
        skeleton?: string;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-04
*************************************************/
declare module egretx {
    let IResourceManager: symbol;
    interface IResourceManager extends xgame.IXObject {
        getOrCreateGroup<T>(name: string, factory?: () => ResourceGroup<T>): ResourceGroup<T>;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-04
*************************************************/
declare module egretx {
    let IResourceManagerInternal: symbol;
    interface IResourceManagerInternal {
        initialize(): void;
    }
}
