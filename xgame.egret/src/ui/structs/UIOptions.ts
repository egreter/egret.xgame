/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-08
*************************************************/
module egretx {
    export class UIOptions extends xgame.XObject {
        public name: string;

        public uiClass: xgame.TClass<UIPage>;
        public groupName: string;

        public uiRoot: egret.DisplayObjectContainer;

        public layerID: number;

        public openArgs: any[];

        public hud: egret.DisplayObject;

        public gap: number = 10;

        public errorMessage: string;

        public entity: UIEntity;
        public constructor() {
            super();
        }
    }
}