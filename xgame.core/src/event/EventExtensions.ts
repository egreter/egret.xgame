/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-20
*************************************************/
/// <reference path="../core/DisposableGroup.ts" />
/// <reference path="../event/EventManager.ts" />
/// <reference path="../event/Event.ts" />
/// <reference path="../event/EventListener.ts" />

module xgame {
    xgame.DisposableGroup.prototype["addEventListener"] = function (...args: any[]): void {
        let self: DisposableGroup = this;
        let manager = EventManager.Instance();
        let listener: EventListener = manager.addEventListener.apply(manager, args);
        self.register(listener);
    }
    xgame.DisposableGroup.prototype["once"] = function (...args: any[]): void {
        let self: DisposableGroup = this;
        let manager = EventManager.Instance();
        let listener: EventListener = manager.addEventListener.apply(manager, args);
        self.register(listener);
    }
}
declare namespace xgame {
    interface DisposableGroup {
        addEventListener(type: string, listener: (e?: Event) => void, thisObject: any, useCapture?: boolean, priority?: number): void;
        once(type: string, listener: (e?: Event) => void, thisObject: any, useCapture?: boolean, priority?: number): void;
        addEventListener(moduleId: number, type: string, listener: (e?: Event) => void, thisObject: any, useCapture?: boolean, priority?: number): void;
        once(moduleId: number, type: string, listener: (e?: Event) => void, thisObject: any, useCapture?: boolean, priority?: number): void;
    }
}