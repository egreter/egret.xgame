/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-15
*************************************************/
/// <reference path="./UIPage.ts" />
/// <reference path="../structs/UIFlags.ts" />


module euix {
    export class Window extends UIPage {
        public constructor(skinPath?: string) {
            super(skinPath);
            this.flags = UIFlags.isStack | UIFlags.isWindow | UIFlags.useMask | UIFlags.closeByMask;
            this.setLayerID(UILayerID.Layer_8_Window);
        }
    }
}