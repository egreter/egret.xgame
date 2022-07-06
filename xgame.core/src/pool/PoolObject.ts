/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-19
*************************************************/
/// <reference path="../core/XObject.ts" />
/// <reference path="../utils/isImplementOf.ts" />


module xgame {
    interface IDebugInfo {
        create?: number;
        count?: number;
        ClassType?: string;
        group?: string;
        key?: string;
    }
    export class PoolObject<T extends IPoolable> extends xgame.XObject {
        public static EXPIRE_TIME: number = 60;
        private instances: T[] = [];
        private $create: number = 0;
        public get create(): number {
            return this.$create;
        }
        public get count(): number {
            return this.instances.length;
        }
        public get expired(): boolean {
            if (this.fulled) {
                return true;
            }
            return false;
        }
        public get fulled(): boolean {
            return this.create > 0 && this.create == this.count;
        }
        private Clazz: TClass<T>
        public group: string = "";
        public key: string | number = "";
        public constructor(Clazz: TClass<T>, count_init: number = 0) {
            super();
            this.Clazz = Clazz;
            if (count_init > 0) {
                for (let i: number = 0; i < count_init; i++) {
                    this.instances.push(new Clazz());
                }
            }
        }
        public toString(): string {
            let info = <IDebugInfo>{ create: this.create, count: this.count, group: this.group, key: this.key, ClassType: getQualifiedClassName(this.Clazz) };
            return JSON.stringify(info);
        }
        public fetch(newInstance?: (...args: any[]) => T, thisObject?: any, ...args: any[]): T {
            if (this.count > 0) {
                return this.instances.shift();
            }
            let instance: T;
            if (newInstance) {
                instance = newInstance.apply(thisObject, args);
            }
            else {
                instance = new this.Clazz(...args);
            }
            instance.fromPoolHashCode = this.hashCode;
            this.$create++;
            return instance;
        }
        public ping(instance: T): void {
            instance.fromPoolHashCode = this.hashCode;
            this.$create++;
        }
        public recycle(instance: T): void {
            if (instance.fromPoolHashCode == this.hashCode) {
                if (this.instances.indexOf(instance) == -1) {
                    this.instances.push(instance);
                    if (instance.dispose) {
                        instance.dispose();
                    }
                }
            }
        }
        public release(loop?: (value: T) => void, thisObject?: any): void {
            while (this.instances.length) {
                let instance = this.instances.shift();
                if (loop) {
                    loop.apply(thisObject, [instance]);
                }
                if (instance.release) {
                    instance.release();
                }
            }
            this.$create = 0;
        }
    }
}