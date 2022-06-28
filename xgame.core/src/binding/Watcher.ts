/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-11
*************************************************/
/// <reference path="../utils/isImplementOf.ts" />

module xgame {

    let listeners = "__xgame_listeners__";
    let bindables = "__xgame_bindables__";
    let bindableCount = 0;

    function getPropertyDescriptor(host: any, property: string): any {
        let data = Object.getOwnPropertyDescriptor(host, property);
        if (data) {
            return data;
        }
        let prototype = Object.getPrototypeOf(host);
        if (prototype) {
            return getPropertyDescriptor(prototype, property);
        }
        return null;
    }

    function notifyListener(host: any, property: string): void {
        let list: any[] = host[listeners];
        let length = list.length;
        for (let i = 0; i < length; i += 2) {
            let listener: Function = list[i];
            let target: any = list[i + 1];
            listener.call(target, property);
        }
    }
    export class Watcher {

        public static watch(host: any, chain: string[], handler: (value: any) => void, thisObject: any): Watcher {
            if (chain.length > 0) {
                let property = chain.shift();
                let next = Watcher.watch(null, chain, handler, thisObject);
                let watcher = new Watcher(property, handler, thisObject, next);
                watcher.reset(host);
                return watcher;
            }
            else {
                return null;
            }
        }

        private static checkBindable(host: any, property: string): boolean {
            let list: string[] = host[bindables];
            if (list && list.indexOf(property) != -1) {
                return true;
            }
            let isEventDispatcher = isImplementOf(host, IEventDispatcher);
            if (!isEventDispatcher && !host[listeners]) {
                host[listeners] = [];
            }
            let data: PropertyDescriptor = getPropertyDescriptor(host, property);
            if (data && data.set && data.get) {
                let orgSet = data.set;
                data.set = function (value: any) {
                    if (this[property] != value) {
                        orgSet.call(this, value);
                        if (isEventDispatcher) {
                            PropertyEvent.dispatchPropertyEvent(this, PropertyEvent.PROPERTY_CHANGE, property);
                        }
                        else {
                            notifyListener(this, property);
                        }
                    }
                };
            }
            else if (!data || (!data.get && !data.set)) {
                bindableCount++;
                let newProp = "_" + bindableCount + property;
                host[newProp] = data ? data.value : null;
                data = <any>{ enumerable: true, configurable: true };
                data.get = function (): any {
                    return this[newProp];
                };
                data.set = function (value: any) {
                    if (this[newProp] != value) {
                        this[newProp] = value;
                        if (isEventDispatcher) {
                            PropertyEvent.dispatchPropertyEvent(this, PropertyEvent.PROPERTY_CHANGE, property);
                        }
                        else {
                            notifyListener(this, property);
                        }
                    }
                };
            }
            else {
                return false;
            }
            Object.defineProperty(host, property, data);
            registerBindable(host, property);
        }

        public constructor(property: string, handler: (value: any) => void, thisObject: any, next?: Watcher) {
            this.property = property;
            this.handler = handler;
            this.next = next;
            this.thisObject = thisObject;
        }

        private host: any;

        private property: string;

        private handler: (value: any) => void;

        private thisObject: any;

        private next: Watcher;

        private isExecuting: boolean = false;

        public unwatch(): void {
            this.reset(null);
            this.handler = null;
            if (this.next) {
                this.next.handler = null;
            }
        }

        public getValue(): any {
            if (this.next) {
                return this.next.getValue();
            }
            return this.getHostPropertyValue();
        }

        public setHandler(handler: (value: any) => void, thisObject: any): void {
            this.handler = handler;
            this.thisObject = thisObject;
            if (this.next) {
                this.next.setHandler(handler, thisObject);
            }
        }

        public reset(newHost: IEventDispatcher): void {
            let oldHost = this.host;
            if (oldHost) {
                if (isImplementOf(oldHost, IEventDispatcher)) {
                    oldHost.removeEventListener(PropertyEvent.PROPERTY_CHANGE, this.wrapHandler, this);
                }
                else {
                    let list: any[] = oldHost[listeners];
                    let index = list.indexOf(this);
                    list.splice(index - 1, 2);
                }
            }

            this.host = newHost;

            if (newHost) {
                Watcher.checkBindable(newHost, this.property);
                if (isImplementOf(newHost, IEventDispatcher)) {
                    newHost.addEventListener(PropertyEvent.PROPERTY_CHANGE, this.wrapHandler, this, false, 100);
                }
                else {
                    let list: any[] = newHost[listeners];
                    list.push(this.onPropertyChange);
                    list.push(this);
                }
            }


            if (this.next)
                this.next.reset(this.getHostPropertyValue());
        }


        private getHostPropertyValue(): any {
            return this.host ? this.host[this.property] : null;
        }

        private wrapHandler(e: Event): void {
            let event = e as PropertyEvent;
            this.onPropertyChange(event.property);
        }

        private onPropertyChange(property: string): void {
            if (property == this.property && !this.isExecuting) {
                try {
                    this.isExecuting = true;
                    if (this.next)
                        this.next.reset(this.getHostPropertyValue());
                    this.handler.call(this.thisObject, this.getValue());
                }
                finally {
                    this.isExecuting = false;
                }
            }
        }
    }

}