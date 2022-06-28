/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-08
*************************************************/
module xgame {
    export function getPrototype(target: any): any {
        let type = typeof (target);
        if (!target || (type != "object" && !target.prototype)) {
            return undefined;
        }
        let prototype: any = target.prototype ? target.prototype : Object.getPrototypeOf(target);
        return prototype;
    }
    export function getPrototypeChains(target: any): any[] {
        let chains: any[] = [];
        let parent = target;
        while (parent) {
            chains.push(parent);
            parent = getPrototype(parent);
        }
        return chains;
    }
}