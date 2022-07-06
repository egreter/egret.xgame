/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-05
*************************************************/
module egretx {
    /**
     * 帧动画剪辑
     */
    export class AnimationClip extends eui.Component implements xgame.IPoolable {
        private $mc: MovieClip;
        public get mc(): MovieClip {
            return this.$mc;
        }
        public key: string;
        public movieClipname: string;
        public actionName: string;
        protected data: egret.MovieClipData;
        protected frameActions: Array<FrameActionItem> = [];
        public constructor(key: string, movieClipname?: string, actionName: string = "mc") {
            super();
            movieClipname = movieClipname || key;
            this.name = "{0}:{1}".format(key, movieClipname);
            this.key = key;
            this.movieClipname = movieClipname;
            this.actionName = actionName;
            this.touchChildren = false;
            this.touchEnabled = false;
        }
        private $timeline: string = Timeline.MAIN;
        public get timeline(): string {
            return this.$timeline;
        }
        public setTimeline(value: string): void {
            this.$timeline = value;
        }
        public fromPoolHashCode: number = 0;
        public release(): void {
            this.dispose();
            this.data = undefined;
            this.$mc = undefined;
            this.frameActions.length = 0;
        }
        public dispose(): void {
            this.removeSelf();
        }
        private $frameRate: number;
        public get frameRate(): number {
            return this.$frameRate;
        }
        public set frameRate(value: number) {
            this.$frameRate = value;
            if (this.mc) {
                this.mc.frameRate = this.frameRate;
            }
        }
        private $timeScale: number = 1.0;
        public get timeScale(): number {
            return this.$timeScale;
        }
        public set timeScale(value: number) {
            this.$timeScale = value;
            if (this.$mc) {
                this.$mc.timeScale = value;
            }
        }
        private $scale: number = 1;
        public get scale(): number {
            return this.$scale;
        }
        public set scale(value: number) {
            this.$scale = value;
            this.mc_scaleX = value;
            this.mc_scaleY = value;
        }
        private $mc_scaleX: number = 1;
        public get mc_scaleX(): number {
            return this.$mc_scaleX;
        }
        public set mc_scaleX(value: number) {
            this.$mc_scaleX = value;
            if (this.$mc) {
                this.$mc.scaleX = this.$mc_scaleX;
            }
        }
        private $mc_scaleY: number = 1;
        public get mc_scaleY(): number {
            return this.$mc_scaleY;
        }
        public set mc_scaleY(value: number) {
            this.$mc_scaleY = value;
            if (this.$mc) {
                this.$mc.scaleY = this.$mc_scaleY;
            }
        }

        public addFrameAction(action: Function, thisObject?: any, frame?: number): void {
            if (this.$mc) {
                if (isNaN(frame) || frame == 0) {
                    frame = this.data.numFrames;
                }
                this.$mc.addFrameAction(frame, action, thisObject);
            }
            else {
                this.frameActions.push(new FrameActionItem(action, thisObject, frame));
            }
        }
        public removeFrameActions(frame?: number): void {
            if (this.$mc) {
                if (isNaN(frame) || frame == 0) {
                    frame = this.data.numFrames;
                }
                this.$mc.removeFrameActions(frame);
            }
        }
        private callback_preload = new xgame.Signal0();
        public preload(): xgame.Signal0 {
            let self = this;
            if (this.$mc) {
                this.callback_preload.dispatch();
            }
            else {
                this.loadMC(true).then(() => {
                    self.callback_preload.dispatch();
                });
            }
            return this.callback_preload;
        }
        public playWithAutoRemove(actionName?: string): void {
            this.addFrameAction(() => {
                AnimationManager.Instance().recycle(this);
            }, this);
            this.play(1, actionName);
        }

        public play(playTimes?: number, actionName?: string): void {
            if (actionName != undefined) {
                this.actionName = actionName;
            }
            if (isNaN(playTimes)) {
                this.$playTimes = 0;
            }
            else {
                this.$playTimes = playTimes;
            }
            if (this.mc) {
                this._play();
            }
            else {
                if (this.data) {
                    this.initMC(this.data);
                }
                else {
                    this.loadMC();
                }
            }
        }

        protected async loadMC(is_preload?: boolean) {
            let resourceGroup = ResourceManager.Instance().getOrCreateGroup(ResourceType.MovieClip);
            resourceGroup.load(this.key);
            let res = AnimationManager.Instance().getRes(this.key);
            await ResourceManager.Instance().loadResAsync(res.json);
            await ResourceManager.Instance().loadResAsync(res.texture);
            this.data = AnimationManager.Instance().generateMovieClipData(this.key, this.movieClipname);
            this.initMC(this.data, is_preload);
        }
        private onFrameLabelEvent(event: egret.MovieClipEvent): void {
            this.dispatchEvent(event);
        }
        private onLoopCompleteEvent(event: egret.MovieClipEvent): void {
            this.dispatchEvent(event);
        }
        private onCompleteEvent(event: egret.MovieClipEvent): void {
            this.dispatchEvent(event);
        }
        public initMC(mcData: egret.MovieClipData, is_preload?: boolean): void {
            let res = AnimationManager.Instance().getRes(this.key);
            if (!RES.getRes(res.json)) {
                return
            };
            for (let item of this.frameActions) {
                if (item.frame == -1) {
                    item.frame = mcData.numFrames;
                }
            }
            this.$mc = new MovieClip(mcData, this.frameActions);
            this.mc.timeScale = this.timeScale;
            this.mc.setTimeline(this.timeline);
            this.mc.scaleX = this.mc_scaleX;
            this.mc.scaleY = this.mc_scaleY;
            if (MovieClip.DISPATCH_ENABLE) {
                this.mc.addEventListener(egret.MovieClipEvent.FRAME_LABEL, this.onFrameLabelEvent, this);
                this.mc.addEventListener(egret.MovieClipEvent.LOOP_COMPLETE, this.onLoopCompleteEvent, this);
                this.mc.addEventListener(egret.MovieClipEvent.COMPLETE, this.onCompleteEvent, this);
            }
            if (!isNaN(this.frameRate) && this.frameRate > 0) {
                this.mc.frameRate = this.frameRate;
            }
            this.frameActions.length = 0;
            this.addChild(this.$mc);
            if (!is_preload) {
                this._play();
            }
        }
        private $playTimes: number = 0;
        protected _play(): void {
            if (this.mc) {
                if (this.actionName) {
                    this.mc.gotoAndPlay(this.actionName, this.$playTimes);
                }
                else {
                    this.mc.play(this.$playTimes);
                }
            }
        }
        public stop(): void {
            if (this.mc) {
                this.mc.stop();
            }
        }

        public reset(): void {
            if (this.mc) {
                this.mc.removeFrameActions();
            }
        }
        public removeSelf(): void {
            this.stop();
            if (this.mc) {
                this.mc.removeEventListener(egret.MovieClipEvent.FRAME_LABEL, this.onFrameLabelEvent, this);
                this.mc.removeEventListener(egret.MovieClipEvent.LOOP_COMPLETE, this.onLoopCompleteEvent, this);
                this.mc.removeEventListener(egret.MovieClipEvent.COMPLETE, this.onCompleteEvent, this);
            }
            if (this.parent) {
                this.parent.removeChild(this);
            }
        }
    }
}