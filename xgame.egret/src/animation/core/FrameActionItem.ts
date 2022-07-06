/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-05
*************************************************/
module egretx {
    export class FrameActionItem {
        public action: Function;
        public thisObject: any;
        public frame: number;
        public constructor(action: Function, thisObject?: any, frame?: number) {
            this.action = action;
            this.thisObject = thisObject;
            if (isNaN(frame) || frame == 0) {
                this.frame = -1;
            }
            else {
                this.frame = frame;
            }
        }
    }
}