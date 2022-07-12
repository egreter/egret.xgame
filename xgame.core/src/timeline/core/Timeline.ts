/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-05
*************************************************/
module xgame {
    export class Timeline extends xgame.Locker {
        public static MAIN: string = "MAIN";
        private animatables = new xgame.Dictionary<number, IAnimatable>();
        private $timeScale: number = 1;
        public get timeScale(): number {
            return this.$timeScale;
        }
        public set timeScale(value: number) {
            this.$timeScale = value;
        }
        private $passedTime: number = 0;
        public get passedTime(): number {
            return this.$passedTime;
        }
        public constructor(public name: string) {
            super();
        }
        public advanceTime(time: number): void {
            let deltaTime = this.timeScale * time;
            this.$passedTime += deltaTime;
            if (this.isPaused) {
                return;
            }
            this.simple(() => {
                this.animatables.forValues((item) => {
                    item.advanceTime(deltaTime);
                }, this);
            }, this);
        }
        public add(animatable: IAnimatable): void {
            this.simple(() => {
                this.animatables.add(animatable.hashCode, animatable);
            }, this);
        }
        public remove(animatable: IAnimatable): void {
            this.simple(() => {
                this.animatables.remove(animatable.hashCode);
            }, this);
        }
        private $isPaused: boolean = false;
        public get isPaused(): boolean {
            return this.$isPaused;
        }
        public pause(): void {
            if (this.isPaused) {
                return;
            }
            this.$isPaused = true;
        }
        public resume(): void {
            if (!this.isPaused) {
                return;
            }
            this.$isPaused = false;
        }
    }
}