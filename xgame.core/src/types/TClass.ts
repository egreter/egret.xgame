/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-23
*************************************************/
module xgame {
    export type TClass<T> = new (...args: any[]) => T;
}