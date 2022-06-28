/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-18
*************************************************/
/// <reference path="../event/EventManager.ts" />
/// <reference path="../event/EventExtensions.ts" />


module xgame {

    export function event(eventName: string, moduleId?: number, priority?: number) {
        return (target: IEventSubject, key: string, descriptor: TypedPropertyDescriptor<Function>) => {
            let method = descriptor.value;
            let invoke = descriptor.value = function () {
                method.apply(this, arguments);
            }
            if (!target.__eventview__) {
                target.__eventview__ = true;
                target.eventDisposableGroup = new DisposableGroup();
                target.eventObserves = [];
                target.addEventObserves = function (): void {
                    let self: IEventSubject = this;
                    if (self.eventObserves && self.eventObserves.length) {
                        for (let o of self.eventObserves) {
                            self.eventDisposableGroup.addEventListener(o.moduleId, o.eventName, <any>o.callback, self, false, priority);
                        }
                    }
                }
                target.removeEventObserves = function (): void {
                    let self: IEventSubject = this;
                    if (self.eventObserves && self.eventObserves.length) {
                        self.eventObserves.length = 0;
                    }
                    if (self.eventDisposableGroup) {
                        self.eventDisposableGroup.dispose();
                    }
                }
            }
            let item = <IEventObserve>{ eventName: eventName, moduleId: moduleId, callback: invoke, priority: priority };
            target.eventObserves.push(item);
        }
    }
}