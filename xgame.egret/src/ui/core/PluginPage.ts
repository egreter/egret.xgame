/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-18
*************************************************/
/// <reference path="./UIPage.ts" />
/// <reference path="../structs/UIFlags.ts" />

module egretx {
    export class PluginPage extends UIPage {
        public constructor(skinPath?: string) {
            super(skinPath);
            this.flags = UIFlags.isPlugin;
        }
    }
}