/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-04
*************************************************/

module egretx {
    /**
     * 音频管理器
     */
    export class AudioManager extends xgame.Singleton implements IAudioManager, IAudioManagerInternal {
        /**
         * 创建音频播放器实例，默认使用WebAudio
         */
        public createAudioInstance?: (type?: string) => Audio;
        /**
         * 重定向音频地址
         */
        public redirectURL: (url: string) => string;
        public constructor() {
            super();
        }
        /**
         * 背景音乐频道
         */
        public background: MusicAudioChannel;
        /**
         * ui音频
         */
        public ui: MusicAudioChannel;
        /**
         * 特效频道
         */
        public effect: EffectAudioChannel;
        public initialize(): void {
            this.background = new MusicAudioChannel();
            this.ui = new MusicAudioChannel();
            this.effect = new EffectAudioChannel();
        }
    }
}