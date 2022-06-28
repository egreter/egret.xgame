/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-19
*************************************************/
/// <reference path="../core/XObject.ts" />
/// <reference path="../utils/Singleton.ts" />
/// <reference path="./IEventManager.ts" />
/// <reference path="./EventDispatcher.ts" />
/// <reference path="./EventListener.ts" />

module xgame {
    export interface IEventObserve {
        eventName?: string;
        moduleId?: number;
        once?: boolean;
        priority?: number;
        callback?: Function;
        thisObject?: any;
    }
    export interface IEventSubject {
        __eventview__?: boolean;
        eventDisposableGroup?: DisposableGroup;
        eventObserves?: IEventObserve[];
        addEventObserves?(): void;
        removeEventObserves?(): void;
    }

    let GlobalModuleId: number = 9999;
    @impl(IEventManager)
    export class EventManager extends Singleton implements IEventManager {
        private moduleDispatchers = new Map<number, EventDispatcher>();
        public constructor() {
            super();
        }
        public addEventListener(type: string, listener: (e?: Event) => void, thisObject: any, useCapture?: boolean, priority?: number): EventListener;
        public addEventListener(moduleId: number, type: string, listener: (e?: Event) => void, thisObject: any, useCapture?: boolean, priority?: number): EventListener;
        public addEventListener(...args: any[]): EventListener {
            let moduleId = GlobalModuleId;
            let type: string, listener: (e: Event) => void, thisObject: any, useCapture: boolean, priority: number;
            if (typeof (args[1]) == "function") {
                type = args[0];
                listener = args[1];
                thisObject = args[2];
                useCapture = args[3];
                priority = args[4];
            }
            else {
                moduleId = args[0];
                type = args[1];
                listener = args[2];
                thisObject = args[3];
                useCapture = args[4];
                priority = args[5];
            }
            let dispatcher = this.getDispatcher(moduleId);
            dispatcher.addEventListener(type, listener, thisObject, useCapture, priority);
            return new EventListener(this, moduleId, type, listener, thisObject, useCapture, priority);
        }
        public once(type: string, listener: (e?: Event) => void, thisObject: any, useCapture?: boolean, priority?: number): EventListener;
        public once(moduleId: number, type: string, listener: (e?: Event) => void, thisObject: any, useCapture?: boolean, priority?: number): EventListener;
        public once(...args: any[]): EventListener {
            let moduleId = GlobalModuleId;
            let type: string, listener: (e: Event) => void, thisObject: any, useCapture: boolean, priority: number;
            if (typeof (args[0]) == "string") {
                type = args[0];
                listener = args[1];
                thisObject = args[2];
                useCapture = args[3];
                priority = args[4];
            }
            else {
                moduleId = args[0];
                type = args[1];
                listener = args[2];
                thisObject = args[3];
                useCapture = args[4];
                priority = args[5];
            }
            if (!moduleId) {
                moduleId = GlobalModuleId;
            }
            let dispatcher = this.getDispatcher(moduleId);
            dispatcher.once(type, listener, thisObject, useCapture, priority);
            return new EventListener(this, moduleId, type, listener, thisObject, useCapture, priority);
        }
        public removeEventListener(type: string, listener: (e?: Event) => void, thisObject: any, useCapture?: boolean): void;
        public removeEventListener(moduleId: number, type: string, listener: (e?: Event) => void, thisObject: any, useCapture?: boolean): void;
        public removeEventListener(...args: any[]): void {
            let moduleId = GlobalModuleId;
            let type: string, listener: (e: Event) => void, thisObject: any, useCapture: boolean;
            if (typeof (args[0]) == "string") {
                type = args[0];
                listener = args[1];
                thisObject = args[2];
                useCapture = args[3];
            }
            else {
                moduleId = args[0];
                type = args[1];
                listener = args[2];
                thisObject = args[3];
                useCapture = args[4];
            }
            let dispatcher = this.getDispatcher(moduleId);
            dispatcher.removeEventListener(type, listener, thisObject, useCapture);
        }
        public hasEventListener(type: string): boolean;
        public hasEventListener(moduleId: number, type: string): boolean;
        public hasEventListener(...args: any[]): boolean {
            let moduleId: number, type: string;
            if (typeof (args[0]) == "number") {
                moduleId = args[0];
                type = args[1];
            }
            else {
                moduleId = GlobalModuleId;
                type = args[0];
            }
            let dispatcher = this.getDispatcher(moduleId);
            return dispatcher.hasEventListener(type);
        }
        public dispatchEvent(event: Event): boolean;
        public dispatchEvent(event: string, data?: any): boolean;
        public dispatchEvent(moduleId: number, event: Event): boolean;
        public dispatchEvent(moduleId: number, event: string, data?: any): boolean;
        public dispatchEvent(...args: any[]): boolean {
            let moduleId: number, event: any, data: any;
            if (typeof (args[0]) == "number") {
                moduleId = args[0];
                event = args[1];
                data = args[2];
            }
            else {
                moduleId = GlobalModuleId;
                event = args[0];
                data = args[1];
            }
            let dispatcher = this.getDispatcher(moduleId);
            if (typeof (event) == "string") {
                return dispatcher.dispatchEvent(new Event(event, false, false, data));
            }
            else {
                return dispatcher.dispatchEvent(event);
            }
        }
        private getDispatcher(moduleId?: number): EventDispatcher {
            moduleId = moduleId ? moduleId : GlobalModuleId;
            if (this.moduleDispatchers.has(moduleId)) {
                return this.moduleDispatchers.get(moduleId);
            }
            let dispatcher = new EventDispatcher();
            this.moduleDispatchers.set(moduleId, dispatcher);
            return dispatcher;
        }
    }
}