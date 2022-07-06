/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-05
*************************************************/
module egretx {
    export class FrameAction {
        public name: string = "FrameAction";
        private $items: Array<FrameActionItem>;
        private $frame: number;
        public once: boolean;
        public get frame(): number {
            return this.$frame;
        }
        public set frame(value: number) {
            if (isNaN(value)) {
                this.$frame = -1;
            }
            else {
                this.$frame = value;
            }
        }
        public constructor(frame?: number) {
            this.frame = frame;
        }

        protected hasAction(action: Function, thisObject?: any): number {
            if (this.$items == null) {
                return -1;
            }
            for (let i: number = 0; i < this.$items.length; i++) {
                let item = this.$items[i];
                if (item.action == action && item.thisObject == thisObject) {
                    return i;
                }
            }
            return -1;
        }

        public addAction(action: Function, thisObject?: any): void {
            if (this.$items == null) {
                this.$items = [];
            }
            if (this.hasAction(action, thisObject) == -1) {
                this.$items[this.$items.length] = new FrameActionItem(action, thisObject, this.frame);
            }
        }

        public removeAction(action: Function, thisObject?: any): void {
            if (this.$items) {
                let index: number = this.hasAction(action, thisObject);
                if (index >= 0) {
                    this.$items.splice(index, 1);
                }
            }
        }

        public removeActions(): void {
            if (this.$items) {
                this.$items.length = 0;
            }
        }

        public executeActions(target: MovieClip, frameID: number): void {
            if (this.$items) {
                let list = this.$items.slice();
                for (let i: number = 0, len: number = list.length; i < len; ++i) {
                    let item: FrameActionItem = list[i];
                    let action: Function = item.action;
                    let numArgs: number = action.length;
                    if (numArgs == 0) {
                        action.call(item.thisObject);
                    }
                    else if (numArgs == 1) {
                        action.call(item.thisObject, target);
                    }
                    else if (numArgs == 2) {
                        action.call(item.thisObject, target, frameID);
                    }
                }
            }
        }

        public get numActions(): number {
            return this.$items ? this.$items.length : 0;
        }
    }
}