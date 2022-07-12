/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-05
*************************************************/
module egretx {
    /**
     * 从egret.MoveClip修改而来
     */
    export class MovieClip extends egret.DisplayObject implements xgame.IAnimatable {
        public static DISPATCH_ENABLE: boolean = false;
        private $actions = new xgame.Dictionary<number, FrameAction>();
        public frameAction: FrameAction;
        private $timeline: string = xgame.Timeline.MAIN;
        public get timeline(): string {
            return this.$timeline;
        }
        public setTimeline(value: string): void {
            this.$timeline = value;
        }
        //Render Property
        $texture: egret.Texture = null;

        //Render Property
        // private offsetPoint: egret.Point = egret.Point.create(0, 0);
        private offsetPoint: egret.Point = new egret.Point(0, 0);

        //Data Property
        $movieClipData: egret.MovieClipData = null;

        /**
         * @private
         */
        private frames: any[] = null;
        /**
         * @private
         */
        $totalFrames: number = 0;
        /**
         * @version Egret 2.4
         * @platform Web,Native
         * @private
         */
        public frameLabels: any[] = null;
        /**
         * @private
         */
        $frameLabelStart: number = 0;
        /**
         * @private
         */
        $frameLabelEnd: number = 0;
        /**
         * @version Egret 2.4
         * @platform Web,Native
         * @private
         */
        public frameEvents: any[] = null;
        /**
         * @private
         */
        private frameIntervalTime: number = 0;
        /**
         * @private
         */
        $eventPool: string[] = null;

        //Animation Property
        $isPlaying: boolean = false;
        /**
         * @private
         */
        private isStopped: boolean = true;
        /**
         * @private
         */
        private playTimes: number = 0;

        /**
         * @private
         */
        $currentFrameNum: number = 0;
        /**
         * @private
         */
        $nextFrameNum: number = 1;

        /**
         * @private
         */
        private displayedKeyFrameNum: number = 0;

        /**
         * @private
         */
        private passedTime: number = 0;

        /**
         * @private
         */
        private $frameRate: number = NaN;

        private invokeActions: Array<FrameActionItem>;
        //Construct Function
        /**
         * 创建新的 MovieClip 实例。创建 MovieClip 之后，调用舞台上的显示对象容器的addElement方法。
         * @param movieClipData {movieClipData} 被引用的 movieClipData 对象
         * @version Egret 2.4
         * @platform Web,Native
         */
        constructor(movieClipData?: egret.MovieClipData, invokeActions?: Array<FrameActionItem>) {
            super();
            this.invokeActions = invokeActions;
            this.$smoothing = egret.Bitmap.defaultSmoothing;
            this.setMovieClipData(movieClipData);
            if (!egret.nativeRender) {
                this.$renderNode = new egret.sys.NormalBitmapNode();
            }
        }

        public setData(movieClipData?: egret.MovieClipData, invokeActions?: FrameActionItem[]): void {
            this.setInvokeActions(invokeActions);
            this.setMovieClipData(movieClipData, true);
        }

        public setInvokeActions(invokeActions: FrameActionItem[]): void {
            this.invokeActions = invokeActions;
        }

        private $timeScale: number = 1.0;
        public get timeScale(): number {
            return this.$timeScale;
        }
        public set timeScale(value: number) {
            this.$timeScale = value;
        }

        protected createNativeDisplayObject(): void {
            this.$nativeDisplayObject = new egret_native.NativeDisplayObject(egret_native.NativeObjectType.BITMAP_TEXT);
        }

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
        public get smoothing(): boolean {
            return this.$smoothing;
        }

        public set smoothing(value: boolean) {
            if (value == this.$smoothing) {
                return;
            }
            this.$smoothing = value;
        }

        /**
         * @private
         *
         */
        $init() {
            this.$reset();
            let movieClipData: egret.MovieClipData = this.$movieClipData;
            if (movieClipData && movieClipData.$isDataValid()) {
                this.frames = movieClipData.frames;
                this.$totalFrames = movieClipData.numFrames;
                this.frameLabels = movieClipData.labels;
                this.frameEvents = movieClipData.events;
                this.$frameRate = movieClipData.frameRate;
                this.frameIntervalTime = 1000 / this.$frameRate;
                this.fillMovieFrames();
                this._initFrame();
            }
        }

        private fillMovieFrames(): void {
            let len: number = this.movieClipData.frames.length;
            this.$actions.add(len, new FrameAction(len));
            if (this.invokeActions && this.invokeActions.length > 0) {
                for (let item of this.invokeActions) {
                    if (item.frame == -1) {
                        item.frame = this.movieClipData.numFrames;
                    }
                    let action = this.getActionAt(item.frame);
                    if (action) {
                        action.addAction(item.action, item.thisObject);
                    }
                    else {
                        //this.logger.logDebug(LogChannel.RONTIAN,"frame not found=>" + item.frame + "=>" + this.frames.length + "=>" + this.movieClipData.numFrames);
                    }
                }
            }
        }

        /**
         * @private
         *
         */
        $reset(): void {
            this.frames = null;
            this.playTimes = 0;
            this.$isPlaying = false;
            this.setIsStopped(true);
            this.$currentFrameNum = 0;
            this.$nextFrameNum = 1;
            this.displayedKeyFrameNum = 0;
            this.passedTime = 0;
            this.$eventPool = [];
            this.$actions.clear();
        }

        /**
         * @private
         *
         */
        private _initFrame(): void {
            if (this.$movieClipData.$isTextureValid()) {
                this.advanceFrame();
                this.constructFrame();
            }
        }


        /**
         * @private
         */
        $updateRenderNode(): void {
            let texture = this.$texture;
            if (texture) {
                let offsetX: number = Math.round(this.offsetPoint.x);
                let offsetY: number = Math.round(this.offsetPoint.y);
                let bitmapWidth: number = texture.$bitmapWidth;
                let bitmapHeight: number = texture.$bitmapHeight;
                let textureWidth: number = texture.$getTextureWidth();
                let textureHeight: number = texture.$getTextureHeight();
                //this.logger.logDebug(LogChannel.RONTIAN, textureWidth, textureHeight, this.width, this.height);
                let destW: number = Math.round(texture.$getScaleBitmapWidth());
                let destH: number = Math.round(texture.$getScaleBitmapHeight());
                let sourceWidth: number = texture.$sourceWidth;
                let sourceHeight: number = texture.$sourceHeight;

                egret.sys.BitmapNode.$updateTextureData(<egret.sys.NormalBitmapNode>this.$renderNode, texture.$bitmapData, texture.$bitmapX, texture.$bitmapY,
                    bitmapWidth, bitmapHeight, offsetX, offsetY, textureWidth, textureHeight, destW, destH, sourceWidth, sourceHeight, egret.BitmapFillMode.SCALE, this.$smoothing);
            }
        }

        /**
         * @private
         */
        $measureContentBounds(bounds: egret.Rectangle): void {
            let texture = this.$texture;
            if (texture) {
                let x: number = this.offsetPoint.x;
                let y: number = this.offsetPoint.y;
                let w: number = texture.$getTextureWidth();
                let h: number = texture.$getTextureHeight();

                bounds.setTo(x, y, w, h);
            }
            else {
                bounds.setEmpty();
            }
        }

        /**
         * @private
         *
         * @param stage
         * @param nestLevel
         */
        $onAddToStage(stage: egret.Stage, nestLevel: number): void {
            super.$onAddToStage(stage, nestLevel);
            if (this.$isPlaying && this.$totalFrames > 1) {
                this.setIsStopped(false);
            }
        }

        /**
         * @private
         *
         */
        $onRemoveFromStage(): void {
            this.setIsStopped(true);
            super.$onRemoveFromStage();

        }

        //Data Function
        /**
         * @private
         * 返回帧标签为指定字符串的FrameLabel对象
         * @param labelName {string} 帧标签名
         * @param ignoreCase {boolean} 是否忽略大小写，可选参数，默认false
         * @returns {egret.FrameLabel} FrameLabel对象
         */
        private getFrameLabelByName(labelName: string, ignoreCase: boolean = false): egret.FrameLabel {
            if (ignoreCase) {
                labelName = labelName.toLowerCase();
            }
            let frameLabels = this.frameLabels;
            if (frameLabels) {
                let outputFramelabel: egret.FrameLabel = null;
                for (let i = 0; i < frameLabels.length; i++) {
                    outputFramelabel = frameLabels[i];
                    if (ignoreCase ? outputFramelabel.name.toLowerCase() == labelName : outputFramelabel.name == labelName) {
                        return outputFramelabel;
                    }
                }
            }
            return null;
        }
        /**
         * @private
         * 根据帧标签，设置开始和结束的帧数
         * @param labelName {string} 帧标签名
         */
        private getFrameStartEnd(labelName: string): void {
            let frameLabels = this.frameLabels;
            if (frameLabels) {
                let outputFramelabel: egret.FrameLabel = null;
                for (let i = 0; i < frameLabels.length; i++) {
                    outputFramelabel = frameLabels[i];
                    if (labelName == outputFramelabel.name) {
                        this.$frameLabelStart = outputFramelabel.frame;
                        this.$frameLabelEnd = outputFramelabel.end;
                        break;
                    }
                }
            }
        }

        /**
         * @private
         * 返回指定序号的帧的FrameLabel对象
         * @param frame {number} 帧序号
         * @returns {egret.FrameLabel} FrameLabel对象
         */
        private getFrameLabelByFrame(frame: number): egret.FrameLabel {
            let frameLabels = this.frameLabels;
            if (frameLabels) {
                let outputFramelabel: egret.FrameLabel = null;
                for (let i = 0; i < frameLabels.length; i++) {
                    outputFramelabel = frameLabels[i];
                    if (outputFramelabel.frame == frame) {
                        return outputFramelabel;
                    }
                }
            }
            return null;
        }

        /**
         * @private
         * 返回指定序号的帧对应的FrameLabel对象，如果当前帧没有标签，则返回前面最近的有标签的帧的FrameLabel对象
         * @method egret.MovieClip#getFrameLabelForFrame
         * @param frame {number} 帧序号
         * @returns {egret.FrameLabel} FrameLabel对象
         */
        private getFrameLabelForFrame(frame: number): egret.FrameLabel {
            let outputFrameLabel: egret.FrameLabel = null;
            let tempFrameLabel: egret.FrameLabel = null;
            let frameLabels = this.frameLabels;
            if (frameLabels) {
                for (let i = 0; i < frameLabels.length; i++) {
                    tempFrameLabel = frameLabels[i];
                    if (tempFrameLabel.frame > frame) {
                        return outputFrameLabel;
                    }
                    outputFrameLabel = tempFrameLabel;
                }
            }
            return outputFrameLabel;
        }

        //Animation Function

        /**
         * 继续播放当前动画
         * @param playTimes {number} 播放次数。 参数为整数，可选参数，>=1：设定播放次数，<0：循环播放，默认值 0：不改变播放次数(MovieClip初始播放次数设置为1)，
         * @version Egret 2.4
         * @platform Web,Native
         */
        public play(playTimes: number = 0): void {
            this.lastTime = egret.getTimer();
            this.passedTime = 0;
            this.$isPlaying = true;
            this.setPlayTimes(playTimes);
            if (this.$totalFrames > 1 && this.$stage) {
                this.setIsStopped(false);
            }
        }

        /**
         * 暂停播放动画
         * @version Egret 2.4
         * @platform Web,Native
         */
        public stop(): void {
            this.$isPlaying = false;
            this.setIsStopped(true);
        }

        /**
         * 将播放头移到前一帧并停止
         * @version Egret 2.4
         * @platform Web,Native
         */
        public prevFrame(): void {
            this.gotoAndStop(this.$currentFrameNum - 1);
        }

        /**
         * 跳到后一帧并停止
         * @version Egret 2.4
         * @platform Web,Native
         */
        public nextFrame(): void {
            this.gotoAndStop(this.$currentFrameNum + 1);
        }

        /**
         * 将播放头移到指定帧并播放
         * @param frame {any} 指定帧的帧号或帧标签
         * @param playTimes {number} 播放次数。 参数为整数，可选参数，>=1：设定播放次数，<0：循环播放，默认值 0：不改变播放次数，
         * @version Egret 2.4
         * @platform Web,Native
         */
        public gotoAndPlay(frame: string | number, playTimes: number = 0): void {
            if (arguments.length == 0 || arguments.length > 2) {
                egret.$error(1022, "MovieClip.gotoAndPlay()");
            }
            if (typeof frame === "string") {
                this.getFrameStartEnd(frame);
            } else {
                this.$frameLabelStart = 0;
                this.$frameLabelEnd = 0;
            }
            this.play(playTimes);
            this.gotoFrame(frame);
        }

        /**
         * 将播放头移到指定帧并停止
         * @param frame {any} 指定帧的帧号或帧标签
         * @version Egret 2.4
         * @platform Web,Native
         */
        public gotoAndStop(frame: string | number): void {
            if (arguments.length != 1) {
                egret.$error(1022, "MovieClip.gotoAndStop()");
            }
            this.stop();
            this.gotoFrame(frame);
        }

        /**
         * @private
         *
         * @param frame
         */
        private gotoFrame(frame: string | number): void {
            let frameNum: number;
            if (typeof frame === "string") {
                let fb = this.getFrameLabelByName(frame);
                if (!fb) {
                    return;
                }
                frameNum = fb.frame;
            } else {
                frameNum = parseInt(frame + '', 10);
                if (<any>frameNum != frame) {
                    egret.$error(1022, "Frame Label Not Found");
                }
            }
            //this.logger.logDebug(LogChannel.RONTIAN,"gotoFrame=>{0}", frameNum);
            if (frameNum < 1) {
                frameNum = 1;
            } else if (frameNum > this.$totalFrames) {
                frameNum = this.$totalFrames;
            }
            // if (frameNum == this.$nextFrameNum) {
            //     return;
            // }
            this.$nextFrameNum = frameNum;
            this.advanceFrame();
            this.constructFrame();
            this.handlePendingEvent();
        }

        /**
         * @private
         */
        private lastTime: number = 0;

        public advanceTime(time: number): void {
            let self = this;
            let deltaTime: number = time * this.timeScale;
            let frameIntervalTime: number = self.frameIntervalTime;
            let currentTime = self.passedTime + deltaTime;
            self.passedTime = currentTime % frameIntervalTime;
            let num: number = currentTime / frameIntervalTime;
            if (num < 1) {
                return;
            }
            while (num >= 1) {
                num--;
                self.$nextFrameNum++;
                if (self.$nextFrameNum > self.$totalFrames || (self.$frameLabelStart > 0 && self.$nextFrameNum > self.$frameLabelEnd)) {
                    if (self.playTimes == -1) {
                        self.$eventPool.push(egret.Event.LOOP_COMPLETE);
                        self.$nextFrameNum = 1;
                    }
                    else {
                        self.playTimes--;
                        if (self.playTimes > 0) {
                            self.$eventPool.push(egret.Event.LOOP_COMPLETE);
                            self.$nextFrameNum = 1;
                        }
                        else {
                            self.$nextFrameNum = self.$totalFrames;
                            self.$eventPool.push(egret.Event.COMPLETE);
                            self.stop();
                            break;
                        }
                    }
                }
                if (self.$currentFrameNum == self.$frameLabelEnd) {
                    self.$nextFrameNum = self.$frameLabelStart;
                }
                self.advanceFrame();
            }
            self.constructFrame();
            self.handlePendingEvent();
        }

        /**
         * @private
         *
         */
        private advanceFrame(): void {
            this.$currentFrameNum = this.$nextFrameNum;
            let event = this.frameEvents[this.$nextFrameNum];
            if (event && event != "") {
                if (MovieClip.DISPATCH_ENABLE) {
                    egret.MovieClipEvent.dispatchMovieClipEvent(this, egret.MovieClipEvent.FRAME_LABEL, event);
                }
            }
        }

        /**
         * @private
         *
         */
        private constructFrame() {
            let self = this;
            let currentFrameNum: number = self.$currentFrameNum;
            if (self.displayedKeyFrameNum == currentFrameNum) {
                return;
            }

            let texture = self.$movieClipData.getTextureByFrame(currentFrameNum);
            self.$texture = texture;
            self.$movieClipData.$getOffsetByFrame(currentFrameNum, self.offsetPoint);

            self.displayedKeyFrameNum = currentFrameNum;
            self.$renderDirty = true;
            if (egret.nativeRender) {
                self.$nativeDisplayObject.setDataToBitmapNode(self.$nativeDisplayObject.id, texture,
                    [texture.$bitmapX, texture.$bitmapY, texture.$bitmapWidth, texture.$bitmapHeight,
                    self.offsetPoint.x, self.offsetPoint.y, texture.$getScaleBitmapWidth(), texture.$getScaleBitmapHeight(),
                    texture.$sourceWidth, texture.$sourceHeight]);
                //todo 负数offsetPoint
                self.$nativeDisplayObject.setWidth(texture.$getTextureWidth() + self.offsetPoint.x);
                self.$nativeDisplayObject.setHeight(texture.$getTextureHeight() + self.offsetPoint.y);
            }
            else {
                let p = self.$parent;
                if (p && !p.$cacheDirty) {
                    p.$cacheDirty = true;
                    p.$cacheDirtyUp();
                }
                let maskedObject = self.$maskedObject;
                if (maskedObject && !maskedObject.$cacheDirty) {
                    maskedObject.$cacheDirty = true;
                    maskedObject.$cacheDirtyUp();
                }
            }
            if (this.$actions.containsKey(this.currentFrame)) {
                let action: FrameAction = this.$actions.get(this.currentFrame);
                if (action && action.numActions > 0) {
                    action.executeActions(this, currentFrameNum);
                }
            }
        }

        /**
         * @private
         *
         */
        public $renderFrame(): void {
            let self = this;
            self.$texture = self.$movieClipData.getTextureByFrame(self.$currentFrameNum);
            self.$renderDirty = true;
            let p = self.$parent;
            if (p && !p.$cacheDirty) {
                p.$cacheDirty = true;
                p.$cacheDirtyUp();
            }
            let maskedObject = self.$maskedObject;
            if (maskedObject && !maskedObject.$cacheDirty) {
                maskedObject.$cacheDirty = true;
                maskedObject.$cacheDirtyUp();
            }
        }

        /**
         * @private
         *
         */
        private handlePendingEvent(): void {
            if (this.$eventPool.length != 0) {
                this.$eventPool.reverse();
                let eventPool = this.$eventPool;
                let length = eventPool.length;
                let isComplete = false;
                let isLoopComplete = false;

                for (let i = 0; i < length; i++) {
                    let event: string = eventPool.pop();
                    if (event == egret.Event.LOOP_COMPLETE) {
                        isLoopComplete = true;
                    } else if (event == egret.Event.COMPLETE) {
                        isComplete = true;
                    } else {
                        if (MovieClip.DISPATCH_ENABLE) {
                            this.dispatchEventWith(event);
                        }
                    }
                }

                if (isLoopComplete) {
                    if (MovieClip.DISPATCH_ENABLE) {
                        this.dispatchEventWith(egret.Event.LOOP_COMPLETE);
                    }
                }
                if (isComplete) {
                    if (MovieClip.DISPATCH_ENABLE) {
                        this.dispatchEventWith(egret.Event.COMPLETE);
                    }
                }
            }
        }

        //Properties
        /**
         * MovieClip 实例中帧的总数
         * @version Egret 2.4
         * @platform Web,Native
         */
        public get totalFrames(): number {
            return this.$totalFrames;
        }

        /**
         * MovieClip 实例当前播放的帧的序号
         * @version Egret 2.4
         * @platform Web,Native
         */
        public get currentFrame(): number {
            return this.$currentFrameNum;
        }

        /**
         * MovieClip 实例当前播放的帧的标签。如果当前帧没有标签，则 currentFrameLabel返回null。
         * @version Egret 2.4
         * @platform Web,Native
         */
        public get currentFrameLabel(): string {
            let label = this.getFrameLabelByFrame(this.$currentFrameNum);
            return label && label.name;
        }

        /**
         * 当前播放的帧对应的标签，如果当前帧没有标签，则currentLabel返回包含标签的先前帧的标签。如果当前帧和先前帧都不包含标签，currentLabel返回null。
         * @version Egret 2.4
         * @platform Web,Native
         */
        public get currentLabel(): string {
            let label: egret.FrameLabel = this.getFrameLabelForFrame(this.$currentFrameNum);
            return label ? label.name : null;
        }

        /**
         * MovieClip 实例的帧频
         * @version Egret 2.4
         * @platform Web,Native
         */
        public get frameRate(): number {
            return this.$frameRate;
        }

        public set frameRate(value: number) {
            if (value == this.$frameRate) {
                return;
            }
            this.$frameRate = value;
            this.frameIntervalTime = 1000 / this.$frameRate;
        }

        /**
         * MovieClip 实例当前是否正在播放
         * @version Egret 2.4
         * @platform Web,Native
         */
        public get isPlaying(): boolean {
            return this.$isPlaying;
        }

        /**
         * MovieClip数据源
         */
        public set movieClipData(value: egret.MovieClipData) {
            this.setMovieClipData(value);
        }

        /**
         * @version Egret 2.4
         * @platform Web,Native
         */
        public get movieClipData(): egret.MovieClipData {
            return this.$movieClipData;
        }

        /**
         * @private
         *
         * @param value
         */
        private setMovieClipData(value: egret.MovieClipData, force?: boolean) {
            if (this.$movieClipData == value && !force) {
                return;
            }
            this.$movieClipData = value;
            this.$init();
        }

        /**
         * @private
         *
         * @param value
         */
        private setPlayTimes(value: number) {
            if (value < 0 || value >= 1) {
                this.playTimes = value < 0 ? -1 : Math.floor(value);
            }
        }

        /**
         * @private
         *
         * @param value
         */
        private setIsStopped(value: boolean) {
            if (this.isStopped == value) {
                return;
            }
            this.isStopped = value;
            if (value) {
                xgame.TimelineManager.Instance().getOrCreateTimeline(this.timeline).remove(this);
            }
            else {
                this.playTimes = this.playTimes == 0 ? 1 : this.playTimes;
                this.lastTime = egret.getTimer();
                xgame.TimelineManager.Instance().getOrCreateTimeline(this.timeline).add(this);
            }
        }

        private getActionAt(frame: number): FrameAction {
            if (frame < 1 || frame > this.totalFrames) {
                return null;
            }
            if (!this.$actions.containsKey(frame)) {
                this.$actions.add(frame, new FrameAction(frame));
            }
            return this.$actions.get(frame);
        }
        public addFrameAction(frame: number, action: Function, thisObject?: any): void {
            this.getActionAt(frame).addAction(action, thisObject);
        }

        public removeFrameAction(frame: number, action: Function, thisObject?: any): void {
            this.getActionAt(frame).removeAction(action, thisObject);
        }

        public removeFrameActions(frame?: number): void {
            if (isNaN(frame)) {
                this.$actions.forValues((v) => {
                    v.removeActions();
                }, this);
            }
            else {
                this.getActionAt(frame).removeActions();
            }
        }
    }
}
