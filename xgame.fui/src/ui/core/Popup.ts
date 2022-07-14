/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-15
*************************************************/
/// <reference path="./UIPage.ts" />
/// <reference path="./Window.ts" />
/// <reference path="../structs/UIFlags.ts" />
/// <reference path="../structs/UILayerID.ts" />


module fui {
    const PropertyNames: string[] = ["x", "y", "width", "height", "visible", "scaleX", "scaleY"];
    export class RenderWatcher extends xgame.XObject {
        private views = new xgame.Dictionary<number, fairygui.GObject>();
        private callback_onChanged = new xgame.Signal0();
        public constructor(...views: fairygui.GObject[]) {
            super();
            for (let view of views) {
                this.addWatcher(view);
            }
        }
        public addWatcher(view: fairygui.GObject): void {
            if (this.views.containsKey(view.hashCode)) {
                return;
            }
            this.views.add(view.hashCode, view);
            view.addEventListener(fairygui.GObject.SIZE_CHANGED, this.onWatcher, this);
            this.onWatcher();
        }
        public removeWatcher(view: fairygui.GObject): void {
            if (!this.views.containsKey(view.hashCode)) {
                return;
            }
            view.removeEventListener(fairygui.GObject.SIZE_CHANGED, this.onWatcher, this);
            this.views.remove(view.hashCode);
        }
        private onWatcher(): void {
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
            this.views.clear((view) => {
                view.removeEventListener(fairygui.GObject.SIZE_CHANGED, this.onWatcher, this);
            });
        }
    }
    export class Popup<T extends fairygui.GObject> extends UIPage<T> {
        public readonly renderWatcher = new RenderWatcher();
        public readonly offset = new egret.Point();
        public constructor(packageName?: string, comName?: string, userClass?: xgame.TClass<T>) {
            super(packageName, comName, userClass);
            this.flags = UIFlags.isStack | UIFlags.isPopupMenu | UIFlags.useMask | UIFlags.closeByMask | UIFlags.allowMultiple;
            this.setLayerID(UILayerID.Layer_10_Popup);
            this.$maskAlpha = 0;
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
        public onOpen(): void {
            this.renderWatcher.addWatcher(this.view);
            super.onOpen();
        }
        public onClose(): void {
            if (this.renderWatcher) {
                this.renderWatcher.dispose();
            }
            super.onClose();
        }
    }
}