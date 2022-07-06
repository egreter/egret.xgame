/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-05
*************************************************/
module egretx {
    /**
     * 时间轴管理器
     */
    export class TimelineManager extends xgame.Singleton implements ITimelineManager, ITimelineManagerInternal {
        public constructor() {
            super();
        }

        public initialize(): void {
            xgame.SchedulerManager.Instance().registerUpdate(this.advanceTime, this);
        }
        protected advanceTime(): void {
            let deltaTime = xgame.Time.Instance().deltaTime;
            this.timelines.forValues((timeline) => {
                timeline.advanceTime(deltaTime);
            }, this);
        }
        private timelines = new xgame.Dictionary<string, Timeline>();
        public getOrCreateTimeline(name: string = Timeline.MAIN): Timeline {
            if (!this.timelines.containsKey(name)) {
                this.timelines.add(name, new Timeline(name));
            }
            return this.timelines.get(name);
        }
    }
}