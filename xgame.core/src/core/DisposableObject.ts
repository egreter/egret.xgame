/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-08
*************************************************/
/// <reference path="./XObject.ts" />
/// <reference path="../interfaces/IDisposable.ts" />


module xgame {
    @impl(IDisposable)
    export class DisposableObject extends XObject implements IDisposable {
        public constructor() {
            super();
        }
        public dispose(): void {

        }
    }
}