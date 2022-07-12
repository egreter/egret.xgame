/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-19
*************************************************/
module euix {
    export let ITouchManager = Symbol.for("ITouchManager");
    export interface ITouchManager extends xgame.IDisposable {
        removeTouchEvents(target: egret.DisplayObject | number): void;
        addTouchBegin(target: egret.DisplayObject, listener: Function, thisObject?: any, scale?: boolean): void;
        removeTouchBegin(target: egret.DisplayObject, listener: Function, thisObject?: any): void;
        addTouchMove(target: egret.DisplayObject, listener: Function, thisObject?: any): void;
        removeTouchMove(target: egret.DisplayObject, listener: Function, thisObject?: any): void;
        addTouchEnd(target: egret.DisplayObject, listener: Function, thisObject?: any): void;
        removeTouchEnd(target: egret.DisplayObject, listener: Function, thisObject?: any): void;
        addReleaseOutSide(target: egret.DisplayObject, listener: Function, thisObject?: any): void;
        removeReleaseOutSide(target: egret.DisplayObject, listener: Function, thisObject?: any): void;
        addClick(target: egret.DisplayObject, listener: Function, thisObject?: any, scale?: boolean): void;
        removeClick(target: egret.DisplayObject, listener: Function, thisObject?: any): void;
        addLongPress(target: egret.DisplayObject, listener: Function, thisObject?: any, time?: number, scale?: boolean): void;
        removeLongPress(target: egret.DisplayObject, listener: Function, thisObject?: any): void;
        addRepeatPress(target: egret.DisplayObject, listener: Function, thisObject?: any, time?: number, scale?: boolean): void;
        removeRepeatPress(target: egret.DisplayObject, listener: Function, thisObject?: any): void;
    }
}