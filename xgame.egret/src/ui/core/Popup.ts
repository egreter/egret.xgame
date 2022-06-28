/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-15
*************************************************/
/// <reference path="./UIPage.ts" />
/// <reference path="./Window.ts" />
/// <reference path="../structs/UIFlags.ts" />
/// <reference path="../structs/UILayerID.ts" />


module egretx {
    const PropertyNames: string[] = ["x", "y", "width", "height", "visible", "scaleX", "scaleY"];
    export class RenderWatcher extends xgame.XObject {
        private views: egret.DisplayObject[] = [];
        private watchers: eui.Watcher[] = [];
        private dict = new xgame.Dictionary<number, eui.Watcher[]>();
        private callback_onChanged = new xgame.Signal0();
        public constructor(...views: egret.DisplayObject[]) {
            super();
            for (let view of views) {
                this.addWatcher(view);
            }
        }
        public addWatcher(view: egret.DisplayObject): void {
            if (this.views.indexOf(view) >= 0) {
                return;
            }
            this.views.push(view);
            let list: eui.Watcher[] = this.dict.get(view.hashCode);
            if (!list) {
                list = [];
                this.dict.add(view.hashCode, list);
            }
            for (let p of PropertyNames) {
                let watcher = eui.Binding.bindHandler(view, [p], this.onWatcher, this);
                this.watchers.push(watcher);
                list.push(watcher);
            }
        }
        public removeWatcher(view: egret.DisplayObject): void {
            if (!this.dict.containsKey(view.hashCode)) {
                return;
            }
            let list = this.dict.get(view.hashCode);
            let len = this.watchers.length;
            for (let watcher of list) {
                let indexOf = this.watchers.indexOf(watcher);
                if (indexOf > -1) {
                    this.watchers.splice(indexOf, 1);
                }
                watcher.unwatch();
            }
            list.length = 0;
            this.dict.remove(view.hashCode);
        }
        private onWatcher(value: number): void {
            this.lateDispatch();
        }
        private isDispatching: boolean = false;
        private lateDispatch(): void {
            if (this.isDispatching) {
                return;
            }
            this.isDispatching = true;
            egret.callLater(() => {
                this.callback_onChanged.dispatch();
                this.isDispatching = false;
            }, this);
        }
        public onChanged(): xgame.Signal0 {
            return this.callback_onChanged;
        }
        public dispose(): void {
            this.callback_onChanged.removeAll();
            while (this.watchers.length) {
                let watcher = this.watchers.shift();
                watcher.unwatch();
            }
            if (this.views) {
                this.views.length = 0;
            }
            this.dict.clear();
        }
    }
    export class Popup extends UIPage {
        public readonly renderWatcher = new RenderWatcher();
        public readonly offset = new egret.Point();
        public constructor(skinPath?: string) {
            super(skinPath);
            this.flags = UIFlags.isStack | UIFlags.isPopupMenu | UIFlags.useMask | UIFlags.closeByMask | UIFlags.allowMultiple;
            this.setLayerID(UILayerID.Layer_10_Tips);
            this.$maskAlpha = 0;
            this.renderWatcher.addWatcher(this);
        }
        protected $uiDirection: UIDirection = UIDirection.ANY;
        public get uiDirection(): UIDirection {
            return this.$uiDirection;
        }
        protected $uiAlign: UIAlign = UIAlign.CENTER;
        public get uiAlign(): UIAlign {
            return this.$uiAlign;
        }
        protected allowDirections: UIDirection[];
        public allowUIDirection(direction: UIDirection): boolean {
            if (this.allowDirections && this.allowDirections.length) {
                return this.allowDirections.indexOf(direction) >= 0;
            }
            return true;
        }
        public fixedUIDirection(direction: UIDirection): void {

        }
        public onClose(): void {
            if (this.renderWatcher) {
                this.renderWatcher.dispose();
            }
            super.onClose();
        }
    }
}