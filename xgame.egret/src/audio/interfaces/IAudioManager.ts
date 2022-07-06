/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-04
*************************************************/
module egretx {
    export let IAudioManager = Symbol.for("IAudioManager");
    export interface IAudioManager extends xgame.IXObject {
        createAudioInstance?: (type?: string) => Audio;
        redirectURL: (url: string) => string;
        background: MusicAudioChannel;
        ui: MusicAudioChannel;
        effect: EffectAudioChannel;
    }
}