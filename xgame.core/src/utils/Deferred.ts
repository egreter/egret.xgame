/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-23
*************************************************/
/// <reference path="../core/XObject.ts" />

module xgame {
    export class Deferred<T> extends xgame.XObject {
        private $promise: Promise<T>;
        private $resolve: (value: T) => void;
        private $reject: (reason: any) => void;
        public constructor() {
            super();
            this.$promise = new Promise<T>((resolve, reject) => {
                this.$resolve = resolve;
                this.$reject = reject;
            });
        }
        public resolve(value?: T): void {
            this.$resolve(value);
        }
        public reject(reason?: any): void {
            this.$reject(reason);
        }
        public get promise(): Promise<T> {
            return this.$promise;
        }
    }
}