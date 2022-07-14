/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-15
*************************************************/
/// <reference path="./UIPage.ts" />
/// <reference path="../structs/UIFlags.ts" />


module fui {
    export class Window<T extends fairygui.GObject> extends UIPage<T> {
        public constructor(packageName?: string, comName?: string, userClass?: xgame.TClass<T>) {
            super(packageName, comName, userClass);
            this.flags = UIFlags.isStack | UIFlags.isWindow | UIFlags.useMask | UIFlags.closeByMask;
            this.setLayerID(UILayerID.Layer_8_Window);
        }
    }
}