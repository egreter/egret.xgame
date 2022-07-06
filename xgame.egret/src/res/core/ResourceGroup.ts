/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-04
*************************************************/
module egretx {
    /**
     * 资源组
     */
    export class ResourceGroup<T> extends xgame.XObject {
        public readonly keys = new xgame.Dictionary<string, string[]>();
        public constructor(public manager: ResourceManager, public readonly resourceType: string) {
            super();
        }
        public createInstance(key: string): T {
            return null;
        }
        public async load(key: string, ...args: any[]): Promise<any> {

        }
        public release(key: string): void {
            if (this.keys.containsKey(key)) {
                let list = this.keys.get(key);
                for (let res of list) {
                    ResourceManager.Instance().destroyRes(res);
                }
            }
        }
        public readonly statistics: { [key: string]: number } = {};
        private $memory: number = 0;
        public get memory(): number {
            return this.$memory;
        }
        protected addMemory(key: string, w: number, h: number): void {
            if (this.statistics[key] == undefined) {
                let m = w * h * 4;
                this.statistics[key] = m;
                this.$memory += m;
            }
        }
        protected removeMemory(key: string): void {
            if (this.statistics[key] != undefined) {
                let m = this.statistics[key];
                this.$memory -= m;
                delete this.statistics[key];
            }
        }
    }
}