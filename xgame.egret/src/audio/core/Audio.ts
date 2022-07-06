/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-04
*************************************************/
module egretx {
    export class Audio extends xgame.XObject {
        protected key: string;
        protected playTimes: number;
        public constructor(public type: string = "EFFECT") {
            super();
        }
        protected get info(): RES.ResourceInfo {
            return this.key && RES.getResourceInfo(this.key);
        }
        public load(): Promise<boolean> {
            return null;
        }
        public play(key: string, startTime: number = 0, playTimes: number = 0): Promise<void> {
            return null;
        }
        public pause(): void {

        }
        public resume(): void {

        }
        public stop(): void {

        }
        protected $volume: number = 0.5;
        public get volume(): number {
            return this.$volume;
        }
        public setVolume(volume: number): void {
            this.$volume = volume;
        }
        public destroy(): void {

        }
    }
}