/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-19
*************************************************/
/// <reference path="./Locker.ts" />
/// <reference path="../interfaces/IDisposable.ts" />

module xgame {
    @impl(IDisposable)
    export class DisposableGroup extends Locker implements IDisposable {
        public readonly registeredDisposables: IDisposable[] = [];
        public constructor() {
            super();
        }
        public dispose(): void {
            this.simple(() => {
                while (this.registeredDisposables.length) {
                    let o = this.registeredDisposables.shift();
                    o.dispose();
                }
            }, this);
        }
        public register(o: IDisposable, invokeDisposeOnceIfExist: boolean = false): DisposableGroup {
            this.simple(() => {
                let indexOf: number = this.registeredDisposables.indexOf(o);
                if (indexOf >= 0) {
                    if (invokeDisposeOnceIfExist) {
                        o.dispose();
                    }
                }
                else {
                    this.registeredDisposables.push(o);
                }
            }, this);
            return this;
        }
    }
}