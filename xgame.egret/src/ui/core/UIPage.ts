/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-19
*************************************************/
/// <reference path="./UIComponent.ts" />
/// <reference path="../structs/UIAlign.ts" />
/// <reference path="../structs/UIDirection.ts" />


module egretx {
    export class UIPage extends UIComponent {
        @inject(egretx.IUIManager)
        public uiManager: egretx.IUIManager;
        @inject(egretx.IGuideManager)
        public guideManager: egretx.IGuideManager;
        @inject(egretx.IAnimationManager)
        public animationManager: egretx.IAnimationManager;
        @inject(egretx.IAudioManager)
        public audioManager: egretx.IAudioManager;
        //UI的类型参数,见UIFlags
        public flags: number = UIFlags.isStack | UIFlags.isFullScreen;
        public entity: IUIEntity;
        public constructor(public skinPath: string = null) {
            super();
        }
        private guideValues = new xgame.Dictionary<keyof egretx.IGuideInjectValue, number>();
        public injectGuideValue<T extends keyof IGuideInjectValue>(key: T, value: IGuideInjectValue[T], taskID?: number): void {
            this.guideManager.injectValue(key, value, taskID);
            this.guideValues.add(key, taskID || 0);
        }
        public readonly onComplete = new xgame.Signal0();
        private $isLoaded: boolean = false;
        public get isLoaded(): boolean {
            return this.$isLoaded;
        }
        private $isLoading: boolean = false;
        public get isLoading(): boolean {
            return this.$isLoading;
        }
        private deferred = new xgame.Deferred<void>();
        public async load(): Promise<void> {
            this.$isLoading = true;
            if (this.skinPath && !this.isLoaded) {
                this.once(egret.Event.COMPLETE, () => {
                    this.doComplete();
                }, this);
                this.skinName = this.skinPath;
            }
            else {
                this.doComplete();
            }
            return this.deferred.promise;
        }
        private doComplete(): void {
            egret.callLater(() => {
                this.$isLoaded = true;
                this.onComplete.dispatch();
                this.deferred.resolve();
            }, this);
        }

        protected $maskAlpha: number = 0.5;
        public get maskAlpha(): number {
            return this.$maskAlpha;
        }
        protected $maskColor: number = 0x000000;
        public get maskColor(): number {
            return this.$maskColor;
        }
        //UI的层级ID
        private $layerID: UILayerID = UILayerID.Layer_5_UI;
        public get layerID(): UILayerID {
            return this.$layerID;
        }
        public setLayerID(layerID: UILayerID): void {
            this.$layerID = layerID;
        }
        public onInit(): void {
            let self: UIPage & xgame.IEventSubject = this;
            if (self.addEventObserves) {
                self.addEventObserves();
            }
        }
        public onOpen(): void {

        }
        public onSceneChanging(): void {

        }
        public onClose(): void {
            if (this.guideValues.length) {
                this.guideValues.forKeys((key) => {
                    let taskID: number = this.guideValues.get(key);
                    this.guideManager.removeValue(key, taskID);
                }, this);
                this.guideValues.clear();
            }
            let self: UIPage & xgame.IEventSubject = this;
            if (self.removeEventObserves) {
                self.removeEventObserves();
            }
            this.entity = undefined;
        }
        public onShow(): void {

        }
        public onHide(): void {

        }
        public close(): void {
            if (this.entity) {
                this.entity.closePage();
            }
        }
        //================================================
        // Fade
        //================================================
        public async doFadeIn(): Promise<void> {

        }
        public async doFadeOut(): Promise<void> {

        }
    }
}