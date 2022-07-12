/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-25
*************************************************/
/// <reference path="./UIPage.ts" />
/// <reference path="../structs/UILayerID.ts" />
/// <reference path="../structs/UIFlags.ts" />


module euix {
    export class Scene extends UIPage {
        public constructor(skinPath?: string) {
            super(skinPath);
            this.flags = UIFlags.Scene | UIFlags.isFullScreen;
            this.setLayerID(UILayerID.Layer_2_Scene);
        }
    }
}