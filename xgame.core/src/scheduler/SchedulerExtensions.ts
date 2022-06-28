/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-19
*************************************************/
module xgame {
    xgame.DisposableGroup.prototype["registerPreUpdate"] = function (action: () => void, thisObject?: any, order?: number): void {
        let self: DisposableGroup = this;
        let manager = SchedulerManager.Instance();
        let scheduler = manager.registerPreUpdate(action, thisObject, order);
        self.register(scheduler);
    }
    xgame.DisposableGroup.prototype["registerUpdate"] = function (action: () => void, thisObject?: any, order?: number): void {
        let self: DisposableGroup = this;
        let manager = SchedulerManager.Instance();
        let scheduler = manager.registerUpdate(action, thisObject, order);
        self.register(scheduler);
    }
    xgame.DisposableGroup.prototype["registerPostUpdate"] = function (action: () => void, thisObject?: any, order?: number): void {
        let self: DisposableGroup = this;
        let manager = SchedulerManager.Instance();
        let scheduler = manager.registerPostUpdate(action, thisObject, order);
        self.register(scheduler);
    }
    xgame.DisposableGroup.prototype["registerTimer"] = function (timeout: number, action: () => void, thisObject?: any, times?: number, order?: number): void {
        let self: DisposableGroup = this;
        let manager = SchedulerManager.Instance();
        let scheduler = manager.registerTimer(timeout, action, thisObject, times, order);
        self.register(scheduler);
    }
}
declare namespace xgame {
    interface DisposableGroup {
        registerPreUpdate(action: () => void, thisObject?: any, order?: number): void;
        registerUpdate(action: () => void, thisObject?: any, order?: number): void;
        registerPostUpdate(action: () => void, thisObject?: any, order?: number): void;
        registerTimer(timeout: number, action: () => void, thisObject?: any, times?: number, order?: number): void;
    }
}