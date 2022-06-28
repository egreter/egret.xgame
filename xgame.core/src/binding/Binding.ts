
module xgame {

    function joinValues(templates: any[]): any {
        let first = templates[0];
        let value = first instanceof Watcher ? first.getValue() : first;
        let length = templates.length;
        for (let i = 1; i < length; i++) {
            let item = templates[i];
            if (item instanceof Watcher) {
                item = item.getValue();
            }
            value += item;
        }
        return value;
    }

    export class Binding {
        public static bindProperty(host: any, chain: string[], target: any, prop: string): Watcher {
            let watcher = Watcher.watch(host, chain, null, null);
            if (watcher) {
                let assign = function (value: any): void {
                    target[prop] = value;
                };
                watcher.setHandler(assign, null);
                assign(watcher.getValue());
            }
            return watcher;
        }

        public static bindHandler(host: any, chain: string[], handler: (value: any) => void, thisObject: any): Watcher {
            let watcher = Watcher.watch(host, chain, handler, thisObject);
            if (watcher) {
                handler.call(thisObject, watcher.getValue());
            }
            return watcher;
        }

        private static $bindProperties(host: any, templates: any[], chainIndex: number[], target: any, prop: string): Watcher {
            if (templates.length == 1 && chainIndex.length == 1) {
                return Binding.bindProperty(host, templates[0].split("."), target, prop);
            }

            let assign = function (): void {
                target[prop] = joinValues(templates);
            };
            let length = chainIndex.length;
            let watcher: Watcher;
            for (let i = 0; i < length; i++) {
                let index = chainIndex[i];
                let chain = templates[index].split(".");
                watcher = Watcher.watch(host, chain, null, null);
                if (watcher) {
                    templates[index] = watcher;
                    watcher.setHandler(assign, null);
                }
            }
            assign();
            return watcher;
        }
    }
}