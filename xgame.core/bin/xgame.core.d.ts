/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-29
*************************************************/
declare module xgame {
    /**
     * Return the fully qualified class name of an object
     * @param value The object for which a fully qualified class name is desired. Any JavaScript value may be passed to
     * this method including all available JavaScript types, object instances, primitive types such as number, and class objects.
     * @returns A string containing the fully qualified class name.
     */
    function getQualifiedClassName(value: any): string;
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-23
*************************************************/
declare module xgame {
    function impl(...implements: Symbol[]): (target: any) => void;
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-23
*************************************************/
declare module xgame {
    let IXObject: symbol;
    interface IXObject {
        hashCode: number;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-19
*************************************************/
declare module xgame {
    let hashCount: number;
    function generateHashCode(target?: any): number;
    class XObject implements IXObject {
        private $hashCode;
        constructor();
        readonly hashCode: number;
        toString(): string;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-19
*************************************************/
declare module xgame {
    let IXGame: symbol;
    interface IXGame {
        init(): Promise<void>;
        tick(deltaTime: number): void;
        singleton(identity: Symbol, service: {
            new (...args: any[]): any;
        }): IMapping;
        getService<T>(identity: Symbol): T;
        registerServiceProvider(provider: IServiceProvider): IXGame;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-18
*************************************************/
declare module xgame {
    let IXBootstrap: symbol;
    interface IXBootstrap {
        onInit(game: IXGame): void;
        onStart(game: IXGame): void;
        onQuit(): void;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-18
*************************************************/
declare module xgame {
    let IServiceProvider: symbol;
    interface IServiceProvider {
        priority: number;
        onInit(game: IXGame): Promise<boolean>;
        onStart(game: IXGame): Promise<boolean>;
        onServiceRegister(game: IXGame): void;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-19
*************************************************/
interface String {
    format(...args: any[]): string;
    padLeft(len: number, separator?: string): string;
    padRight(len: number, separator?: string): string;
    trim(all?: boolean): string;
    eraseHtml(): string;
    beginWiths(str: string): boolean;
    endWiths(str: string): boolean;
    html2Escape(): string;
    escape2Html(): string;
    nbsp2Space(): string;
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-19
*************************************************/
declare module xgame {
    let IDisposable: symbol;
    interface IDisposable extends IXObject {
        dispose(): void;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-20
*************************************************/
declare module xgame {
    class Scheduler extends XObject implements IDisposable {
        private manager;
        private action;
        private thisObject;
        order: number;
        private timeout;
        private timer;
        private times;
        private mode;
        constructor(manager: ISchedulerManager, action: () => void, thisObject?: any, order?: number);
        setTimeout(timeout: number, times?: number): void;
        execute(): void;
        unregister(): void;
        dispose(): void;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-20
*************************************************/
declare module xgame {
    let ISchedulerManager: symbol;
    interface ISchedulerManager {
        registerPreUpdate(action: () => void, thisObject?: any, order?: number): Scheduler;
        removePreUpdate(scheduler: Scheduler): void;
        removePreUpdate(hashCode: number): void;
        registerUpdate(action: () => void, thisObject?: any, order?: number): Scheduler;
        removeUpdate(scheduler: Scheduler): void;
        removeUpdate(hashCode: number): void;
        registerPostUpdate(action: () => void, thisObject?: any, order?: number): Scheduler;
        removePostUpdate(scheduler: Scheduler): void;
        removePostUpdate(hashCode: number): void;
        registerTimer(timeout: number, action: () => void, thisObject?: any, times?: number, order?: number): Scheduler;
        removeTimer(scheduler: Scheduler): void;
        removeTimer(hashCode: number): void;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-01-07
*************************************************/
declare module xgame {
    /**
     * 检查传递的参数是否为对象
     */
    const isObj: <T>(x: T) => boolean;
    /**
     * 创建一个否定谓词结果的函数
     */
    const negate: <T>(pred: (...args: T[]) => boolean) => (...args: T[]) => boolean;
    /**
     * 比较器助手
     */
    const composeComparers: <T>(previousComparer: (a: T, b: T) => number, currentComparer: (a: T, b: T) => number) => (a: T, b: T) => number;
    const keyComparer: <T>(_keySelector: (key: T) => string, descending?: boolean) => (a: T, b: T) => number;
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-01-15
*************************************************/
declare module xgame {
    type TPredicate<T> = (value?: T, index?: number, list?: T[]) => boolean;
    class List<T> extends XObject {
        protected _elements: T[];
        /**
         * 默认为列表的元素
         */
        constructor(elements?: T[]);
        /**
         * 在列表的末尾添加一个对象。
         */
        add(element: T): void;
        /**
         * 将一个对象追加到列表的末尾。
         */
        append(element: T): void;
        /**
         * 在列表的开头添加一个对象。
         */
        prepend(element: T): void;
        /**
         * 将指定集合的元素添加到列表的末尾。
         */
        addRange(elements: T[]): void;
        /**
         * 对序列应用累加器函数。
         */
        aggregate<U>(accumulator: (accum: U, value?: T, index?: number, list?: T[]) => any, initialValue?: U): any;
        /**
         * 确定序列的所有元素是否满足一个条件。
         */
        all(predicate: TPredicate<T>): boolean;
        /**
         * 确定序列是否包含任何元素。
         */
        any(): boolean;
        any(predicate: TPredicate<T>): boolean;
        /**
         * 计算通过对输入序列的每个元素调用转换函数获得的一系列数值的平均值。
         */
        average(): number;
        average(transform: (value?: T, index?: number, list?: T[]) => any): number;
        /**
         * 将序列的元素转换为指定的类型。
         */
        cast<U>(): List<U>;
        /**
         * 从列表中删除所有元素。
         */
        clear(): void;
        /**
         * 连接两个序列。
         */
        concat(list: List<T>): List<T>;
        /**
         * 确定一个元素是否在列表中。
         */
        contains(element: T): boolean;
        /**
         * 返回序列中元素的数量。
         */
        count(): number;
        count(predicate: TPredicate<T>): number;
        /**
         * 返回指定序列的元素，或者如果序列为空，则返回单例集合中类型参数的默认值。
         */
        defaultIfEmpty(defaultValue?: T): List<T>;
        /**
         * 根据指定的键选择器从序列中返回不同的元素。
         */
        distinctBy(keySelector: (key: T) => string | number): List<T>;
        /**
         * 返回序列中指定索引处的元素。
         */
        elementAt(index: number): T;
        /**
         * 返回序列中指定索引处的元素，如果索引超出范围，则返回默认值。
         */
        elementAtOrDefault(index: number): T | null;
        /**
         * 通过使用默认的相等比较器来比较值，生成两个序列的差值集。
         */
        except(source: List<T>): List<T>;
        /**
         * 返回序列的第一个元素。
         */
        first(): T;
        first(predicate: TPredicate<T>): T;
        /**
         * 返回序列的第一个元素，如果序列不包含元素，则返回默认值。
         */
        firstOrDefault(): T;
        firstOrDefault(predicate: TPredicate<T>): T;
        /**
         * 对列表中的每个元素执行指定的操作。
         */
        forEach(action: (value?: T, index?: number, list?: T[]) => any): void;
        every(action: (value?: T, index?: number, list?: T[]) => boolean): boolean;
        filter(action: (value?: T, index?: number, list?: T[]) => boolean): T[];
        /**
         * 根据指定的键选择器函数对序列中的元素进行分组。
         */
        groupBy<TResult>(grouper: (key: T) => string | number, mapper?: (element: T) => TResult): {
            [key: string]: TResult[];
        };
        /**
         * 根据键的相等将两个序列的元素关联起来，并将结果分组。默认的相等比较器用于比较键。
         */
        groupJoin<U, R>(list: List<U>, key1: (k: T) => any, key2: (k: U) => any, result: (first: T, second: List<U>) => R): List<R>;
        /**
         * 返回列表中某个元素第一次出现的索引。
         */
        indexOf(element: T): number;
        /**
         * 向列表中插入一个元素在指定索引处。
         */
        insert(index: number, element: T): void | Error;
        /**
         * 通过使用默认的相等比较器来比较值，生成两个序列的交集集。
         */
        intersect(source: List<T>): List<T>;
        /**
         * 基于匹配的键将两个序列的元素关联起来。默认的相等比较器用于比较键。
         */
        join<U, R>(list: List<U>, key1: (key: T) => any, key2: (key: U) => any, result: (first: T, second: U) => R): List<R>;
        /**
         * 返回序列的最后一个元素。
         */
        last(): T;
        last(predicate: TPredicate<T>): T;
        /**
         * 返回序列的最后一个元素，如果序列不包含元素，则返回默认值。
         */
        lastOrDefault(): T;
        lastOrDefault(predicate: TPredicate<T>): T;
        /**
         * 返回泛型序列中的最大值。
         */
        max(): number;
        max(selector: (value: T, index: number, array: T[]) => number): number;
        /**
         * 返回泛型序列中的最小值。
         */
        min(): number;
        min(selector: (value: T, index: number, array: T[]) => number): number;
        /**
         * 根据指定的类型筛选序列中的元素。
         */
        ofType<U>(type: any): List<U>;
        /**
         * 根据键按升序对序列中的元素进行排序。
         */
        orderBy(keySelector: (key: T) => any, comparer?: (a: T, b: T) => number): List<T>;
        /**
         * 根据键值降序对序列中的元素进行排序。
         */
        orderByDescending(keySelector: (key: T) => any, comparer?: (a: T, b: T) => number): List<T>;
        /**
         * 按键按升序对序列中的元素执行后续排序。
         */
        thenBy(keySelector: (key: T) => any): List<T>;
        /**
         * 根据键值按降序对序列中的元素执行后续排序。
         */
        thenByDescending(keySelector: (key: T) => any): List<T>;
        /**
         * 从列表中删除第一个出现的特定对象。
         */
        remove(element: T): boolean;
        /**
         * 删除与指定谓词定义的条件匹配的所有元素。
         */
        removeAll(predicate: TPredicate<T>): List<T>;
        /**
         * 删除列表指定索引处的元素。
         */
        removeAt(index: number): void;
        /**
         * 颠倒整个列表中元素的顺序。
         */
        reverse(): List<T>;
        /**
         * 将序列中的每个元素投射到一个新形式中。
         */
        select<TOut>(selector: (element: T, index: number) => TOut): List<TOut>;
        /**
         * 将序列的每个元素投影到一个列表中。并将得到的序列扁平化为一个序列。
         */
        selectMany<TOut extends List<any>>(selector: (element: T, index: number) => TOut): TOut;
        /**
         * 通过使用默认的相等比较器对元素的类型进行比较，确定两个序列是否相等。
         */
        sequenceEqual(list: List<T>): boolean;
        /**
         * 返回序列中唯一的元素，如果序列中没有恰好一个元素，则抛出异常。
         */
        single(predicate?: TPredicate<T>): T;
        /**
         * 返回序列中唯一的元素，如果序列为空，则返回默认值;如果序列中有多个元素，此方法将抛出异常。
         */
        singleOrDefault(predicate?: TPredicate<T>): T;
        /**
         * 绕过序列中指定数量的元素，然后返回剩余的元素。
         */
        skip(amount: number): List<T>;
        /**
         * 省略序列中最后指定数量的元素，然后返回剩余的元素。
         */
        skipLast(amount: number): List<T>;
        /**
         * 只要指定条件为真，就绕过序列中的元素，然后返回剩余的元素。
         */
        skipWhile(predicate: TPredicate<T>): List<T>;
        /**
         * 计算通过对输入序列的每个元素调用转换函数获得的数值序列的和。
         */
        sum(): number;
        sum(transform: (value?: T, index?: number, list?: T[]) => number): number;
        /**
         * 从序列的开始返回指定数量的连续元素。
         */
        take(amount: number): List<T>;
        /**
         * 从序列的末尾返回指定数目的连续元素。
         */
        takeLast(amount: number): List<T>;
        /**
         * 返回序列中的元素，只要指定的条件为真。
         */
        takeWhile(predicate: TPredicate<T>): List<T>;
        /**
         * 复制列表中的元素到一个新数组。
         */
        toArray(): T[];
        /**
         * 创建一个<dictionary>从List< T>根据指定的键选择器函数。
         */
        toDictionary<TKey>(key: (key: T) => TKey): List<{
            Key: TKey;
            Value: T;
        }>;
        toDictionary<TKey, TValue>(key: (key: T) => TKey, value: (value: T) => TValue): List<{
            Key: TKey;
            Value: T | TValue;
        }>;
        /**
         * 创建一个Set从一个Enumerable.List< T>。
         */
        toSet(): Set<any>;
        /**
         * 创建一个List< T>从一个Enumerable.List< T>。
         */
        toList(): List<T>;
        /**
         * 创建一个查找，TElement>从一个IEnumerable< T>根据指定的键选择器和元素选择器函数。
         */
        toLookup<TResult>(keySelector: (key: T) => string | number, elementSelector: (element: T) => TResult): {
            [key: string]: TResult[];
        };
        /**
         * 基于谓词过滤一系列值。
         */
        where(predicate: TPredicate<T>): List<T>;
        /**
         * 将指定的函数应用于两个序列的对应元素，生成结果序列。
         */
        zip<U, TOut>(list: List<U>, result: (first: T, second: U) => TOut): List<TOut>;
    }
    /**
     * 表示已排序的序列。该类的方法是通过使用延迟执行来实现的。
     * 即时返回值是一个存储执行操作所需的所有信息的对象。
     * 在通过调用对象的ToDictionary、ToLookup、ToList或ToArray方法枚举对象之前，不会执行由该方法表示的查询
     */
    class OrderedList<T> extends List<T> {
        private _comparer;
        constructor(elements: T[], _comparer: (a: T, b: T) => number);
        /**
         * 按键按升序对序列中的元素执行后续排序。
         * @override
         */
        thenBy(keySelector: (key: T) => any): List<T>;
        /**
         * 根据键值按降序对序列中的元素执行后续排序。
         * @override
         */
        thenByDescending(keySelector: (key: T) => any): List<T>;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-19
*************************************************/
declare module xgame {
    class Singleton extends XObject {
        static Instance<T extends {}>(this: new () => T): T;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-20
*************************************************/
declare module xgame {
    class Time extends xgame.Singleton {
        deltaTime: number;
        timeScale: number;
        passedTime: number;
        getTimeStamp(): number;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-20
*************************************************/
declare module xgame {
    class SchedulerManager extends xgame.Singleton implements ISchedulerManager {
        private $preUpdateItems;
        private $preUpdateIndexes;
        private $updateItems;
        private $updateIndexes;
        private $postUpdateItems;
        private $postUpdateIndexes;
        constructor();
        tick(deltaTime: number): void;
        registerPreUpdate(action: () => void, thisObject?: any, order?: number): Scheduler;
        removePreUpdate(scheduler: Scheduler): void;
        removePreUpdate(hashCode: number): void;
        registerUpdate(action: () => void, thisObject?: any, order?: number): Scheduler;
        removeUpdate(scheduler: Scheduler): void;
        removeUpdate(hashCode: number): void;
        registerPostUpdate(action: () => void, thisObject?: any, order?: number): Scheduler;
        removePostUpdate(scheduler: Scheduler): void;
        removePostUpdate(hashCode: number): void;
        registerTimer(timeout: number, action: () => void, thisObject?: any, times?: number, order?: number): Scheduler;
        removeTimer(scheduler: Scheduler): void;
        removeTimer(hashCode: number): void;
        private $register(mode, action, thisObject?, order?);
        private $remove(mode, hashCode);
        private getInsertIndex(mode, order?);
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-18
*************************************************/
declare module xgame {
    let that: XGame;
    class XGame extends XObject implements IXGame {
        private bootstrap;
        private container;
        private $inited;
        constructor(bootstrap: IXBootstrap);
        init(): Promise<void>;
        tick(deltaTime: number): void;
        singleton(identity: Symbol, service: {
            new (...args: any[]): any;
        }): IMapping;
        getService<T>(identity: Symbol): T;
        private providers;
        registerServiceProvider(provider: IServiceProvider): IXGame;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-20
*************************************************/
declare module xgame {
    class XProvider extends XObject implements IServiceProvider {
        constructor();
        priority: number;
        onInit(game: IXGame): Promise<boolean>;
        onStart(game: IXGame): Promise<boolean>;
        onServiceRegister(game: IXGame): void;
    }
}
declare module xgame {
    class Binding {
        static bindProperty(host: any, chain: string[], target: any, prop: string): Watcher;
        static bindHandler(host: any, chain: string[], handler: (value: any) => void, thisObject: any): Watcher;
        private static $bindProperties(host, templates, chainIndex, target, prop);
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-19
*************************************************/
declare module xgame {
    const enum EventPhase {
        CAPTURING_PHASE = 1,
        AT_TARGET = 2,
        BUBBLING_PHASE = 3,
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-19
*************************************************/
declare module xgame {
    class Event extends XObject {
        constructor(type: string, bubbles?: boolean, cancelable?: boolean, data?: any);
        data: any;
        $type: string;
        readonly type: string;
        $bubbles: boolean;
        readonly bubbles: boolean;
        $cancelable: boolean;
        readonly cancelable: boolean;
        $eventPhase: number;
        readonly eventPhase: number;
        $currentTarget: any;
        readonly currentTarget: any;
        $target: any;
        readonly target: any;
        $setTarget(target: any): boolean;
        $isDefaultPrevented: boolean;
        isDefaultPrevented(): boolean;
        preventDefault(): void;
        $isPropagationStopped: boolean;
        stopPropagation(): void;
        $isPropagationImmediateStopped: boolean;
        stopImmediatePropagation(): void;
        protected clean(): void;
        static dispatchEvent(target: IEventDispatcher, type: string, bubbles?: boolean, data?: any): boolean;
        static _getPropertyData(EventClass: any): any;
        static create<T extends Event>(EventClass: {
            new (type: string, bubbles?: boolean, cancelable?: boolean): T;
            eventPool?: Event[];
        }, type: string, bubbles?: boolean, cancelable?: boolean): T;
        static release(event: Event): void;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-19
*************************************************/
declare module xgame {
    let IEventDispatcher: symbol;
    interface IEventDispatcher extends XObject {
        addEventListener(type: string, listener: (e?: Event) => void, thisObject: any, useCapture?: boolean, priority?: number): void;
        once(type: string, listener: (e?: Event) => void, thisObject: any, useCapture?: boolean, priority?: number): void;
        removeEventListener(type: string, listener: (e?: Event) => void, thisObject: any, useCapture?: boolean): void;
        hasEventListener(type: string): boolean;
        dispatchEvent(event: Event): boolean;
        willTrigger(type: string): boolean;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-20
*************************************************/
declare module xgame {
    class PropertyEvent extends Event {
        static PROPERTY_CHANGE: string;
        constructor(type: string, bubbles?: boolean, cancelable?: boolean, property?: string);
        property: string;
        static dispatchPropertyEvent(target: IEventDispatcher, eventType: string, property?: string): boolean;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-20
*************************************************/
declare module xgame {
    function registerBindable(instance: any, property: string): void;
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-23
*************************************************/
declare module xgame {
    function getImplements(target: any): Symbol[];
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-23
*************************************************/
declare module xgame {
    function isImplementOf(target: any, api: Symbol): boolean;
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-11
*************************************************/
declare module xgame {
    class Watcher {
        static watch(host: any, chain: string[], handler: (value: any) => void, thisObject: any): Watcher;
        private static checkBindable(host, property);
        constructor(property: string, handler: (value: any) => void, thisObject: any, next?: Watcher);
        private host;
        private property;
        private handler;
        private thisObject;
        private next;
        private isExecuting;
        unwatch(): void;
        getValue(): any;
        setHandler(handler: (value: any) => void, thisObject: any): void;
        reset(newHost: IEventDispatcher): void;
        private getHostPropertyValue();
        private wrapHandler(e);
        private onPropertyChange(property);
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-01-14
*************************************************/
declare module xgame {
    let IAttribute: symbol;
    interface IAttribute extends IXObject {
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-01-14
*************************************************/
declare module xgame {
    class Attribute extends XObject implements IAttribute {
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-19
*************************************************/
declare module xgame {
    interface IAsyncLockOpts {
        Promise: any;
        timeout: number;
        maxOccupationTime: number;
        maxPending: number;
        skipQueue: boolean;
    }
    class AsyncLock extends XObject {
        static DEFAULT_TIMEOUT: number;
        static DEFAULT_MAX_OCCUPATION_TIME: number;
        static DEFAULT_MAX_PENDING: number;
        private Promise;
        private queues;
        private timeout;
        private maxOccupationTime;
        private maxPending;
        constructor(options?: IAsyncLockOpts);
        acquire(key: string | string[], handler: (done?: (err?: any, ret?: any) => void) => void, complete?: (err?: any, ret?: any) => void, options?: IAsyncLockOpts): Promise<any>;
        private _acquireBatch(keys, handler, complete, opts);
        isBusy(key: string): boolean;
        private _promiseTry(fn);
    }
}
declare module xgame {
    class Dictionary<TK, TV> {
        private limit;
        private __hashobjects__;
        private m_keys;
        private m_values;
        constructor(limit?: number, keys?: TK[], values?: TV[]);
        copy(source: Dictionary<TK, TV>): void;
        readonly length: number;
        first(): {
            key: TK;
            value: TV;
        };
        last(): {
            key: TK;
            value: TV;
        };
        shift(): {
            key: TK;
            value: TV;
        };
        pop(): {
            key: TK;
            value: TV;
        };
        readonly values: TV[];
        readonly keys: TK[];
        containsKey(key: TK): boolean;
        indexOfKey(key: TK): number;
        containsValue(value: TV): boolean;
        sortByKey(compare_handler: (a: TK, b: TK) => number): void;
        sortByValue(compare_handler: (a: TV, b: TV) => number): void;
        indexOfValue(value: TV): number;
        getKeyByValue(value: TV): any;
        set(key: TK, value: TV): void;
        add(key: TK, value: TV): void;
        unshift(key: TK, value: TV): void;
        push(key: TK, value: TV): void;
        checkLimit(limit?: number, helper_handler?: (item: {
            key: TK;
            value: TV;
        }) => void, helper_this?: any): void;
        allocf(key: TK, defaultFactory: () => TV): TV;
        alloc(key: TK, defaultValue: TV): TV;
        get(key: TK, defaultValue?: TV): TV;
        removeKeys(keys: TK[]): void;
        remove(key: TK): TV;
        removeByValue(value: TV): TK;
        filter(keys: TK[], assist_handler?: (v: TV) => boolean, assist_thisObject?: any): TV[];
        clear(recycle?: (item: TV) => void): void;
        randomList(num?: number): TV[];
        random(): TV;
        index(i: number): {
            key: TK;
            value: TV;
        };
        indexKey(i: number): TK;
        indexValue(i: number): TV;
        forEach(fn: (item: {
            key: TK;
            value: TV;
        }, index: number) => boolean | void, thisObject?: any, reverse?: boolean): void;
        forKeys(fn: (key: TK, index: number) => boolean | void, thisObject?: any, reverse?: boolean): void;
        forValues(fn: (value: TV, index: number) => boolean | void, thisObject?: any, reverse?: boolean): void;
        private insertion_sort_for_key(compare_handler);
        private insertion_sort_for_value(compare_handler);
        private checkRepeat(key, value);
        private mapdelete(key);
        private mapset(key, value);
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-19
*************************************************/
declare module xgame {
    class Locker extends XObject {
        private locker;
        constructor();
        acquire(handler: (done: (err?: any, ret?: any) => void) => void, complete?: (err?: any, ret?: any) => void, options?: IAsyncLockOpts): Promise<any>;
        simple(handler: () => void, thisObject?: any): Promise<void>;
    }
    function __lockobject__(object: IXObject): Locker;
    function __unlockobject__(object: IXObject): boolean;
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-19
*************************************************/
declare module xgame {
    class DisposableGroup extends Locker implements IDisposable {
        readonly registeredDisposables: IDisposable[];
        constructor();
        dispose(): void;
        register(o: IDisposable, invokeDisposeOnceIfExist?: boolean): DisposableGroup;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-08
*************************************************/
declare module xgame {
    class DisposableObject extends XObject implements IDisposable {
        constructor();
        dispose(): void;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-01-14
*************************************************/
declare module xgame {
    let IInjectableAttribute: symbol;
    interface IInjectableAttribute extends IAttribute {
        injectable: boolean;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-01-14
*************************************************/
declare module xgame {
    class InjectableAttribute extends Attribute implements IInjectableAttribute {
        injectable: boolean;
        constructor();
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-19
*************************************************/
declare module xgame {
    let IMapping: symbol;
    interface IMapping {
        setAlias(identity: Symbol): IMapping;
        withInstance(instance: any, named?: string): IMapping;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-01-14
*************************************************/
declare module xgame {
    class Mapping extends XObject implements IMapping {
        identity: Symbol;
        service: {
            new (...args: any[]): any;
        };
        private aliases;
        private instance;
        private namedInstances;
        constructor(aliases: Map<Symbol, Symbol>, identity: Symbol, service: {
            new (...args: any[]): any;
        });
        withInstance(instance: any, named?: string): IMapping;
        setAlias(identity: Symbol): IMapping;
        create(named?: string): any;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-01-14
*************************************************/
declare module xgame {
    let IMethodParamAttribute: symbol;
    interface IMethodParamAttribute extends IAttribute {
        identity: Symbol;
        named?: string;
        key: string;
        index: number;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-01-14
*************************************************/
declare module xgame {
    class MethodParamAttribute extends Attribute implements IMethodParamAttribute {
        identity: Symbol;
        named: string;
        key: string;
        index: number;
        constructor(identity: Symbol, key: string, index: number, named?: string);
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-01-14
*************************************************/
declare module xgame {
    let IPropertyAttribute: symbol;
    interface IPropertyAttribute extends IAttribute {
        identity: Symbol;
        named?: string;
        key?: string;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-01-14
*************************************************/
declare module xgame {
    class PropertyAttribute extends Attribute implements IPropertyAttribute {
        identity: Symbol;
        named: string;
        key: string;
        constructor(identity: Symbol, key: string, named?: string);
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-08
*************************************************/
declare module xgame {
    function getPrototype(target: any): any;
    function getPrototypeChains(target: any): any[];
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-23
*************************************************/
declare module xgame {
    function getTypes(target: any): string[];
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-29
*************************************************/
declare module xgame {
    function is(instance: any, value: Symbol): boolean;
    function is(instance: any, value: string): boolean;
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-18
*************************************************/
declare module xgame {
    const METADATA_ATTRIBUTES_KEY: string;
    class ServiceContainer extends Singleton {
        private mappings;
        private aliases;
        constructor();
        addAttributes(target: any, attribute: IAttribute, metadataKey?: string): ServiceContainer;
        private getOrCreateMetadata(metadataKey, target);
        hasAttribute<T extends IAttribute>(target: any, identity: Symbol, metadataKey?: string): boolean;
        getAttributes<T extends IAttribute>(target: any, identity: Symbol, metadataKey?: string): T[];
        private getOwnAttributes<T>(target, identity, metadataKey?);
        getAttribute<T extends IAttribute>(target: any, identity: Symbol, metadataKey?: string): T;
        isMapping(identity: Symbol): boolean;
        bind(identity: Symbol, service: {
            new (...args: any[]): any;
        }): IMapping;
        singleton(identity: Symbol, service: {
            new (...args: any[]): any;
        }): IMapping;
        private getOrCreate(identity, service);
        getService<T>(identity: Symbol, named?: string): T;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-07
*************************************************/
declare module xgame {
    interface IDateInfo {
        year?: number;
        month?: number;
        day?: number;
        hour?: number;
        min?: number;
        sec?: number;
        ms?: number;
        week?: number;
        timestamp?: number;
        string?: string;
    }
    let DATE_HOUR_TIME: number;
    let DATE_DAY_TIME: number;
    /**
     * 日期，时间戳管理器
     */
    class DateTimeManager extends Singleton implements IDateTimeManager {
        diffTimestamp: number;
        timeZone: number;
        constructor();
        /**
         * 设置当前时间戳和时区偏差，一般是服务器时间和时区
         * @param timestamp
         * @param timeZone
         */
        setNowTimestamp(timestamp: number, timeZone?: number): void;
        /**
         * 获得当前时间戳
         * @returns
         */
        getNowTimestamp(): number;
        /**
         * 格式化日期和时间
         * @param formatString
         * @param timestamp
         * @returns
         */
        formatDateTime(formatString?: string, timestamp?: number): string;
        /**
         * 格式化秒数
         * @param formatString
         * @param time
         * @returns
         */
        formatSeconds(formatString: string, time: number): string;
        /**
         * 转换时间戳
         * @param timestamp
         * @param mode
         * @returns
         */
        convertTimestamp(timestamp: number, mode?: boolean): number;
        /**
         * 获取当前或指定时间的详情
         * @param timestamp
         * @param offset
         * @returns
         */
        getDateInfo(timestamp?: number, offset?: number): IDateInfo;
        /**
         * 当前时间转成模板字符串
         * @param formatString
         */
        getStringFromDate(formatString?: string): string;
        getStringFromDate(info?: IDateInfo, formatString?: string): string;
        /**
         * 时间字符串转成时间信息
         * @param text 格式: "yyyy/M/d hh:mm:ss" 或 "yyyy-MM-dd hh:mm" 或 "hh:mm:ss" 或 "mm:ss"
         * @param timestamp 当时间信息不足时，用来修正的时间戳
         */
        getDateFromString(text: string, timestamp?: number): IDateInfo;
        /**
         * 时间字符串转成时间戳
         * @param text 格式: "yyyy/M/d hh:mm:ss" 或 "yyyy-MM-dd hh:mm" 或 "hh:mm:ss" 或 "mm:ss"
         * @param timestamp 当时间信息不足时，用来修正的时间戳
         */
        getTimestampFromString(text: string, timestamp?: number): number;
        /**
         * 时间详情转服务器时间戳
         * @param info 时间详情
         * @param timestamp 参考修正的服务器时间戳
         */
        getTimestampFromDate(info: IDateInfo, timestamp?: number): number;
        /**
         * 服务器时间戳对应的日期是否是周几
         * @param week 周一至周日(1,...,7)
         * @param timestamp 服务器时间戳(默认当前服务器时间)
         */
        isWeekDay(week: number, timestamp?: number): boolean;
        /**
         * 获取当前日期或指定日期所在周对应的服务器时间戳
         * @param week 周一至周日(1,...,7)
         * @param timestamp 服务器时间戳(默认当前服务器时间)
         * @fixed 具体时间修正(只参考时分秒)
         */
        getTimestampWithWeek(week: number, timestamp?: number, fixed?: IDateInfo): number;
        /**
         * 获取当前日期或指定日期下一周对应的服务器时间戳
         * @param week 周一至周日(1,...,7)
         * @param timestamp 服务器时间戳(默认当前服务器时间)
         * @param fixed 具体时间修正(只参考时分秒)
         */
        getTimestampWithNextWeek(week: number, timestamp?: number, fixed?: IDateInfo): number;
        /**
         * 获取当前日期或指定日期所在月份的第一天服务器时间戳
         * @param timestamp 服务器时间戳(默认当前服务器时间)
         * @param fixed 具体时间修正(只参考时分秒)
         */
        getFirstDayTimestampWithMonth(timestamp?: number, fixed?: IDateInfo): number;
        /**
         * 获取当前日期或指定日期所在月份下月第一天服务器时间戳
         * @param timestamp 服务器时间戳(默认当前服务器时间)
         * @param fixed 具体时间修正(只参考时分秒)
         */
        getFirstDayTimestampWithNextMonth(timestamp?: number, fixed?: IDateInfo): number;
        /**
         * 获取当前日期或指定日期所在月份的最后一天服务器时间戳
         * @param timestamp 服务器时间戳(默认当前服务器时间)
         * @param fixed 具体时间修正(只参考时分秒)
         */
        getLastDayTimestampWithMonth(timestamp?: number, fixed?: IDateInfo): number;
        /**
         * 修正服务器时间戳到指定时间
         * @param timestamp 要修正的服务器时间戳
         * @param fixed 修正的时间参数(只参考时分秒)
         */
        fixedTimestamp(timestamp?: number, fixed?: IDateInfo): number;
        /**
         * 获取明天的服务器时间戳（默认获取明天凌晨0点）
         * @param timestamp 服务器时间戳
         * @param fixed 时间修正
         */
        getTimestampWithTomorrow(timestamp?: number, fixed?: IDateInfo): number;
        /**
         * 获取当前时间戳的总天数
         * @param timestamp
         * @returns
         */
        getDayID(timestamp?: number): number;
        private fixedDateInfo(fixed);
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-07
*************************************************/
declare module xgame {
    let IDateTimeManager: symbol;
    interface IDateTimeManager extends IXObject {
        /**
         * 设置当前时间戳和时区偏差，一般是服务器时间和时区
         * @param timestamp
         * @param timeZone
         */
        setNowTimestamp(timestamp: number, timeZone?: number): void;
        /**
         * 获得当前时间戳
         * @returns
         */
        getNowTimestamp(): number;
        /**
         * 格式化日期和时间
         * @param formatString
         * @param timestamp
         * @returns
         */
        formatDateTime(formatString?: string, timestamp?: number): string;
        /**
         * 格式化秒数
         * @param formatString
         * @param time
         * @returns
         */
        formatSeconds(formatString: string, time: number): string;
        /**
         * 转换时间戳
         * @param timestamp
         * @param mode
         * @returns
         */
        convertTimestamp(timestamp: number, mode?: boolean): number;
        /**
         * 获取当前或指定时间的详情
         * @param timestamp
         * @param offset
         * @returns
         */
        getDateInfo(timestamp?: number, offset?: number): IDateInfo;
        /**
         * 当前时间转成模板字符串
         * @param formatString
         */
        getStringFromDate(formatString?: string): string;
        getStringFromDate(info?: IDateInfo, formatString?: string): string;
        getStringFromDate(info_or_formatString?: IDateInfo | string, formatString?: string): string;
        /**
         * 时间字符串转成时间信息
         * @param text 格式: "yyyy/M/d hh:mm:ss" 或 "yyyy-MM-dd hh:mm" 或 "hh:mm:ss" 或 "mm:ss"
         * @param timestamp 当时间信息不足时，用来修正的时间戳
         */
        getDateFromString(text: string, timestamp?: number): IDateInfo;
        /**
         * 时间字符串转成时间戳
         * @param text 格式: "yyyy/M/d hh:mm:ss" 或 "yyyy-MM-dd hh:mm" 或 "hh:mm:ss" 或 "mm:ss"
         * @param timestamp 当时间信息不足时，用来修正的时间戳
         */
        getTimestampFromString(text: string, timestamp?: number): number;
        /**
         * 时间详情转服务器时间戳
         * @param info 时间详情
         * @param timestamp 参考修正的服务器时间戳
         */
        getTimestampFromDate(info: IDateInfo, timestamp?: number): number;
        /**
         * 服务器时间戳对应的日期是否是周几
         * @param week 周一至周日(1,...,7)
         * @param timestamp 服务器时间戳(默认当前服务器时间)
         */
        isWeekDay(week: number, timestamp?: number): boolean;
        /**
         * 获取当前日期或指定日期所在周对应的服务器时间戳
         * @param week 周一至周日(1,...,7)
         * @param timestamp 服务器时间戳(默认当前服务器时间)
         * @fixed 具体时间修正(只参考时分秒)
         */
        getTimestampWithWeek(week: number, timestamp?: number, fixed?: IDateInfo): number;
        /**
         * 获取当前日期或指定日期下一周对应的服务器时间戳
         * @param week 周一至周日(1,...,7)
         * @param timestamp 服务器时间戳(默认当前服务器时间)
         * @param fixed 具体时间修正(只参考时分秒)
         */
        getTimestampWithNextWeek(week: number, timestamp?: number, fixed?: IDateInfo): number;
        /**
         * 获取当前日期或指定日期所在月份的第一天服务器时间戳
         * @param timestamp 服务器时间戳(默认当前服务器时间)
         * @param fixed 具体时间修正(只参考时分秒)
         */
        getFirstDayTimestampWithMonth(timestamp?: number, fixed?: IDateInfo): number;
        /**
         * 获取当前日期或指定日期所在月份下月第一天服务器时间戳
         * @param timestamp 服务器时间戳(默认当前服务器时间)
         * @param fixed 具体时间修正(只参考时分秒)
         */
        getFirstDayTimestampWithNextMonth(timestamp?: number, fixed?: IDateInfo): number;
        /**
         * 获取当前日期或指定日期所在月份的最后一天服务器时间戳
         * @param timestamp 服务器时间戳(默认当前服务器时间)
         * @param fixed 具体时间修正(只参考时分秒)
         */
        getLastDayTimestampWithMonth(timestamp?: number, fixed?: IDateInfo): number;
        /**
         * 修正服务器时间戳到指定时间
         * @param timestamp 要修正的服务器时间戳
         * @param fixed 修正的时间参数(只参考时分秒)
         */
        fixedTimestamp(timestamp?: number, fixed?: IDateInfo): number;
        /**
         * 获取明天的服务器时间戳（默认获取明天凌晨0点）
         * @param timestamp 服务器时间戳
         * @param fixed 时间修正
         */
        getTimestampWithTomorrow(timestamp?: number, fixed?: IDateInfo): number;
        /**
         * 获取当前时间戳的总天数
         * @param timestamp
         * @returns
         */
        getDayID(timestamp?: number): number;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-01-14
*************************************************/
declare module xgame {
    function attributes(...args: IAttribute[]): any;
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-19
*************************************************/
declare module xgame {
    let IEventManager: symbol;
    interface IEventManager extends IXObject {
        addEventListener(type: string, listener: (e?: Event) => void, thisObject: any, useCapture?: boolean, priority?: number): EventListener;
        once(type: string, listener: (e?: Event) => void, thisObject: any, useCapture?: boolean, priority?: number): EventListener;
        removeEventListener(type: string, listener: (e?: Event) => void, thisObject: any, useCapture?: boolean): void;
        hasEventListener(type: string): boolean;
        dispatchEvent(event: Event): boolean;
        dispatchEvent(event: string, data?: any): boolean;
        addEventListener(moduleId: number, type: string, listener: (e?: Event) => void, thisObject: any, useCapture?: boolean, priority?: number): EventListener;
        once(moduleId: number, type: string, listener: (e?: Event) => void, thisObject: any, useCapture?: boolean, priority?: number): EventListener;
        removeEventListener(moduleId: number, type: string, listener: (e?: Event) => void, thisObject: any, useCapture?: boolean): void;
        hasEventListener(moduleId: number, type: string): boolean;
        dispatchEvent(moduleId: number, event: Event): boolean;
        dispatchEvent(moduleId: number, event: string, data?: any): boolean;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-19
*************************************************/
declare module xgame {
    class EventDispatcher extends XObject implements IEventDispatcher {
        constructor(target?: IEventDispatcher);
        $EventDispatcher: Object;
        $getEventMap(useCapture?: boolean): any;
        addEventListener(type: string, listener: (e?: Event) => void, thisObject: any, useCapture?: boolean, priority?: number): void;
        once(type: string, listener: (e?: Event) => void, thisObject: any, useCapture?: boolean, priority?: number): void;
        $addListener(type: string, listener: (e?: Event) => void, thisObject: any, useCapture?: boolean, priority?: number, dispatchOnce?: boolean): void;
        $insertEventBin(list: any[], type: string, listener: (e?: Event) => void, thisObject: any, useCapture?: boolean, priority?: number, dispatchOnce?: boolean): boolean;
        removeEventListener(type: string, listener: (e?: Event) => void, thisObject: any, useCapture?: boolean): void;
        $removeEventBin(list: any[], listener: (e?: Event) => void, thisObject: any): boolean;
        hasEventListener(type: string): boolean;
        willTrigger(type: string): boolean;
        dispatchEvent(event: Event): boolean;
        $notifyListener(event: Event, capturePhase: boolean): boolean;
        dispatchEventWith(type: string, bubbles?: boolean, data?: any, cancelable?: boolean): boolean;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-20
*************************************************/
declare module xgame {
    class EventListener extends DisposableObject {
        private manager;
        moduleid: number;
        type: string;
        listener: (e?: xgame.Event) => void;
        thisObject: any;
        useCapture: boolean;
        priority: number;
        constructor(manager: IEventManager, moduleid: number, type: string, listener: (e?: xgame.Event) => void, thisObject?: any, useCapture?: boolean, priority?: number);
        dispose(): void;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-19
*************************************************/
declare module xgame {
    interface IEventObserve {
        eventName?: string;
        moduleId?: number;
        once?: boolean;
        priority?: number;
        callback?: Function;
        thisObject?: any;
    }
    interface IEventSubject {
        __eventview__?: boolean;
        eventDisposableGroup?: DisposableGroup;
        eventObserves?: IEventObserve[];
        addEventObserves?(): void;
        removeEventObserves?(): void;
    }
    class EventManager extends Singleton implements IEventManager {
        private moduleDispatchers;
        constructor();
        addEventListener(type: string, listener: (e?: Event) => void, thisObject: any, useCapture?: boolean, priority?: number): EventListener;
        addEventListener(moduleId: number, type: string, listener: (e?: Event) => void, thisObject: any, useCapture?: boolean, priority?: number): EventListener;
        once(type: string, listener: (e?: Event) => void, thisObject: any, useCapture?: boolean, priority?: number): EventListener;
        once(moduleId: number, type: string, listener: (e?: Event) => void, thisObject: any, useCapture?: boolean, priority?: number): EventListener;
        removeEventListener(type: string, listener: (e?: Event) => void, thisObject: any, useCapture?: boolean): void;
        removeEventListener(moduleId: number, type: string, listener: (e?: Event) => void, thisObject: any, useCapture?: boolean): void;
        hasEventListener(type: string): boolean;
        hasEventListener(moduleId: number, type: string): boolean;
        dispatchEvent(event: Event): boolean;
        dispatchEvent(event: string, data?: any): boolean;
        dispatchEvent(moduleId: number, event: Event): boolean;
        dispatchEvent(moduleId: number, event: string, data?: any): boolean;
        private getDispatcher(moduleId?);
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-20
*************************************************/
declare module xgame {
}
declare namespace xgame {
    interface DisposableGroup {
        addEventListener(type: string, listener: (e?: Event) => void, thisObject: any, useCapture?: boolean, priority?: number): void;
        once(type: string, listener: (e?: Event) => void, thisObject: any, useCapture?: boolean, priority?: number): void;
        addEventListener(moduleId: number, type: string, listener: (e?: Event) => void, thisObject: any, useCapture?: boolean, priority?: number): void;
        once(moduleId: number, type: string, listener: (e?: Event) => void, thisObject: any, useCapture?: boolean, priority?: number): void;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-18
*************************************************/
declare module xgame {
    function event(eventName: string, moduleId?: number, priority?: number): (target: any, key: string, descriptor: TypedPropertyDescriptor<Function>) => void;
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-18
*************************************************/
declare module xgame {
    function inject(identity: any, named?: string): (target: any, key: string, indexOrDescriptor?: number | TypedPropertyDescriptor<Function>) => void;
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-19
*************************************************/
declare module xgame {
    function superConstructor(constructor: any, args: any[]): any;
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-19
*************************************************/
declare module xgame {
    function injectInstance<T>(instance: T): T;
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-23
*************************************************/
declare module xgame {
    function injectable(): any;
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-19
*************************************************/
declare module xgame {
    class StateMachine<T> extends XObject {
        onStateChanged: Function;
        readonly currentState: State<T>;
        previousState: State<T>;
        elapsedTimeInState: number;
        protected $currentState: State<T>;
        protected $context: T;
        private $states;
        constructor(context: T, initialStateType: any, initialState: State<T>);
        /**
         * 将状态添加到状态机
         * @param stateType
         * @param state
         */
        addState(stateType: any, state: State<T>): void;
        /**
         * 使用提供的增量时间为状态机计时
         * @param deltaTime
         */
        update(deltaTime: number): void;
        /**
         * 从机器获取特定状态，而不必对其进行更改。
         * @param type
         */
        getState<R extends State<T>>(type: any): R;
        /**
         * 更改当前状态
         * @param newType
         */
        changeState<R extends State<T>>(newType: any): R;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-19
*************************************************/
declare module xgame {
    abstract class State<T> extends XObject {
        protected $machine: StateMachine<T>;
        protected $context: T;
        setMachineAndContext(machine: StateMachine<T>, context: T): void;
        /**
         * 在设置machine和context之后直接调用，允许状态执行任何所需的设置
         *
         * @memberof State
         */
        onInitialize(): void;
        /**
         * 当状态变为活动状态时调用
         *
         * @memberof State
         */
        onEnter(): void;
        /**
         * 在更新之前调用，允许状态最后一次机会改变状态
         *
         * @memberof State
         */
        onPrepare(): void;
        /**
         * 每个帧调用此状态为活动状态
         *
         * @abstract
         * @param {number} deltaTime
         * @memberof State
         */
        abstract onUpdate(deltaTime: number): void;
        /**
         * 此状态不再是活动状态时调用
         *
         * @memberof State
         */
        onExit(): void;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-01-07
*************************************************/
declare module xgame {
    class Enumerable {
        /**
         * 在指定范围内生成一个整数序列。
         */
        static range(start: number, count: number): List<number>;
        /**
         * 生成包含一个重复值的序列。
         */
        static repeat<T>(element: T, count: number): List<T>;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-19
*************************************************/
declare module xgame {
    class MathVector extends XObject {
        x: number;
        y: number;
        constructor(x?: number, y?: number);
        copy(): MathVector;
        copyFrom(vector: MathVector): void;
        copyFromPoint(point: Point): void;
        setTo(x?: number, y?: number): void;
        rotate(angle: number): void;
        scaleEquals(value: number): void;
        scale(value: number, result?: MathVector): MathVector;
        normalize(): void;
        plusEquals(vector: MathVector): void;
        plus(vector: MathVector, result?: MathVector): MathVector;
        minusEquals(vector: MathVector): void;
        minus(vector: MathVector, result?: MathVector): MathVector;
        dot(vector: MathVector): number;
        angle: number;
        length: number;
        readonly normal: MathVector;
        toString(): string;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-19
*************************************************/
declare module xgame {
    /**
     * The Matrix class represents a transformation matrix that determines how to map points from one coordinate space to
     * another. You can perform various graphical transformations on a display object by setting the properties of a Matrix
     * object, applying that Matrix object to the matrix property of a display object, These transformation functions include
     * translation (x and y repositioning), rotation, scaling, and skewing.
     * @version Egret 2.4
     * @platform Web,Native
     * @includeExample egret/geom/Matrix.ts
     * @language en_US
     */
    /**
     * Matrix 类表示一个转换矩阵，它确定如何将点从一个坐标空间映射到另一个坐标空间。
     * 您可以对一个显示对象执行不同的图形转换，方法是设置 Matrix 对象的属性，将该 Matrix
     * 对象应用于显示对象的 matrix 属性。这些转换函数包括平移（x 和 y 重新定位）、旋转、缩放和倾斜。
     * @version Egret 2.4
     * @platform Web,Native
     * @includeExample egret/geom/Matrix.ts
     * @language zh_CN
     */
    class Matrix extends XObject {
        /**
         * Creates a new Matrix object with the specified parameters.
         * @param a The value that affects the positioning of pixels along the x axis when scaling or rotating an image.
         * @param b The value that affects the positioning of pixels along the y axis when rotating or skewing an image.
         * @param c The value that affects the positioning of pixels along the x axis when rotating or skewing an image.
         * @param d The value that affects the positioning of pixels along the y axis when scaling or rotating an image..
         * @param tx The distance by which to translate each point along the x axis.
         * @param ty The distance by which to translate each point along the y axis.
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 使用指定参数创建一个 Matrix 对象
         * @param a 缩放或旋转图像时影响像素沿 x 轴定位的值。
         * @param b 旋转或倾斜图像时影响像素沿 y 轴定位的值。
         * @param c 旋转或倾斜图像时影响像素沿 x 轴定位的值。
         * @param d 缩放或旋转图像时影响像素沿 y 轴定位的值。
         * @param tx 沿 x 轴平移每个点的距离。
         * @param ty 沿 y 轴平移每个点的距离。
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        constructor(a?: number, b?: number, c?: number, d?: number, tx?: number, ty?: number);
        /**
         * The value that affects the positioning of pixels along the x axis when scaling or rotating an image.
         * @default 1
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 缩放或旋转图像时影响像素沿 x 轴定位的值
         * @default 1
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        a: number;
        /**
         * The value that affects the positioning of pixels along the y axis when rotating or skewing an image.
         * @default 0
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 旋转或倾斜图像时影响像素沿 y 轴定位的值
         * @default 0
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        b: number;
        /**
         * The value that affects the positioning of pixels along the x axis when rotating or skewing an image.
         * @default 0
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 旋转或倾斜图像时影响像素沿 x 轴定位的值
         * @default 0
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        c: number;
        /**
         * The value that affects the positioning of pixels along the y axis when scaling or rotating an image.
         * @default 1
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 缩放或旋转图像时影响像素沿 y 轴定位的值
         * @default 1
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        d: number;
        /**
         * The distance by which to translate each point along the x axis.
         * @default 0
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 沿 x 轴平移每个点的距离
         * @default 0
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        tx: number;
        /**
         * The distance by which to translate each point along the y axis.
         * @default 0
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 沿 y 轴平移每个点的距离
         * @default 0
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        ty: number;
        /**
         * Returns a new Matrix object that is a clone of this matrix, with an exact copy of the contained object.
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 返回一个新的 Matrix 对象，它是此矩阵的克隆，带有与所含对象完全相同的副本。
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        clone(): Matrix;
        /**
         * Concatenates a matrix with the current matrix, effectively combining the geometric effects of the two. In mathematical
         * terms, concatenating two matrixes is the same as combining them using matrix multiplication.
         * @param other The matrix to be concatenated to the source matrix.
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 将某个矩阵与当前矩阵连接，从而将这两个矩阵的几何效果有效地结合在一起。在数学术语中，将两个矩阵连接起来与使用矩阵乘法将它们结合起来是相同的。
         * @param other 要连接到源矩阵的矩阵。
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        concat(other: Matrix): void;
        /**
         * Copies all of the matrix data from the source Point object into the calling Matrix object.
         * @param other  The Matrix object from which to copy the data.
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 将源 Matrix 对象中的所有矩阵数据复制到调用方 Matrix 对象中。
         * @param other 要拷贝的目标矩阵
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        copyFrom(other: Matrix): Matrix;
        /**
         * Sets each matrix property to a value that causes a null transformation. An object transformed by applying an
         * identity matrix will be identical to the original. After calling the identity() method, the resulting matrix
         * has the following properties: a=1, b=0, c=0, d=1, tx=0, ty=0.
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 为每个矩阵属性设置一个值，该值将导致矩阵无转换。通过应用恒等矩阵转换的对象将与原始对象完全相同。
         * 调用 identity() 方法后，生成的矩阵具有以下属性：a=1、b=0、c=0、d=1、tx=0 和 ty=0。
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        identity(): void;
        /**
         * Performs the opposite transformation of the original matrix. You can apply an inverted matrix to an object to
         * undo the transformation performed when applying the original matrix.
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 执行原始矩阵的逆转换。
         * 您可以将一个逆矩阵应用于对象来撤消在应用原始矩阵时执行的转换。
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        invert(): void;
        /**
         * @private
         */
        $invertInto(target: Matrix): void;
        /**
         * Applies a rotation transformation to the Matrix object.
         * The rotate() method alters the a, b, c, and d properties of the Matrix object.
         * @param angle The rotation angle in radians.
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 对 Matrix 对象应用旋转转换。
         * rotate() 方法将更改 Matrix 对象的 a、b、c 和 d 属性。
         * @param angle 以弧度为单位的旋转角度。
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        rotate(angle: number): void;
        /**
         * Applies a scaling transformation to the matrix. The x axis is multiplied by sx, and the y axis it is multiplied by sy.
         * The scale() method alters the a and d properties of the Matrix object.
         * @param sx A multiplier used to scale the object along the x axis.
         * @param sy A multiplier used to scale the object along the y axis.
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 对矩阵应用缩放转换。x 轴乘以 sx，y 轴乘以 sy。
         * scale() 方法将更改 Matrix 对象的 a 和 d 属性。
         * @param sx 用于沿 x 轴缩放对象的乘数。
         * @param sy 用于沿 y 轴缩放对象的乘数。
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        scale(sx: number, sy: number): void;
        /**
         * Sets the members of Matrix to the specified values
         * @param a The value that affects the positioning of pixels along the x axis when scaling or rotating an image.
         * @param b The value that affects the positioning of pixels along the y axis when rotating or skewing an image.
         * @param c The value that affects the positioning of pixels along the x axis when rotating or skewing an image.
         * @param d The value that affects the positioning of pixels along the y axis when scaling or rotating an image..
         * @param tx The distance by which to translate each point along the x axis.
         * @param ty The distance by which to translate each point along the y axis.
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 将 Matrix 的成员设置为指定值
         * @param a 缩放或旋转图像时影响像素沿 x 轴定位的值。
         * @param b 旋转或倾斜图像时影响像素沿 y 轴定位的值。
         * @param c 旋转或倾斜图像时影响像素沿 x 轴定位的值。
         * @param d 缩放或旋转图像时影响像素沿 y 轴定位的值。
         * @param tx 沿 x 轴平移每个点的距离。
         * @param ty 沿 y 轴平移每个点的距离。
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        setTo(a: number, b: number, c: number, d: number, tx: number, ty: number): Matrix;
        /**
         * Returns the result of applying the geometric transformation represented by the Matrix object to the specified point.
         * @param pointX The x coordinate for which you want to get the result of the Matrix transformation.
         * @param pointY The y coordinate for which you want to get the result of the Matrix transformation.
         * @param resultPoint A reusable instance of Point for saving the results. Passing this parameter can reduce the
         * number of reallocate objects, which allows you to get better code execution performance.
         * @returns The point resulting from applying the Matrix transformation.
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 返回将 Matrix 对象表示的几何转换应用于指定点所产生的结果。
         * @param pointX 想要获得其矩阵转换结果的点的x坐标。
         * @param pointY 想要获得其矩阵转换结果的点的y坐标。
         * @param resultPoint 框架建议尽可能减少创建对象次数来优化性能，可以从外部传入一个复用的Point对象来存储结果，若不传入将创建一个新的Point对象返回。
         * @returns 由应用矩阵转换所产生的点。
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        transformPoint(pointX: number, pointY: number, resultPoint?: Point): Point;
        /**
         * Translates the matrix along the x and y axes, as specified by the dx and dy parameters.
         * @param dx The amount of movement along the x axis to the right, in pixels.
         * @param dy The amount of movement down along the y axis, in pixels.
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 沿 x 和 y 轴平移矩阵，由 dx 和 dy 参数指定。
         * @param dx 沿 x 轴向右移动的量（以像素为单位）。
         * @param dy 沿 y 轴向下移动的量（以像素为单位）。
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        translate(dx: number, dy: number): void;
        /**
         * Determines whether two matrixes are equal.
         * @param other The matrix to be compared.
         * @returns A value of true if the object is equal to this Matrix object; false if it is not equal.
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 是否与另一个矩阵数据相等
         * @param other 要比较的另一个矩阵对象。
         * @returns 是否相等，ture表示相等。
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        equals(other: Matrix): boolean;
        /**
         * prepend matrix
         * @param a The value that affects the positioning of pixels along the x axis when scaling or rotating an image.
         * @param b The value that affects the positioning of pixels along the y axis when rotating or skewing an image.
         * @param c The value that affects the positioning of pixels along the x axis when rotating or skewing an image.
         * @param d The value that affects the positioning of pixels along the y axis when scaling or rotating an image..
         * @param tx The distance by which to translate each point along the x axis.
         * @param ty The distance by which to translate each point along the y axis.
         * @returns matrix
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 前置矩阵
         * @param a 缩放或旋转图像时影响像素沿 x 轴定位的值
         * @param b 缩放或旋转图像时影响像素沿 y 轴定位的值
         * @param c 缩放或旋转图像时影响像素沿 x 轴定位的值
         * @param d 缩放或旋转图像时影响像素沿 y 轴定位的值
         * @param tx 沿 x 轴平移每个点的距离
         * @param ty 沿 y 轴平移每个点的距离
         * @returns 矩阵自身
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        prepend(a: number, b: number, c: number, d: number, tx: number, ty: number): Matrix;
        /**
         * append matrix
         * @param a The value that affects the positioning of pixels along the x axis when scaling or rotating an image.
         * @param b The value that affects the positioning of pixels along the y axis when rotating or skewing an image.
         * @param c The value that affects the positioning of pixels along the x axis when rotating or skewing an image.
         * @param d The value that affects the positioning of pixels along the y axis when scaling or rotating an image..
         * @param tx The distance by which to translate each point along the x axis.
         * @param ty The distance by which to translate each point along the y axis.
         * @returns matrix
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 后置矩阵
         * @param a 缩放或旋转图像时影响像素沿 x 轴定位的值
         * @param b 缩放或旋转图像时影响像素沿 y 轴定位的值
         * @param c 缩放或旋转图像时影响像素沿 x 轴定位的值
         * @param d 缩放或旋转图像时影响像素沿 y 轴定位的值
         * @param tx 沿 x 轴平移每个点的距离
         * @param ty 沿 y 轴平移每个点的距离
         * @returns 矩阵自身
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        append(a: number, b: number, c: number, d: number, tx: number, ty: number): Matrix;
        /**
         * Given a point in the pretransform coordinate space, returns the coordinates of that point after the transformation occurs.
         * Unlike the standard transformation applied using the transformPoint() method, the deltaTransformPoint() method's transformation does not consider the translation parameters tx and ty.
         * @param point The point for which you want to get the result of the matrix transformation.
         * @returns The point resulting from applying the matrix transformation.
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 如果给定预转换坐标空间中的点，则此方法返回发生转换后该点的坐标。
         * 与使用 transformPoint() 方法应用的标准转换不同，deltaTransformPoint() 方法的转换不考虑转换参数 tx 和 ty。
         * @param point 想要获得其矩阵转换结果的点
         * @returns 由应用矩阵转换所产生的点
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        deltaTransformPoint(point: Point): Point;
        /**
         * Returns a text value listing the properties of the Matrix object.
         * @returns A string containing the values of the properties of the Matrix object: a, b, c, d, tx, and ty.
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 返回将 Matrix 对象表示的几何转换应用于指定点所产生的结果。
         * @returns 一个字符串，它包含 Matrix 对象的属性值：a、b、c、d、tx 和 ty。
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        toString(): string;
        /**
         * Includes parameters for scaling, rotation, and translation. When applied to a matrix it sets the matrix's values based on those parameters.
         * @param scaleX The factor by which to scale horizontally.
         * @param scaleY The factor by which scale vertically.
         * @param rotation The amount to rotate, in radians.
         * @param tx The number of pixels to translate (move) to the right along the x axis.
         * @param ty The number of pixels to translate (move) down along the y axis.
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 包括用于缩放、旋转和转换的参数。当应用于矩阵时，该方法会基于这些参数设置矩阵的值。
         * @param scaleX 水平缩放所用的系数
         * @param scaleY 垂直缩放所用的系数
         * @param rotation 旋转量（以弧度为单位）
         * @param tx 沿 x 轴向右平移（移动）的像素数
         * @param ty 沿 y 轴向下平移（移动）的像素数
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        createBox(scaleX: number, scaleY: number, rotation?: number, tx?: number, ty?: number): void;
        /**
         * Creates the specific style of matrix expected by the beginGradientFill() and lineGradientStyle() methods of the Graphics class.
         * Width and height are scaled to a scaleX/scaleY pair and the tx/ty values are offset by half the width and height.
         * @param width The width of the gradient box.
         * @param height The height of the gradient box.
         * @param rotation The amount to rotate, in radians.
         * @param tx The distance, in pixels, to translate to the right along the x axis. This value is offset by half of the width parameter.
         * @param ty The distance, in pixels, to translate down along the y axis. This value is offset by half of the height parameter.
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 创建 Graphics 类的 beginGradientFill() 和 lineGradientStyle() 方法所需的矩阵的特定样式。
         * 宽度和高度被缩放为 scaleX/scaleY 对，而 tx/ty 值偏移了宽度和高度的一半。
         * @param width 渐变框的宽度
         * @param height 渐变框的高度
         * @param rotation 旋转量（以弧度为单位）
         * @param tx 沿 x 轴向右平移的距离（以像素为单位）。此值将偏移 width 参数的一半
         * @param ty 沿 y 轴向下平移的距离（以像素为单位）。此值将偏移 height 参数的一半
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        createGradientBox(width: number, height: number, rotation?: number, tx?: number, ty?: number): void;
        /**
         * @private
         */
        $transformBounds(bounds: Rectangle): void;
        /**
         * @private
         */
        private getDeterminant();
        /**
         * @private
         */
        $getScaleX(): number;
        /**
         * @private
         */
        $getScaleY(): number;
        /**
         * @private
         */
        $getSkewX(): number;
        /**
         * @private
         */
        $getSkewY(): number;
        /**
         * @private
         */
        $updateScaleAndRotation(scaleX: number, scaleY: number, skewX: number, skewY: number): void;
        /**
         * @private
         * target = other * this
         */
        $preMultiplyInto(other: Matrix, target: Matrix): void;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-19
*************************************************/
declare module xgame {
    /**
     * The Point object represents a location in a two-dimensional coordinate system, where x represents the horizontal
     * axis and y represents the vertical axis.
     * @version Egret 2.4
     * @platform Web,Native
     * @includeExample egret/geom/Point.ts
     * @language en_US
     */
    /**
     * Point 对象表示二维坐标系统中的某个位置，其中 x 表示水平轴，y 表示垂直轴。
     * @version Egret 2.4
     * @platform Web,Native
     * @includeExample egret/geom/Point.ts
     * @language zh_CN
     */
    class Point extends XObject {
        /**
         * Creates a new point. If you pass no parameters to this method, a point is created at (0,0).
         * @param x The horizontal coordinate.
         * @param y The vertical coordinate.
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 创建一个 egret.Point 对象.若不传入任何参数，将会创建一个位于（0，0）位置的点。
         * @param x 该对象的x属性值，默认为0
         * @param y 该对象的y属性值，默认为0
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        constructor(x?: number, y?: number);
        /**
         * The horizontal coordinate.
         * @default 0
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 该点的水平坐标。
         * @default 0
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        x: number;
        /**
         * The vertical coordinate.
         * @default 0
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 该点的垂直坐标。
         * @default 0
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        y: number;
        /**
         * The length of the line segment from (0,0) to this point.
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 从 (0,0) 到此点的线段长度。
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        readonly length: number;
        /**
         * Sets the members of Point to the specified values
         * @param x The horizontal coordinate.
         * @param y The vertical coordinate.
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 将 Point 的成员设置为指定值
         * @param x 该对象的x属性值
         * @param y 该对象的y属性值
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        setTo(x: number, y: number): Point;
        /**
         * Creates a copy of this Point object.
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 克隆点对象
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        clone(): Point;
        /**
         * Determines whether two points are equal. Two points are equal if they have the same x and y values.
         * @param toCompare The point to be compared.
         * @returns A value of true if the object is equal to this Point object; false if it is not equal.
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 确定两个点是否相同。如果两个点具有相同的 x 和 y 值，则它们是相同的点。
         * @param toCompare 要比较的点。
         * @returns 如果该对象与此 Point 对象相同，则为 true 值，如果不相同，则为 false。
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        equals(toCompare: Point): boolean;
        /**
         * Returns the distance between pt1 and pt2.
         * @param p1 The first point.
         * @param p2 The second point.
         * @returns The distance between the first and second points.
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 返回 pt1 和 pt2 之间的距离。
         * @param p1 第一个点
         * @param p2 第二个点
         * @returns 第一个点和第二个点之间的距离。
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        static distance(p1: Point, p2: Point): number;
        /**
         * Copies all of the point data from the source Point object into the calling Point object.
         * @param sourcePoint The Point object from which to copy the data.
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 将源 Point 对象中的所有点数据复制到调用方 Point 对象中。
         * @param sourcePoint 要从中复制数据的 Point 对象。
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        copyFrom(sourcePoint: Point): void;
        /**
         * Adds the coordinates of another point to the coordinates of this point to create a new point.
         * @param v The point to be added.
         * @returns The new point.
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 将另一个点的坐标添加到此点的坐标以创建一个新点。
         * @param v 要添加的点。
         * @returns 新点。
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        add(v: Point): Point;
        /**
         * Determines a point between two specified points.
         * The parameter f determines where the new interpolated point is located relative to the two end points specified by parameters pt1 and pt2. The closer the value of the parameter f is to 1.0, the closer the interpolated point is to the first point (parameter pt1). The closer the value of the parameter f is to 0, the closer the interpolated point is to the second point (parameter pt2).
         * @param pt1 The first point.
         * @param pt2 The second point.
         * @param f The level of interpolation between the two points. Indicates where the new point will be, along the line between pt1 and pt2. If f=1, pt1 is returned; if f=0, pt2 is returned.
         * @returns The new interpolated point.
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 确定两个指定点之间的点。
         * 参数 f 确定新的内插点相对于参数 pt1 和 pt2 指定的两个端点所处的位置。参数 f 的值越接近 1.0，则内插点就越接近第一个点（参数 pt1）。参数 f 的值越接近 0，则内插点就越接近第二个点（参数 pt2）。
         * @param pt1 第一个点。
         * @param pt2 第二个点。
         * @param f 两个点之间的内插级别。表示新点将位于 pt1 和 pt2 连成的直线上的什么位置。如果 f=1，则返回 pt1；如果 f=0，则返回 pt2。
         * @returns 新的内插点。
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        static interpolate(pt1: Point, pt2: Point, f: number): Point;
        /**
         * Scales the line segment between (0,0) and the current point to a set length.
         * @param thickness The scaling value. For example, if the current point is (0,5), and you normalize it to 1, the point returned is at (0,1).
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 将 (0,0) 和当前点之间的线段缩放为设定的长度。
         * @param thickness 缩放值。例如，如果当前点为 (0,5) 并且您将它规范化为 1，则返回的点位于 (0,1) 处。
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        normalize(thickness: number): void;
        /**
         * Offsets the Point object by the specified amount. The value of dx is added to the original value of x to create the new x value. The value of dy is added to the original value of y to create the new y value.
         * @param dx The amount by which to offset the horizontal coordinate, x.
         * @param dy The amount by which to offset the vertical coordinate, y.
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 按指定量偏移 Point 对象。dx 的值将添加到 x 的原始值中以创建新的 x 值。dy 的值将添加到 y 的原始值中以创建新的 y 值。
         * @param dx 水平坐标 x 的偏移量。
         * @param dy 水平坐标 y 的偏移量。
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        offset(dx: number, dy: number): void;
        /**
         * Converts a pair of polar coordinates to a Cartesian point coordinate.
         * @param len The length coordinate of the polar pair.
         * @param angle The angle, in radians, of the polar pair.
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 将一对极坐标转换为笛卡尔点坐标。
         * @param len 极坐标对的长度。
         * @param angle 极坐标对的角度（以弧度表示）。
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        static polar(len: number, angle: number): Point;
        /**
         * Subtracts the coordinates of another point from the coordinates of this point to create a new point.
         * @param v The point to be subtracted.
         * @returns The new point.
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 从此点的坐标中减去另一个点的坐标以创建一个新点。
         * @param v 要减去的点。
         * @returns 新点。
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        subtract(v: Point): Point;
        /**
         * Returns a string that contains the values of the x and y coordinates. The string has the form "(x=x, y=y)", so calling the toString() method for a point at 23,17 would return "(x=23, y=17)".
         * @returns The string representation of the coordinates.
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 返回包含 x 和 y 坐标的值的字符串。该字符串的格式为 "(x=x, y=y)"，因此为点 23,17 调用 toString() 方法将返回 "(x=23, y=17)"。
         * @returns 坐标的字符串表示形式。
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        toString(): string;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-19
*************************************************/
declare module xgame {
    /**
     * A Rectangle object is an area defined by its position, as indicated by its top-left corner point (x, y) and by its
     * width and its height.<br/>
     * The x, y, width, and height properties of the Rectangle class are independent of each other; changing the value of
     * one property has no effect on the others. However, the right and bottom properties are integrally related to those
     * four properties. For example, if you change the value of the right property, the value of the width property changes;
     * if you change the bottom property, the value of the height property changes.
     * @version Egret 2.4
     * @platform Web,Native
     * @includeExample egret/geom/Rectangle.ts
     * @language en_US
     */
    /**
     * Rectangle 对象是按其位置（由它左上角的点 (x, y) 确定）以及宽度和高度定义的区域。<br/>
     * Rectangle 类的 x、y、width 和 height 属性相互独立；更改一个属性的值不会影响其他属性。
     * 但是，right 和 bottom 属性与这四个属性是整体相关的。例如，如果更改 right 属性的值，则 width
     * 属性的值将发生变化；如果更改 bottom 属性，则 height 属性的值将发生变化。
     * @version Egret 2.4
     * @platform Web,Native
     * @includeExample egret/geom/Rectangle.ts
     * @language zh_CN
     */
    class Rectangle extends XObject {
        /**
         * Creates a new Rectangle object with the top-left corner specified by the x and y parameters and with the specified
         * width and height parameters.
         * @param x The x coordinate of the top-left corner of the rectangle.
         * @param y The y coordinate of the top-left corner of the rectangle.
         * @param width The width of the rectangle, in pixels.
         * @param height The height of the rectangle, in pixels.
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 创建一个新 Rectangle 对象，其左上角由 x 和 y 参数指定，并具有指定的 width 和 height 参数。
         * @param x 矩形左上角的 x 坐标。
         * @param y 矩形左上角的 y 坐标。
         * @param width 矩形的宽度（以像素为单位）。
         * @param height 矩形的高度（以像素为单位）。
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        constructor(x?: number, y?: number, width?: number, height?: number);
        /**
         * The x coordinate of the top-left corner of the rectangle.
         * @default 0
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 矩形左上角的 x 坐标。
         * @default 0
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        x: number;
        /**
         * The y coordinate of the top-left corner of the rectangle.
         * @default 0
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 矩形左上角的 y 坐标。
         * @default 0
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        y: number;
        /**
         * The width of the rectangle, in pixels.
         * @default 0
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 矩形的宽度（以像素为单位）。
         * @default 0
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        width: number;
        /**
         * 矩形的高度（以像素为单位）。
         * @default 0
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * The height of the rectangle, in pixels.
         * @default 0
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        height: number;
        /**
         * The sum of the x and width properties.
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * x 和 width 属性的和。
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        right: number;
        /**
         * The sum of the y and height properties.
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * y 和 height 属性的和。
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        bottom: number;
        /**
         * The x coordinate of the top-left corner of the rectangle. Changing the left property of a Rectangle object has
         * no effect on the y and height properties. However it does affect the width property, whereas changing the x value
         * does not affect the width property.
         * The value of the left property is equal to the value of the x property.
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 矩形左上角的 x 坐标。更改 Rectangle 对象的 left 属性对 y 和 height 属性没有影响。但是，它会影响 width 属性，而更改 x 值不会影响 width 属性。
         * left 属性的值等于 x 属性的值。
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        left: number;
        /**
         * The y coordinate of the top-left corner of the rectangle. Changing the top property of a Rectangle object has
         * no effect on the x and width properties. However it does affect the height property, whereas changing the y
         * value does not affect the height property.<br/>
         * The value of the top property is equal to the value of the y property.
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 矩形左上角的 y 坐标。更改 Rectangle 对象的 top 属性对 x 和 width 属性没有影响。但是，它会影响 height 属性，而更改 y 值不会影响 height 属性。<br/>
         * top 属性的值等于 y 属性的值。
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        top: number;
        /**
         * The location of the Rectangle object's top-left corner, determined by the x and y coordinates of the point.
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 由该点的 x 和 y 坐标确定的 Rectangle 对象左上角的位置。
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        topLeft: Point;
        /**
         * The location of the Rectangle object's bottom-right corner, determined by the values of the right and bottom properties.
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 由 right 和 bottom 属性的值确定的 Rectangle 对象的右下角的位置。
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        bottomRight: Point;
        /**
         * Copies all of rectangle data from the source Rectangle object into the calling Rectangle object.
         * @param sourceRect The Rectangle object from which to copy the data.
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 将源 Rectangle 对象中的所有矩形数据复制到调用方 Rectangle 对象中。
         * @param sourceRect 要从中复制数据的 Rectangle 对象。
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        copyFrom(sourceRect: Rectangle): Rectangle;
        /**
         * Sets the members of Rectangle to the specified values
         * @param x The x coordinate of the top-left corner of the rectangle.
         * @param y The y coordinate of the top-left corner of the rectangle.
         * @param width The width of the rectangle, in pixels.
         * @param height The height of the rectangle, in pixels.
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 将 Rectangle 的成员设置为指定值
         * @param x 矩形左上角的 x 坐标。
         * @param y 矩形左上角的 y 坐标。
         * @param width 矩形的宽度（以像素为单位）。
         * @param height 矩形的高度（以像素为单位）。
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        setTo(x: number, y: number, width: number, height: number): Rectangle;
        /**
         * Determines whether the specified point is contained within the rectangular region defined by this Rectangle object.
         * @param x The x coordinate (horizontal position) of the point.
         * @param y The y coordinate (vertical position) of the point.
         * @returns A value of true if the Rectangle object contains the specified point; otherwise false.
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 确定由此 Rectangle 对象定义的矩形区域内是否包含指定的点。
         * @param x 检测点的x轴
         * @param y 检测点的y轴
         * @returns 如果检测点位于矩形内，返回true，否则，返回false
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        contains(x: number, y: number): boolean;
        /**
         * If the Rectangle object specified in the toIntersect parameter intersects with this Rectangle object, returns
         * the area of intersection as a Rectangle object. If the rectangles do not intersect, this method returns an empty
         * Rectangle object with its properties set to 0.
         * @param toIntersect The Rectangle object to compare against to see if it intersects with this Rectangle object.
         * @returns A Rectangle object that equals the area of intersection. If the rectangles do not intersect, this method
         * returns an empty Rectangle object; that is, a rectangle with its x, y, width, and height properties set to 0.
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 如果在 toIntersect 参数中指定的 Rectangle 对象与此 Rectangle 对象相交，则返回交集区域作为 Rectangle 对象。如果矩形不相交，
         * 则此方法返回一个空的 Rectangle 对象，其属性设置为 0。
         * @param toIntersect 要对照比较以查看其是否与此 Rectangle 对象相交的 Rectangle 对象。
         * @returns 等于交集区域的 Rectangle 对象。如果该矩形不相交，则此方法返回一个空的 Rectangle 对象；即，其 x、y、width 和
         * height 属性均设置为 0 的矩形。
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        intersection(toIntersect: Rectangle): Rectangle;
        /**
         * Increases the size of the Rectangle object by the specified amounts, in pixels.
         * The center point of the Rectangle object stays the same, and its size increases to the left and right by the dx value, and to the top and the bottom by the dy value.
         * @param dx The value to be added to the left and the right of the Rectangle object.
         * @param dy The value to be added to the top and the bottom of the Rectangle.
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 按指定量增加 Rectangle 对象的大小（以像素为单位）
         * 保持 Rectangle 对象的中心点不变，使用 dx 值横向增加它的大小，使用 dy 值纵向增加它的大小。
         * @param dx Rectangle 对象横向增加的值。
         * @param dy Rectangle 对象纵向增加的值。
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        inflate(dx: number, dy: number): void;
        /**
         * @private
         */
        $intersectInPlace(clipRect: Rectangle): Rectangle;
        /**
         * Determines whether the object specified in the toIntersect parameter intersects with this Rectangle object.
         * This method checks the x, y, width, and height properties of the specified Rectangle object to see if it
         * intersects with this Rectangle object.
         * @param toIntersect The Rectangle object to compare against this Rectangle object.
         * @returns A value of true if the specified object intersects with this Rectangle object; otherwise false.
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 确定在 toIntersect 参数中指定的对象是否与此 Rectangle 对象相交。此方法检查指定的 Rectangle
         * 对象的 x、y、width 和 height 属性，以查看它是否与此 Rectangle 对象相交。
         * @param toIntersect 要与此 Rectangle 对象比较的 Rectangle 对象。
         * @returns 如果两个矩形相交，返回true，否则返回false
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        intersects(toIntersect: Rectangle): boolean;
        /**
         * Determines whether or not this Rectangle object is empty.
         * @returns A value of true if the Rectangle object's width or height is less than or equal to 0; otherwise false.
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 确定此 Rectangle 对象是否为空。
         * @returns 如果 Rectangle 对象的宽度或高度小于等于 0，则返回 true 值，否则返回 false。
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        isEmpty(): boolean;
        /**
         * Sets all of the Rectangle object's properties to 0. A Rectangle object is empty if its width or height is less than or equal to 0.
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 将 Rectangle 对象的所有属性设置为 0。
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        setEmpty(): void;
        /**
         * Returns a new Rectangle object with the same values for the x, y, width, and height properties as the original Rectangle object.
         * @returns A new Rectangle object with the same values for the x, y, width, and height properties as the original Rectangle object.
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 返回一个新的 Rectangle 对象，其 x、y、width 和 height 属性的值与原始 Rectangle 对象的对应值相同。
         * @returns 新的 Rectangle 对象，其 x、y、width 和 height 属性的值与原始 Rectangle 对象的对应值相同。
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        clone(): Rectangle;
        /**
         * Determines whether the specified point is contained within the rectangular region defined by this Rectangle object.
         * This method is similar to the Rectangle.contains() method, except that it takes a Point object as a parameter.
         * @param point The point, as represented by its x and y coordinates.
         * @returns A value of true if the Rectangle object contains the specified point; otherwise false.
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 确定由此 Rectangle 对象定义的矩形区域内是否包含指定的点。
         * 此方法与 Rectangle.contains() 方法类似，只不过它采用 Point 对象作为参数。
         * @param point 包含点对象
         * @returns 如果包含，返回true，否则返回false
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        containsPoint(point: Point): boolean;
        /**
         * Determines whether the Rectangle object specified by the rect parameter is contained within this Rectangle object.
         * A Rectangle object is said to contain another if the second Rectangle object falls entirely within the boundaries of the first.
         * @param rect The Rectangle object being checked.
         * @returns A value of true if the Rectangle object that you specify is contained by this Rectangle object; otherwise false.
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 确定此 Rectangle 对象内是否包含由 rect 参数指定的 Rectangle 对象。
         * 如果一个 Rectangle 对象完全在另一个 Rectangle 的边界内，我们说第二个 Rectangle 包含第一个 Rectangle。
         * @param rect 所检查的 Rectangle 对象
         * @returns 如果此 Rectangle 对象包含您指定的 Rectangle 对象，则返回 true 值，否则返回 false。
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        containsRect(rect: Rectangle): boolean;
        /**
         * Determines whether the object specified in the toCompare parameter is equal to this Rectangle object.
         * This method compares the x, y, width, and height properties of an object against the same properties of this Rectangle object.
         * @param The rectangle to compare to this Rectangle object.
         * @returns A value of true if the object has exactly the same values for the x, y, width, and height properties as this Rectangle object; otherwise false.
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 确定在 toCompare 参数中指定的对象是否等于此 Rectangle 对象。
         * 此方法将某个对象的 x、y、width 和 height 属性与此 Rectangle 对象所对应的相同属性进行比较。
         * @param toCompare 要与此 Rectangle 对象进行比较的矩形。
         * @returns 如果对象具有与此 Rectangle 对象完全相同的 x、y、width 和 height 属性值，则返回 true 值，否则返回 false。
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        equals(toCompare: Rectangle): boolean;
        /**
         * Increases the size of the Rectangle object. This method is similar to the Rectangle.inflate() method except it takes a Point object as a parameter.
         * @param point 此 Point 对象的 x 属性用于增加 Rectangle 对象的水平尺寸。y 属性用于增加 Rectangle 对象的垂直尺寸。
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 增加 Rectangle 对象的大小。此方法与 Rectangle.inflate() 方法类似，只不过它采用 Point 对象作为参数。
         * @param point The x property of this Point object is used to increase the horizontal dimension of the Rectangle object. The y property is used to increase the vertical dimension of the Rectangle object.
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        inflatePoint(point: Point): void;
        /**
         * Adjusts the location of the Rectangle object, as determined by its top-left corner, by the specified amounts.
         * @param dx Moves the x value of the Rectangle object by this amount.
         * @param dy Moves the y value of the Rectangle object by this amount.
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 按指定量调整 Rectangle 对象的位置（由其左上角确定）。
         * @param dx 将 Rectangle 对象的 x 值移动此数量。
         * @param dy 将 Rectangle 对象的 t 值移动此数量。
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        offset(dx: number, dy: number): void;
        /**
         * Adjusts the location of the Rectangle object using a Point object as a parameter. This method is similar to the Rectangle.offset() method, except that it takes a Point object as a parameter.
         * @param point A Point object to use to offset this Rectangle object.
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 将 Point 对象用作参数来调整 Rectangle 对象的位置。此方法与 Rectangle.offset() 方法类似，只不过它采用 Point 对象作为参数。
         * @param point 要用于偏移此 Rectangle 对象的 Point 对象。
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        offsetPoint(point: Point): void;
        /**
         * Builds and returns a string that lists the horizontal and vertical positions and the width and height of the Rectangle object.
         * @returns A string listing the value of each of the following properties of the Rectangle object: x, y, width, and height.
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 生成并返回一个字符串，该字符串列出 Rectangle 对象的水平位置和垂直位置以及高度和宽度。
         * @returns 一个字符串，它列出了 Rectangle 对象的下列各个属性的值：x、y、width 和 height。
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        toString(): string;
        /**
         * Adds two rectangles together to create a new Rectangle object, by filling in the horizontal and vertical space between the two rectangles.
         * @param toUnion A Rectangle object to add to this Rectangle object.
         * @returns A new Rectangle object that is the union of the two rectangles.
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 通过填充两个矩形之间的水平和垂直空间，将这两个矩形组合在一起以创建一个新的 Rectangle 对象。
         * @param toUnion 要添加到此 Rectangle 对象的 Rectangle 对象。
         * @returns 充当两个矩形的联合的新 Rectangle 对象。
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        union(toUnion: Rectangle): Rectangle;
        /**
         * @private
         */
        $getBaseWidth(angle: number): number;
        /**
         * @private
         */
        $getBaseHeight(angle: number): number;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2020-09-15
*************************************************/
declare module xgame {
    /**
     * The base class for all the signal classes.
     */
    class SignalBase extends XObject {
        head: ListenerNode;
        tail: ListenerNode;
        private nodes;
        private listenerNodePool;
        private toAddHead;
        private toAddTail;
        private dispatching;
        private _numListeners;
        constructor();
        readonly numListeners: number;
        has(listener: Function): boolean;
        add(listener: Function, thisObject?: any, priority?: number): void;
        addOnce(listener: Function, thisObject?: any, priority?: number): void;
        remove(listener: Function): void;
        removeAll(): void;
        protected startDispatch(): void;
        protected endDispatch(): void;
        private sortEnable;
        private invalidateSort;
        private addNode(node);
        private sorts(head);
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2020-09-15
*************************************************/
declare module xgame {
    /**
     * Provides a fast signal for use where one parameter is dispatched with the signal.
     */
    class Signal1<T> extends SignalBase {
        dispatch(o: T): void;
        add(listener: (result: T) => void, thisObject?: any, priority?: number): void;
        addOnce(listener: (result: T) => void, thisObject?: any, priority?: number): void;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-19
*************************************************/
declare module xgame {
    interface IPlayable extends IDisposable {
        readonly onComplete: Signal1<IPlayable>;
        advanceTime(time: number): void;
        stop(): void;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-19
*************************************************/
declare module xgame {
    let IPlayableManager: symbol;
    interface IPlayableManager {
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-19
*************************************************/
declare module xgame {
    let IPlayableManagerInternal: symbol;
    interface IPlayableManagerInternal {
        initialize(): void;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-19
*************************************************/
declare module xgame {
    class PlayableManager extends Singleton implements IPlayableManager, IPlayableManagerInternal {
        private playables;
        constructor();
        initialize(): void;
        private isUpdating;
        private advanceTime();
        readonly count: number;
        addPlayable(playable: IPlayable): void;
        private onPlayComplete(playable);
        removePlayable(guid: number): void;
        removePlayable(playable: IPlayable): void;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-19
*************************************************/
declare module xgame {
    let IPoolable: symbol;
    interface IPoolable extends IDisposable {
        fromPoolHashCode?: number;
        release?(): void;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-19
*************************************************/
declare module xgame {
    let IPoolManager: symbol;
    interface IPoolManager {
        debug(includeGroups?: boolean): void;
        getPool<T extends IPoolable>(Clazz: TClass<T>, initCount?: number): PoolObject<T>;
        fetch<T extends IPoolable>(Clazz: TClass<T>, newInstance?: (...args: any[]) => T, thisObject?: any, ...args: any[]): T;
        recycle<T extends IPoolable>(Clazz: TClass<T>, o: T): void;
        release<T extends IPoolable>(Clazz: TClass<T>, loop?: (value: T) => void, thisObject?: any): void;
        getPoolGroup<T extends IPoolable>(group: string): PoolGroup<T>;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-19
*************************************************/
declare module xgame {
    class PoolGroup<T extends IPoolable> extends xgame.XObject {
        private $group;
        readonly group: string;
        private $pools;
        readonly pools: Dictionary<string | number, PoolObject<T>>;
        constructor(group: string);
        getPool(key: string | number, ClassType: TClass<T>, initCount?: number): PoolObject<T>;
        fetch(key: string | number, ClassType: TClass<T>, newInstance?: (...args: any[]) => T, thisObject?: any, ...args: any[]): T;
        recycle(key: string | number, ClassType: TClass<T>, o: T): void;
        release(key: string | number, ClassType: TClass<T>, loop?: (value: T) => void, thisObject?: any): void;
        releases(loop?: (value: T) => void, thisObject?: any): void;
        forEach(loop: (poo: PoolObject<T>) => void, thisObject?: any): void;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-19
*************************************************/
declare module xgame {
    class PoolManager extends Singleton implements IPoolManager {
        private object_pools;
        private group_pools;
        debug(includeGroups?: boolean): void;
        getPool<T extends IPoolable>(Clazz: TClass<T>, initCount?: number): PoolObject<T>;
        fetch<T extends IPoolable>(Clazz: TClass<T>, newInstance?: (...args: any[]) => T, thisObject?: any, ...args: any[]): T;
        recycle<T extends IPoolable>(Clazz: TClass<T>, o: T): void;
        release<T extends IPoolable>(Clazz: TClass<T>, loop?: (value: T) => void, thisObject?: any): void;
        getPoolGroup<T extends IPoolable>(group: string): PoolGroup<T>;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-19
*************************************************/
declare module xgame {
    class PoolObject<T extends IPoolable> extends xgame.XObject {
        static EXPIRE_TIME: number;
        private instances;
        private $create;
        readonly create: number;
        readonly count: number;
        readonly expired: boolean;
        readonly fulled: boolean;
        private Clazz;
        group: string;
        key: string | number;
        constructor(Clazz: TClass<T>, count_init?: number);
        toString(): string;
        fetch(newInstance?: (...args: any[]) => T, thisObject?: any, ...args: any[]): T;
        ping(instance: T): void;
        recycle(instance: T): void;
        release(loop?: (value: T) => void, thisObject?: any): void;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-19
*************************************************/
declare module xgame {
}
declare namespace xgame {
    interface DisposableGroup {
        registerPreUpdate(action: () => void, thisObject?: any, order?: number): void;
        registerUpdate(action: () => void, thisObject?: any, order?: number): void;
        registerPostUpdate(action: () => void, thisObject?: any, order?: number): void;
        registerTimer(timeout: number, action: () => void, thisObject?: any, times?: number, order?: number): void;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2020-09-15
*************************************************/
/**
 * A node in the list of listeners in a signal.
 */
declare module xgame {
    class ListenerNode extends XObject {
        previous: ListenerNode;
        next: ListenerNode;
        listener: Function;
        thisObject: any;
        once: boolean;
        priority: number;
        switchNode(node: ListenerNode): void;
        execute(...args: any[]): boolean;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2020-09-15
*************************************************/
declare module xgame {
    /**
     * This internal class maintains a pool of deleted listener nodes for reuse by framework. This reduces
     * the overhead from object creation and garbage collection.
     */
    class ListenerNodePool extends XObject {
        private tail;
        private cacheTail;
        get(): ListenerNode;
        dispose(node: ListenerNode): void;
        cache(node: ListenerNode): void;
        releaseCache(): void;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2020-09-15
*************************************************/
declare module xgame {
    /**
     * Provides a fast signal for use where no parameters are dispatched with the signal.
     */
    class Signal0 extends SignalBase {
        dispatch(): void;
        add(listener: () => void, thisObject?: any, priority?: number): void;
        addOnce(listener: () => void, thisObject?: any, priority?: number): void;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2020-09-15
*************************************************/
declare module xgame {
    /**
     * Provides a fast signal for use where two parameters are dispatched with the signal.
     */
    class Signal2<T1, T2> extends SignalBase {
        dispatch(o1: T1, o2: T2): void;
        add(listener: (o1: T1, o2: T2) => void, thisObject?: any, priority?: number): void;
        addOnce(listener: (o1: T1, o2: T2) => void, thisObject?: any, priority?: number): void;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2020-09-15
*************************************************/
declare module xgame {
    /**
     * Provides a fast signal for use where three parameters are dispatched with the signal.
     */
    class Signal3<T1, T2, T3> extends SignalBase {
        dispatch(o1: T1, o2: T2, o3: T3): void;
        add(listener: (o1: T1, o2: T2, o3: T3) => void, thisObject?: any, priority?: number): void;
        addOnce(listener: (o1: T1, o2: T2, o3: T3) => void, thisObject?: any, priority?: number): void;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2020-09-15
*************************************************/
declare module xgame {
    /**
     * Provides a fast signal for use where three parameters are dispatched with the signal.
     */
    class Signal4<T1, T2, T3, T4> extends SignalBase {
        dispatch(o1: T1, o2: T2, o3: T3, o4: T4): void;
        add(listener: (o1: T1, o2: T2, o3: T3, o4: T4) => void, thisObject?: any, priority?: number): void;
        addOnce(listener: (o1: T1, o2: T2, o3: T3, o4: T4) => void, thisObject?: any, priority?: number): void;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2020-09-15
*************************************************/
declare module xgame {
    /**
     * Provides a fast signal for use where three parameters are dispatched with the signal.
     */
    class Signal5<T1, T2, T3, T4, T5> extends SignalBase {
        dispatch(o1: T1, o2: T2, o3: T3, o4: T4, o5: T5): void;
        add(listener: (o1: T1, o2: T2, o3: T3, o4: T4, o5: T5) => void, thisObject?: any, priority?: number): void;
        addOnce(listener: (o1: T1, o2: T2, o3: T3, o4: T4, o5: T5) => void, thisObject?: any, priority?: number): void;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2020-09-15
*************************************************/
declare module xgame {
    /**
     * Provides a fast signal for use where any number of parameters are dispatched with the signal.
     */
    class SignalAny extends SignalBase {
        dispatch(...objects: any[]): void;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-23
*************************************************/
declare module xgame {
    type TClass<T> = new (...args: any[]) => T;
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-01-21
*************************************************/
declare module xgame {
    class Random {
        static range(min: number, max: number): number;
        static chars(len?: number): string;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-01-21
*************************************************/
declare module xgame {
    class ArrayUtils {
        /**
         * 将数组打乱顺序
         */
        static shuffle<T>(list: Array<T>): void;
        /**
         * 取出数组第一个项
         */
        static peek<T>(list: Array<T>): T;
        /**
         * 向数组头部添加一个项
         */
        static push<T>(list: Array<T>, item: T): void;
        /**
         * 移除数组第一个项并返回它
         */
        static pop<T>(list: Array<T>): T;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-23
*************************************************/
declare module xgame {
    class Deferred<T> extends xgame.XObject {
        private $promise;
        private $resolve;
        private $reject;
        constructor();
        resolve(value?: T): void;
        reject(reason?: any): void;
        readonly promise: Promise<T>;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-01-17
*************************************************/
declare module xgame {
    enum AwaitType {
        Frame = 1,
        Milliseconds = 2,
        Seconds = 3,
        WaitUntil = 4,
    }
    class Awaiter extends XObject implements IDisposable {
        static FPS: number;
        protected timer: number;
        protected handler: () => boolean;
        protected type: AwaitType;
        private callback_complete;
        private scheduler;
        onComplete(): Signal0;
        setAwaiter(timeOrHandler: any, type?: AwaitType): void;
        private deferred;
        await(): Promise<void>;
        advanceTime(): void;
        dispose(): void;
    }
    function waitEndFrames(frame?: number, payload?: (awaiter: Awaiter) => void, thisObject?: any): Promise<void>;
    function waitMilliseconds(milliseconds: number, payload?: (awaiter: Awaiter) => void, thisObject?: any): Promise<void>;
    function waitSeconds(seconds: number, payload?: (awaiter: Awaiter) => void, thisObject?: any): Promise<void>;
    function waitUntil(handler: () => boolean, payload?: (awaiter: Awaiter) => void, thisObject?: any): Promise<void>;
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-19
*************************************************/
declare module xgame {
    function createInstance<T>(Clazz: new (...args: any[]) => T, ...args: any[]): T;
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-29
*************************************************/
declare module xgame {
    /**
     * Returns a reference to the class object of the class specified by the name parameter.
     * @param name The name of a class.
     */
    function getDefinitionByName(name: string): any;
}
declare var __global: any;
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-29
*************************************************/
declare module xgame {
    function getQualifiedClassChainNames(value: any): string[];
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-29
*************************************************/
declare module xgame {
    /**
     * Returns the fully qualified class name of the base class of the object specified by the value parameter.
     * @param value The object for which a parent class is desired. Any JavaScript value may be passed to this method including
     * all available JavaScript types, object instances, primitive types such as number, and class objects.
     * @returns  A fully qualified base class name, or null if none exists.
     */
    function getQualifiedSuperclassName(value: any): string;
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-19
*************************************************/
declare module xgame {
    class MathParser extends XObject {
        protected varnames: string[];
        success: boolean;
        errormsg: string;
        private expression;
        private pos;
        private tokennumber;
        private tokenprio;
        private tokenindex;
        private tmpprio;
        private funcs1;
        private _funcs1;
        private funcs2;
        private _funcs2;
        private consts;
        private constvalues;
        private TNUMBER;
        private TFUNC1;
        private TFUNC2;
        private TVAR;
        constructor(varnames: string[]);
        parse(expr: string): Token[];
        simplify(parsedexpression: Token[]): Token[];
        eval(pexpression: Token[], values: number[]): number;
        private addfunc(tokenstack, operstack, type_);
        private error_parsing(column, msg);
        private isNumber();
        private isConst();
        private isOperator();
        private isSign();
        private isLeftParenth();
        private isRightParenth();
        private isComma();
        private isWhite();
        private isFunc1();
        private isFunc2();
        private isVar();
        private isComment();
        private _add(a, b);
        private _sub(a, b);
        private _mult(a, b);
        private _div(a, b);
        private _mod(a, b);
        private _pow(a, b);
        private _sin(a);
        private _cos(a);
        private _tan(a);
        private _asin(a);
        private _acos(a);
        private _atan(a);
        private _sqrt(a);
        private _log(a);
        private _abs(a);
        private _ceil(a);
        private _floor(a);
        private _round(a);
        private _random(a);
        private _fac(a);
        private _min(a, b);
        private _max(a, b);
        private _pyt(a, b);
    }
    class Token {
        type_: number;
        index_: number;
        prio_: number;
        number_: number;
        constructor(type_: number, index_?: number, prio_?: number, number_?: number);
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-01-19
*************************************************/
declare module xgame {
    import Point = xgame.Point;
    import Rectangle = xgame.Rectangle;
    interface AABBData {
        rect: Rectangle;
        offsetX: number;
        offsetY: number;
    }
    class MathUtils {
        static distanceBetweenTwoPoints(x1: number, x2: number, y1: number, y2: number): number;
        /**
         * Rotates x,y around Origin (like MathVector.rotate() )
         * if resultPoint is define, will set resultPoint to new values, otherwise, it will return a new point.
         * @param	p flash.geom.Point
         * @param	a angle in radians
         * @return	returns a new rotated point.
         */
        static rotatePoint(x: number, y: number, a: number, resultPoint?: Point): Point;
        /**
         * Get the linear equation from two points.
         * @return an object, m is the slope and b a constant term.
         */
        static lineEquation(p0: Point, p1: Point): Object;
        /**
         * Linear interpolation function
         * @param	a start value
         * @param	b end value
         * @param	ratio interpolation amount
         * @return
         */
        static lerp(a: number, b: number, ratio: number): number;
        /**
         * returns the lerp parameter ( between 0 and 1) that produces the interpolant 'value' within the [a,b] range
         * accepts a>b or b<a but does not clamp value to [a,b] range.
         */
        static inverseLerp(a: number, b: number, value: number): number;
        /**
         * maps value from ranges A to B with
         *
         * - range A : [minA,maxA]
         * - range B : [minB,maxB]
         *
         * if minB is 0 and maxB is 1, in other words if we want to map the value to the [0,1] range,
         * map will act like the InverseLerp function
         *
         * warning : return value is clamped withing range B.
         *
         * example :
         *
         * input value is assumed to be withing the [-10,10] range.
         * required range is :[20,40].
         *
         * map(-24,-10,10,20,40); // 20 (input value is out of range A, result is clamped)
         * map(-10,-10,10,20,40); // 20 (input is the minimum value of range A, so output  will be the minimum value of range B)
         * map(0,-10,10,20,40); // 30 (input is middle of range A, output is middle of range B)
         * map(10,-10,10,20,40); // 40(input is max of range A, so output is max of range B)
         *
         * @param value value within range A
         * @param minA minimum value of range A
         * @param maxA maximum value of range A
         * @param minB minimum value of range B
         * @param maxB maximum value of range B
         */
        static map(value: number, minA: number, maxA: number, minB?: number, maxB?: number): number;
        /**
         * Creates the axis aligned bounding box for a rotated rectangle.
         * @param w width of the rotated rectangle
         * @param h height of the rotated rectangle
         * @param a angle of rotation around the topLeft point in radian
         * @return Rectangle
         */
        static createAABB(x: number, y: number, w: number, h: number, a?: number): Rectangle;
        /**
         * Creates the axis aligned bounding box for a rotated rectangle
         * and offsetX , offsetY which is simply the x and y position of
         * the aabb relative to the rotated rectangle. the rectangle and the offset values are returned through an object.
         * such object can be re-used by passing it through the last argument.
         * @param w width of the rotated rectangle
         * @param h height of the rotated rectangle
         * @param a angle of rotation around the topLeft point in radian
         * @param aabbdata the object to store the results in.
         * @return {rect:Rectangle,offsetX:number,offsetY:number}
         */
        static createAABBData(x: number, y: number, w: number, h: number, a?: number, aabbdata?: AABBData): AABBData;
        /**
         * check if angle is between angle a and b
         * thanks to http://www.xarg.org/2010/06/is-an-angle-between-two-other-angles/
         */
        static angleBetween(angle: number, a: number, b: number): Boolean;
        /**
         * Checks for intersection of Segment if asSegments is true.
         * Checks for intersection of Lines if asSegments is false.
         *
         * http://keith-hair.net/blog/2008/08/04/find-intersection-point-of-two-lines-in-as3/
         *
         * @param	x1 x of point 1 of segment 1
         * @param	y1 y of point 1 of segment 1
         * @param	x2 x of point 2 of segment 1
         * @param	y2 y of point 2 of segment 1
         * @param	x3 x of point 3 of segment 2
         * @param	y3 y of point 3 of segment 2
         * @param	x4 x of point 4 of segment 2
         * @param	y4 y of point 4 of segment 2
         * @param	asSegments
         * @return the intersection point of segment 1 and 2 or null if they don't intersect.
         */
        static linesIntersection(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, x4: number, y4: number, asSegments?: Boolean): Point;
        static pow2(value: number): number;
        static clamp01(value: number): number;
        static clamp(value: number, min: number, max: number): number;
        /**
         * returns random Number between min and max
         */
        static random(min?: number, max?: number): number;
        /**
         * returns random int between min and max
         */
        static randomInt(min: number, max: number): number;
        /**
         * best fits the rect Rectangle into the into Rectangle, and returns what scale factor applied to into was necessary to do so.
         * @param	rect
         * @param	into
         * @return
         */
        static getBestFitRatio(rect: Rectangle, into: Rectangle): number;
        /**
         * use to get the ratio required for one rectangle to fill the other.
         * Either the width, the height, or both will fill the into rectangle.
         * Useful to make a background take up all the screen space even though the background
         * will be cropped if the aspect ratio is not the same.
         * @param	rect
         * @param	into
         */
        static getFillRatio(rect: Rectangle, into: Rectangle): number;
        /**
         * get a random item from an array with an almost uniform distribution of probabilities using randomInt.
         * @param	arr
         * @return
         */
        static getArrayRandomItem(arr: any[]): any;
        /**
         * gets the next element in an array based on the currentElement's position, cyclically.
         * - so if currentElement is the last element, you'll get the first in the array.
         * @param	currentElement
         * @param	array
         */
        static getNextInArray(currentElement: any, array: any[]): any;
        /**
         * gets the previous element in an array based on the currentElement's position, cyclically.
         * - so if currentElement is the first element, you'll get the last in the array.
         * @param	currentElement
         * @param	array
         */
        static getPreviousInArray(currentElement: any, array: any[]): any;
        /**
         * returns a random color in given range.
         *
         * @param minLum minimum for the r, g and b values.
         * @param maxLum maximum for the r, g and b values.
         * @param b32 return color with alpha channel (ARGB)
         * @param randAlpha if format is ARGB, shall we set a random alpha value?
         * @return
         */
        static getRandomColor(minLum?: number, maxLum?: number, b32?: Boolean, randAlpha?: Boolean): number;
        /**
         * http://snipplr.com/view/12514/as3-interpolate-color/
         * @param	fromColor
         * @param	toColor
         * @param	t a number from 0 to 1
         * @return
         */
        static colorLerp(fromColor: number, toColor: number, t: number): number;
        static abs(num: number): number;
        /**
         * returns -1 for negative numbers, 1 for positive (zero included)
         */
        static sign(num: number): number;
        /**
         * quick and dirty wrap around. returns a positive value.
         */
        static Repeat(value: number, range: number): number;
        static logx(val: number, base?: number): number;
        /**
         * Evaluate quadratic curve ( f(x)=y ) for x = t
         * a = start
         * b = control
         * c = end
         */
        static evaluateQuadraticCurve(a: number, b: number, c: number, t?: number): number;
        /**
         * Evaluate cubic curve ( f(x)=y ) for x = t
         * a = start
         * b = first control
         * c = second control
         * d = end
         */
        static evaluateCubicCurve(a: number, b: number, c: number, d: number, t?: number): number;
        /**
         * http://www.robertpenner.com/easing/
         * t current time
         * b start value
         * c change in value
         * d duration
         */
        static easeInQuad(t: number, b: number, c: number, d: number): number;
        static easeOutQuad(t: number, b: number, c: number, d: number): number;
        static easeInCubic(t: number, b: number, c: number, d: number): number;
        static easeOutCubic(t: number, b: number, c: number, d: number): number;
        static easeInQuart(t: number, b: number, c: number, d: number): number;
        static easeOutQuart(t: number, b: number, c: number, d: number): number;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-19
*************************************************/
declare module xgame {
    function mixin(...templates: any[]): (target: any) => void;
    function __mixin__(target: any, template: any): void;
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-19
*************************************************/
declare module xgame {
    class StringUtils {
        static html2Escape(html: string): string;
        static escape2Html(html: string): string;
        static nbsp2Space(html: string): string;
        private static reg_caches;
        static format(value: string, ...args: any[]): string;
        static beginWiths(originstr: string, beginstr: string): boolean;
        static endWiths(originstr: string, endstr: string): boolean;
        static trim(str: string, all?: boolean): string;
        static eraseHtml(str: string): string;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-04
*************************************************/
declare module xgame {
    enum FlagsCheckType {
        And = 0,
        Or = 1,
    }
    class VectorFlags<T extends number | string> extends XObject {
        private flags;
        checkFlags(flags: T[], type?: FlagsCheckType): boolean;
        addFlags(...flags: T[]): void;
        removeFlags(...flags: T[]): void;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-20
*************************************************/
declare module xgame {
    let IXTaskManager: symbol;
    interface IXTaskManager extends xgame.IXObject {
        addTask<T extends IXTask>(onMainRunning: boolean, task: new (mode?: XTaskMode, life?: number) => T): T;
        addTask(onMainRunning: boolean, task: IXTask): IXTask;
        removeTask(task: IXTask): void;
        removeTask(hashCode: number): void;
        pause(): void;
        resume(): void;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-23
*************************************************/
declare module xgame {
    let IXTaskManagerInternal: symbol;
    interface IXTaskManagerInternal {
        initialize(): void;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-20
*************************************************/
declare module xgame {
    class XTaskManager extends xgame.Singleton implements IXTaskManager, IXTaskManagerInternal {
        mainTask: MainTask;
        private isRunning;
        constructor();
        initialize(): void;
        private onUpdate();
        addTask<T extends IXTask>(onMainRunning: boolean, task: new (mode?: XTaskMode, life?: number) => T): T;
        addTask(onMainRunning: boolean, task: IXTask): IXTask;
        removeTask(task: IXTask): void;
        removeTask(hashCode: number): void;
        pause(): void;
        resume(): void;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-20
*************************************************/
declare module xgame {
    enum XTaskResult {
        Invalidate = 0,
        Success = 1,
        Failure = 2,
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-20
*************************************************/
declare module xgame {
    enum XTaskMode {
        Parallel = 1,
        Selector = 2,
        Sequence = 3,
        RacingSequence = 4,
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-20
*************************************************/
declare module xgame {
    enum XTaskState {
        UnInitialize = 1,
        Initialized = 2,
        Validated = 3,
        Executing = 4,
        SelfCompleted = 5,
        Failured = 6,
        Completed = 7,
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-20
*************************************************/
declare module xgame {
    enum XTaskLifeMode {
        Infinite = 1,
        Limit = 2,
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-20
*************************************************/
declare module xgame {
    let IXTask: symbol;
    interface IXTask extends xgame.IXObject {
        name: string;
        mode: XTaskMode;
        state: XTaskState;
        result: XTaskResult;
        lifeMode: XTaskLifeMode;
        onMainRunning: boolean;
        parent: IXTask;
        root: IXTask;
        lifeCount: number;
        childCount: number;
        addTask<T extends IXTask>(task: new () => T): T;
        addTask(task: IXTask): IXTask;
        removeTask(hashCode: number): void;
        removeTask(task: IXTask): void;
        mainLoop(): void;
        initialize(): void;
        validate(): boolean;
        execute(): Promise<void>;
        update(): void;
        selfComplete(result?: XTaskResult): void;
        complete(): void;
        failure(): void;
        reset(): void;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-20
*************************************************/
declare module xgame {
    import Dictionary = xgame.Dictionary;
    class XTask extends xgame.Locker implements IXTask {
        name: string;
        mode: XTaskMode;
        state: XTaskState;
        result: XTaskResult;
        lifeMode: XTaskLifeMode;
        onMainRunning: boolean;
        parent: IXTask;
        readonly root: IXTask;
        lifeCount: number;
        readonly childCount: number;
        isMain: boolean;
        isRoot: boolean;
        protected children: Dictionary<number, XTask>;
        protected countCompleted: number;
        protected walkIndex: number;
        protected currentChildComplete: number;
        protected currentComplete: number;
        private $delegate;
        private $forRemoves;
        private $forResets;
        constructor(mode?: XTaskMode, life?: number);
        setDelegate(delegate: IXTaskDelegate): void;
        addTask<T extends IXTask>(task: new () => T, mode?: XTaskMode, life?: number): T;
        addTask(task: IXTask): IXTask;
        removeTask(hashCode: number): void;
        removeTask(task: IXTask): void;
        mainLoop(): void;
        initialize(): void;
        validate(): boolean;
        execute(): Promise<void>;
        update(): void;
        selfComplete(result?: XTaskResult): void;
        complete(): void;
        failure(): void;
        reset(): void;
        protected setTaskState(state: XTaskState): void;
        protected internalExecute(): Promise<void>;
        protected walkTask(task: XTask): void;
        protected readonly isSelfCompleteSucceed: boolean;
        protected CheckComplete(): void;
        private checkResets();
        private checkRemoves();
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-20
*************************************************/
declare module xgame {
    class MainTask extends XTask {
        isLocked: boolean;
        private $idWithLocked;
        constructor();
        isLockTask(task: IXTask): boolean;
        lock(task: IXTask): void;
        unlock(task: IXTask): void;
        initialize(): void;
        validate(): boolean;
        reset(): void;
        complete(): void;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-20
*************************************************/
declare module xgame {
    let IXTaskDelegate: symbol;
    interface IXTaskDelegate {
        initialize(task: IXTask): void;
        validate(task: IXTask): boolean;
        execute(task: IXTask): Promise<void>;
        update(task: IXTask): void;
        selfComplete(task: IXTask): void;
        complete(task: IXTask): void;
        failure(task: IXTask): void;
        reset(task: IXTask): void;
    }
}
