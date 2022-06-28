/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-20
*************************************************/

module xgame {

    let key = "__xgame_bindables__";

    export function registerBindable(instance: any, property: string): void {
        if (instance.hasOwnProperty(key)) {
            instance[key].push(property);
        }
        else {
            let list = [property];
            if (instance[key]) {
                list = instance[key].concat(list);
            }
            instance[key] = list;
        }
    }
}