/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-19
*************************************************/
/// <reference path="./interfaces/ITouchManager.ts" />
/// <reference path="./interfaces/ITouchManagerInternal.ts" />

module fui {
    export const TOUCH_TAP_BETWEEN_TIME: number = 300;
    export const TOUCH_LONG_PRESS_TIME: number = 300;
    export const TOUCH_SCALE_RADIO: number = 0.96;
    export let touchClickLastTime: number = 0;
    @xgame.impl(xgame.IDisposable, ITouchManager, ITouchManagerInternal)
    export class TouchManager extends xgame.XObject implements xgame.IDisposable, ITouchManager, ITouchManagerInternal {
        public stage: egret.Stage;
        private delegates = new xgame.Dictionary<number, TouchDelegate>();
        public constructor(public main: egret.DisplayObjectContainer) {
            super();
            this.stage = main.stage;
        }
        public dispose(): void {
            this.delegates.clear((delegate: TouchDelegate) => {
                delegate.dispose();
            });
            touchClickLastTime = 0;
        }
        public initialize(): void {
            this.stage.addEventListener(egret.TouchEvent.LEAVE_STAGE, this.onLeaveStage, this);
        }
        private onLeaveStage(event: egret.TouchEvent): void {
            this.delegates.forValues((delegate) => {
                delegate.onLeaveStage(event);
            }, this);
        }
        public removeTouchEvents(target:fairygui.GObject | number): void {
            let guid: number = 0;
            if (typeof (target) === "number") {
                guid = target;
            }
            else {
                guid = target.hashCode;
            }
            if (!this.delegates.containsKey(guid)) {
                return;
            }
            let delegate = this.delegates.remove(guid);
            delegate.dispose();
        }
        public addTouchBegin(target:fairygui.GObject, listener: (event: egret.TouchEvent) => void, thisObject?: any): void {
            let guid = target.hashCode;
            let delegate = this.delegates.allocf(guid, () => {
                return new TouchDelegate(target);
            });
            delegate.addTouchBegin(listener, thisObject);
        }
        public removeTouchBegin(target:fairygui.GObject, listener: (event: egret.TouchEvent) => void, thisObject?: any): void {
            let guid = target.hashCode;
            if (!this.delegates.containsKey(guid)) {
                return;
            }
            let delegate = this.delegates.allocf(guid, () => {
                return new TouchDelegate(target);
            });
            delegate.removeTouchBegin(listener, thisObject);
        }
        public addTouchMove(target:fairygui.GObject, listener: (event: egret.TouchEvent) => void, thisObject?: any): void {
            let guid = target.hashCode;
            let delegate = this.delegates.allocf(guid, () => {
                return new TouchDelegate(target);
            });
            delegate.addTouchMove(listener, thisObject);
        }
        public removeTouchMove(target:fairygui.GObject, listener: (event: egret.TouchEvent) => void, thisObject?: any): void {
            let guid = target.hashCode;
            if (!this.delegates.containsKey(guid)) {
                return;
            }
            let delegate = this.delegates.allocf(guid, () => {
                return new TouchDelegate(target);
            });
            delegate.removeTouchMove(listener, thisObject);
        }
        public addTouchEnd(target:fairygui.GObject, listener: (event: egret.TouchEvent) => void, thisObject?: any): void {
            let guid = target.hashCode;
            let delegate = this.delegates.allocf(guid, () => {
                return new TouchDelegate(target);
            });
            delegate.addTouchEnd(listener, thisObject);
        }
        public removeTouchEnd(target:fairygui.GObject, listener: (event: egret.TouchEvent) => void, thisObject?: any): void {
            let guid = target.hashCode;
            if (!this.delegates.containsKey(guid)) {
                return;
            }
            let delegate = this.delegates.allocf(guid, () => {
                return new TouchDelegate(target);
            });
            delegate.removeTouchEnd(listener, thisObject);
        }
        public addReleaseOutSide(target:fairygui.GObject, listener: (event: egret.TouchEvent) => void, thisObject?: any): void {
            let guid = target.hashCode;
            let delegate = this.delegates.allocf(guid, () => {
                return new TouchDelegate(target);
            });
            delegate.addReleaseOutSide(listener, thisObject);
        }
        public removeReleaseOutSide(target:fairygui.GObject, listener: (event: egret.TouchEvent) => void, thisObject?: any): void {
            let guid = target.hashCode;
            if (!this.delegates.containsKey(guid)) {
                return;
            }
            let delegate = this.delegates.allocf(guid, () => {
                return new TouchDelegate(target);
            });
            delegate.removeReleaseOutSide(listener, thisObject);
        }
        public addClick(target:fairygui.GObject, listener: (event: egret.TouchEvent) => void, thisObject?: any): void {
            let guid = target.hashCode;
            let delegate = this.delegates.allocf(guid, () => {
                return new TouchDelegate(target);
            });
            delegate.addClick(listener, thisObject);
        }
        public removeClick(target:fairygui.GObject, listener: (event: egret.TouchEvent) => void, thisObject?: any): void {
            let guid = target.hashCode;
            if (!this.delegates.containsKey(guid)) {
                return;
            }
            let delegate = this.delegates.allocf(guid, () => {
                return new TouchDelegate(target);
            });
            delegate.removeClick(listener, thisObject);
        }
        public addLongPress(target:fairygui.GObject, listener: (event: egret.TouchEvent) => void, thisObject?: any, time?: number): void {
            let guid = target.hashCode;
            let delegate = this.delegates.allocf(guid, () => {
                return new TouchDelegate(target);
            });
            delegate.addLongPress(listener, thisObject, time);
        }
        public removeLongPress(target:fairygui.GObject, listener: (event: egret.TouchEvent) => void, thisObject?: any): void {
            let guid = target.hashCode;
            if (!this.delegates.containsKey(guid)) {
                return;
            }
            let delegate = this.delegates.allocf(guid, () => {
                return new TouchDelegate(target);
            });
            delegate.removeLongPress(listener, thisObject);
        }
        public addRepeatPress(target:fairygui.GObject, listener: (event: egret.TouchEvent) => void, thisObject?: any, time?: number): void {
            let guid = target.hashCode;
            let delegate = this.delegates.allocf(guid, () => {
                return new TouchDelegate(target);
            });
            delegate.addRepeatPress(listener, thisObject, time);
        }
        public removeRepeatPress(target:fairygui.GObject, listener: (event: egret.TouchEvent) => void, thisObject?: any): void {
            let guid = target.hashCode;
            if (!this.delegates.containsKey(guid)) {
                return;
            }
            let delegate = this.delegates.allocf(guid, () => {
                return new TouchDelegate(target);
            });
            delegate.removeRepeatPress(listener, thisObject);
        }
    }
}