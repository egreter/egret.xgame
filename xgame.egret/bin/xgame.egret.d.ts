/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-18
*************************************************/
declare module egretx {
    enum SBState {
        INVALID = 0,
        H_HEAD = 1,
        H_MID = 2,
        H_TAIL = 4,
        V_HEAD = 8,
        V_MID = 16,
        V_TAIL = 32
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
    let IUIManager: symbol;
    interface IUIManager extends xgame.IXObject {
        readonly entityManager: UIEntityManager;
        readonly stage: egret.Stage;
        readonly RES: UIResManager;
        readonly currentScene: IUIEntity;
        readonly onUIOpened: xgame.Signal1<IUIEntity>;
        readonly onUIClosed: xgame.Signal1<IUIEntity>;
        readonly onSceneChanged: xgame.Signal2<IUIEntity, IUIEntity>;
        register(uiName: string, uiClass: xgame.TClass<UIPage>): void;
        getLayerManager(layerID: UILayerID): UILayerManager;
        readonly sceneTransition: ISceneTransition;
        setSceneTransition(transition: ISceneTransition): void;
        replaceScene(uiName: string, ...args: any[]): Promise<IUIEntity>;
        replaceScene(uiClass: xgame.TClass<UIPage>, ...args: any[]): Promise<IUIEntity>;
        clearScene(): void;
        openUI(uiName: string, ...args: any[]): Promise<IUIEntity>;
        openUI(uiClass: xgame.TClass<UIPage>, ...args: any[]): Promise<IUIEntity>;
        openUIWithLayer(uiName: string, layerID: UILayerID, ...args: any[]): Promise<IUIEntity>;
        openUIWithLayer(uiClass: xgame.TClass<UIPage>, layerID: UILayerID, ...args: any[]): Promise<IUIEntity>;
        openUIWithRoot(uiName: string, uiRoot: egret.DisplayObjectContainer, ...args: any[]): Promise<IUIEntity>;
        openUIWithRoot(uiClass: xgame.TClass<UIPage>, uiRoot: egret.DisplayObjectContainer, ...args: any[]): Promise<IUIEntity>;
        openPopup(uiName: string, hud: egret.DisplayObject, ...args: any[]): Promise<IUIEntity>;
        openPopup(uiClass: xgame.TClass<UIPage>, hud: egret.DisplayObject, ...args: any[]): Promise<IUIEntity>;
        closeUI(uiName: string): void;
        closeUI(entity: IUIEntity): void;
        popUI(): boolean;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-08
*************************************************/
declare module egretx {
    let IUIManagerInternal: symbol;
    interface IUIManagerInternal {
        initialize(): void;
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
        private _release;
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
        private onFrameLabelEvent;
        private onLoopCompleteEvent;
        private onCompleteEvent;
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
    class MovieClip extends egret.DisplayObject implements IAnimatable {
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
        private fillMovieFrames;
        /**
         * @private
         *
         */
        $reset(): void;
        /**
         * @private
         *
         */
        private _initFrame;
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
        private getFrameLabelByName;
        /**
         * @private
         * 根据帧标签，设置开始和结束的帧数
         * @param labelName {string} 帧标签名
         */
        private getFrameStartEnd;
        /**
         * @private
         * 返回指定序号的帧的FrameLabel对象
         * @param frame {number} 帧序号
         * @returns {egret.FrameLabel} FrameLabel对象
         */
        private getFrameLabelByFrame;
        /**
         * @private
         * 返回指定序号的帧对应的FrameLabel对象，如果当前帧没有标签，则返回前面最近的有标签的帧的FrameLabel对象
         * @method egret.MovieClip#getFrameLabelForFrame
         * @param frame {number} 帧序号
         * @returns {egret.FrameLabel} FrameLabel对象
         */
        private getFrameLabelForFrame;
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
        private gotoFrame;
        /**
         * @private
         */
        private lastTime;
        advanceTime(time: number): void;
        /**
         * @private
         *
         */
        private advanceFrame;
        /**
         * @private
         *
         */
        private constructFrame;
        /**
         * @private
         *
         */
        $renderFrame(): void;
        /**
         * @private
         *
         */
        private handlePendingEvent;
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
         * MovieClip数据源
         */
        /**
        * @version Egret 2.4
        * @platform Web,Native
        */
        movieClipData: egret.MovieClipData;
        /**
         * @private
         *
         * @param value
         */
        private setMovieClipData;
        /**
         * @private
         *
         * @param value
         */
        private setPlayTimes;
        /**
         * @private
         *
         * @param value
         */
        private setIsStopped;
        private getActionAt;
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
        ON = 1
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
        private releaseAudio;
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
        EFFECT = 1
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
        private _play;
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
    class DragonBonesManager extends xgame.Singleton implements IDragonBonesManager, IDragonBonesManagerInternal, IAnimatable {
        factory: dragonBones.EgretFactory;
        constructor();
        advanceTime(time: number): void;
        initialize(): void;
        readonly pools: xgame.PoolGroup<Armature>;
        fetch(key: string, armatureName: string, texture?: string): Armature;
        recycle(armature: Armature): void;
        release(key: string): void;
        private _release;
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
        texture?: string;
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
        private advanceTime;
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
        Completed = 2
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
        Completed = 2
    }
    enum GuideTaskType {
        Weak = 0,
        Force = 1
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
        frontID?: number;
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
         * 开始引导
         * @param taskID
         * @param index 步骤index
         */
        beginGuide(taskID: number, index?: number): void;
        /**
         * 结束引导
         * @param taskID
         * @param index 步骤index
         */
        endGuide(taskID: number, index?: number): void;
        /**
         * 强制取消引导
         * @param taskID
         */
        cancelGuide(taskID: number): void;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-08
*************************************************/
declare module egretx {
    interface IGuideInjectValue {
        alert_button_0: eui.Button;
        alert_button_1: eui.Button;
        alert_button_2: eui.Button;
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
        uri?: string;
        method?: string;
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
        Connected = 2
    }
    enum SocketCloseCode {
        Close = 0,
        IOError = 1,
        Failed = 2
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
        private generateGUID;
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
        private onAdvanceTime;
        private _sendPacket;
        private current;
        private sendQueues;
        sendPacket(packet: IPacket): void;
        setURI(host: string, port: number, wss?: boolean): void;
        setURI(uri: string): void;
        private socket;
        private init;
        private callback_onConnected;
        onConnected(): xgame.Signal0;
        private onConnectHandler;
        private sendLoginPacket;
        private callback_onKickOut;
        onKickOut(): xgame.Signal0;
        private onReceiveHandler;
        private callback_onClosed;
        onClosed(): xgame.Signal1<SocketCloseCode>;
        private reconnectTimerID;
        private onCloseHandler;
        private onIOErrorHandler;
        private callback_onConnecting;
        onConnecting(): xgame.Signal1<number>;
        private retryCount;
        connect(): void;
        private _connect;
        private cleanQueues;
        close(): void;
        private _close;
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
        DragonBones = "DragonBones"
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
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-05
*************************************************/
declare module egretx {
    /**
     * 时间轴管理器
     */
    class TimelineManager extends xgame.Singleton implements ITimelineManager, ITimelineManagerInternal {
        constructor();
        initialize(): void;
        protected advanceTime(): void;
        private timelines;
        getOrCreateTimeline(name?: string): Timeline;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-05
*************************************************/
declare module egretx {
    class Timeline extends xgame.Locker {
        name: string;
        static MAIN: string;
        private animatables;
        private $timeScale;
        timeScale: number;
        private $passedTime;
        readonly passedTime: number;
        constructor(name: string);
        advanceTime(time: number): void;
        add(animatable: IAnimatable): void;
        remove(animatable: IAnimatable): void;
        private $isPaused;
        readonly isPaused: boolean;
        pause(): void;
        resume(): void;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-05
*************************************************/
declare module egretx {
    /**
     * 播放动画接口
     */
    interface IAnimatable extends xgame.IXObject {
        advanceTime(time: number): void;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-05
*************************************************/
declare module egretx {
    let ITimelineManager: symbol;
    interface ITimelineManager {
        getOrCreateTimeline(name?: string): Timeline;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-05
*************************************************/
declare module egretx {
    let ITimelineManagerInternal: symbol;
    interface ITimelineManagerInternal {
        initialize(): void;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-19
*************************************************/
declare module egretx {
    let ITouchManager: symbol;
    interface ITouchManager extends xgame.IDisposable {
        removeTouchEvents(target: egret.DisplayObject | number): void;
        addTouchBegin(target: egret.DisplayObject, listener: Function, thisObject?: any, scale?: boolean): void;
        removeTouchBegin(target: egret.DisplayObject, listener: Function, thisObject?: any): void;
        addTouchMove(target: egret.DisplayObject, listener: Function, thisObject?: any): void;
        removeTouchMove(target: egret.DisplayObject, listener: Function, thisObject?: any): void;
        addTouchEnd(target: egret.DisplayObject, listener: Function, thisObject?: any): void;
        removeTouchEnd(target: egret.DisplayObject, listener: Function, thisObject?: any): void;
        addReleaseOutSide(target: egret.DisplayObject, listener: Function, thisObject?: any): void;
        removeReleaseOutSide(target: egret.DisplayObject, listener: Function, thisObject?: any): void;
        addClick(target: egret.DisplayObject, listener: Function, thisObject?: any, scale?: boolean): void;
        removeClick(target: egret.DisplayObject, listener: Function, thisObject?: any): void;
        addLongPress(target: egret.DisplayObject, listener: Function, thisObject?: any, time?: number, scale?: boolean): void;
        removeLongPress(target: egret.DisplayObject, listener: Function, thisObject?: any): void;
        addRepeatPress(target: egret.DisplayObject, listener: Function, thisObject?: any, time?: number, scale?: boolean): void;
        removeRepeatPress(target: egret.DisplayObject, listener: Function, thisObject?: any): void;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-19
*************************************************/
declare module egretx {
    let ITouchManagerInternal: symbol;
    interface ITouchManagerInternal {
        initialize(): void;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-19
*************************************************/
declare module egretx {
    const TOUCH_TAP_BETWEEN_TIME: number;
    const TOUCH_LONG_PRESS_TIME: number;
    const TOUCH_SCALE_RADIO: number;
    let touchClickLastTime: number;
    class TouchManager extends xgame.XObject implements xgame.IDisposable, ITouchManager, ITouchManagerInternal {
        main: egret.DisplayObjectContainer;
        stage: egret.Stage;
        private delegates;
        constructor(main: egret.DisplayObjectContainer);
        dispose(): void;
        initialize(): void;
        private onLeaveStage;
        removeTouchEvents(target: egret.DisplayObject | number): void;
        addTouchBegin(target: egret.DisplayObject, listener: (event: egret.TouchEvent) => void, thisObject?: any, scale?: boolean): void;
        removeTouchBegin(target: egret.DisplayObject, listener: (event: egret.TouchEvent) => void, thisObject?: any): void;
        addTouchMove(target: egret.DisplayObject, listener: (event: egret.TouchEvent) => void, thisObject?: any): void;
        removeTouchMove(target: egret.DisplayObject, listener: (event: egret.TouchEvent) => void, thisObject?: any): void;
        addTouchEnd(target: egret.DisplayObject, listener: (event: egret.TouchEvent) => void, thisObject?: any): void;
        removeTouchEnd(target: egret.DisplayObject, listener: (event: egret.TouchEvent) => void, thisObject?: any): void;
        addReleaseOutSide(target: egret.DisplayObject, listener: (event: egret.TouchEvent) => void, thisObject?: any): void;
        removeReleaseOutSide(target: egret.DisplayObject, listener: (event: egret.TouchEvent) => void, thisObject?: any): void;
        addClick(target: egret.DisplayObject, listener: (event: egret.TouchEvent) => void, thisObject?: any, scale?: boolean): void;
        removeClick(target: egret.DisplayObject, listener: (event: egret.TouchEvent) => void, thisObject?: any): void;
        addLongPress(target: egret.DisplayObject, listener: (event: egret.TouchEvent) => void, thisObject?: any, time?: number, scale?: boolean): void;
        removeLongPress(target: egret.DisplayObject, listener: (event: egret.TouchEvent) => void, thisObject?: any): void;
        addRepeatPress(target: egret.DisplayObject, listener: (event: egret.TouchEvent) => void, thisObject?: any, time?: number, scale?: boolean): void;
        removeRepeatPress(target: egret.DisplayObject, listener: (event: egret.TouchEvent) => void, thisObject?: any): void;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-19
*************************************************/
declare module egretx {
    class LayoutCache extends xgame.XObject {
        top: number;
        bottom: number;
        left: number;
        right: number;
        horizontalCenter: number;
        verticalCenter: number;
        percentWidth: number;
        percentHeight: number;
        anchorOffsetX: number;
        anchorOffsetY: number;
        x: number;
        y: number;
        width: number;
        height: number;
        scaleX: number;
        scaleY: number;
        reset(): void;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-19
*************************************************/
declare module egretx {
    class TouchBehaviours {
        private disposableGroup;
        setTouchManager(target: egret.DisplayObject): void;
        addTouchBegin(target: egret.DisplayObject, listener: (event: egret.TouchEvent) => void, thisObject?: any, scale?: boolean): void;
        removeTouchBegin(target: egret.DisplayObject, listener: (event: egret.TouchEvent) => void, thisObject?: any): void;
        addTouchMove(target: egret.DisplayObject, listener: (event: egret.TouchEvent) => void, thisObject?: any): void;
        removeTouchMove(target: egret.DisplayObject, listener: (event: egret.TouchEvent) => void, thisObject?: any): void;
        addTouchEnd(target: egret.DisplayObject, listener: (event: egret.TouchEvent) => void, thisObject?: any): void;
        removeTouchEnd(target: egret.DisplayObject, listener: (event: egret.TouchEvent) => void, thisObject?: any): void;
        addReleaseOutSide(target: egret.DisplayObject, listener: (event: egret.TouchEvent) => void, thisObject?: any): void;
        removeReleaseOutSide(target: egret.DisplayObject, listener: (event: egret.TouchEvent) => void, thisObject?: any): void;
        addClick(target: egret.DisplayObject, listener: (event: egret.TouchEvent) => void, thisObject?: any, scale?: boolean): void;
        removeClick(target: egret.DisplayObject, listener: (event: egret.TouchEvent) => void, thisObject?: any): void;
        addLongPress(target: egret.DisplayObject, listener: (event: egret.TouchEvent) => void, thisObject?: any, time?: number, scale?: boolean): void;
        removeLongPress(target: egret.DisplayObject, listener: (event: egret.TouchEvent) => void, thisObject?: any): void;
        addRepeatPress(target: egret.DisplayObject, listener: (event: egret.TouchEvent) => void, thisObject?: any, time?: number, scale?: boolean): void;
        removeRepeatPress(target: egret.DisplayObject, listener: (event: egret.TouchEvent) => void, thisObject?: any): void;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-19
*************************************************/
declare module egretx {
    class TouchDelegate extends xgame.XObject implements xgame.IDisposable {
        private inited;
        private target;
        private clickScaleEnable;
        private cache;
        private longPressTimeDelta;
        private repeatPressTimeDelta;
        private clickHandler;
        private releaseOutsideHandler;
        private longPressHandler;
        private repeatPressHandler;
        private beginHandler;
        private moveHandler;
        private endHandler;
        constructor(target: egret.DisplayObject, scale?: boolean);
        onLeaveStage(event: egret.TouchEvent): void;
        addTouchBegin(listener: (event: egret.TouchEvent) => void, thisObject?: any): void;
        removeTouchBegin(listener: (event: egret.TouchEvent) => void, thisObject?: any): void;
        addTouchMove(listener: (event: egret.TouchEvent) => void, thisObject?: any): void;
        removeTouchMove(listener: (event: egret.TouchEvent) => void, thisObject?: any): void;
        addTouchEnd(listener: (event: egret.TouchEvent) => void, thisObject?: any): void;
        removeTouchEnd(listener: (event: egret.TouchEvent) => void, thisObject?: any): void;
        addReleaseOutSide(listener: (event: egret.TouchEvent) => void, thisObject?: any): void;
        removeReleaseOutSide(listener: (event: egret.TouchEvent) => void, thisObject?: any): void;
        addClick(listener: (event: egret.TouchEvent) => void, thisObject?: any): void;
        removeClick(listener: (event: egret.TouchEvent) => void, thisObject?: any): void;
        addLongPress(listener: (event: egret.TouchEvent) => void, thisObject?: any, time?: number): void;
        removeLongPress(listener: (event: egret.TouchEvent) => void, thisObject?: any): void;
        addRepeatPress(listener: (event: egret.TouchEvent) => void, thisObject?: any, time?: number): void;
        removeRepeatPress(listener: (event: egret.TouchEvent) => void, thisObject?: any): void;
        initTouchEvents(): void;
        private repeat_timer_id;
        protected setRepeatTimer(): void;
        protected clearRepeatTimer(): void;
        protected onTouchBegin(event: egret.TouchEvent): void;
        protected cacheLayout(): void;
        protected updateLayout(isUp?: boolean): void;
        protected onTouchMove(event: egret.TouchEvent): void;
        protected onTouchEnd(event: egret.TouchEvent): void;
        dispose(): void;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-19
*************************************************/
declare module egretx {
    class TouchDisposableGroup extends xgame.XObject implements xgame.IDisposable {
        private displayObject?;
        private touches;
        manager: TouchManager;
        constructor(displayObject?: egret.DisplayObject);
        private onRemovedFromStage;
        dispose(): void;
        addTouchBegin(target: egret.DisplayObject, listener: (event: egret.TouchEvent) => void, thisObject?: any, scale?: boolean): void;
        removeTouchBegin(target: egret.DisplayObject, listener: (event: egret.TouchEvent) => void, thisObject?: any): void;
        addTouchMove(target: egret.DisplayObject, listener: (event: egret.TouchEvent) => void, thisObject?: any): void;
        removeTouchMove(target: egret.DisplayObject, listener: (event: egret.TouchEvent) => void, thisObject?: any): void;
        addTouchEnd(target: egret.DisplayObject, listener: (event: egret.TouchEvent) => void, thisObject?: any): void;
        removeTouchEnd(target: egret.DisplayObject, listener: (event: egret.TouchEvent) => void, thisObject?: any): void;
        addReleaseOutSide(target: egret.DisplayObject, listener: (event: egret.TouchEvent) => void, thisObject?: any): void;
        removeReleaseOutSide(target: egret.DisplayObject, listener: (event: egret.TouchEvent) => void, thisObject?: any): void;
        addClick(target: egret.DisplayObject, listener: (event: egret.TouchEvent) => void, thisObject?: any, scale?: boolean): void;
        removeClick(target: egret.DisplayObject, listener: (event: egret.TouchEvent) => void, thisObject?: any): void;
        addLongPress(target: egret.DisplayObject, listener: (event: egret.TouchEvent) => void, thisObject?: any, time?: number, scale?: boolean): void;
        removeLongPress(target: egret.DisplayObject, listener: (event: egret.TouchEvent) => void, thisObject?: any): void;
        addRepeatPress(target: egret.DisplayObject, listener: (event: egret.TouchEvent) => void, thisObject?: any, time?: number, scale?: boolean): void;
        removeRepeatPress(target: egret.DisplayObject, listener: (event: egret.TouchEvent) => void, thisObject?: any): void;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-19
*************************************************/
declare module egretx {
    interface ITouchHandler {
        listeners: xgame.Signal1<egret.TouchEvent>;
        happend?: boolean;
        identifier?: number;
        time?: number;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-18
*************************************************/
declare module egretx {
    class UIManager extends xgame.XObject implements IUIManager, IUIManagerInternal {
        private main;
        private pipelines;
        readonly uiMap: xgame.Dictionary<string, xgame.TClass<UIPage>>;
        readonly uiLayers: xgame.Dictionary<number, UILayerManager>;
        readonly root: eui.UILayer;
        private $entityManager;
        readonly entityManager: UIEntityManager;
        stage: egret.Stage;
        readonly onSceneChanged: xgame.Signal2<IUIEntity, IUIEntity>;
        readonly onUIOpened: xgame.Signal1<IUIEntity>;
        readonly onUIClosed: xgame.Signal1<IUIEntity>;
        readonly RES: UIResManager;
        constructor(main: egret.DisplayObjectContainer);
        initialize(): void;
        private $sceneTransition;
        readonly sceneTransition: ISceneTransition;
        setSceneTransition(value: ISceneTransition): void;
        getLayerManager(layerID: UILayerID): UILayerManager;
        register(uiName: string, uiClass: xgame.TClass<UIPage>): void;
        popUI(): boolean;
        clearScene(): void;
        closeUI(uiName: string): void;
        closeUI(entity: UIEntity): void;
        private _closeUI;
        private $currentScene;
        readonly currentScene: IUIEntity;
        replaceScene(uiName: string, ...args: any[]): Promise<IUIEntity>;
        replaceScene(uiClass: xgame.TClass<UIPage>, ...args: any[]): Promise<IUIEntity>;
        openUI(uiClass: xgame.TClass<UIPage>, ...args: any[]): Promise<IUIEntity>;
        openUI(uiName: string, ...args: any[]): Promise<IUIEntity>;
        openUIWithLayer(uiName: string, layerID: UILayerID, ...args: any[]): Promise<IUIEntity>;
        openUIWithLayer(uiClass: xgame.TClass<UIPage>, layerID: UILayerID, ...args: any[]): Promise<IUIEntity>;
        openUIWithRoot(uiName: string, uiRoot: egret.DisplayObjectContainer, ...args: any[]): Promise<IUIEntity>;
        openUIWithRoot(uiClass: xgame.TClass<UIPage>, uiRoot: egret.DisplayObjectContainer, ...args: any[]): Promise<IUIEntity>;
        openPopup(uiName: string, hud: egret.DisplayObject, ...args: any[]): Promise<IUIEntity>;
        openPopup(uiClass: xgame.TClass<UIPage>, hud: egret.DisplayObject, ...args: any[]): Promise<IUIEntity>;
        private startPipelines;
        /**
         * 检查UIPage是否存在或可以多开
         * @param options
         * @returns
         */
        private checkIsOpened;
        /**
         * 如果没有存在就创建UIPage
         * @param options
         * @returns
         */
        private createUIPage;
        /**
         * 如果UIPage创建成功就打开并传递参数
         * @param options
         * @returns
         */
        private openUIPage;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-06-30
*************************************************/
declare module egretx {
    class Group extends eui.Group implements xgame.IXObject {
        constructor();
        protected childrenCreated(): void;
        setTouchManager: (target: egret.DisplayObject) => void;
        removeTouchEvents: (target: egret.DisplayObject | number) => void;
        addTouchBegin: (target: egret.DisplayObject, listener: Function, thisObject?: any, scale?: boolean) => void;
        removeTouchBegin: (target: egret.DisplayObject, listener: Function, thisObject?: any) => void;
        addTouchMove: (target: egret.DisplayObject, listener: Function, thisObject?: any) => void;
        removeTouchMove: (target: egret.DisplayObject, listener: Function, thisObject?: any) => void;
        addTouchEnd: (target: egret.DisplayObject, listener: Function, thisObject?: any) => void;
        removeTouchEnd: (target: egret.DisplayObject, listener: Function, thisObject?: any) => void;
        addReleaseOutSide: (target: egret.DisplayObject, listener: Function, thisObject?: any) => void;
        removeReleaseOutSide: (target: egret.DisplayObject, listener: Function, thisObject?: any) => void;
        addClick: (target: egret.DisplayObject, listener: Function, thisObject?: any, scale?: boolean) => void;
        removeClick: (target: egret.DisplayObject, listener: Function, thisObject?: any) => void;
        addLongPress: (target: egret.DisplayObject, listener: Function, thisObject?: any, time?: number, scale?: boolean) => void;
        removeLongPress: (target: egret.DisplayObject, listener: Function, thisObject?: any) => void;
        addRepeatPress: (target: egret.DisplayObject, listener: Function, thisObject?: any, time?: number, scale?: boolean) => void;
        removeRepeatPress: (target: egret.DisplayObject, listener: Function, thisObject?: any) => void;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-06-29
*************************************************/
declare module egretx {
    class ItemRenderer extends eui.ItemRenderer {
        constructor();
        protected childrenCreated(): void;
        setTouchManager: (target: egret.DisplayObject) => void;
        removeTouchEvents: (target: egret.DisplayObject | number) => void;
        addTouchBegin: (target: egret.DisplayObject, listener: Function, thisObject?: any, scale?: boolean) => void;
        removeTouchBegin: (target: egret.DisplayObject, listener: Function, thisObject?: any) => void;
        addTouchMove: (target: egret.DisplayObject, listener: Function, thisObject?: any) => void;
        removeTouchMove: (target: egret.DisplayObject, listener: Function, thisObject?: any) => void;
        addTouchEnd: (target: egret.DisplayObject, listener: Function, thisObject?: any) => void;
        removeTouchEnd: (target: egret.DisplayObject, listener: Function, thisObject?: any) => void;
        addReleaseOutSide: (target: egret.DisplayObject, listener: Function, thisObject?: any) => void;
        removeReleaseOutSide: (target: egret.DisplayObject, listener: Function, thisObject?: any) => void;
        addClick: (target: egret.DisplayObject, listener: Function, thisObject?: any, scale?: boolean) => void;
        removeClick: (target: egret.DisplayObject, listener: Function, thisObject?: any) => void;
        addLongPress: (target: egret.DisplayObject, listener: Function, thisObject?: any, time?: number, scale?: boolean) => void;
        removeLongPress: (target: egret.DisplayObject, listener: Function, thisObject?: any) => void;
        addRepeatPress: (target: egret.DisplayObject, listener: Function, thisObject?: any, time?: number, scale?: boolean) => void;
        removeRepeatPress: (target: egret.DisplayObject, listener: Function, thisObject?: any) => void;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-08
*************************************************/
declare module egretx {
    class UIComponent extends eui.Component implements xgame.IXObject, eui.UIComponent {
        constructor();
        protected childrenCreated(): void;
        setTouchManager: (target: egret.DisplayObject) => void;
        removeTouchEvents: (target: egret.DisplayObject | number) => void;
        addTouchBegin: (target: egret.DisplayObject, listener: Function, thisObject?: any, scale?: boolean) => void;
        removeTouchBegin: (target: egret.DisplayObject, listener: Function, thisObject?: any) => void;
        addTouchMove: (target: egret.DisplayObject, listener: Function, thisObject?: any) => void;
        removeTouchMove: (target: egret.DisplayObject, listener: Function, thisObject?: any) => void;
        addTouchEnd: (target: egret.DisplayObject, listener: Function, thisObject?: any) => void;
        removeTouchEnd: (target: egret.DisplayObject, listener: Function, thisObject?: any) => void;
        addReleaseOutSide: (target: egret.DisplayObject, listener: Function, thisObject?: any) => void;
        removeReleaseOutSide: (target: egret.DisplayObject, listener: Function, thisObject?: any) => void;
        addClick: (target: egret.DisplayObject, listener: Function, thisObject?: any, scale?: boolean) => void;
        removeClick: (target: egret.DisplayObject, listener: Function, thisObject?: any) => void;
        addLongPress: (target: egret.DisplayObject, listener: Function, thisObject?: any, time?: number, scale?: boolean) => void;
        removeLongPress: (target: egret.DisplayObject, listener: Function, thisObject?: any) => void;
        addRepeatPress: (target: egret.DisplayObject, listener: Function, thisObject?: any, time?: number, scale?: boolean) => void;
        removeRepeatPress: (target: egret.DisplayObject, listener: Function, thisObject?: any) => void;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-17
*************************************************/
declare module egretx {
    enum UIAlign {
        CENTER = 0,
        TOP = 1,
        BOTTOM = 2,
        LEFT = 3,
        RIGHT = 4
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-17
*************************************************/
declare module egretx {
    enum UIDirection {
        ANY = 0,
        TOP = 1,
        BOTTOM = 2,
        LEFT = 3,
        RIGHT = 4
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-19
*************************************************/
declare module egretx {
    class UIPage extends UIComponent {
        skinPath: string;
        uiManager: egretx.IUIManager;
        guideManager: egretx.IGuideManager;
        animationManager: egretx.IAnimationManager;
        audioManager: egretx.IAudioManager;
        flags: number;
        entity: IUIEntity;
        constructor(skinPath?: string);
        private guideValues;
        injectGuideValue<T extends keyof IGuideInjectValue>(key: T, value: IGuideInjectValue[T], taskID?: number): void;
        readonly onComplete: xgame.Signal0;
        private $isLoaded;
        readonly isLoaded: boolean;
        private $isLoading;
        readonly isLoading: boolean;
        private deferred;
        load(): Promise<void>;
        private doComplete;
        protected $maskAlpha: number;
        readonly maskAlpha: number;
        protected $maskColor: number;
        readonly maskColor: number;
        private $layerID;
        readonly layerID: UILayerID;
        setLayerID(layerID: UILayerID): void;
        onInit(): void;
        onOpen(): void;
        onSceneChanging(): void;
        onClose(): void;
        onShow(): void;
        onHide(): void;
        close(): void;
        doFadeIn(): Promise<void>;
        doFadeOut(): Promise<void>;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-08
*************************************************/
declare module egretx {
    enum UIFlags {
        None = 0,
        useMask = 1,
        isStack = 2,
        isFullScreen = 4,
        allowMultiple = 8,
        closeByMask = 16,
        isPopupMenu = 32,
        isPlugin = 64,
        Scene = 128
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-18
*************************************************/
declare module egretx {
    class PluginPage extends UIPage {
        constructor(skinPath?: string);
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-15
*************************************************/
declare module egretx {
    class Window extends UIPage {
        constructor(skinPath?: string);
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-11
*************************************************/
declare module egretx {
    enum UILayerID {
        Layer_0_Bottom = 0,
        Layer_1 = 1,
        Layer_2_Scene = 2,
        Layer_3_SceneMask = 3,
        Layer_4_SceneFrame = 4,
        Layer_5_UI = 5,
        Layer_6_UIMask = 6,
        Layer_7_UIFrame = 7,
        Layer_8_Window = 8,
        Layer_9 = 9,
        Layer_10_Popup = 10,
        Layer_11_Guide = 11,
        Layer_12_Toast = 12,
        Layer_13_Loading = 13,
        Layer_14 = 14,
        Layer_15_Top = 15
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-15
*************************************************/
declare module egretx {
    class RenderWatcher extends xgame.XObject {
        private views;
        private watchers;
        private dict;
        private callback_onChanged;
        constructor(...views: egret.DisplayObject[]);
        addWatcher(view: egret.DisplayObject): void;
        removeWatcher(view: egret.DisplayObject): void;
        private onWatcher;
        private isDispatching;
        private lateDispatch;
        onChanged(): xgame.Signal0;
        dispose(): void;
    }
    class Popup extends UIPage {
        readonly renderWatcher: RenderWatcher;
        readonly offset: egret.Point;
        constructor(skinPath?: string);
        protected $uiDirection: UIDirection;
        readonly uiDirection: UIDirection;
        protected $uiAlign: UIAlign;
        readonly uiAlign: UIAlign;
        protected allowDirections: UIDirection[];
        allowUIDirection(direction: UIDirection): boolean;
        fixedUIDirection(direction: UIDirection): void;
        onClose(): void;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-25
*************************************************/
declare module egretx {
    class Scene extends UIPage {
        constructor(skinPath?: string);
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-19
*************************************************/
declare module egretx {
    interface IUIEntity {
        name: string;
        uiPage: UIPage;
        readonly isClosed: boolean;
        groupName: string;
        closePage(): void;
        showPage(): void;
        hidePage(): void;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-19
*************************************************/
declare module egretx {
    class UIEntity extends xgame.XObject implements IUIEntity, xgame.IDisposable {
        uiManager: IUIManager;
        name: string;
        constructor();
        uiPage: UIPage;
        private $isClosed;
        readonly isClosed: boolean;
        mask: eui.Rect;
        groupName: string;
        createMask(color: number, alpha: number, closeByMask: number): void;
        private onMaskClose;
        onSceneChanging(): void;
        onClose(): void;
        closePage(): void;
        showPage(): void;
        hidePage(): void;
        dispose(): void;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-01-17
*************************************************/
declare module egretx {
    class UIHelper {
        static isFullScreenUI(entity: IUIEntity): boolean;
        static isWindowUI(entity: IUIEntity): boolean;
        static isPopupMenuUI(entity: IUIEntity): boolean;
        static isPluginUI(entity: IUIEntity): boolean;
        static isSceneUI(entity: IUIEntity): boolean;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-08
*************************************************/
declare module egretx {
    class UIEntityManager extends xgame.XObject {
        readonly manager: UIManager;
        readonly entityMap: xgame.Dictionary<string, UIEntity[]>;
        readonly stackList: xgame.List<UIEntity>;
        constructor(manager: UIManager);
        addEntity(entity: UIEntity): void;
        readonly stackCount: number;
        readonly topUI: IUIEntity;
        readonly topFullScreenUI: IUIEntity;
        readonly hasPopUp: boolean;
        checkEntities(): void;
        /**
         * 隐藏UI之下的显示层级
         */
        hideUIUnderLayers(): void;
        /**
         * 显示UI之下的显示层级
         */
        showUIUnderLayers(): void;
        removeEntity(entity: UIEntity): void;
        tryGetEntities(uiClass: xgame.TClass<UIPage>, results?: UIEntity[]): boolean;
        tryGetEntities(uiName: string, results?: UIEntity[]): boolean;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-19
*************************************************/
declare module egretx {
    class UILayerManager extends eui.UILayer {
        readonly manager: UIManager;
        readonly id: number;
        readonly entities: xgame.List<UIEntity>;
        constructor(manager: UIManager, id: number);
        readonly count: number;
        addEntity(entity: UIEntity): void;
        removeEntity(entity: UIEntity): void;
        orderToFront(entity: UIEntity): void;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-21
*************************************************/
declare let onDisplayListChanged: xgame.Signal1<number>;
declare let onDisplayListDisposed: xgame.Signal1<number>;
declare let egret_BitmapData_displayList: {
    [key: number]: egret.DisplayObject[];
};
declare let egret_BitmapData_addDisplayObject: typeof egret.BitmapData.$addDisplayObject;
declare let egret_BitmapData_removeDisplayObject: typeof egret.BitmapData.$removeDisplayObject;
declare let egret_BitmapData_dispose: typeof egret.BitmapData.$dispose;
declare function get_timestamp(): number;
declare module egretx {
    class UIResManager extends xgame.XObject {
        private textures;
        constructor();
        gc(force?: boolean): void;
        private destroyRes;
        private onDisplayListChanged;
        private onDisplayListDisposed;
        register(key: string, texture: egret.Texture): void;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-11
*************************************************/
declare module egretx {
    interface IAlertOptions {
        showCloseButton?: boolean;
        closeByMask?: boolean;
        buttons?: string[];
        numButton?: number;
        width?: number;
        height?: number;
        title?: string;
        message?: string;
        callback?: xgame.Signal1<number>;
        skinName?: string;
    }
    function alert(message: string, title?: string, closeByMask?: boolean): xgame.Signal1<number>;
    function alert(message: string, title?: string, buttons?: string[], closeByMask?: boolean): xgame.Signal1<number>;
    function alert(message: string, title?: string, nums?: number, closeByMask?: boolean): xgame.Signal1<number>;
    function alert(options: IAlertOptions): xgame.Signal1<number>;
    class Alert extends egretx.Window {
        options: IAlertOptions;
        static defaultSkinName: string;
        static NAME: string;
        lab_title: eui.Label;
        lab_content: eui.Label;
        btn_close: eui.Button;
        uiManager: egretx.IUIManager;
        protected clickButtonIndex: number;
        constructor(options: IAlertOptions);
        close(): void;
        onClose(): void;
        protected getButton(index: number): eui.Button;
        onOpen(): void;
        private onButtonClick;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-06-24
*************************************************/
declare module egretx {
    function get_measure_width(text: string, instance: any): number;
    interface ISourceItem {
        label?: string;
    }
    class DropdownList extends UIComponent implements xgame.IPoolable {
        static defaultItemRenderSkinName: string;
        static toSource(labels: string[]): ISourceItem[];
        static itemToLabel(item: ISourceItem): string;
        img_bg: eui.Image;
        img_icon: eui.Image;
        lab_title: eui.Label;
        itemToLabel: (item: ISourceItem) => string;
        protected invalidateFlags: number;
        constructor();
        private callback_onSelectChanged;
        onSelectChanged<T extends ISourceItem>(): xgame.Signal3<number, T, DropdownList>;
        $onRemoveFromStage(): void;
        dispose(): void;
        protected childrenCreated(): void;
        private $isOpened;
        readonly isOpened: boolean;
        private options;
        openPopup(): void;
        closePopup(): void;
        private $textColor;
        textColor: number;
        private $popupItemHeight;
        popupItemHeight: number;
        private $popupTextAlign;
        popupTextAlign: string;
        private $textAlign;
        textAlign: string;
        private $selectedIndex;
        selectedIndex: number;
        protected setSelectedIndex(value: number, dispatch?: boolean): void;
        readonly selectedItem: ISourceItem;
        private $source;
        source: ISourceItem[];
        private $itemRenderGap;
        itemRenderGap: number;
        private $popupItemRenderSkinName;
        popupItemRenderSkinName: string;
        private $popupItemRender;
        popupItemRender: any;
        private $popupArrowPadding;
        popupArrowPadding: number;
        private $popupOffset;
        popupOffset: egret.Point;
        private isLate;
        protected lateUpdate(): void;
        protected getMenuItem(index: number): IMenuItem;
        protected getTitle(item: ISourceItem): string;
        protected onDrawComponent(): void;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-06-24
*************************************************/
declare module egretx {
    interface IDropdownSource {
        selectedIndex?: number;
        source?: ISourceItem[];
        itemToLabel?: (item: ISourceItem) => string;
    }
    class DropdownListGroup extends Group {
        static defaultDropdownSkinName: string;
        static defaultFetchDropdownList: () => DropdownList;
        static defaultPopupItemHeight: number;
        fetchDropdownList: () => DropdownList;
        protected invalidateFlags: number;
        constructor();
        destroy(): void;
        private callback_onSelectChanged;
        onSelectChanged<T extends ISourceItem>(): xgame.Signal3<number, number[], T[]>;
        private $dropdownSkinName;
        dropdownSkinName: string;
        private $popupItemRenderSkinName;
        popupItemRenderSkinName: string;
        private $textColor;
        textColor: number;
        private $popupItemHeight;
        popupItemHeight: number;
        private $popupTextAlign;
        popupTextAlign: string;
        private $textAlign;
        textAlign: string;
        private $source;
        source: IDropdownSource[];
        getSelectedIndexes(): number[];
        getSelectedIndex(index: number): number;
        setSelectedIndexes(selectedIndexes: number[]): void;
        setSelectedIndex(index: number, selectedIndex: number): void;
        private isLate;
        protected lateUpdate(): void;
        protected onDrawComponent(): void;
        protected clearItems(): void;
        private selectedIndexes;
        protected initItems(): void;
        protected items: DropdownList[];
        protected getItemAt(index: number): DropdownList;
        protected indexOf(dropdown: DropdownList): number;
        private onSelectChangeHandler;
        private pools;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-06-29
*************************************************/
declare module egretx {
    interface IMenuItem {
        index?: number;
        title?: string;
        textAlign?: string;
    }
    interface IMenuOptions {
        skinName?: string;
        baseHeight?: number;
        width?: number;
        minWidth?: number;
        height?: number;
        minHeight?: number;
        items: IMenuItem[];
        itemHeight?: number;
        itemGap?: number;
        itemRender?: any;
        itemRenderSkinName?: string;
        uiDirection?: UIDirection;
        uiAlign?: UIAlign;
        arrowPadding?: number;
        offset?: egret.Point;
        selected?: number;
        textAlign?: string;
        allowDirections?: UIDirection[];
        instance?: PopupMenu;
        callback?: xgame.Signal1<IMenuItem>;
    }
    class PopupMenuEvent extends egret.Event {
        static ITEM_CLICK: string;
    }
    class PopupMenuItem extends ItemRenderer {
        lab_title: eui.Label;
        private readonly item;
        protected createChildren(): void;
        protected childrenCreated(): void;
        protected dataChanged(): void;
    }
    class PopupMenu extends Popup {
        options: IMenuOptions;
        static NAME: string;
        static defaultSkinName: string;
        static defaultBaseHeight: number;
        static toOptions(titles: string[], selectedIndex?: number): IMenuOptions;
        list_item: eui.List;
        constructor(options: IMenuOptions);
        private callback_onSelect;
        private arrow_down;
        private arrow_up;
        private arrow_right;
        private arrow_left;
        private arrowPadding;
        onSelect(): xgame.Signal1<IMenuItem>;
        fixedUIDirection(direction: UIDirection): void;
        onClose(): void;
        private selectedItem;
        private onItemClickHandler;
        onOpen(): void;
        protected updateArrow(direction: UIDirection): void;
    }
    function showPopupMenu(target: egret.DisplayObject, titles: string[]): xgame.Signal1<IMenuItem>;
    function showPopupMenu(target: egret.DisplayObject, options: IMenuOptions): xgame.Signal1<IMenuItem>;
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-06-29
*************************************************/
declare module egretx {
    interface ITipsView extends xgame.IPoolable {
        setMessage(message: string): void;
        playAnimation(): Promise<void>;
        doFadeIn(): Promise<void>;
        doFadeOut(): Promise<void>;
        doStay(): Promise<void>;
    }
    enum TipsState {
        FadeIn = 1,
        Stay = 2,
        FadeOut = 3
    }
    class TipsView extends eui.Component implements ITipsView {
        fromPoolHashCode: number;
        private $state;
        state: TipsState;
        durationFadeIn: number;
        durationStay: number;
        durationFadeOut: number;
        durationPosition: number;
        time: number;
        index: number;
        release(): void;
        dispose(): void;
        setMessage(message: string): void;
        doFadeIn(): Promise<void>;
        doFadeOut(): Promise<void>;
        doStay(): Promise<void>;
        playAnimation(): Promise<void>;
    }
    class TipsManager extends xgame.Singleton {
        private pools;
        parallelMax: number;
        private $container;
        fetch: () => TipsView;
        readonly container: eui.Group;
        constructor();
        protected waitQueues: string[];
        append(message: string): void;
        private play;
        private endView;
        clear(): void;
        initialize(): void;
    }
    function tips(message: string): void;
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-08
*************************************************/
declare module egretx {
    class UIOptions extends xgame.XObject {
        name: string;
        uiClass: xgame.TClass<UIPage>;
        groupName: string;
        uiRoot: egret.DisplayObjectContainer;
        layerID: number;
        openArgs: any[];
        hud: egret.DisplayObject;
        gap: number;
        errorMessage: string;
        entity: UIEntity;
        constructor();
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-01-26
*************************************************/
declare module egretx {
    let ISceneTransition: symbol;
    interface ISceneTransition extends xgame.IXObject {
        start(scene: egret.DisplayObject): Promise<void>;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-01-26
*************************************************/
declare module egretx {
    interface IUITransition extends xgame.IXObject {
        start(ui: egret.DisplayObject, fadeOut?: boolean): Promise<void>;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-27
*************************************************/
declare module egretx {
    class SceneTransition extends xgame.XObject implements ISceneTransition {
        uiManager: IUIManager;
        constructor();
        start(scene: egret.DisplayObject): Promise<void>;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-01-12
*************************************************/
declare module egretx {
    class SceneFadeTransition extends SceneTransition {
        protected blockSize: number;
        protected duration: number;
        protected style: SceneMotion;
        constructor(blockSize?: number, duration?: number, style?: SceneMotion);
        start(scene: egret.DisplayObject): Promise<void>;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-01-12
*************************************************/
declare module egretx {
    class SceneHShuttersTransition extends SceneTransition {
        protected countBlocks: number;
        protected duration: number;
        constructor(countBlocks?: number, duration?: number);
        start(scene: egret.DisplayObject): Promise<void>;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-01-20
*************************************************/
declare module egretx {
    enum SceneMotion {
        TOP = 0,
        BOTTOM = 1,
        LEFT = 2,
        RIGHT = 3,
        RANDOM = 4,
        TOP_LEFT = 5,
        TOP_RIGHT = 6,
        BOTTOM_LEFT = 7,
        BOTTOM_RIGHT = 8
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-01-12
*************************************************/
declare module egretx {
    class SceneRotateTransition extends SceneTransition {
        protected blockSize: number;
        protected duration: number;
        protected style: SceneMotion;
        constructor(blockSize?: number, duration?: number, style?: SceneMotion);
        start(scene: egret.DisplayObject): Promise<void>;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-01-12
*************************************************/
declare module egretx {
    class SceneScaleTransition extends SceneTransition {
        protected blockSize: number;
        protected duration: number;
        protected style: SceneMotion;
        constructor(blockSize?: number, duration?: number, style?: SceneMotion);
        start(scene: egret.DisplayObject): Promise<void>;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-01-12
*************************************************/
declare module egretx {
    class SceneVShuttersTransition extends SceneTransition {
        protected countBlocks: number;
        protected duration: number;
        constructor(countBlocks?: number, duration?: number);
        start(scene: egret.DisplayObject): Promise<void>;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-01-26
*************************************************/
declare module egretx {
    class UIFadeTransition extends xgame.XObject implements IUITransition {
        protected duration: number;
        constructor(duration?: number);
        start(ui: egret.DisplayObject, fadeOut?: boolean): Promise<void>;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-01-26
*************************************************/
declare module egretx {
    class UIScaleTransition extends xgame.XObject implements IUITransition {
        protected duration: number;
        constructor(duration?: number);
        start(ui: egret.DisplayObject, fadeOut?: boolean): Promise<void>;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-25
*************************************************/
declare module egretx {
    class Bitmap extends egret.Bitmap implements xgame.IPoolable {
        fromPoolHashCode: number;
        release(): void;
        dispose(): void;
        removeSelf(): void;
    }
    class BitmapPools extends xgame.Singleton {
        private pools;
        constructor();
        fetch(): Bitmap;
        recycle(bitmap: Bitmap): void;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-17
*************************************************/
declare module egretx {
    class TipsHelper {
        static placeTipsWithHUD(tips: Popup, hud: egret.DisplayObject, gap?: number): void;
    }
}
