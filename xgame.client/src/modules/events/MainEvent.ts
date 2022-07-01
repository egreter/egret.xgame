/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-02
*************************************************/
module ro {
    export class MainEvent extends xgame.Event {
        public static BAG_OPENED: string = "BAG_OPENED";
        public static BAG_CLOSED: string = "BAG_CLOSED";
        public constructor(type: string, data?: any) {
            super(type, false, false, data);
        }
    }
}