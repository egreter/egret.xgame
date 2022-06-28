/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-19
*************************************************/
/// <reference path="../core/XObject.ts" />
/// <reference path="./Event.ts" />


module xgame {

    export let IEventManager = Symbol.for("IEventManager");

    export interface IEventManager extends IXObject {
        addEventListener(type: string, listener: (e?: Event) => void, thisObject: any, useCapture?: boolean, priority?: number): EventListener;
        once(type: string, listener: (e?: Event) => void, thisObject: any, useCapture?: boolean, priority?: number): EventListener;
        removeEventListener(type: string, listener: (e?: Event) => void, thisObject: any, useCapture?: boolean): void;
        hasEventListener(type: string): boolean;
        dispatchEvent(event: Event): boolean;
        dispatchEvent(event: string, data?: any): boolean;

        //模块化事件
        addEventListener(moduleId: number, type: string, listener: (e?: Event) => void, thisObject: any, useCapture?: boolean, priority?: number): EventListener;
        once(moduleId: number, type: string, listener: (e?: Event) => void, thisObject: any, useCapture?: boolean, priority?: number): EventListener;
        removeEventListener(moduleId: number, type: string, listener: (e?: Event) => void, thisObject: any, useCapture?: boolean): void;
        hasEventListener(moduleId: number, type: string): boolean;
        dispatchEvent(moduleId: number, event: Event): boolean;
        dispatchEvent(moduleId: number, event: string, data?: any): boolean;

    }
}