/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-19
*************************************************/
/// <reference path="../interfaces/IDisposable.ts" />
/// <reference path="../signals/Signal1.ts" />


module xgame {
    export interface IPlayable extends IDisposable {
        readonly onComplete: Signal1<IPlayable>;
        advanceTime(time: number): void;
        stop(): void;
    }
}