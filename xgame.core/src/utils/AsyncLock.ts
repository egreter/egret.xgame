/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-19
*************************************************/
/// <reference path="../core/XObject.ts" />

module xgame {
    export interface IAsyncLockOpts {
        Promise: any;
        timeout: number;
        maxOccupationTime: number;
        maxPending: number;
        skipQueue: boolean;
    }
    export class AsyncLock extends XObject {
        public static DEFAULT_TIMEOUT = 0; //Never
        public static DEFAULT_MAX_OCCUPATION_TIME = 0; //Never
        public static DEFAULT_MAX_PENDING = 1000;

        private Promise: any;
        private queues: any;
        private timeout: number;
        private maxOccupationTime: number;
        private maxPending: number;
        public constructor(options?: IAsyncLockOpts) {
            super();
            options = options || <IAsyncLockOpts>{};

            this.Promise = options.Promise || Promise;

            this.queues = {};

            this.timeout = options.timeout || AsyncLock.DEFAULT_TIMEOUT;
            this.maxOccupationTime = options.maxOccupationTime || AsyncLock.DEFAULT_MAX_OCCUPATION_TIME;
            if (options.maxPending === Infinity || (Number.isInteger(options.maxPending) && options.maxPending >= 0)) {
                this.maxPending = options.maxPending;
            } else {
                this.maxPending = AsyncLock.DEFAULT_MAX_PENDING;
            }
        }
        public acquire(key: string | string[], handler: (done?: (err?: any, ret?: any) => void) => void, complete?: (err?: any, ret?: any) => void, options?: IAsyncLockOpts): Promise<any> {
            if (Array.isArray(key)) {
                return this._acquireBatch(key, handler, complete, options);
            }

            if (typeof (handler) !== 'function') {
                throw new Error('You must pass a function to execute');
            }

            // faux-deferred promise using new Promise() (as Promise.defer is deprecated)
            let deferredResolve = null;
            let deferredReject = null;
            let deferred = null;

            if (typeof (complete) !== 'function') {
                options = complete;
                complete = null;

                // will return a promise
                deferred = new this.Promise(function (resolve: (value: any) => void, reject: (reason: any) => void) {
                    deferredResolve = resolve;
                    deferredReject = reject;
                });
            }

            options = options || <IAsyncLockOpts>{};

            let resolved = false;
            let timer = null;
            let occupationTimer = null;
            let self = this;

            let done = function (locked: boolean, err = null, ret = null) {

                if (occupationTimer) {
                    clearTimeout(occupationTimer);
                    occupationTimer = null;
                }

                if (locked) {
                    if (!!self.queues[key] && self.queues[key].length === 0) {
                        delete self.queues[key];
                    }
                }

                if (!resolved) {
                    if (!deferred) {
                        if (typeof (complete) === 'function') {
                            complete(err, ret);
                        }
                    }
                    else {
                        //promise mode
                        if (err) {
                            deferredReject(err);
                        }
                        else {
                            deferredResolve(ret);
                        }
                    }
                    resolved = true;
                }

                if (locked) {
                    //run next func
                    if (!!self.queues[key] && self.queues[key].length > 0) {
                        self.queues[key].shift()();
                    }
                }
            };

            let exec = function (locked: boolean) {
                if (resolved) { // may due to timed out
                    return done(locked);
                }

                if (timer) {
                    clearTimeout(timer);
                    timer = null;
                }

                // Callback mode
                if (handler.length === 1) {
                    let called = false;
                    handler(function (err, ret) {
                        if (!called) {
                            called = true;
                            done(locked, err, ret);
                        }
                    });
                }
                else {
                    // Promise mode
                    self._promiseTry(function () {
                        return handler();
                    })
                        .then(function (ret: any) {
                            done(locked, undefined, ret);
                        }, function (error: any) {
                            done(locked, error);
                        });
                }
            };

            if (!self.queues[key]) {
                self.queues[key] = [];
                exec(true);
            }
            else if (self.queues[key].length >= self.maxPending) {
                done(false, new Error('Too much pending tasks'));
            }
            else {
                let taskFn = function () {
                    exec(true);
                };
                if (options.skipQueue) {
                    self.queues[key].unshift(taskFn);
                } else {
                    self.queues[key].push(taskFn);
                }

                let timeout = options.timeout || self.timeout;
                if (timeout) {
                    timer = setTimeout(function () {
                        timer = null;
                        done(false, new Error('async-lock timed out'));
                    }, timeout);
                }
            }

            let maxOccupationTime = options.maxOccupationTime || self.maxOccupationTime;
            if (maxOccupationTime) {
                occupationTimer = setTimeout(function () {
                    if (!!self.queues[key]) {
                        done(false, new Error('Maximum occupation time is exceeded'));
                    }
                }, maxOccupationTime);
            }

            if (deferred) {
                return deferred;
            }
        };

        private _acquireBatch(keys: string[], handler: (done?: (err: any, ret: any) => void) => void, complete: (err: any, ret: any) => void, opts: IAsyncLockOpts) {
            if (typeof (complete) !== 'function') {
                opts = complete;
                complete = null;
            }

            let self = this;
            let getFn = function (key, fn) {
                return function (cb) {
                    self.acquire(key, fn, cb, opts);
                };
            };

            let fnx = handler;
            keys.reverse().forEach(function (key) {
                fnx = getFn(key, fnx);
            });

            if (typeof (complete) === 'function') {
                fnx(complete);
            }
            else {
                return new this.Promise(function (resolve, reject) {
                    if (fnx.length === 1) {
                        fnx(function (err, ret) {
                            if (err) {
                                reject(err);
                            }
                            else {
                                resolve(ret);
                            }
                        });
                    } else {
                        resolve(fnx());
                    }
                });
            }
        };

        public isBusy(key: string) {
            if (!key) {
                return Object.keys(this.queues).length > 0;
            }
            else {
                return !!this.queues[key];
            }
        }

        private _promiseTry(fn: () => void) {
            try {
                return this.Promise.resolve(fn());
            } catch (e) {
                return this.Promise.reject(e);
            }
        }

    }

}