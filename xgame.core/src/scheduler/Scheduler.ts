/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-20
*************************************************/
/// <reference path="../interfaces/IDisposable.ts" />


module xgame {
    enum TimerMode {
        None = 0,
        Limit,
        Times
    }
    @impl(IDisposable)
    export class Scheduler extends XObject implements IDisposable {
        private timeout: number = 0;
        private timer: number = 0;
        private times: number = 0;
        private mode: TimerMode = TimerMode.None;
        public constructor(private manager: ISchedulerManager, private action: () => void, private thisObject?: any, public order: number = 0) {
            super();
        }
        public setTimeout(timeout: number, times: number = 0): void {
            this.timeout = timeout;
            this.timer = timeout;
            if (times > 0) {
                this.mode = TimerMode.Times;
                this.times = times;
            }
            else {
                this.mode = TimerMode.Limit;
                this.times = 0;
            }
        }
        public execute(): void {
            if (this.mode == TimerMode.None) {
                if (this.action) {
                    this.action.apply(this.thisObject);
                }
            }
            else {
                this.timer -= Time.Instance().deltaTime;
                if (this.timer <= 0) {
                    if (this.action) {
                        this.action.apply(this.thisObject);
                    }
                    this.timer += this.timeout;
                    if (this.mode == TimerMode.Times) {
                        this.times--;
                        if (this.times <= 0) {
                            this.unregister();
                        }
                    }
                }
            }
        }
        public unregister(): void {
            this.manager.removeUpdate(this.hashCode);
        }
        public dispose(): void {
            this.action = undefined;
            this.thisObject = undefined;
        }
    }
}