/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-04
*************************************************/
module egretx {
    /**
     * 默认的音频播放器
     */
    export class WebAudio extends Audio {
        private sound: egret.Sound;
        private loadDeferred: xgame.Deferred<boolean>;
        public constructor(type?: string) {
            super(type);

        }
        public load(): Promise<boolean> {
            this.sound = new egret.Sound();
            this.sound.type = this.type;
            this.sound.addEventListener(egret.Event.COMPLETE, this.onLoadComplete, this);
            this.sound.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onIOError, this);
            this.loadDeferred = new xgame.Deferred<boolean>();
            let url = this.info.root + this.info.url;
            if (AudioManager.Instance().redirectURL) {
                url = AudioManager.Instance().redirectURL(url);
            }
            this.sound.load(url);
            return this.loadDeferred.promise;
        }
        protected onIOError(event: egret.IOErrorEvent): void {
            console.warn("WebAudio=>onIOError", event);
            this.sound.removeEventListener(egret.Event.COMPLETE, this.onLoadComplete, this);
            this.sound.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.onIOError, this);
            this.loadDeferred.resolve(false);
        }
        protected onLoadComplete(event: egret.Event): void {
            this.sound.removeEventListener(egret.Event.COMPLETE, this.onLoadComplete, this);
            this.sound.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.onIOError, this);
            this.loadDeferred.resolve(true);
        }
        protected soundChannel: egret.SoundChannel;
        private playDeferred: xgame.Deferred<void>;
        public play(key: string, startTime: number = 0, playTimes: number = 0): Promise<void> {
            this.stop();
            this.key = key;
            this.playTimes = playTimes;
            this.playDeferred = new xgame.Deferred<void>();
            this.load().then((success) => {
                if (success) {
                    this._play(startTime);
                }
                else {
                    this.playDeferred.resolve();
                }
            });
            return this.playDeferred.promise;
        }
        private _play(position: number): void {
            this.$isPaused = false;
            this.soundChannel = this.sound.play(position, this.playTimes);
            this.soundChannel.volume = this.volume;
            this.soundChannel.addEventListener(egret.Event.SOUND_COMPLETE, this.onSoundComplete, this);
        }
        protected onSoundComplete(): void {
            if (this.playTimes > 0) {
                this.playTimes--;
                if (this.playTimes <= 0) {
                    if (this.playDeferred) {
                        this.playDeferred.resolve();
                    }
                    this.stop();
                }
            }
        }
        public position: number = 0;
        private $isPaused: boolean = false;
        public get isPaused(): boolean {
            return this.$isPaused;
        }
        public pause(): void {
            if (!this.isPaused && this.soundChannel) {
                this.$isPaused = true;
                this.position = this.soundChannel.position;
                this.clearChannel();
            }
        }
        public resume(): void {
            if (this.isPaused) {
                this.$isPaused = false;
                this._play(this.position);
            }
        }
        protected clearChannel(): void {
            if (this.soundChannel) {
                this.soundChannel.stop();
                this.soundChannel.removeEventListener(egret.Event.SOUND_COMPLETE, this.onSoundComplete, this);
                this.soundChannel = null;
            }
        }
        public stop(): void {
            this.playDeferred = undefined;
            this.$isPaused = false;
            this.position = 0;
            this.clearChannel();
            if (this.sound) {
                this.sound.removeEventListener(egret.Event.COMPLETE, this.onLoadComplete, this);
                this.sound.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.onIOError, this);
                try {
                    this.sound.close();
                }
                catch (err) {

                }
            }
        }
    }
}