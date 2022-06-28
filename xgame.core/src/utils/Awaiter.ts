/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-01-17
*************************************************/
/// <reference path="../core/XObject.ts" />
/// <reference path="../interfaces/IDisposable.ts" />
/// <reference path="../pool/PoolObject.ts" />
/// <reference path="../signals/Signal0.ts" />
/// <reference path="../utils/Deferred.ts" />
/// <reference path="../scheduler/SchedulerManager.ts" />
/// <reference path="../scheduler/Scheduler.ts" />

module xgame {
    export enum AwaitType {
        Frame = 1,
        Milliseconds,
        Seconds,
        WaitUntil
    }
    export class Awaiter extends XObject implements IDisposable {
        public static FPS: number = 60;
        protected timer: number = 0;
        protected handler: () => boolean;
        protected type: AwaitType;
        private callback_complete = new Signal0();
        private scheduler: Scheduler;
        public onComplete(): Signal0 {
            this.callback_complete.removeAll();
            return this.callback_complete;
        }
        public setAwaiter(timeOrHandler: any, type: AwaitType = AwaitType.Frame): void {
            this.type = type;
            if (AwaitType.WaitUntil == type) {
                this.handler = timeOrHandler;
            }
            else {
                let time: number = timeOrHandler;
                if (type == AwaitType.Frame) {
                    this.timer = timeOrHandler * (1000 / Awaiter.FPS);
                }
                else if (type == AwaitType.Seconds) {
                    this.timer = timeOrHandler * 1000;
                }
                else {
                    this.timer = timeOrHandler;
                }
            }
        }
        private deferred = new Deferred<void>();
        public async await(): Promise<void> {
            this.deferred = new Deferred<void>();
            this.scheduler = SchedulerManager.Instance().registerUpdate(this.advanceTime, this);
            return this.deferred.promise;
        }
        public advanceTime(): void {
            if (this.type == AwaitType.WaitUntil) {
                if (this.handler()) {
                    if (this.deferred) {
                        this.deferred.resolve();
                    }
                    this.callback_complete.dispatch();
                    this.deferred = undefined;
                    this.dispose();
                }
            }
            else {
                this.timer -= Time.Instance().deltaTime;
                if (this.timer <= 0) {
                    if (this.deferred) {
                        this.deferred.resolve();
                    }
                    this.callback_complete.dispatch();
                    this.deferred = undefined;
                    this.dispose();
                }
            }
        }
        public dispose(): void {
            if (this.scheduler) {
                SchedulerManager.Instance().removeUpdate(this.scheduler);
                this.scheduler = undefined;
            }
            this.deferred = undefined;
            this.callback_complete.removeAll();
            pools.recycle(this);
        }
    }
    const pools = new PoolObject<Awaiter>(Awaiter);
    export async function waitEndFrames(frame: number = 0, payload?: (awaiter: Awaiter) => void, thisObject?: any): Promise<void> {
        let awaiter = pools.fetch(() => { return new Awaiter() }, this);
        awaiter.setAwaiter(frame, AwaitType.Frame);
        if (payload) {
            payload.apply(thisObject, [awaiter]);
        }
        return awaiter.await();
    }
    export async function waitMilliseconds(milliseconds: number, payload?: (awaiter: Awaiter) => void, thisObject?: any): Promise<void> {
        let awaiter = pools.fetch(() => { return new Awaiter() }, this);
        if (payload) {
            payload.apply(thisObject, [awaiter]);
        }
        awaiter.setAwaiter(milliseconds, AwaitType.Milliseconds);
        return awaiter.await();
    }
    export async function waitSeconds(seconds: number, payload?: (awaiter: Awaiter) => void, thisObject?: any): Promise<void> {
        let awaiter = pools.fetch(() => { return new Awaiter() }, this);
        awaiter.setAwaiter(seconds, AwaitType.Seconds);
        if (payload) {
            payload.apply(thisObject, [awaiter]);
        }
        return awaiter.await();
    }
    export async function waitUntil(handler: () => boolean, payload?: (awaiter: Awaiter) => void, thisObject?: any): Promise<void> {
        let awaiter = pools.fetch(() => { return new Awaiter() }, this);
        awaiter.setAwaiter(handler, AwaitType.WaitUntil);
        if (payload) {
            payload.apply(thisObject, [awaiter]);
        }
        return awaiter.await();
    }
}