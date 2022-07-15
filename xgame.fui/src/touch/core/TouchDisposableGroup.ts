/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-19
*************************************************/
/// <reference path="../TouchManager.ts" />
/// <reference path="../interfaces/ITouchManager.ts" />


module fui {
    export class TouchDisposableGroup extends xgame.XObject implements xgame.IDisposable {
        private touches = new xgame.List<number>();
        @xgame.inject(ITouchManager)
        public manager: TouchManager;
        public constructor(private displayObject?: fairygui.GObject) {
            super();
            xgame.injectInstance(this);
            if (this.displayObject && this.displayObject.displayObject) {
                this.displayObject.displayObject.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemovedFromStage, this);
            }
        }
        private onRemovedFromStage(): void {
            this.dispose();
        }
        public dispose(): void {
            this.touches.forEach((guid) => {
                this.manager.removeTouchEvents(guid);
            });
            this.touches.clear();
            if (this.displayObject) {
                this.displayObject.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemovedFromStage, this);
            }
            this.manager = undefined;
            this.displayObject = undefined;
        }
        public addTouchBegin(target: fairygui.GObject, listener: (event: egret.TouchEvent) => void, thisObject?: any): void {
            this.manager.addTouchBegin(target, listener, thisObject);
            if (!this.touches.contains(target.hashCode)) {
                this.touches.add(target.hashCode);
            }
        }
        public removeTouchBegin(target: fairygui.GObject, listener: (event: egret.TouchEvent) => void, thisObject?: any): void {
            this.manager.removeTouchBegin(target, listener, thisObject);
            if (!this.touches.contains(target.hashCode)) {
                this.touches.add(target.hashCode);
            }
        }
        public addTouchMove(target: fairygui.GObject, listener: (event: egret.TouchEvent) => void, thisObject?: any): void {
            this.manager.addTouchMove(target, listener, thisObject);
            if (!this.touches.contains(target.hashCode)) {
                this.touches.add(target.hashCode);
            }
        }
        public removeTouchMove(target: fairygui.GObject, listener: (event: egret.TouchEvent) => void, thisObject?: any): void {
            this.manager.removeTouchMove(target, listener, thisObject);
            if (!this.touches.contains(target.hashCode)) {
                this.touches.add(target.hashCode);
            }
        }
        public addTouchEnd(target: fairygui.GObject, listener: (event: egret.TouchEvent) => void, thisObject?: any): void {
            this.manager.addTouchEnd(target, listener, thisObject);
            if (!this.touches.contains(target.hashCode)) {
                this.touches.add(target.hashCode);
            }
        }
        public removeTouchEnd(target: fairygui.GObject, listener: (event: egret.TouchEvent) => void, thisObject?: any): void {
            this.manager.removeTouchEnd(target, listener, thisObject);
            if (!this.touches.contains(target.hashCode)) {
                this.touches.add(target.hashCode);
            }
        }
        public addReleaseOutSide(target: fairygui.GObject, listener: (event: egret.TouchEvent) => void, thisObject?: any): void {
            this.manager.addReleaseOutSide(target, listener, thisObject);
            if (!this.touches.contains(target.hashCode)) {
                this.touches.add(target.hashCode);
            }
        }
        public removeReleaseOutSide(target: fairygui.GObject, listener: (event: egret.TouchEvent) => void, thisObject?: any): void {
            this.manager.removeReleaseOutSide(target, listener, thisObject);
            if (!this.touches.contains(target.hashCode)) {
                this.touches.add(target.hashCode);
            }
        }
        public addClick(target: fairygui.GObject, listener: (event: egret.TouchEvent) => void, thisObject?: any): void {
            this.manager.addClick(target, listener, thisObject);
            if (!this.touches.contains(target.hashCode)) {
                this.touches.add(target.hashCode);
            }
        }
        public removeClick(target: fairygui.GObject, listener: (event: egret.TouchEvent) => void, thisObject?: any): void {
            this.manager.removeClick(target, listener, thisObject);
            if (!this.touches.contains(target.hashCode)) {
                this.touches.add(target.hashCode);
            }
        }
        public addLongPress(target: fairygui.GObject, listener: (event: egret.TouchEvent) => void, thisObject?: any, time?: number): void {
            this.manager.addLongPress(target, listener, thisObject, time);
            if (!this.touches.contains(target.hashCode)) {
                this.touches.add(target.hashCode);
            }
        }
        public removeLongPress(target: fairygui.GObject, listener: (event: egret.TouchEvent) => void, thisObject?: any): void {
            this.manager.removeLongPress(target, listener, thisObject);
            if (!this.touches.contains(target.hashCode)) {
                this.touches.add(target.hashCode);
            }
        }
        public addRepeatPress(target: fairygui.GObject, listener: (event: egret.TouchEvent) => void, thisObject?: any, time?: number): void {
            this.manager.addRepeatPress(target, listener, thisObject, time);
            if (!this.touches.contains(target.hashCode)) {
                this.touches.add(target.hashCode);
            }
        }
        public removeRepeatPress(target: fairygui.GObject, listener: (event: egret.TouchEvent) => void, thisObject?: any): void {
            this.manager.removeRepeatPress(target, listener, thisObject);
            if (!this.touches.contains(target.hashCode)) {
                this.touches.add(target.hashCode);
            }
        }
    }
}