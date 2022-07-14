/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-06-29
*************************************************/

import { inject } from "../../decorators/inject";
import { EventModule } from "../events/EventModule";
import { MainEvent } from "../events/MainEvent";

export class BagWindow extends fui.Window<fairygui.GObject> {
    public static NAME: string = "BagWindow";
    @inject(xgame.IEventManager)
    public eventManager: xgame.IEventManager;
    public constructor() {
        super("demo", "BagWindow");
    }
    public onOpen(): void {
        super.onOpen();
        this.eventManager.dispatchEvent(EventModule.MAIN, MainEvent.BAG_OPENED, "BagWindow");
    }
}