/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-19
*************************************************/
module xgame {
    export let IXGame = Symbol.for("IXGame");
    export interface IXGame {
        init(): Promise<void>;
        tick(deltaTime: number): void;
        singleton(identity: Symbol, service: { new(...args: any[]): any }): IMapping;
        getService<T>(identity: Symbol): T;
        registerServiceProvider(provider: IServiceProvider): IXGame;
    }
}