/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-19
*************************************************/
module egretx {
    export class TouchBehaviours {
        private disposableGroup: TouchDisposableGroup;
        public setTouchManager(target: egret.DisplayObject): void {
            if (this.disposableGroup) {
                return;
            }
            this.disposableGroup = new TouchDisposableGroup(target);
        }
        public addTouchBegin(target: egret.DisplayObject, listener: (event: egret.TouchEvent) => void, thisObject?: any, scale?: boolean): void {
            this.disposableGroup.addTouchBegin(target, listener, thisObject, scale);
        }
        public removeTouchBegin(target: egret.DisplayObject, listener: (event: egret.TouchEvent) => void, thisObject?: any): void {
            this.disposableGroup.removeTouchBegin(target, listener, thisObject);
        }
        public addTouchMove(target: egret.DisplayObject, listener: (event: egret.TouchEvent) => void, thisObject?: any): void {
            this.disposableGroup.addTouchMove(target, listener, thisObject);
        }
        public removeTouchMove(target: egret.DisplayObject, listener: (event: egret.TouchEvent) => void, thisObject?: any): void {
            this.disposableGroup.removeTouchMove(target, listener, thisObject);
        }
        public addTouchEnd(target: egret.DisplayObject, listener: (event: egret.TouchEvent) => void, thisObject?: any): void {
            this.disposableGroup.addTouchEnd(target, listener, thisObject);
        }
        public removeTouchEnd(target: egret.DisplayObject, listener: (event: egret.TouchEvent) => void, thisObject?: any): void {
            this.disposableGroup.removeTouchEnd(target, listener, thisObject);
        }
        public addReleaseOutSide(target: egret.DisplayObject, listener: (event: egret.TouchEvent) => void, thisObject?: any): void {
            this.disposableGroup.addReleaseOutSide(target, listener, thisObject);
        }
        public removeReleaseOutSide(target: egret.DisplayObject, listener: (event: egret.TouchEvent) => void, thisObject?: any): void {
            this.disposableGroup.removeReleaseOutSide(target, listener, thisObject);
        }
        public addClick(target: egret.DisplayObject, listener: (event: egret.TouchEvent) => void, thisObject?: any, scale?: boolean): void {
            this.disposableGroup.addClick(target, listener, thisObject, scale);
        }
        public removeClick(target: egret.DisplayObject, listener: (event: egret.TouchEvent) => void, thisObject?: any): void {
            this.disposableGroup.removeClick(target, listener, thisObject);
        }
        public addLongPress(target: egret.DisplayObject, listener: (event: egret.TouchEvent) => void, thisObject?: any, time?: number, scale?: boolean): void {
            this.disposableGroup.addLongPress(target, listener, thisObject, time, scale);
        }
        public removeLongPress(target: egret.DisplayObject, listener: (event: egret.TouchEvent) => void, thisObject?: any): void {
            this.disposableGroup.removeLongPress(target, listener, thisObject);
        }
        public addRepeatPress(target: egret.DisplayObject, listener: (event: egret.TouchEvent) => void, thisObject?: any, time?: number, scale?: boolean): void {
            this.disposableGroup.addRepeatPress(target, listener, thisObject, time, scale);
        }
        public removeRepeatPress(target: egret.DisplayObject, listener: (event: egret.TouchEvent) => void, thisObject?: any): void {
            this.disposableGroup.removeRepeatPress(target, listener, thisObject);
        }
    }
}