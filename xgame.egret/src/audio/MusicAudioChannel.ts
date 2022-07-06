/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-05
*************************************************/
/// <reference path="./core/AudioChannel.ts" />

module egretx {
    export class MusicAudioChannel extends AudioChannel {
        public constructor() {
            super(AudioChannelType.BACKGORUND);
            if (AudioManager.Instance().createAudioInstance) {
                this.main = AudioManager.Instance().createAudioInstance("music");
            }
            else {
                this.main = new WebAudio("music");
            }
        }
        protected main: Audio;
        public play(key: string, playTimes?: number): void {
            this.key = key;
            this.playTimes = playTimes;
            this.main.play(key, 0, playTimes);
        }
        public pause(): void {
            this.main.pause();
        }
        public resume(): void {
            this.main.resume();
        }
        public stop(): void {
            this.main.stop();
        }
    }
}