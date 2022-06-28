/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-20
*************************************************/
/// <reference path="../core/XObject.ts" />
/// <reference path="../core/DisposableObject.ts" />
/// <reference path="../interfaces/IDisposable.ts" />
/// <reference path="./IEventManager.ts" />

module xgame {
    export class EventListener extends DisposableObject  {
        public constructor(private manager: IEventManager, public moduleid: number, public type: string, public listener: (e?: xgame.Event) => void, public thisObject?: any, public useCapture?: boolean, public priority?: number) {
            super();
        }
        public dispose(): void {
            this.manager.removeEventListener(this.moduleid, this.type, this.listener, this.thisObject, this.useCapture);
        }
    }
}