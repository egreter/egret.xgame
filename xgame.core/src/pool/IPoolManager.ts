/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-19
*************************************************/
module xgame {
    export let IPoolManager = Symbol.for("IPoolManager");
    export interface IPoolManager {
        debug(includeGroups?: boolean): void;
        getPool<T extends IPoolable>(Clazz: TClass<T>, initCount?: number): PoolObject<T>;
        fetch<T extends IPoolable>(Clazz: TClass<T>, newInstance?: (...args: any[]) => T, thisObject?: any, ...args: any[]): T;
        recycle<T extends IPoolable>(Clazz: TClass<T>, o: T): void;
        release<T extends IPoolable>(Clazz: TClass<T>, loop?: (value: T) => void, thisObject?: any): void;
        getPoolGroup<T extends IPoolable>(group: string): PoolGroup<T>;
    }
}