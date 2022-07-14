/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-18
*************************************************/
/// <reference path="./UIPage.ts" />
/// <reference path="../structs/UIFlags.ts" />

module fui {
    export class PluginPage<T extends fairygui.GObject> extends UIPage<T> {
        public constructor(packageName?: string, comName?: string, userClass?: xgame.TClass<T>) {
            super(packageName, comName, userClass);
            this.flags = UIFlags.isPlugin;
        }
    }
}