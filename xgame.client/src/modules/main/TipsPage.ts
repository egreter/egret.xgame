/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-06-29
*************************************************/
module ro {
    export class TipsPage extends egretx.Popup {
        public static NAME: string = "TipsPage";
        public constructor() {
            super("resource/skins/main/TipsPageSkin.exml");
            this.$uiDirection = egretx.UIDirection.BOTTOM;
            this.$uiAlign = egretx.UIAlign.LEFT;
        }
    }
}