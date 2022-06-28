/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-19
*************************************************/
/// <reference path="./IPlayable.ts" />
/// <reference path="./IPlayableManager.ts" />
/// <reference path="./IPlayableManagerInternal.ts" />
module xgame {
    @impl(IPlayableManager, IPlayableManagerInternal)
    export class PlayableManager extends Singleton implements IPlayableManager, IPlayableManagerInternal {
        private playables = new Dictionary<number, IPlayable>();
        public constructor() {
            super();
        }
        public initialize(): void {
            SchedulerManager.Instance().registerUpdate(this.advanceTime, this);
        }
        private isUpdating: boolean = false;
        private advanceTime(): void {
            if (this.isUpdating) {
                return;
            }
            this.isUpdating = true;
            __lockobject__(this).simple(() => {
                let time = Time.Instance().deltaTime;
                this.playables.forValues((playable) => {
                    playable.advanceTime(time);
                }, this);
                this.isUpdating = false;
            }, this);
        }
        public get count(): number {
            return this.playables.length;
        }
        public addPlayable(playable: IPlayable): void {
            if (this.playables.containsKey(playable.hashCode)) {
                return;
            }
            __lockobject__(this).simple(() => {
                playable.onComplete.addOnce(this.onPlayComplete, this);
                this.playables.add(playable.hashCode, playable);
            }, this);
        }
        private onPlayComplete(playable: IPlayable): void {
            this.removePlayable(playable);
        }
        public removePlayable(guid: number): void
        public removePlayable(playable: IPlayable): void
        public removePlayable(value: any): void {
            let guid: number, playable: IPlayable;
            if (typeof (value) == "number") {
                guid = value;
                playable = this.playables.get(guid);
            }
            else {
                playable = value;
            }
            if (!playable) {
                return;
            }
            __lockobject__(this).simple(() => {
                playable.onComplete.removeAll();
                playable.stop();
                this.playables.remove(playable.hashCode);
                playable.dispose();
            }, this);
        }
    }
}