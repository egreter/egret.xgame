/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-20
*************************************************/
/// <reference path="../event/Event.ts" />
/// <reference path="../event/IEventDispatcher.ts" />


module xgame {
    export class PropertyEvent extends Event {
        public static PROPERTY_CHANGE: string = "propertyChange";
        public constructor(type: string, bubbles?: boolean, cancelable?: boolean, property?: string) {
            super(type, bubbles, cancelable);
            this.property = property;
        }

        public property: string;

        public static dispatchPropertyEvent(target: IEventDispatcher, eventType: string, property?: string): boolean {
            if (!target.hasEventListener(eventType)) {
                return true;
            }
            let event = Event.create(PropertyEvent, eventType);
            event.property = property;
            let result = target.dispatchEvent(event);
            Event.release(event);
            return result;
        }
    }

}