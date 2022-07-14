/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-06-29
*************************************************/
module fui {
    export interface ITipsView extends xgame.IPoolable {
        setMessage(message: string): void;
        playAnimation(): Promise<void>;
        doFadeIn(): Promise<void>;
        doFadeOut(): Promise<void>;
        doStay(): Promise<void>;
    }
    export enum TipsState {
        FadeIn = 1,
        Stay,
        FadeOut,
    }
    export class TipsView extends fairygui.GComponent implements ITipsView {
        public fromPoolHashCode: number;
        private $state: TipsState;
        public get state(): TipsState {
            return this.$state;
        }
        public set state(value: TipsState) {
            this.$state = value;
        }
        public durationFadeIn: number = 500;
        public durationStay: number = 1000;
        public durationFadeOut: number = 500;
        public durationPosition: number = 500;
        public time: number = 0;
        public index: number = 0;
        public release(): void {

        }
        public dispose(): void {
            egret.Tween.removeTweens(this);
        }
        public setMessage(message: string): void {
            this.time = this.durationStay;
            this.state = TipsState.FadeIn;
            this.y = -this.height / 2;
            this.alpha = 0;
        }
        public doFadeIn(): Promise<void> {
            return new Promise<void>((resolve) => {
                let alpha = this.alpha;
                let duration = Math.floor(this.durationFadeIn * (1 - alpha));
                egret.Tween.get(this).to({ alpha: 1 }, duration).call(() => {
                    resolve();
                }, this);
            });
        }
        public doFadeOut(): Promise<void> {
            return new Promise<void>((resolve) => {
                let alpha = this.alpha;
                let duration = Math.floor(this.durationFadeOut * alpha);
                egret.Tween.get(this).to({ alpha: 0 }, duration).call(() => {
                    resolve();
                }, this);
            });
        }
        public doStay(): Promise<void> {
            return new Promise<void>((resolve) => {
                egret.Tween.get(this).to({ time: 0 }, this.time).call(() => {
                    resolve();
                }, this);
            });
        }
        public async playAnimation(): Promise<void> {
            egret.Tween.removeTweens(this);
            egret.Tween.get(this).to({ y: -this.index * this.height - this.height / 2 }, this.durationPosition);
            if (this.state == TipsState.FadeIn) {
                await this.doFadeIn();
                this.state = TipsState.Stay;
                await this.doStay();
                this.state = TipsState.FadeOut;
                await this.doFadeOut();
            }
            else if (this.state == TipsState.Stay) {
                await this.doStay();
                this.state = TipsState.FadeOut;
                await this.doFadeOut();
            }
            else if (this.state == TipsState.FadeOut) {
                await this.doFadeOut();
            }
        }
    }
    export class TipsManager extends xgame.Singleton {
        private pools = new xgame.PoolObject<TipsView>(TipsView);
        public parallelMax: number = 5;
        private $container: fairygui.GComponent;
        public fetch: () => TipsView;
        public get container(): fairygui.GComponent {
            return this.$container;
        }
        public constructor() {
            super();
        }
        protected waitQueues: string[] = [];
        public append(message: string): void {
            if (this.container.numChildren < this.parallelMax) {
                this.play(message);
            }
            else {
                this.waitQueues.push(message);
            }
        }
        private play(message: string): void {
            let view = this.pools.fetch(() => {
                return this.fetch();
            }, this);
            this.container.addChildAt(view, 0);
            view.setMessage(message);
            for (let i = 0; i < this.container.numChildren; i++) {
                let view = this.container.getChildAt(i) as TipsView;
                view.index = i;
                egret.Tween.removeTweens(view);
                view.playAnimation().then(() => {
                    this.endView(view);
                });
            }
        }

        private endView(view: TipsView): void {
            if (view.parent) {
                this.container.removeChild(view);
            }
            view.dispose();
            this.pools.recycle(view);
            if (this.waitQueues.length > 0 && this.container.numChildren < this.parallelMax) {
                let message = this.waitQueues.shift();
                this.play(message);
            }
        }
        public clear(): void {
            while (this.container.numChildren) {
                let view = this.container.removeChildAt(0) as TipsView;
                view.dispose();
                this.pools.recycle(view);
            }
            this.waitQueues.length = 0;
        }
        public initialize(): void {
            this.$container = new fairygui.GComponent();
            this.container.width = this.container.height = 1;
            this.container.touchable = false;
            this.container.opaque = false;
            let parent = xgame.that.getService<fui.IUIManager>(fui.IUIManager).getLayerManager(fui.UILayerID.Layer_12_Toast);
            parent.addChild(this.container);
            this.container.x = parent.width >> 1;
            this.container.y = parent.height >> 1;
            this.container.addRelation(parent, fairygui.RelationType.Center_Center);
        }
    }
    export function tips(message: string): void {
        TipsManager.Instance().append(message);
    }
}