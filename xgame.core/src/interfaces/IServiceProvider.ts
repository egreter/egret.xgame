/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-18
*************************************************/
/// <reference path="./IXGame.ts" />


module xgame {
    export let IServiceProvider = Symbol.for("IServiceProvider");
    export interface IServiceProvider {
        priority: number;
        onInit(game: IXGame): Promise<boolean>;
        onStart(game: IXGame): Promise<boolean>;
        onServiceRegister(game: IXGame): void;
    }
}