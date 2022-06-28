/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-19
*************************************************/
/// <reference path="../core/XObject.ts" />
/// <reference path="./Event.ts" />


module xgame {
    export let IEventDispatcher = Symbol.for("IEventDispatcher");
    export interface IEventDispatcher extends XObject {
        addEventListener(type: string, listener: (e?: Event) => void, thisObject: any, useCapture?: boolean, priority?: number): void;
        once(type: string, listener: (e?: Event) => void, thisObject: any, useCapture?: boolean, priority?: number): void;
        removeEventListener(type: string, listener: (e?: Event) => void, thisObject: any, useCapture?: boolean): void;
        hasEventListener(type: string): boolean;
        dispatchEvent(event: Event): boolean;
        willTrigger(type: string): boolean;
    }
}