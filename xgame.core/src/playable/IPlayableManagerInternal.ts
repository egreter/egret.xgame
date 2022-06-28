/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-19
*************************************************/
module xgame {
    export let IPlayableManagerInternal = Symbol.for("IPlayableManagerInternal");
    export interface IPlayableManagerInternal {
        initialize(): void;
    }
}