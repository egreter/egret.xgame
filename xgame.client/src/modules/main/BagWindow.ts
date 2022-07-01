/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-06-29
*************************************************/
/// <reference path="../events/EventModule.ts" />
/// <reference path="../events/MainEvent.ts" />

module ro {
    export class BagWindow extends egretx.Window {
        public static NAME: string = "BagWindow";
        @inject(xgame.IEventManager)
        public eventManager: xgame.IEventManager;
        public constructor() {
            super("resource/skins/main/BagWindowSkin.exml");
        }
        public onOpen(): void {
            super.onOpen();
            this.eventManager.dispatchEvent(EventModule.MAIN, MainEvent.BAG_OPENED, "BagWindow");
        }
    }
}