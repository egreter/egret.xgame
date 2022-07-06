/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-04
*************************************************/
module egretx {
    export enum AudioToggleState {
        OFF,
        ON
    }
    /**
     * 音频频道
     */
    export class AudioChannel extends xgame.XObject {
        public constructor(public channelType: AudioChannelType) {
            super();
        }
        protected callback_onPlayCompleted = new xgame.Signal1<string>();
        public onPlayCompleted(): xgame.Signal1<string> {
            return this.callback_onPlayCompleted;
        }
        private $toggleState = AudioToggleState.ON;
        public get toggleState(): AudioToggleState {
            return this.$toggleState;
        }
        public toggleOn(): void {
            if (this.toggleState == AudioToggleState.ON) {
                return;
            }
            this.$toggleState = AudioToggleState.ON;
            this.resume();
        }
        public toggleOff(): void {
            if (this.toggleState == AudioToggleState.OFF) {
                return;
            }
            this.$toggleState = AudioToggleState.OFF;
            this.stop();
        }
        private $volume: number = 0.5;
        public get volume(): number {
            return this.$volume;
        }
        public setVolume(volume: number): void {
            this.$volume = volume;
        }
        protected key: string;
        protected playTimes: number = 1;
        public play(key: string, playTimes: number = 1): void {
            
        }
        public pause(): void {

        }
        public resume(): void {

        }
        public stop(): void {

        }
    }
}