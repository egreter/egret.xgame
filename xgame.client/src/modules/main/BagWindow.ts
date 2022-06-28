/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-06-29
*************************************************/
module ro {
    export class BagWindow extends egretx.Window {
        public static NAME: string = "BagWindow";
        public constructor() {
            super("resource/skins/main/BagWindowSkin.exml");
        }
    }
}