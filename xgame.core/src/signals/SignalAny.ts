/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2020-09-15
*************************************************/
/// <reference path="SignalBase.ts"/>
module xgame {
    /**
     * Provides a fast signal for use where any number of parameters are dispatched with the signal.
     */
    export class SignalAny extends SignalBase {
        public dispatch(...objects: any[]): void {
            this.startDispatch();
            let node: ListenerNode;
            for (node = this.head; node; node = node.next) {
                let cancel: boolean = node.execute.apply(node, objects);
                if (node.once) {
                    this.remove(node.listener);
                }
                if (cancel) {
                    break;
                }
            }
            this.endDispatch();
        }
    }
}