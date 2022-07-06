/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-05
*************************************************/
/// <reference path="./core/AudioChannel.ts" />
module egretx {
    export class EffectAudioChannel extends AudioChannel {
        public static instanceMax: number = 3;
        protected freeAudioes: Audio[] = [];
        protected playAudioes: Audio[] = [];
        public constructor() {
            super(AudioChannelType.EFFECT);
            for (let i = 0; i < EffectAudioChannel.instanceMax; i++) {
                if (AudioManager.Instance().createAudioInstance) {
                    this.freeAudioes.push(AudioManager.Instance().createAudioInstance("effect"));
                }
                else {
                    this.freeAudioes.push(new WebAudio("effect"));
                }
            }
        }
        public play(key: string, playTimes?: number): void {
            if (!this.freeAudioes.length) {
                console.log("没有可用的播放器了，放弃播放音效:" + key);
                return;
            }
            let audio: Audio = this.freeAudioes.shift();
            this.playAudioes.push(audio);
            audio.play(key, 0, playTimes).then(() => {
                this.releaseAudio(audio);
            });
        }
        public pause(): void {
            for (let i = this.playAudioes.length - 1; i >= 0; i--) {
                let audio = this.playAudioes[i];
                audio.pause();
            }
        }
        public resume(): void {
            for (let i = this.playAudioes.length - 1; i >= 0; i--) {
                let audio = this.playAudioes[i];
                audio.resume();
            }
        }
        public stop(): void {
            while (this.playAudioes.length) {
                let audio = this.playAudioes.pop();
                audio.stop();
                this.freeAudioes.unshift(audio);
            }
        }
        private releaseAudio(audio: Audio): void {
            let indexOf = this.playAudioes.indexOf(audio);
            if (indexOf >= 0) {
                this.playAudioes.splice(indexOf, 1);
            }
            if (this.freeAudioes.indexOf(audio) == -1) {
                this.freeAudioes.unshift(audio);
            }
        }
    }
}