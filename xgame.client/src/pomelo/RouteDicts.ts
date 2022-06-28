/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-01
*************************************************/
module pomelo {
    export class RouteDicts {
        private static ids: Object = {};
        private static names: Object = {};

        public static init(dict: any): void {
            this.names = dict || {};
            let names = this.names;
            var ids = this.ids;
            for (let name in names) {
                ids[names[name]] = name;
            }
        }

        public static getID(name: string) {
            return this.names[name];
        }
        public static getName(id: number) {
            return this.ids[id];
        }
    }
}