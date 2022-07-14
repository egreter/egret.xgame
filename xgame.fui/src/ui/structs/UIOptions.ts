/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-08
*************************************************/
module fui {
    export class UIOptions extends xgame.XObject {
        public name: string;

        public uiClass: xgame.TClass<UIPage<fairygui.GObject>>;
        public groupName: string;

        public uiRoot: fairygui.GComponent;

        public layerID: number;

        public openArgs: any[];

        public hud: fairygui.GObject;

        public gap: number = 10;

        public errorMessage: string;

        public entity: UIEntity;
        public constructor() {
            super();
        }
    }
}