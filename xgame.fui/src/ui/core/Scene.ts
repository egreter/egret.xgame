/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-25
*************************************************/
/// <reference path="./UIPage.ts" />
/// <reference path="../structs/UILayerID.ts" />
/// <reference path="../structs/UIFlags.ts" />


module fui {
    export class Scene<T extends fairygui.GObject> extends UIPage<T> {
        public constructor(packageName?: string, comName?: string, userClass?: xgame.TClass<T>) {
            super(packageName, comName, userClass);
            this.flags = UIFlags.isScene | UIFlags.isFullScreen;
            this.setLayerID(UILayerID.Layer_2_Scene);
        }
    }
}