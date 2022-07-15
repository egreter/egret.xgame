/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-19
*************************************************/
module fui {
    export class TouchBehaviours {
        private disposableGroup: TouchDisposableGroup;
        public setTouchManager(target: fairygui.GObject): void {
            if (this.disposableGroup) {
                return;
            }
            this.disposableGroup = new TouchDisposableGroup(target);
        }
        public addTouchBegin(target: fairygui.GObject, listener: (event: egret.TouchEvent) => void, thisObject?: any): void {
            this.disposableGroup.addTouchBegin(target, listener, thisObject);
        }
        public removeTouchBegin(target: fairygui.GObject, listener: (event: egret.TouchEvent) => void, thisObject?: any): void {
            this.disposableGroup.removeTouchBegin(target, listener, thisObject);
        }
        public addTouchMove(target: fairygui.GObject, listener: (event: egret.TouchEvent) => void, thisObject?: any): void {
            this.disposableGroup.addTouchMove(target, listener, thisObject);
        }
        public removeTouchMove(target: fairygui.GObject, listener: (event: egret.TouchEvent) => void, thisObject?: any): void {
            this.disposableGroup.removeTouchMove(target, listener, thisObject);
        }
        public addTouchEnd(target: fairygui.GObject, listener: (event: egret.TouchEvent) => void, thisObject?: any): void {
            this.disposableGroup.addTouchEnd(target, listener, thisObject);
        }
        public removeTouchEnd(target: fairygui.GObject, listener: (event: egret.TouchEvent) => void, thisObject?: any): void {
            this.disposableGroup.removeTouchEnd(target, listener, thisObject);
        }
        public addReleaseOutSide(target: fairygui.GObject, listener: (event: egret.TouchEvent) => void, thisObject?: any): void {
            this.disposableGroup.addReleaseOutSide(target, listener, thisObject);
        }
        public removeReleaseOutSide(target: fairygui.GObject, listener: (event: egret.TouchEvent) => void, thisObject?: any): void {
            this.disposableGroup.removeReleaseOutSide(target, listener, thisObject);
        }
        public addClick(target: fairygui.GObject, listener: (event: egret.TouchEvent) => void, thisObject?: any): void {
            this.disposableGroup.addClick(target, listener, thisObject);
        }
        public removeClick(target: fairygui.GObject, listener: (event: egret.TouchEvent) => void, thisObject?: any): void {
            this.disposableGroup.removeClick(target, listener, thisObject);
        }
        public addLongPress(target: fairygui.GObject, listener: (event: egret.TouchEvent) => void, thisObject?: any, time?: number): void {
            this.disposableGroup.addLongPress(target, listener, thisObject, time);
        }
        public removeLongPress(target: fairygui.GObject, listener: (event: egret.TouchEvent) => void, thisObject?: any): void {
            this.disposableGroup.removeLongPress(target, listener, thisObject);
        }
        public addRepeatPress(target: fairygui.GObject, listener: (event: egret.TouchEvent) => void, thisObject?: any, time?: number): void {
            this.disposableGroup.addRepeatPress(target, listener, thisObject, time);
        }
        public removeRepeatPress(target: fairygui.GObject, listener: (event: egret.TouchEvent) => void, thisObject?: any): void {
            this.disposableGroup.removeRepeatPress(target, listener, thisObject);
        }
    }
}