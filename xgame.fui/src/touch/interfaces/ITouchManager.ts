/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-19
*************************************************/
module fui {
    export let ITouchManager = Symbol.for("fui.ITouchManager");
    export interface ITouchManager extends xgame.IDisposable {
        removeTouchEvents(target: fairygui.GObject | number): void;
        addTouchBegin(target: fairygui.GObject, listener: Function, thisObject?: any, scale?: boolean): void;
        removeTouchBegin(target: fairygui.GObject, listener: Function, thisObject?: any): void;
        addTouchMove(target: fairygui.GObject, listener: Function, thisObject?: any): void;
        removeTouchMove(target: fairygui.GObject, listener: Function, thisObject?: any): void;
        addTouchEnd(target: fairygui.GObject, listener: Function, thisObject?: any): void;
        removeTouchEnd(target: fairygui.GObject, listener: Function, thisObject?: any): void;
        addReleaseOutSide(target: fairygui.GObject, listener: Function, thisObject?: any): void;
        removeReleaseOutSide(target: fairygui.GObject, listener: Function, thisObject?: any): void;
        addClick(target: fairygui.GObject, listener: Function, thisObject?: any, scale?: boolean): void;
        removeClick(target: fairygui.GObject, listener: Function, thisObject?: any): void;
        addLongPress(target: fairygui.GObject, listener: Function, thisObject?: any, time?: number, scale?: boolean): void;
        removeLongPress(target: fairygui.GObject, listener: Function, thisObject?: any): void;
        addRepeatPress(target: fairygui.GObject, listener: Function, thisObject?: any, time?: number, scale?: boolean): void;
        removeRepeatPress(target: fairygui.GObject, listener: Function, thisObject?: any): void;
    }
}