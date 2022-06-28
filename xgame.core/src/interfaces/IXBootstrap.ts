/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-18
*************************************************/
module xgame {
    export let IXBootstrap = Symbol.for("IXBootstrap");
    export interface IXBootstrap {
        onInit(game: IXGame): void;
        onStart(game: IXGame): void;
        onQuit(): void;
    }
}