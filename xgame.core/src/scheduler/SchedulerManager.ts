/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-20
*************************************************/
/// <reference path="../linq/List.ts" />
/// <reference path="../utils/Singleton.ts" />

/// <reference path="./Time.ts" />

module xgame {
    @impl(ISchedulerManager)
    export class SchedulerManager extends xgame.Singleton implements ISchedulerManager {
        private $preUpdateItems = new Map<number, Scheduler>();
        private $preUpdateIndexes = new List<number>();

        private $updateItems = new Map<number, Scheduler>();
        private $updateIndexes = new List<number>();

        private $postUpdateItems = new Map<number, Scheduler>();
        private $postUpdateIndexes = new List<number>();

        public constructor() {
            super();
        }
        public tick(deltaTime: number): void {
            __lockobject__(this).simple(() => {
                let time = Time.Instance();
                time.deltaTime = time.timeScale * deltaTime;
                time.passedTime += time.deltaTime;
                let i = 0, len = 0, hashCode = 0;
                let scheduler: Scheduler;
                //preupdate
                len = this.$preUpdateIndexes.count();
                for (i = 0; i < len; i++) {
                    hashCode = this.$preUpdateIndexes.elementAt(i);
                    scheduler = this.$preUpdateItems.get(hashCode);
                    scheduler.execute();
                }
                //update
                len = this.$updateIndexes.count();
                for (i = 0; i < len; i++) {
                    hashCode = this.$updateIndexes.elementAt(i);
                    scheduler = this.$updateItems.get(hashCode);
                    scheduler.execute();
                }
                //postupdate
                len = this.$postUpdateIndexes.count();
                for (i = 0; i < len; i++) {
                    hashCode = this.$postUpdateIndexes.elementAt(i);
                    scheduler = this.$postUpdateItems.get(hashCode);
                    scheduler.execute();
                }
            }, this);
        }
        //================================================
        //preupdate
        //================================================
        public registerPreUpdate(action: () => void, thisObject?: any, order: number = 0): Scheduler {
            return this.$register(1, action, thisObject, order);
        }

        public removePreUpdate(scheduler: Scheduler): void
        public removePreUpdate(hashCode: number): void
        public removePreUpdate(value: any): void {
            let hashCode: number = value;
            if (typeof (value) != "number") {
                hashCode = value.hashCode;
            }
            this.$remove(1, hashCode);
        }
        //================================================
        //update
        //================================================
        public registerUpdate(action: () => void, thisObject?: any, order: number = 0): Scheduler {
            return this.$register(2, action, thisObject, order);
        }

        public removeUpdate(scheduler: Scheduler): void
        public removeUpdate(hashCode: number): void
        public removeUpdate(value: any): void {
            let hashCode: number = value;
            if (typeof (value) != "number") {
                hashCode = value.hashCode;
            }
            this.$remove(2, hashCode);
        }
        //================================================
        //postupdate
        //================================================
        public registerPostUpdate(action: () => void, thisObject?: any, order: number = 0): Scheduler {
            return this.$register(3, action, thisObject, order);
        }

        public removePostUpdate(scheduler: Scheduler): void
        public removePostUpdate(hashCode: number): void
        public removePostUpdate(value: any): void {
            let hashCode: number = value;
            if (typeof (value) != "number") {
                hashCode = value.hashCode;
            }
            this.$remove(3, hashCode);
        }
        //================================================
        //timer
        //================================================
        public registerTimer(timeout: number, action: () => void, thisObject?: any, times?: number, order?: number): Scheduler {
            let scheduler = this.$register(2, action, thisObject, order);
            scheduler.setTimeout(timeout, times);
            return scheduler;
        }
        public removeTimer(scheduler: Scheduler): void
        public removeTimer(hashCode: number): void
        public removeTimer(value: any): void {
            let hashCode: number = value;
            if (typeof (value) != "number") {
                hashCode = value.hashCode;
            }
            this.$remove(2, hashCode);
        }
        //================================================
        //private
        //================================================
        private $register(mode: number, action: () => void, thisObject?: any, order: number = 0): Scheduler {
            let scheduler = new Scheduler(this, action, thisObject, order);
            __lockobject__(this).simple(() => {
                let indexs: List<number>;
                let items: Map<number, Scheduler>;
                if (mode == 1) {
                    indexs = this.$preUpdateIndexes;
                    items = this.$preUpdateItems;
                }
                else if (mode == 3) {
                    indexs = this.$postUpdateIndexes;
                    items = this.$postUpdateItems;
                }
                else {
                    indexs = this.$updateIndexes;
                    items = this.$updateItems;
                }
                items.set(scheduler.hashCode, scheduler);
                if (!order) {
                    indexs.append(scheduler.hashCode);
                }
                else {
                    let index = this.getInsertIndex(1, order);
                    indexs.insert(index, scheduler.hashCode);
                }
            }, this);
            return scheduler;
        }
        private $remove(mode: number, hashCode: number): void {
            __lockobject__(this).simple(() => {
                let indexs: List<number>;
                let items: Map<number, Scheduler>;
                if (mode == 1) {
                    indexs = this.$preUpdateIndexes;
                    items = this.$preUpdateItems;
                }
                else if (mode == 3) {
                    indexs = this.$postUpdateIndexes;
                    items = this.$postUpdateItems;
                }
                else {
                    indexs = this.$updateIndexes;
                    items = this.$updateItems;
                }
                if (indexs.contains(hashCode)) {
                    indexs.remove(hashCode);
                }
                if (items.has(hashCode)) {
                    let scheduler = items.get(hashCode);
                    scheduler.dispose();
                    items.delete(hashCode);
                }
            }, this);
        }
        private getInsertIndex(mode: number, order: number = 0): number {
            let indexs: List<number>;
            let items: Map<number, Scheduler>;
            if (mode == 1) {
                indexs = this.$preUpdateIndexes;
                items = this.$preUpdateItems;
            }
            else if (mode == 3) {
                indexs = this.$postUpdateIndexes;
                items = this.$postUpdateItems;
            }
            else {
                indexs = this.$updateIndexes;
                items = this.$updateItems;
            }
            let i = 0, len = 0, hashCode = 0;
            let scheduler: Scheduler;
            len = indexs.count();
            if (len == 0) {
                return 0;
            }
            for (i = 0; i < len; i++) {
                hashCode = indexs.elementAt(i);
                scheduler = items.get(hashCode);
                if (order > order) {
                    return i;
                }
            }
            return len - 1;
        }
    }
}