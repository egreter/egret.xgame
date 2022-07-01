window.xgame = {};
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
window.__extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-29
*************************************************/

(function (xgame) {
    /**
     * Return the fully qualified class name of an object
     * @param value The object for which a fully qualified class name is desired. Any JavaScript value may be passed to
     * this method including all available JavaScript types, object instances, primitive types such as number, and class objects.
     * @returns A string containing the fully qualified class name.
     */
    function getQualifiedClassName(value) {
        var type = typeof value;
        if (!value || (type != "object" && !value.prototype)) {
            return type;
        }
        var prototype = value.prototype ? value.prototype : Object.getPrototypeOf(value);
        if (!prototype) {
            return type;
        }
        if (prototype.hasOwnProperty("__class__")) {
            return prototype["__class__"];
        }
        var constructorString = prototype.constructor.toString().trim();
        var index = constructorString.indexOf("(");
        var className = constructorString.substring(9, index);
        Object.defineProperty(prototype, "__class__", {
            value: className,
            enumerable: false,
            writable: true
        });
        return className;
    }
    xgame.getQualifiedClassName = getQualifiedClassName;
})(xgame || (xgame = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-23
*************************************************/

(function (xgame) {
    function impl() {
        var implements = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            implements[_i] = arguments[_i];
        }
        return function (target) {
            var prototype = target.prototype ? target.prototype : Object.getPrototypeOf(target);
            Object.defineProperty(prototype, "__implements__", {
                value: implements,
                enumerable: false,
                writable: false
            });
        };
    }
    xgame.impl = impl;
})(xgame || (xgame = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-23
*************************************************/

(function (xgame) {
    xgame.IXObject = Symbol.for("IXObject");
})(xgame || (xgame = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-19
*************************************************/
/// <reference path="../utils/getQualifiedClassName.ts" />
/// <reference path="../decorators/impl.ts" />
/// <reference path="../interfaces/IXObject.ts" />

(function (xgame) {
    xgame.hashCount = 1;
    function generateHashCode(target) {
        var hashCode = xgame.hashCount++;
        if (target && target.hashCode == undefined) {
            target.hashCode = hashCode;
        }
        return hashCode;
    }
    xgame.generateHashCode = generateHashCode;
    var XObject = (function () {
        function XObject() {
            this.$hashCode = 0;
            this.$hashCode = generateHashCode();
        }
        Object.defineProperty(XObject.prototype, "hashCode", {
            get: function () {
                return this.$hashCode;
            },
            enumerable: true,
            configurable: true
        });
        XObject.prototype.toString = function () {
            return "{0}({1})".format(xgame.getQualifiedClassName(this), this.hashCode);
        };
        XObject = __decorate([
            xgame.impl(xgame.IXObject),
            __metadata("design:paramtypes", [])
        ], XObject);
        return XObject;
    }());
    xgame.XObject = XObject;
    __reflect(XObject.prototype, "xgame.XObject", ["xgame.IXObject"]);
})(xgame || (xgame = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-19
*************************************************/

(function (xgame) {
    xgame.IXGame = Symbol.for("IXGame");
})(xgame || (xgame = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-18
*************************************************/

(function (xgame) {
    xgame.IXBootstrap = Symbol.for("IXBootstrap");
})(xgame || (xgame = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-18
*************************************************/
/// <reference path="./IXGame.ts" />

(function (xgame) {
    xgame.IServiceProvider = Symbol.for("IServiceProvider");
})(xgame || (xgame = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-19
*************************************************/
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-19
*************************************************/

(function (xgame) {
    xgame.IDisposable = Symbol.for("IDisposable");
})(xgame || (xgame = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-20
*************************************************/
/// <reference path="../interfaces/IDisposable.ts" />

(function (xgame) {
    var TimerMode;
    (function (TimerMode) {
        TimerMode[TimerMode["None"] = 0] = "None";
        TimerMode[TimerMode["Limit"] = 1] = "Limit";
        TimerMode[TimerMode["Times"] = 2] = "Times";
    })(TimerMode || (TimerMode = {}));
    var Scheduler = (function (_super) {
        __extends(Scheduler, _super);
        function Scheduler(manager, action, thisObject, order) {
            if (order === void 0) { order = 0; }
            var _this = _super.call(this) || this;
            _this.manager = manager;
            _this.action = action;
            _this.thisObject = thisObject;
            _this.order = order;
            _this.timeout = 0;
            _this.timer = 0;
            _this.times = 0;
            _this.mode = TimerMode.None;
            return _this;
        }
        Scheduler.prototype.setTimeout = function (timeout, times) {
            if (times === void 0) { times = 0; }
            this.timeout = timeout;
            this.timer = timeout;
            if (times > 0) {
                this.mode = TimerMode.Times;
                this.times = times;
            }
            else {
                this.mode = TimerMode.Limit;
                this.times = 0;
            }
        };
        Scheduler.prototype.execute = function () {
            if (this.mode == TimerMode.None) {
                if (this.action) {
                    this.action.apply(this.thisObject);
                }
            }
            else {
                this.timer -= xgame.Time.Instance().deltaTime;
                if (this.timer <= 0) {
                    if (this.action) {
                        this.action.apply(this.thisObject);
                    }
                    this.timer += this.timeout;
                    if (this.mode == TimerMode.Times) {
                        this.times--;
                        if (this.times <= 0) {
                            this.unregister();
                        }
                    }
                }
            }
        };
        Scheduler.prototype.unregister = function () {
            this.manager.removeUpdate(this.hashCode);
        };
        Scheduler.prototype.dispose = function () {
            this.action = undefined;
            this.thisObject = undefined;
        };
        Scheduler = __decorate([
            xgame.impl(xgame.IDisposable),
            __metadata("design:paramtypes", [Object, Function, Object, Number])
        ], Scheduler);
        return Scheduler;
    }(xgame.XObject));
    xgame.Scheduler = Scheduler;
    __reflect(Scheduler.prototype, "xgame.Scheduler", ["xgame.IDisposable"]);
})(xgame || (xgame = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-20
*************************************************/
/// <reference path="./Scheduler.ts" />

(function (xgame) {
    xgame.ISchedulerManager = Symbol.for("ISchedulerManager");
})(xgame || (xgame = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-01-07
*************************************************/

(function (xgame) {
    /**
     * 检查传递的参数是否为对象
     */
    xgame.isObj = function (x) { return !!x && typeof x === 'object'; };
    /**
     * 创建一个否定谓词结果的函数
     */
    xgame.negate = function (pred) { return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return !pred.apply(void 0, args);
    }; };
    /**
     * 比较器助手
     */
    xgame.composeComparers = function (previousComparer, currentComparer) { return function (a, b) {
        return previousComparer(a, b) || currentComparer(a, b);
    }; };
    xgame.keyComparer = function (_keySelector, descending) { return function (a, b) {
        var sortKeyA = _keySelector(a);
        var sortKeyB = _keySelector(b);
        if (sortKeyA > sortKeyB) {
            return !descending ? 1 : -1;
        }
        else if (sortKeyA < sortKeyB) {
            return !descending ? -1 : 1;
        }
        else {
            return 0;
        }
    }; };
})(xgame || (xgame = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-01-15
*************************************************/
/// <reference path="./helpers.ts" />

(function (xgame) {
    var List = (function (_super) {
        __extends(List, _super);
        /**
         * 默认为列表的元素
         */
        function List(elements) {
            if (elements === void 0) { elements = []; }
            var _this = _super.call(this) || this;
            _this._elements = elements;
            return _this;
        }
        /**
         * 在列表的末尾添加一个对象。
         */
        List.prototype.add = function (element) {
            this._elements.push(element);
        };
        /**
         * 将一个对象追加到列表的末尾。
         */
        List.prototype.append = function (element) {
            this.add(element);
        };
        /**
         * 在列表的开头添加一个对象。
         */
        List.prototype.prepend = function (element) {
            this._elements.unshift(element);
        };
        /**
         * 将指定集合的元素添加到列表的末尾。
         */
        List.prototype.addRange = function (elements) {
            (_a = this._elements).push.apply(_a, elements);
            var _a;
        };
        /**
         * 对序列应用累加器函数。
         */
        List.prototype.aggregate = function (accumulator, initialValue) {
            return this._elements.reduce(accumulator, initialValue);
        };
        /**
         * 确定序列的所有元素是否满足一个条件。
         */
        List.prototype.all = function (predicate) {
            return this._elements.every(predicate);
        };
        List.prototype.any = function (predicate) {
            return predicate
                ? this._elements.some(predicate)
                : this._elements.length > 0;
        };
        List.prototype.average = function (transform) {
            return this.sum(transform) / this.count(transform);
        };
        /**
         * 将序列的元素转换为指定的类型。
         */
        List.prototype.cast = function () {
            return new List(this._elements);
        };
        /**
         * 从列表中删除所有元素。
         */
        List.prototype.clear = function () {
            this._elements.length = 0;
        };
        /**
         * 连接两个序列。
         */
        List.prototype.concat = function (list) {
            return new List(this._elements.concat(list.toArray()));
        };
        /**
         * 确定一个元素是否在列表中。
         */
        List.prototype.contains = function (element) {
            return this.any(function (x) { return x === element; });
        };
        List.prototype.count = function (predicate) {
            return predicate ? this.where(predicate).count() : this._elements.length;
        };
        /**
         * 返回指定序列的元素，或者如果序列为空，则返回单例集合中类型参数的默认值。
         */
        List.prototype.defaultIfEmpty = function (defaultValue) {
            return this.count() ? this : new List([defaultValue]);
        };
        /**
         * 根据指定的键选择器从序列中返回不同的元素。
         */
        List.prototype.distinctBy = function (keySelector) {
            var groups = this.groupBy(keySelector);
            return Object.keys(groups).reduce(function (res, key) {
                res.add(groups[key][0]);
                return res;
            }, new List());
        };
        /**
         * 返回序列中指定索引处的元素。
         */
        List.prototype.elementAt = function (index) {
            if (index < this.count() && index >= 0) {
                return this._elements[index];
            }
            else {
                throw new Error('ArgumentOutOfRangeException: index is less than 0 or greater than or equal to the number of elements in source.');
            }
        };
        /**
         * 返回序列中指定索引处的元素，如果索引超出范围，则返回默认值。
         */
        List.prototype.elementAtOrDefault = function (index) {
            return index < this.count() && index >= 0
                ? this._elements[index]
                : undefined;
        };
        /**
         * 通过使用默认的相等比较器来比较值，生成两个序列的差值集。
         */
        List.prototype.except = function (source) {
            return this.where(function (x) { return !source.contains(x); });
        };
        List.prototype.first = function (predicate) {
            if (this.count()) {
                return predicate ? this.where(predicate).first() : this._elements[0];
            }
            else {
                throw new Error('InvalidOperationException: The source sequence is empty.');
            }
        };
        List.prototype.firstOrDefault = function (predicate) {
            return this.count(predicate) ? this.first(predicate) : undefined;
        };
        /**
         * 对列表中的每个元素执行指定的操作。
         */
        List.prototype.forEach = function (action) {
            return this._elements.forEach(action);
        };
        List.prototype.every = function (action) {
            return this._elements.every(action);
        };
        List.prototype.filter = function (action) {
            return this._elements.filter(action);
        };
        /**
         * 根据指定的键选择器函数对序列中的元素进行分组。
         */
        List.prototype.groupBy = function (grouper, mapper) {
            if (mapper === void 0) { mapper = function (val) { return val; }; }
            var initialValue = {};
            return this.aggregate(function (ac, v) {
                var key = grouper(v);
                var existingGroup = ac[key];
                var mappedValue = mapper(v);
                existingGroup
                    ? existingGroup.push(mappedValue)
                    : (ac[key] = [mappedValue]);
                return ac;
            }, initialValue);
        };
        /**
         * 根据键的相等将两个序列的元素关联起来，并将结果分组。默认的相等比较器用于比较键。
         */
        List.prototype.groupJoin = function (list, key1, key2, result) {
            return this.select(function (x) {
                return result(x, list.where(function (z) { return key1(x) === key2(z); }));
            });
        };
        /**
         * 返回列表中某个元素第一次出现的索引。
         */
        List.prototype.indexOf = function (element) {
            return this._elements.indexOf(element);
        };
        /**
         * 向列表中插入一个元素在指定索引处。
         */
        List.prototype.insert = function (index, element) {
            if (index < 0 || index > this._elements.length) {
                throw new Error('Index is out of range.');
            }
            this._elements.splice(index, 0, element);
        };
        /**
         * 通过使用默认的相等比较器来比较值，生成两个序列的交集集。
         */
        List.prototype.intersect = function (source) {
            return this.where(function (x) { return source.contains(x); });
        };
        /**
         * 基于匹配的键将两个序列的元素关联起来。默认的相等比较器用于比较键。
         */
        List.prototype.join = function (list, key1, key2, result) {
            return this.selectMany(function (x) {
                return list.where(function (y) { return key2(y) === key1(x); }).select(function (z) { return result(x, z); });
            });
        };
        List.prototype.last = function (predicate) {
            if (this.count()) {
                return predicate
                    ? this.where(predicate).last()
                    : this._elements[this.count() - 1];
            }
            else {
                throw Error('InvalidOperationException: The source sequence is empty.');
            }
        };
        List.prototype.lastOrDefault = function (predicate) {
            return this.count(predicate) ? this.last(predicate) : undefined;
        };
        List.prototype.max = function (selector) {
            var id = function (x) { return x; };
            return Math.max.apply(Math, this._elements.map(selector || id));
        };
        List.prototype.min = function (selector) {
            var id = function (x) { return x; };
            return Math.min.apply(Math, this._elements.map(selector || id));
        };
        /**
         * 根据指定的类型筛选序列中的元素。
         */
        List.prototype.ofType = function (type) {
            var typeName;
            switch (type) {
                case Number:
                    typeName = typeof 0;
                    break;
                case String:
                    typeName = typeof '';
                    break;
                case Boolean:
                    typeName = typeof true;
                    break;
                case Function:
                    typeName = typeof function () { }; // tslint:disable-line no-empty
                    break;
                default:
                    typeName = null;
                    break;
            }
            return typeName === null
                ? this.where(function (x) { return x instanceof type; }).cast()
                : this.where(function (x) { return typeof x === typeName; }).cast();
        };
        /**
         * 根据键按升序对序列中的元素进行排序。
         */
        List.prototype.orderBy = function (keySelector, comparer) {
            if (comparer === void 0) { comparer = xgame.keyComparer(keySelector, false); }
            // tslint:disable-next-line: no-use-before-declare
            return new OrderedList(this._elements, comparer);
        };
        /**
         * 根据键值降序对序列中的元素进行排序。
         */
        List.prototype.orderByDescending = function (keySelector, comparer) {
            if (comparer === void 0) { comparer = xgame.keyComparer(keySelector, true); }
            // tslint:disable-next-line: no-use-before-declare
            return new OrderedList(this._elements, comparer);
        };
        /**
         * 按键按升序对序列中的元素执行后续排序。
         */
        List.prototype.thenBy = function (keySelector) {
            return this.orderBy(keySelector);
        };
        /**
         * 根据键值按降序对序列中的元素执行后续排序。
         */
        List.prototype.thenByDescending = function (keySelector) {
            return this.orderByDescending(keySelector);
        };
        /**
         * 从列表中删除第一个出现的特定对象。
         */
        List.prototype.remove = function (element) {
            return this.indexOf(element) !== -1
                ? (this.removeAt(this.indexOf(element)), true)
                : false;
        };
        /**
         * 删除与指定谓词定义的条件匹配的所有元素。
         */
        List.prototype.removeAll = function (predicate) {
            return this.where(xgame.negate(predicate));
        };
        /**
         * 删除列表指定索引处的元素。
         */
        List.prototype.removeAt = function (index) {
            this._elements.splice(index, 1);
        };
        /**
         * 颠倒整个列表中元素的顺序。
         */
        List.prototype.reverse = function () {
            return new List(this._elements.reverse());
        };
        /**
         * 将序列中的每个元素投射到一个新形式中。
         */
        List.prototype.select = function (selector) {
            return new List(this._elements.map(selector));
        };
        /**
         * 将序列的每个元素投影到一个列表中。并将得到的序列扁平化为一个序列。
         */
        List.prototype.selectMany = function (selector) {
            var _this = this;
            return this.aggregate(function (ac, _, i) { return (ac.addRange(_this.select(selector)
                .elementAt(i)
                .toArray()),
                ac); }, new List());
        };
        /**
         * 通过使用默认的相等比较器对元素的类型进行比较，确定两个序列是否相等。
         */
        List.prototype.sequenceEqual = function (list) {
            return this.all(function (e) { return list.contains(e); });
        };
        /**
         * 返回序列中唯一的元素，如果序列中没有恰好一个元素，则抛出异常。
         */
        List.prototype.single = function (predicate) {
            if (this.count(predicate) !== 1) {
                throw new Error('The collection does not contain exactly one element.');
            }
            else {
                return this.first(predicate);
            }
        };
        /**
         * 返回序列中唯一的元素，如果序列为空，则返回默认值;如果序列中有多个元素，此方法将抛出异常。
         */
        List.prototype.singleOrDefault = function (predicate) {
            return this.count(predicate) ? this.single(predicate) : undefined;
        };
        /**
         * 绕过序列中指定数量的元素，然后返回剩余的元素。
         */
        List.prototype.skip = function (amount) {
            return new List(this._elements.slice(Math.max(0, amount)));
        };
        /**
         * 省略序列中最后指定数量的元素，然后返回剩余的元素。
         */
        List.prototype.skipLast = function (amount) {
            return new List(this._elements.slice(0, -Math.max(0, amount)));
        };
        /**
         * 只要指定条件为真，就绕过序列中的元素，然后返回剩余的元素。
         */
        List.prototype.skipWhile = function (predicate) {
            var _this = this;
            return this.skip(this.aggregate(function (ac) { return (predicate(_this.elementAt(ac)) ? ++ac : ac); }, 0));
        };
        List.prototype.sum = function (transform) {
            return transform
                ? this.select(transform).sum()
                : this.aggregate(function (ac, v) { return (ac += +v); }, 0);
        };
        /**
         * 从序列的开始返回指定数量的连续元素。
         */
        List.prototype.take = function (amount) {
            return new List(this._elements.slice(0, Math.max(0, amount)));
        };
        /**
         * 从序列的末尾返回指定数目的连续元素。
         */
        List.prototype.takeLast = function (amount) {
            return new List(this._elements.slice(-Math.max(0, amount)));
        };
        /**
         * 返回序列中的元素，只要指定的条件为真。
         */
        List.prototype.takeWhile = function (predicate) {
            var _this = this;
            return this.take(this.aggregate(function (ac) { return (predicate(_this.elementAt(ac)) ? ++ac : ac); }, 0));
        };
        /**
         * 复制列表中的元素到一个新数组。
         */
        List.prototype.toArray = function () {
            return this._elements;
        };
        List.prototype.toDictionary = function (key, value) {
            var _this = this;
            return this.aggregate(function (dicc, v, i) {
                dicc[_this.select(key)
                    .elementAt(i)
                    .toString()] = value ? _this.select(value).elementAt(i) : v;
                dicc.add({
                    Key: _this.select(key).elementAt(i),
                    Value: value ? _this.select(value).elementAt(i) : v
                });
                return dicc;
            }, new List());
        };
        /**
         * 创建一个Set从一个Enumerable.List< T>。
         */
        List.prototype.toSet = function () {
            var result = new Set();
            for (var _i = 0, _a = this._elements; _i < _a.length; _i++) {
                var x = _a[_i];
                result.add(x);
            }
            return result;
        };
        /**
         * 创建一个List< T>从一个Enumerable.List< T>。
         */
        List.prototype.toList = function () {
            return this;
        };
        /**
         * 创建一个查找，TElement>从一个IEnumerable< T>根据指定的键选择器和元素选择器函数。
         */
        List.prototype.toLookup = function (keySelector, elementSelector) {
            return this.groupBy(keySelector, elementSelector);
        };
        /**
         * 基于谓词过滤一系列值。
         */
        List.prototype.where = function (predicate) {
            return new List(this._elements.filter(predicate));
        };
        /**
         * 将指定的函数应用于两个序列的对应元素，生成结果序列。
         */
        List.prototype.zip = function (list, result) {
            var _this = this;
            return list.count() < this.count()
                ? list.select(function (x, y) { return result(_this.elementAt(y), x); })
                : this.select(function (x, y) { return result(x, list.elementAt(y)); });
        };
        return List;
    }(xgame.XObject));
    xgame.List = List;
    __reflect(List.prototype, "xgame.List");
    /**
     * 表示已排序的序列。该类的方法是通过使用延迟执行来实现的。
     * 即时返回值是一个存储执行操作所需的所有信息的对象。
     * 在通过调用对象的ToDictionary、ToLookup、ToList或ToArray方法枚举对象之前，不会执行由该方法表示的查询
     */
    var OrderedList = (function (_super) {
        __extends(OrderedList, _super);
        function OrderedList(elements, _comparer) {
            var _this = _super.call(this, elements) || this;
            _this._comparer = _comparer;
            _this._elements.sort(_this._comparer);
            return _this;
        }
        /**
         * 按键按升序对序列中的元素执行后续排序。
         * @override
         */
        OrderedList.prototype.thenBy = function (keySelector) {
            return new OrderedList(this._elements, xgame.composeComparers(this._comparer, xgame.keyComparer(keySelector, false)));
        };
        /**
         * 根据键值按降序对序列中的元素执行后续排序。
         * @override
         */
        OrderedList.prototype.thenByDescending = function (keySelector) {
            return new OrderedList(this._elements, xgame.composeComparers(this._comparer, xgame.keyComparer(keySelector, true)));
        };
        return OrderedList;
    }(List));
    xgame.OrderedList = OrderedList;
    __reflect(OrderedList.prototype, "xgame.OrderedList");
})(xgame || (xgame = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-19
*************************************************/
/// <reference path="../core/XObject.ts" />

(function (xgame) {
    var Singleton = (function (_super) {
        __extends(Singleton, _super);
        function Singleton() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Singleton.Instance = function () {
            if (!this.instance) {
                this.instance = new this();
            }
            return this.instance;
        };
        return Singleton;
    }(xgame.XObject));
    xgame.Singleton = Singleton;
    __reflect(Singleton.prototype, "xgame.Singleton");
})(xgame || (xgame = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-20
*************************************************/

(function (xgame) {
    var Time = (function (_super) {
        __extends(Time, _super);
        function Time() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.deltaTime = 0;
            _this.timeScale = 1;
            _this.passedTime = 0;
            return _this;
        }
        Time.prototype.getTimeStamp = function () {
            return new Date().valueOf();
        };
        return Time;
    }(xgame.Singleton));
    xgame.Time = Time;
    __reflect(Time.prototype, "xgame.Time");
})(xgame || (xgame = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-20
*************************************************/
/// <reference path="../linq/List.ts" />
/// <reference path="../utils/Singleton.ts" />
/// <reference path="./Time.ts" />

(function (xgame) {
    var SchedulerManager = (function (_super) {
        __extends(SchedulerManager, _super);
        function SchedulerManager() {
            var _this = _super.call(this) || this;
            _this.$preUpdateItems = new Map();
            _this.$preUpdateIndexes = new xgame.List();
            _this.$updateItems = new Map();
            _this.$updateIndexes = new xgame.List();
            _this.$postUpdateItems = new Map();
            _this.$postUpdateIndexes = new xgame.List();
            return _this;
        }
        SchedulerManager.prototype.tick = function (deltaTime) {
            var _this = this;
            xgame.__lockobject__(this).simple(function () {
                var time = xgame.Time.Instance();
                time.deltaTime = time.timeScale * deltaTime;
                time.passedTime += time.deltaTime;
                var i = 0, len = 0, hashCode = 0;
                var scheduler;
                //preupdate
                len = _this.$preUpdateIndexes.count();
                for (i = 0; i < len; i++) {
                    hashCode = _this.$preUpdateIndexes.elementAt(i);
                    scheduler = _this.$preUpdateItems.get(hashCode);
                    scheduler.execute();
                }
                //update
                len = _this.$updateIndexes.count();
                for (i = 0; i < len; i++) {
                    hashCode = _this.$updateIndexes.elementAt(i);
                    scheduler = _this.$updateItems.get(hashCode);
                    scheduler.execute();
                }
                //postupdate
                len = _this.$postUpdateIndexes.count();
                for (i = 0; i < len; i++) {
                    hashCode = _this.$postUpdateIndexes.elementAt(i);
                    scheduler = _this.$postUpdateItems.get(hashCode);
                    scheduler.execute();
                }
            }, this);
        };
        //================================================
        //preupdate
        //================================================
        SchedulerManager.prototype.registerPreUpdate = function (action, thisObject, order) {
            if (order === void 0) { order = 0; }
            return this.$register(1, action, thisObject, order);
        };
        SchedulerManager.prototype.removePreUpdate = function (value) {
            var hashCode = value;
            if (typeof (value) != "number") {
                hashCode = value.hashCode;
            }
            this.$remove(1, hashCode);
        };
        //================================================
        //update
        //================================================
        SchedulerManager.prototype.registerUpdate = function (action, thisObject, order) {
            if (order === void 0) { order = 0; }
            return this.$register(2, action, thisObject, order);
        };
        SchedulerManager.prototype.removeUpdate = function (value) {
            var hashCode = value;
            if (typeof (value) != "number") {
                hashCode = value.hashCode;
            }
            this.$remove(2, hashCode);
        };
        //================================================
        //postupdate
        //================================================
        SchedulerManager.prototype.registerPostUpdate = function (action, thisObject, order) {
            if (order === void 0) { order = 0; }
            return this.$register(3, action, thisObject, order);
        };
        SchedulerManager.prototype.removePostUpdate = function (value) {
            var hashCode = value;
            if (typeof (value) != "number") {
                hashCode = value.hashCode;
            }
            this.$remove(3, hashCode);
        };
        //================================================
        //timer
        //================================================
        SchedulerManager.prototype.registerTimer = function (timeout, action, thisObject, times, order) {
            var scheduler = this.$register(2, action, thisObject, order);
            scheduler.setTimeout(timeout, times);
            return scheduler;
        };
        SchedulerManager.prototype.removeTimer = function (value) {
            var hashCode = value;
            if (typeof (value) != "number") {
                hashCode = value.hashCode;
            }
            this.$remove(2, hashCode);
        };
        //================================================
        //private
        //================================================
        SchedulerManager.prototype.$register = function (mode, action, thisObject, order) {
            var _this = this;
            if (order === void 0) { order = 0; }
            var scheduler = new xgame.Scheduler(this, action, thisObject, order);
            xgame.__lockobject__(this).simple(function () {
                var indexs;
                var items;
                if (mode == 1) {
                    indexs = _this.$preUpdateIndexes;
                    items = _this.$preUpdateItems;
                }
                else if (mode == 3) {
                    indexs = _this.$postUpdateIndexes;
                    items = _this.$postUpdateItems;
                }
                else {
                    indexs = _this.$updateIndexes;
                    items = _this.$updateItems;
                }
                items.set(scheduler.hashCode, scheduler);
                if (!order) {
                    indexs.append(scheduler.hashCode);
                }
                else {
                    var index = _this.getInsertIndex(1, order);
                    indexs.insert(index, scheduler.hashCode);
                }
            }, this);
            return scheduler;
        };
        SchedulerManager.prototype.$remove = function (mode, hashCode) {
            var _this = this;
            xgame.__lockobject__(this).simple(function () {
                var indexs;
                var items;
                if (mode == 1) {
                    indexs = _this.$preUpdateIndexes;
                    items = _this.$preUpdateItems;
                }
                else if (mode == 3) {
                    indexs = _this.$postUpdateIndexes;
                    items = _this.$postUpdateItems;
                }
                else {
                    indexs = _this.$updateIndexes;
                    items = _this.$updateItems;
                }
                if (indexs.contains(hashCode)) {
                    indexs.remove(hashCode);
                }
                if (items.has(hashCode)) {
                    var scheduler = items.get(hashCode);
                    scheduler.dispose();
                    items.delete(hashCode);
                }
            }, this);
        };
        SchedulerManager.prototype.getInsertIndex = function (mode, order) {
            if (order === void 0) { order = 0; }
            var indexs;
            var items;
            if (mode == 1) {
                indexs = this.$preUpdateIndexes;
                items = this.$preUpdateItems;
            }
            else if (mode == 3) {
                indexs = this.$postUpdateIndexes;
                items = this.$postUpdateItems;
            }
            else {
                indexs = this.$updateIndexes;
                items = this.$updateItems;
            }
            var i = 0, len = 0, hashCode = 0;
            var scheduler;
            len = indexs.count();
            if (len == 0) {
                return 0;
            }
            for (i = 0; i < len; i++) {
                hashCode = indexs.elementAt(i);
                scheduler = items.get(hashCode);
                if (order > order) {
                    return i;
                }
            }
            return len - 1;
        };
        SchedulerManager = __decorate([
            xgame.impl(xgame.ISchedulerManager),
            __metadata("design:paramtypes", [])
        ], SchedulerManager);
        return SchedulerManager;
    }(xgame.Singleton));
    xgame.SchedulerManager = SchedulerManager;
    __reflect(SchedulerManager.prototype, "xgame.SchedulerManager", ["xgame.ISchedulerManager"]);
})(xgame || (xgame = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-18
*************************************************/
/// <reference path="./core/XObject.ts" />
/// <reference path="./interfaces/IXGame.ts" />
/// <reference path="./interfaces/IXObject.ts" />
/// <reference path="./interfaces/IXBootstrap.ts" />
/// <reference path="./interfaces/IServiceProvider.ts" />
/// <reference path="./XGameExtensions.ts" />
/// <reference path="./scheduler/ISchedulerManager.ts" />
/// <reference path="./scheduler/SchedulerManager.ts" />

(function (xgame) {
    xgame.that = null;
    var XGame = (function (_super) {
        __extends(XGame, _super);
        function XGame(bootstrap) {
            var _this = _super.call(this) || this;
            _this.bootstrap = bootstrap;
            _this.$inited = false;
            //================================================
            //ServiceProvider
            //================================================
            _this.providers = [];
            if (xgame.that) {
                throw new Error("引擎只能实例化一个对象");
            }
            xgame.that = _this;
            _this.container = xgame.ServiceContainer.Instance();
            return _this;
        }
        XGame.prototype.init = function () {
            return __awaiter(this, void 0, void 0, function () {
                var i, provider, rets, i, provider, i, provider, rets;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (this.$inited) {
                                return [2 /*return*/];
                            }
                            console.log("[XGame]: 框架初始化...");
                            //注册自己
                            //this.container.singleton(IXGame, XGame).withInstance(this);
                            this.registerServiceProvider(new xgame.XProvider());
                            //排序IServiceProvider
                            this.providers.sort(function (a, b) {
                                if (a.priority > b.priority) {
                                    return -1;
                                }
                                else if (a.priority < b.priority) {
                                    return 1;
                                }
                                return 0;
                            });
                            i = 0;
                            _a.label = 1;
                        case 1:
                            if (!(i < this.providers.length)) return [3 /*break*/, 4];
                            provider = this.providers[i];
                            return [4 /*yield*/, provider.onInit(this)];
                        case 2:
                            rets = _a.sent();
                            if (!rets) {
                                throw new Error("[IServiceProvider]: 初始化" + xgame.getQualifiedClassName(provider) + "发生错误.");
                            }
                            else {
                                console.log("[IServiceProvider]: " + xgame.getQualifiedClassName(provider) + "初始化.");
                            }
                            _a.label = 3;
                        case 3:
                            i++;
                            return [3 /*break*/, 1];
                        case 4:
                            //IServiceProvider注册服务
                            for (i = 0; i < this.providers.length; i++) {
                                provider = this.providers[i];
                                provider.onServiceRegister(this);
                            }
                            //初始化IXBootstrap
                            this.bootstrap.onInit(this);
                            console.log("[IXBootstrap]: {0}初始化.".format(xgame.getQualifiedClassName(this.bootstrap)));
                            i = 0;
                            _a.label = 5;
                        case 5:
                            if (!(i < this.providers.length)) return [3 /*break*/, 8];
                            provider = this.providers[i];
                            return [4 /*yield*/, provider.onStart(this)];
                        case 6:
                            rets = _a.sent();
                            if (!rets) {
                                throw new Error("[IServiceProvider]: 启动{0}错误.".format(xgame.getQualifiedClassName(provider)));
                            }
                            else {
                                console.log("[IServiceProvider]: {0}已启动.".format(xgame.getQualifiedClassName(provider)));
                            }
                            _a.label = 7;
                        case 7:
                            i++;
                            return [3 /*break*/, 5];
                        case 8:
                            //启动IXBootstrap
                            this.bootstrap.onStart(this);
                            console.log("[IXBootstrap]: {0}已启动.".format(xgame.getQualifiedClassName(this.bootstrap)));
                            //完成
                            this.$inited = true;
                            console.log("[XGame]: 框架启动完成.");
                            return [2 /*return*/];
                    }
                });
            });
        };
        XGame.prototype.tick = function (deltaTime) {
            xgame.SchedulerManager.Instance().tick(deltaTime);
        };
        //================================================
        //Container
        //================================================
        XGame.prototype.singleton = function (identity, service) {
            return this.container.singleton(identity, service);
        };
        XGame.prototype.getService = function (identity) {
            return this.container.getService(identity);
        };
        XGame.prototype.registerServiceProvider = function (provider) {
            this.providers.push(provider);
            return this;
        };
        XGame = __decorate([
            xgame.impl(xgame.IXGame),
            __metadata("design:paramtypes", [Object])
        ], XGame);
        return XGame;
    }(xgame.XObject));
    xgame.XGame = XGame;
    __reflect(XGame.prototype, "xgame.XGame", ["xgame.IXGame"]);
})(xgame || (xgame = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-20
*************************************************/
/// <reference path="./interfaces/IServiceProvider.ts" />
/// <reference path="./XGameExtensions.ts" />

(function (xgame) {
    var XProvider = (function (_super) {
        __extends(XProvider, _super);
        function XProvider() {
            var _this = _super.call(this) || this;
            _this.priority = 99999;
            return _this;
        }
        XProvider.prototype.onInit = function (game) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, true];
                });
            });
        };
        XProvider.prototype.onStart = function (game) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    game.getService(xgame.IXTaskManagerInternal).initialize();
                    game.getService(xgame.IPlayableManagerInternal).initialize();
                    return [2 /*return*/, true];
                });
            });
        };
        XProvider.prototype.onServiceRegister = function (game) {
            //注册实用类
            game.singleton(xgame.IPoolManager, xgame.PoolManager).withInstance(xgame.PoolManager.Instance());
            console.log("[XProvider]: 注册管理器{0}".format(xgame.getQualifiedClassName(xgame.PoolManager)));
            game.singleton(xgame.IEventManager, xgame.EventManager).withInstance(xgame.EventManager.Instance());
            console.log("[XProvider]: 注册管理器{0}".format(xgame.getQualifiedClassName(xgame.EventManager)));
            game.singleton(xgame.ISchedulerManager, xgame.SchedulerManager).withInstance(xgame.SchedulerManager.Instance());
            console.log("[XProvider]: 注册管理器{0}".format(xgame.getQualifiedClassName(xgame.SchedulerManager)));
            game.singleton(xgame.IXTaskManager, xgame.XTaskManager).withInstance(xgame.XTaskManager.Instance()).setAlias(xgame.IXTaskManagerInternal);
            console.log("[XProvider]: 注册管理器{0}".format(xgame.getQualifiedClassName(xgame.XTaskManager)));
            game.singleton(xgame.IPlayableManager, xgame.PlayableManager).withInstance(xgame.PlayableManager.Instance()).setAlias(xgame.IPlayableManagerInternal);
            console.log("[XProvider]: 注册管理器{0}".format(xgame.getQualifiedClassName(xgame.PlayableManager)));
        };
        XProvider = __decorate([
            xgame.impl(xgame.IServiceProvider),
            __metadata("design:paramtypes", [])
        ], XProvider);
        return XProvider;
    }(xgame.XObject));
    xgame.XProvider = XProvider;
    __reflect(XProvider.prototype, "xgame.XProvider", ["xgame.IServiceProvider"]);
})(xgame || (xgame = {}));

(function (xgame) {
    function joinValues(templates) {
        var first = templates[0];
        var value = first instanceof xgame.Watcher ? first.getValue() : first;
        var length = templates.length;
        for (var i = 1; i < length; i++) {
            var item = templates[i];
            if (item instanceof xgame.Watcher) {
                item = item.getValue();
            }
            value += item;
        }
        return value;
    }
    var Binding = (function () {
        function Binding() {
        }
        Binding.bindProperty = function (host, chain, target, prop) {
            var watcher = xgame.Watcher.watch(host, chain, null, null);
            if (watcher) {
                var assign = function (value) {
                    target[prop] = value;
                };
                watcher.setHandler(assign, null);
                assign(watcher.getValue());
            }
            return watcher;
        };
        Binding.bindHandler = function (host, chain, handler, thisObject) {
            var watcher = xgame.Watcher.watch(host, chain, handler, thisObject);
            if (watcher) {
                handler.call(thisObject, watcher.getValue());
            }
            return watcher;
        };
        Binding.$bindProperties = function (host, templates, chainIndex, target, prop) {
            if (templates.length == 1 && chainIndex.length == 1) {
                return Binding.bindProperty(host, templates[0].split("."), target, prop);
            }
            var assign = function () {
                target[prop] = joinValues(templates);
            };
            var length = chainIndex.length;
            var watcher;
            for (var i = 0; i < length; i++) {
                var index = chainIndex[i];
                var chain = templates[index].split(".");
                watcher = xgame.Watcher.watch(host, chain, null, null);
                if (watcher) {
                    templates[index] = watcher;
                    watcher.setHandler(assign, null);
                }
            }
            assign();
            return watcher;
        };
        return Binding;
    }());
    xgame.Binding = Binding;
    __reflect(Binding.prototype, "xgame.Binding");
})(xgame || (xgame = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-19
*************************************************/
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-19
*************************************************/
/// <reference path="../core/XObject.ts" />
/// <reference path="./EventPhase.ts" />

(function (xgame) {
    var Event = (function (_super) {
        __extends(Event, _super);
        function Event(type, bubbles, cancelable, data) {
            var _this = _super.call(this) || this;
            _this.$eventPhase = 2;
            _this.$currentTarget = null;
            _this.$target = null;
            _this.$isDefaultPrevented = false;
            _this.$isPropagationStopped = false;
            _this.$isPropagationImmediateStopped = false;
            _this.$type = type;
            _this.$bubbles = !!bubbles;
            _this.$cancelable = !!cancelable;
            _this.data = data;
            return _this;
        }
        Object.defineProperty(Event.prototype, "type", {
            get: function () {
                return this.$type;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Event.prototype, "bubbles", {
            get: function () {
                return this.$bubbles;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Event.prototype, "cancelable", {
            get: function () {
                return this.$cancelable;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Event.prototype, "eventPhase", {
            get: function () {
                return this.$eventPhase;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Event.prototype, "currentTarget", {
            get: function () {
                return this.$currentTarget;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Event.prototype, "target", {
            get: function () {
                return this.$target;
            },
            enumerable: true,
            configurable: true
        });
        Event.prototype.$setTarget = function (target) {
            this.$target = target;
            return true;
        };
        Event.prototype.isDefaultPrevented = function () {
            return this.$isDefaultPrevented;
        };
        Event.prototype.preventDefault = function () {
            if (this.$cancelable)
                this.$isDefaultPrevented = true;
        };
        Event.prototype.stopPropagation = function () {
            if (this.$bubbles)
                this.$isPropagationStopped = true;
        };
        Event.prototype.stopImmediatePropagation = function () {
            if (this.$bubbles)
                this.$isPropagationImmediateStopped = true;
        };
        Event.prototype.clean = function () {
            this.data = this.$currentTarget = null;
            this.$setTarget(null);
        };
        Event.dispatchEvent = function (target, type, bubbles, data) {
            if (bubbles === void 0) { bubbles = false; }
            var event = Event.create(Event, type, bubbles);
            var props = Event._getPropertyData(Event);
            if (data != undefined) {
                props.data = data;
            }
            var result = target.dispatchEvent(event);
            Event.release(event);
            return result;
        };
        Event._getPropertyData = function (EventClass) {
            var props = EventClass._props;
            if (!props)
                props = EventClass._props = {};
            return props;
        };
        Event.create = function (EventClass, type, bubbles, cancelable) {
            var eventPool;
            var hasEventPool = EventClass.hasOwnProperty("eventPool");
            if (hasEventPool) {
                eventPool = EventClass.eventPool;
            }
            if (!eventPool) {
                eventPool = EventClass.eventPool = [];
            }
            if (eventPool.length) {
                var event_1 = eventPool.pop();
                event_1.$type = type;
                event_1.$bubbles = !!bubbles;
                event_1.$cancelable = !!cancelable;
                event_1.$isDefaultPrevented = false;
                event_1.$isPropagationStopped = false;
                event_1.$isPropagationImmediateStopped = false;
                event_1.$eventPhase = 2 /* AT_TARGET */;
                return event_1;
            }
            return new EventClass(type, bubbles, cancelable);
        };
        Event.release = function (event) {
            event.clean();
            var EventClass = Object.getPrototypeOf(event).constructor;
            EventClass.eventPool.push(event);
        };
        return Event;
    }(xgame.XObject));
    xgame.Event = Event;
    __reflect(Event.prototype, "xgame.Event");
})(xgame || (xgame = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-19
*************************************************/
/// <reference path="../core/XObject.ts" />
/// <reference path="./Event.ts" />

(function (xgame) {
    xgame.IEventDispatcher = Symbol.for("IEventDispatcher");
})(xgame || (xgame = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-20
*************************************************/
/// <reference path="../event/Event.ts" />
/// <reference path="../event/IEventDispatcher.ts" />

(function (xgame) {
    var PropertyEvent = (function (_super) {
        __extends(PropertyEvent, _super);
        function PropertyEvent(type, bubbles, cancelable, property) {
            var _this = _super.call(this, type, bubbles, cancelable) || this;
            _this.property = property;
            return _this;
        }
        PropertyEvent.dispatchPropertyEvent = function (target, eventType, property) {
            if (!target.hasEventListener(eventType)) {
                return true;
            }
            var event = xgame.Event.create(PropertyEvent, eventType);
            event.property = property;
            var result = target.dispatchEvent(event);
            xgame.Event.release(event);
            return result;
        };
        PropertyEvent.PROPERTY_CHANGE = "propertyChange";
        return PropertyEvent;
    }(xgame.Event));
    xgame.PropertyEvent = PropertyEvent;
    __reflect(PropertyEvent.prototype, "xgame.PropertyEvent");
})(xgame || (xgame = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-20
*************************************************/

(function (xgame) {
    var key = "__xgame_bindables__";
    function registerBindable(instance, property) {
        if (instance.hasOwnProperty(key)) {
            instance[key].push(property);
        }
        else {
            var list = [property];
            if (instance[key]) {
                list = instance[key].concat(list);
            }
            instance[key] = list;
        }
    }
    xgame.registerBindable = registerBindable;
})(xgame || (xgame = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-23
*************************************************/

(function (xgame) {
    function getImplements(target) {
        var types = [];
        var prototype = xgame.getPrototype(target);
        while (prototype) {
            var list = prototype.__implements__;
            if (list && list.length) {
                for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
                    var type = list_1[_i];
                    if (types.indexOf(type) == -1) {
                        types.push(type);
                    }
                }
            }
            prototype = xgame.getPrototype(prototype);
        }
        return types;
    }
    xgame.getImplements = getImplements;
})(xgame || (xgame = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-23
*************************************************/
/// <reference path="./getImplements.ts" />

(function (xgame) {
    function isImplementOf(target, api) {
        var apis = xgame.getImplements(target);
        return apis.indexOf(api) >= 0;
    }
    xgame.isImplementOf = isImplementOf;
})(xgame || (xgame = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-11
*************************************************/
/// <reference path="../utils/isImplementOf.ts" />

(function (xgame) {
    var listeners = "__xgame_listeners__";
    var bindables = "__xgame_bindables__";
    var bindableCount = 0;
    function getPropertyDescriptor(host, property) {
        var data = Object.getOwnPropertyDescriptor(host, property);
        if (data) {
            return data;
        }
        var prototype = Object.getPrototypeOf(host);
        if (prototype) {
            return getPropertyDescriptor(prototype, property);
        }
        return null;
    }
    function notifyListener(host, property) {
        var list = host[listeners];
        var length = list.length;
        for (var i = 0; i < length; i += 2) {
            var listener = list[i];
            var target = list[i + 1];
            listener.call(target, property);
        }
    }
    var Watcher = (function () {
        function Watcher(property, handler, thisObject, next) {
            this.isExecuting = false;
            this.property = property;
            this.handler = handler;
            this.next = next;
            this.thisObject = thisObject;
        }
        Watcher.watch = function (host, chain, handler, thisObject) {
            if (chain.length > 0) {
                var property = chain.shift();
                var next = Watcher.watch(null, chain, handler, thisObject);
                var watcher = new Watcher(property, handler, thisObject, next);
                watcher.reset(host);
                return watcher;
            }
            else {
                return null;
            }
        };
        Watcher.checkBindable = function (host, property) {
            var list = host[bindables];
            if (list && list.indexOf(property) != -1) {
                return true;
            }
            var isEventDispatcher = xgame.isImplementOf(host, xgame.IEventDispatcher);
            if (!isEventDispatcher && !host[listeners]) {
                host[listeners] = [];
            }
            var data = getPropertyDescriptor(host, property);
            if (data && data.set && data.get) {
                var orgSet_1 = data.set;
                data.set = function (value) {
                    if (this[property] != value) {
                        orgSet_1.call(this, value);
                        if (isEventDispatcher) {
                            xgame.PropertyEvent.dispatchPropertyEvent(this, xgame.PropertyEvent.PROPERTY_CHANGE, property);
                        }
                        else {
                            notifyListener(this, property);
                        }
                    }
                };
            }
            else if (!data || (!data.get && !data.set)) {
                bindableCount++;
                var newProp_1 = "_" + bindableCount + property;
                host[newProp_1] = data ? data.value : null;
                data = { enumerable: true, configurable: true };
                data.get = function () {
                    return this[newProp_1];
                };
                data.set = function (value) {
                    if (this[newProp_1] != value) {
                        this[newProp_1] = value;
                        if (isEventDispatcher) {
                            xgame.PropertyEvent.dispatchPropertyEvent(this, xgame.PropertyEvent.PROPERTY_CHANGE, property);
                        }
                        else {
                            notifyListener(this, property);
                        }
                    }
                };
            }
            else {
                return false;
            }
            Object.defineProperty(host, property, data);
            xgame.registerBindable(host, property);
        };
        Watcher.prototype.unwatch = function () {
            this.reset(null);
            this.handler = null;
            if (this.next) {
                this.next.handler = null;
            }
        };
        Watcher.prototype.getValue = function () {
            if (this.next) {
                return this.next.getValue();
            }
            return this.getHostPropertyValue();
        };
        Watcher.prototype.setHandler = function (handler, thisObject) {
            this.handler = handler;
            this.thisObject = thisObject;
            if (this.next) {
                this.next.setHandler(handler, thisObject);
            }
        };
        Watcher.prototype.reset = function (newHost) {
            var oldHost = this.host;
            if (oldHost) {
                if (xgame.isImplementOf(oldHost, xgame.IEventDispatcher)) {
                    oldHost.removeEventListener(xgame.PropertyEvent.PROPERTY_CHANGE, this.wrapHandler, this);
                }
                else {
                    var list = oldHost[listeners];
                    var index = list.indexOf(this);
                    list.splice(index - 1, 2);
                }
            }
            this.host = newHost;
            if (newHost) {
                Watcher.checkBindable(newHost, this.property);
                if (xgame.isImplementOf(newHost, xgame.IEventDispatcher)) {
                    newHost.addEventListener(xgame.PropertyEvent.PROPERTY_CHANGE, this.wrapHandler, this, false, 100);
                }
                else {
                    var list = newHost[listeners];
                    list.push(this.onPropertyChange);
                    list.push(this);
                }
            }
            if (this.next)
                this.next.reset(this.getHostPropertyValue());
        };
        Watcher.prototype.getHostPropertyValue = function () {
            return this.host ? this.host[this.property] : null;
        };
        Watcher.prototype.wrapHandler = function (e) {
            var event = e;
            this.onPropertyChange(event.property);
        };
        Watcher.prototype.onPropertyChange = function (property) {
            if (property == this.property && !this.isExecuting) {
                try {
                    this.isExecuting = true;
                    if (this.next)
                        this.next.reset(this.getHostPropertyValue());
                    this.handler.call(this.thisObject, this.getValue());
                }
                finally {
                    this.isExecuting = false;
                }
            }
        };
        return Watcher;
    }());
    xgame.Watcher = Watcher;
    __reflect(Watcher.prototype, "xgame.Watcher");
})(xgame || (xgame = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-01-14
*************************************************/

(function (xgame) {
    xgame.IAttribute = Symbol.for("IAttribute");
})(xgame || (xgame = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-01-14
*************************************************/
/// <reference path="../core/XObject.ts" />
/// <reference path="../interfaces/IAttribute.ts" />
/// <reference path="../interfaces/IXObject.ts" />

(function (xgame) {
    var Attribute = (function (_super) {
        __extends(Attribute, _super);
        function Attribute() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Attribute = __decorate([
            xgame.impl(xgame.IAttribute)
        ], Attribute);
        return Attribute;
    }(xgame.XObject));
    xgame.Attribute = Attribute;
    __reflect(Attribute.prototype, "xgame.Attribute", ["xgame.IAttribute"]);
})(xgame || (xgame = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-19
*************************************************/
/// <reference path="../core/XObject.ts" />

(function (xgame) {
    var AsyncLock = (function (_super) {
        __extends(AsyncLock, _super);
        function AsyncLock(options) {
            var _this = _super.call(this) || this;
            options = options || {};
            _this.Promise = options.Promise || Promise;
            _this.queues = {};
            _this.timeout = options.timeout || AsyncLock.DEFAULT_TIMEOUT;
            _this.maxOccupationTime = options.maxOccupationTime || AsyncLock.DEFAULT_MAX_OCCUPATION_TIME;
            if (options.maxPending === Infinity || (Number.isInteger(options.maxPending) && options.maxPending >= 0)) {
                _this.maxPending = options.maxPending;
            }
            else {
                _this.maxPending = AsyncLock.DEFAULT_MAX_PENDING;
            }
            return _this;
        }
        AsyncLock.prototype.acquire = function (key, handler, complete, options) {
            if (Array.isArray(key)) {
                return this._acquireBatch(key, handler, complete, options);
            }
            if (typeof (handler) !== 'function') {
                throw new Error('You must pass a function to execute');
            }
            // faux-deferred promise using new Promise() (as Promise.defer is deprecated)
            var deferredResolve = null;
            var deferredReject = null;
            var deferred = null;
            if (typeof (complete) !== 'function') {
                options = complete;
                complete = null;
                // will return a promise
                deferred = new this.Promise(function (resolve, reject) {
                    deferredResolve = resolve;
                    deferredReject = reject;
                });
            }
            options = options || {};
            var resolved = false;
            var timer = null;
            var occupationTimer = null;
            var self = this;
            var done = function (locked, err, ret) {
                if (err === void 0) { err = null; }
                if (ret === void 0) { ret = null; }
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
            var exec = function (locked) {
                if (resolved) {
                    return done(locked);
                }
                if (timer) {
                    clearTimeout(timer);
                    timer = null;
                }
                // Callback mode
                if (handler.length === 1) {
                    var called_1 = false;
                    handler(function (err, ret) {
                        if (!called_1) {
                            called_1 = true;
                            done(locked, err, ret);
                        }
                    });
                }
                else {
                    // Promise mode
                    self._promiseTry(function () {
                        return handler();
                    })
                        .then(function (ret) {
                        done(locked, undefined, ret);
                    }, function (error) {
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
                var taskFn = function () {
                    exec(true);
                };
                if (options.skipQueue) {
                    self.queues[key].unshift(taskFn);
                }
                else {
                    self.queues[key].push(taskFn);
                }
                var timeout = options.timeout || self.timeout;
                if (timeout) {
                    timer = setTimeout(function () {
                        timer = null;
                        done(false, new Error('async-lock timed out'));
                    }, timeout);
                }
            }
            var maxOccupationTime = options.maxOccupationTime || self.maxOccupationTime;
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
        ;
        AsyncLock.prototype._acquireBatch = function (keys, handler, complete, opts) {
            if (typeof (complete) !== 'function') {
                opts = complete;
                complete = null;
            }
            var self = this;
            var getFn = function (key, fn) {
                return function (cb) {
                    self.acquire(key, fn, cb, opts);
                };
            };
            var fnx = handler;
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
                    }
                    else {
                        resolve(fnx());
                    }
                });
            }
        };
        ;
        AsyncLock.prototype.isBusy = function (key) {
            if (!key) {
                return Object.keys(this.queues).length > 0;
            }
            else {
                return !!this.queues[key];
            }
        };
        AsyncLock.prototype._promiseTry = function (fn) {
            try {
                return this.Promise.resolve(fn());
            }
            catch (e) {
                return this.Promise.reject(e);
            }
        };
        AsyncLock.DEFAULT_TIMEOUT = 0; //Never
        AsyncLock.DEFAULT_MAX_OCCUPATION_TIME = 0; //Never
        AsyncLock.DEFAULT_MAX_PENDING = 1000;
        return AsyncLock;
    }(xgame.XObject));
    xgame.AsyncLock = AsyncLock;
    __reflect(AsyncLock.prototype, "xgame.AsyncLock");
})(xgame || (xgame = {}));

(function (xgame) {
    function is_simple(k) {
        var kt = typeof k;
        if (kt === "string" || kt === "number") {
            return true;
        }
        return false;
    }
    var Dictionary = (function () {
        function Dictionary(limit, keys, values) {
            this.limit = 0;
            this.__hashobjects__ = {};
            this.m_keys = [];
            this.m_values = [];
            this.limit = limit ? limit : 0;
            if (keys && values && keys.length && values.length) {
                for (var i = 0; i < keys.length; i++) {
                    this.add(keys[i], values[i]);
                }
            }
        }
        Dictionary.prototype.copy = function (source) {
            this.m_keys = source.keys;
            this.m_values = source.values;
            this.__hashobjects__ = {};
            if (this.m_keys.length && is_simple(this.m_keys[0])) {
                var len = this.m_keys.length;
                for (var i = 0; i < len; i++) {
                    this.mapset(this.m_keys[i], this.m_values[i]);
                }
            }
        };
        Object.defineProperty(Dictionary.prototype, "length", {
            get: function () {
                return this.m_keys.length;
            },
            enumerable: true,
            configurable: true
        });
        Dictionary.prototype.first = function () {
            if (this.length > 0) {
                return { key: this.m_keys[0], value: this.m_values[0] };
            }
            return null;
        };
        Dictionary.prototype.last = function () {
            if (this.length > 0) {
                return { key: this.m_keys[this.length - 1], value: this.m_values[this.length - 1] };
            }
            return null;
        };
        Dictionary.prototype.shift = function () {
            if (this.length > 0) {
                var item = { key: this.m_keys.shift(), value: this.m_values.shift() };
                this.mapdelete(item.key);
                return item;
            }
            return null;
        };
        Dictionary.prototype.pop = function () {
            if (this.length > 0) {
                var item = { key: this.m_keys.pop(), value: this.m_values.pop() };
                this.mapdelete(item.key);
                return item;
            }
            return null;
        };
        Object.defineProperty(Dictionary.prototype, "values", {
            get: function () {
                return this.m_values.concat();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Dictionary.prototype, "keys", {
            get: function () {
                return this.m_keys.concat();
            },
            enumerable: true,
            configurable: true
        });
        Dictionary.prototype.containsKey = function (key) {
            if (is_simple(key)) {
                return this.__hashobjects__[key] !== undefined;
            }
            var indexOf = this.indexOfKey(key);
            if (indexOf >= 0) {
                return true;
            }
            return false;
        };
        Dictionary.prototype.indexOfKey = function (key) {
            return this.m_keys.indexOf(key);
        };
        Dictionary.prototype.containsValue = function (value) {
            var indexOf = this.indexOfValue(value);
            if (indexOf >= 0) {
                return true;
            }
            return false;
        };
        Dictionary.prototype.sortByKey = function (compare_handler) {
            this.insertion_sort_for_key(compare_handler);
        };
        Dictionary.prototype.sortByValue = function (compare_handler) {
            this.insertion_sort_for_value(compare_handler);
        };
        Dictionary.prototype.indexOfValue = function (value) {
            return this.m_values.indexOf(value);
        };
        Dictionary.prototype.getKeyByValue = function (value) {
            return this.m_keys[this.indexOfValue(value)];
        };
        Dictionary.prototype.set = function (key, value) {
            if (is_simple(key) && !this.containsKey(key)) {
                this.add(key, value);
                return;
            }
            var indexOf = this.indexOfKey(key);
            if (indexOf >= 0) {
                this.m_values[indexOf] = value;
                this.mapset(key, value);
            }
            else {
                this.add(key, value);
            }
        };
        Dictionary.prototype.add = function (key, value) {
            this.checkRepeat(key, value);
            this.m_keys.push(key);
            this.m_values.push(value);
            this.mapset(key, value);
            if (this.limit) {
                this.checkLimit();
            }
        };
        Dictionary.prototype.unshift = function (key, value) {
            this.checkRepeat(key, value);
            this.m_keys.unshift(key);
            this.m_values.unshift(value);
            this.mapset(key, value);
            if (this.limit) {
                this.checkLimit();
            }
        };
        Dictionary.prototype.push = function (key, value) {
            this.checkRepeat(key, value);
            this.m_keys.push(key);
            this.m_values.push(value);
            this.mapset(key, value);
            if (this.limit) {
                this.checkLimit();
            }
        };
        Dictionary.prototype.checkLimit = function (limit, helper_handler, helper_this) {
            if (!limit) {
                limit = this.limit;
            }
            if (limit && this.length > limit) {
                while (this.length > limit) {
                    var v = this.shift();
                    if (v && helper_handler) {
                        helper_handler.apply(helper_this, [v]);
                    }
                }
            }
        };
        Dictionary.prototype.allocf = function (key, defaultFactory) {
            if (is_simple(key) && this.containsKey(key)) {
                return this.__hashobjects__[key];
            }
            else {
                var indexOf = this.indexOfKey(key);
                if (indexOf >= 0) {
                    return this.m_values[indexOf];
                }
            }
            var defaultValue = defaultFactory();
            this.add(key, defaultValue);
            return defaultValue;
        };
        Dictionary.prototype.alloc = function (key, defaultValue) {
            if (is_simple(key) && this.containsKey(key)) {
                return this.__hashobjects__[key];
            }
            else {
                var indexOf = this.indexOfKey(key);
                if (indexOf >= 0) {
                    return this.m_values[indexOf];
                }
            }
            this.add(key, defaultValue);
            return defaultValue;
        };
        Dictionary.prototype.get = function (key, defaultValue) {
            if (is_simple(key) && this.containsKey(key)) {
                return this.__hashobjects__[key];
            }
            else {
                var indexOf = this.indexOfKey(key);
                if (indexOf >= 0) {
                    return this.m_values[indexOf];
                }
            }
            return defaultValue;
        };
        Dictionary.prototype.removeKeys = function (keys) {
            var len = keys.length;
            for (var i = 0; i < len; i++) {
                this.remove(keys[i]);
            }
        };
        Dictionary.prototype.remove = function (key) {
            var indexOf = this.indexOfKey(key);
            if (indexOf >= 0) {
                this.mapdelete(key);
                this.m_keys.splice(indexOf, 1);
                return this.m_values.splice(indexOf, 1)[0];
            }
            return null;
        };
        Dictionary.prototype.removeByValue = function (value) {
            var indexOf = this.indexOfValue(value);
            if (indexOf >= 0) {
                this.m_values.splice(indexOf, 1);
                var key = this.m_keys.splice(indexOf, 1)[0];
                this.mapdelete(key);
                return key;
            }
            return null;
        };
        Dictionary.prototype.filter = function (keys, assist_handler, assist_thisObject) {
            var rets = [];
            for (var i = this.m_keys.length - 1; i >= 0; i--) {
                if (keys.indexOf(this.m_keys[i]) === -1) {
                    var flag = true;
                    var v = this.m_values[i];
                    if (assist_handler && !assist_handler.apply(assist_thisObject, [v])) {
                        flag = false;
                    }
                    if (flag) {
                        this.remove(this.m_keys[i]);
                        rets.push(v);
                    }
                }
            }
            return rets;
        };
        Dictionary.prototype.clear = function (recycle) {
            if (recycle) {
                var len = this.m_values.length;
                for (var i = len - 1; i >= 0; i--) {
                    recycle(this.m_values[i]);
                }
            }
            if (this.length && is_simple(this.m_keys[0])) {
                this.__hashobjects__ = {};
            }
            this.m_keys.length = 0;
            this.m_values.length = 0;
        };
        Dictionary.prototype.randomList = function (num) {
            if (num === void 0) { num = 5; }
            var list = [];
            if (num > this.length) {
                num = this.length;
            }
            while (list.length < num) {
                var item = this.random();
                if (list.indexOf(item) === -1) {
                    list.push(item);
                }
            }
            return list;
        };
        Dictionary.prototype.random = function () {
            var index = (Math.random() * this.keys.length) << 0;
            return this.m_values[index];
        };
        Dictionary.prototype.index = function (i) {
            if (i < this.length) {
                return { key: this.m_keys[i], value: this.m_values[i] };
            }
            return null;
        };
        Dictionary.prototype.indexKey = function (i) {
            if (i < this.length) {
                return this.m_keys[i];
            }
            return null;
        };
        Dictionary.prototype.indexValue = function (i) {
            if (i < this.length) {
                return this.m_values[i];
            }
            return null;
        };
        Dictionary.prototype.forEach = function (fn, thisObject, reverse) {
            var len = this.length;
            var ret;
            if (reverse) {
                for (var i = len - 1; i >= 0; i--) {
                    ret = fn.apply(thisObject, [this.index(i), i]);
                    if (ret) {
                        break;
                    }
                }
            }
            else {
                for (var i = 0; i < len; i++) {
                    ret = fn.apply(thisObject, [this.index(i), i]);
                    if (ret) {
                        break;
                    }
                }
            }
        };
        Dictionary.prototype.forKeys = function (fn, thisObject, reverse) {
            var len = this.length;
            var ret;
            if (reverse) {
                for (var i = len - 1; i >= 0; i--) {
                    ret = fn.apply(thisObject, [this.m_keys[i], i]);
                    if (ret) {
                        break;
                    }
                }
            }
            else {
                for (var i = 0; i < len; i++) {
                    ret = fn.apply(thisObject, [this.m_keys[i], i]);
                    if (ret) {
                        break;
                    }
                }
            }
        };
        Dictionary.prototype.forValues = function (fn, thisObject, reverse) {
            var len = this.length;
            var ret;
            if (reverse) {
                for (var i = len - 1; i >= 0; i--) {
                    ret = fn.apply(thisObject, [this.m_values[i], i]);
                    if (ret) {
                        break;
                    }
                }
            }
            else {
                for (var i = 0; i < len; i++) {
                    ret = fn.apply(thisObject, [this.m_values[i], i]);
                    if (ret) {
                        break;
                    }
                }
            }
        };
        Dictionary.prototype.insertion_sort_for_key = function (compare_handler) {
            var len = this.m_keys.length;
            var preIndex;
            var current;
            var current2;
            for (var i = 1; i < len; i++) {
                preIndex = i - 1;
                current = this.m_keys[i];
                current2 = this.m_values[i];
                while (preIndex >= 0 && compare_handler(this.m_keys[preIndex], current) > 0) {
                    this.m_keys[preIndex + 1] = this.m_keys[preIndex];
                    this.m_values[preIndex + 1] = this.m_values[preIndex];
                    preIndex--;
                }
                this.m_keys[preIndex + 1] = current;
                this.m_values[preIndex + 1] = current2;
            }
        };
        Dictionary.prototype.insertion_sort_for_value = function (compare_handler) {
            var len = this.m_values.length;
            var preIndex;
            var current;
            var current2;
            for (var i = 1; i < len; i++) {
                preIndex = i - 1;
                current = this.m_values[i];
                current2 = this.m_keys[i];
                while (preIndex >= 0 && compare_handler(this.m_values[preIndex], current) > 0) {
                    this.m_values[preIndex + 1] = this.m_values[preIndex];
                    this.m_keys[preIndex + 1] = this.m_keys[preIndex];
                    preIndex--;
                }
                this.m_values[preIndex + 1] = current;
                this.m_keys[preIndex + 1] = current2;
            }
        };
        Dictionary.prototype.checkRepeat = function (key, value) {
            if (!is_simple(key) || this.containsKey(key)) {
                var indexOf = this.indexOfKey(key);
                if (indexOf >= 0) {
                    this.m_values.splice(indexOf, 1);
                    this.m_keys.splice(indexOf, 1);
                }
                return true;
            }
            return false;
        };
        Dictionary.prototype.mapdelete = function (key) {
            if (is_simple(key)) {
                delete this.__hashobjects__[key];
            }
        };
        Dictionary.prototype.mapset = function (key, value) {
            if (is_simple(key)) {
                this.__hashobjects__[key] = value;
            }
        };
        return Dictionary;
    }());
    xgame.Dictionary = Dictionary;
    __reflect(Dictionary.prototype, "xgame.Dictionary");
})(xgame || (xgame = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-19
*************************************************/
/// <reference path="../utils/AsyncLock.ts" />
/// <reference path="../utils/Dictionary.ts" />

(function (xgame) {
    var KEY = "this";
    var Locker = (function (_super) {
        __extends(Locker, _super);
        function Locker() {
            var _this = _super.call(this) || this;
            _this.locker = new xgame.AsyncLock();
            return _this;
        }
        Locker.prototype.acquire = function (handler, complete, options) {
            return this.locker.acquire(KEY, handler, complete, options);
        };
        Locker.prototype.simple = function (handler, thisObject) {
            return this.acquire(function (done) {
                handler.apply(thisObject);
                done();
            });
        };
        return Locker;
    }(xgame.XObject));
    xgame.Locker = Locker;
    __reflect(Locker.prototype, "xgame.Locker");
    var dict = new xgame.Dictionary();
    function __lockobject__(object) {
        var hashCode = object.hashCode;
        if (!hashCode) {
            return null;
        }
        var locker;
        if (!dict.containsKey(hashCode)) {
            locker = new Locker();
            dict.add(hashCode, locker);
        }
        else {
            locker = dict.get(hashCode);
        }
        return locker;
    }
    xgame.__lockobject__ = __lockobject__;
    function __unlockobject__(object) {
        var hashCode = object.hashCode;
        if (!hashCode) {
            return false;
        }
        if (dict.containsKey(hashCode)) {
            dict.remove(hashCode);
            return true;
        }
        return false;
    }
    xgame.__unlockobject__ = __unlockobject__;
})(xgame || (xgame = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-19
*************************************************/
/// <reference path="./Locker.ts" />
/// <reference path="../interfaces/IDisposable.ts" />

(function (xgame) {
    var DisposableGroup = (function (_super) {
        __extends(DisposableGroup, _super);
        function DisposableGroup() {
            var _this = _super.call(this) || this;
            _this.registeredDisposables = [];
            return _this;
        }
        DisposableGroup.prototype.dispose = function () {
            var _this = this;
            this.simple(function () {
                while (_this.registeredDisposables.length) {
                    var o = _this.registeredDisposables.shift();
                    o.dispose();
                }
            }, this);
        };
        DisposableGroup.prototype.register = function (o, invokeDisposeOnceIfExist) {
            var _this = this;
            if (invokeDisposeOnceIfExist === void 0) { invokeDisposeOnceIfExist = false; }
            this.simple(function () {
                var indexOf = _this.registeredDisposables.indexOf(o);
                if (indexOf >= 0) {
                    if (invokeDisposeOnceIfExist) {
                        o.dispose();
                    }
                }
                else {
                    _this.registeredDisposables.push(o);
                }
            }, this);
            return this;
        };
        DisposableGroup = __decorate([
            xgame.impl(xgame.IDisposable),
            __metadata("design:paramtypes", [])
        ], DisposableGroup);
        return DisposableGroup;
    }(xgame.Locker));
    xgame.DisposableGroup = DisposableGroup;
    __reflect(DisposableGroup.prototype, "xgame.DisposableGroup", ["xgame.IDisposable", "xgame.IXObject"]);
})(xgame || (xgame = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-08
*************************************************/
/// <reference path="./XObject.ts" />
/// <reference path="../interfaces/IDisposable.ts" />

(function (xgame) {
    var DisposableObject = (function (_super) {
        __extends(DisposableObject, _super);
        function DisposableObject() {
            return _super.call(this) || this;
        }
        DisposableObject.prototype.dispose = function () {
        };
        DisposableObject = __decorate([
            xgame.impl(xgame.IDisposable),
            __metadata("design:paramtypes", [])
        ], DisposableObject);
        return DisposableObject;
    }(xgame.XObject));
    xgame.DisposableObject = DisposableObject;
    __reflect(DisposableObject.prototype, "xgame.DisposableObject", ["xgame.IDisposable"]);
})(xgame || (xgame = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-01-14
*************************************************/

(function (xgame) {
    xgame.IInjectableAttribute = Symbol.for("IInjectableAttribute");
})(xgame || (xgame = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-01-14
*************************************************/
/// <reference path="./Attribute.ts" />
/// <reference path="../interfaces/IAttribute.ts" />
/// <reference path="../interfaces/IInjectableAttribute.ts" />

(function (xgame) {
    var InjectableAttribute = (function (_super) {
        __extends(InjectableAttribute, _super);
        function InjectableAttribute() {
            var _this = _super.call(this) || this;
            _this.injectable = true;
            return _this;
        }
        InjectableAttribute = __decorate([
            xgame.impl(xgame.IInjectableAttribute),
            __metadata("design:paramtypes", [])
        ], InjectableAttribute);
        return InjectableAttribute;
    }(xgame.Attribute));
    xgame.InjectableAttribute = InjectableAttribute;
    __reflect(InjectableAttribute.prototype, "xgame.InjectableAttribute", ["xgame.IInjectableAttribute", "xgame.IXObject"]);
})(xgame || (xgame = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-19
*************************************************/

(function (xgame) {
    xgame.IMapping = Symbol.for("IMapping");
})(xgame || (xgame = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-01-14
*************************************************/
/// <reference path="../interfaces/IMapping.ts" />

(function (xgame) {
    var Mapping = (function (_super) {
        __extends(Mapping, _super);
        function Mapping(aliases, identity, service) {
            var _this = _super.call(this) || this;
            _this.namedInstances = new Map();
            _this.identity = identity;
            _this.service = service;
            _this.aliases = aliases;
            return _this;
        }
        Mapping.prototype.withInstance = function (instance, named) {
            if (!named) {
                this.instance = instance;
            }
            else {
                this.namedInstances.set(named, instance);
            }
            return this;
        };
        Mapping.prototype.setAlias = function (identity) {
            this.aliases.set(identity, this.identity);
            return this;
        };
        Mapping.prototype.create = function (named) {
            if (!named) {
                if (!this.instance) {
                    this.instance = new this.service();
                }
                return this.instance;
            }
            if (this.namedInstances.has(named)) {
                return this.namedInstances.get(named);
            }
            var instance = new this.service();
            this.namedInstances.set(named, instance);
            return instance;
        };
        return Mapping;
    }(xgame.XObject));
    xgame.Mapping = Mapping;
    __reflect(Mapping.prototype, "xgame.Mapping", ["xgame.IMapping"]);
})(xgame || (xgame = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-01-14
*************************************************/

(function (xgame) {
    xgame.IMethodParamAttribute = Symbol.for("IMethodParamAttribute");
})(xgame || (xgame = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-01-14
*************************************************/
/// <reference path="../core/Attribute.ts" />
/// <reference path="../interfaces/IMethodParamAttribute.ts" />

(function (xgame) {
    var MethodParamAttribute = (function (_super) {
        __extends(MethodParamAttribute, _super);
        function MethodParamAttribute(identity, key, index, named) {
            var _this = _super.call(this) || this;
            _this.identity = identity;
            _this.key = key;
            _this.index = index;
            _this.named = named;
            return _this;
        }
        MethodParamAttribute = __decorate([
            xgame.impl(xgame.IMethodParamAttribute),
            __metadata("design:paramtypes", [Object, String, Number, String])
        ], MethodParamAttribute);
        return MethodParamAttribute;
    }(xgame.Attribute));
    xgame.MethodParamAttribute = MethodParamAttribute;
    __reflect(MethodParamAttribute.prototype, "xgame.MethodParamAttribute", ["xgame.IMethodParamAttribute", "xgame.IXObject"]);
})(xgame || (xgame = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-01-14
*************************************************/

(function (xgame) {
    xgame.IPropertyAttribute = Symbol.for("IPropertyAttribute");
})(xgame || (xgame = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-01-14
*************************************************/
/// <reference path="../core/Attribute.ts" />
/// <reference path="../interfaces/IPropertyAttribute.ts" />

(function (xgame) {
    var PropertyAttribute = (function (_super) {
        __extends(PropertyAttribute, _super);
        function PropertyAttribute(identity, key, named) {
            var _this = _super.call(this) || this;
            _this.identity = identity;
            _this.key = key;
            _this.named = named;
            return _this;
        }
        PropertyAttribute = __decorate([
            xgame.impl(xgame.IPropertyAttribute),
            __metadata("design:paramtypes", [Object, String, String])
        ], PropertyAttribute);
        return PropertyAttribute;
    }(xgame.Attribute));
    xgame.PropertyAttribute = PropertyAttribute;
    __reflect(PropertyAttribute.prototype, "xgame.PropertyAttribute", ["xgame.IPropertyAttribute", "xgame.IXObject"]);
})(xgame || (xgame = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-08
*************************************************/

(function (xgame) {
    function getPrototype(target) {
        var type = typeof (target);
        if (!target || (type != "object" && !target.prototype)) {
            return undefined;
        }
        var prototype = target.prototype ? target.prototype : Object.getPrototypeOf(target);
        return prototype;
    }
    xgame.getPrototype = getPrototype;
    function getPrototypeChains(target) {
        var chains = [];
        var parent = target;
        while (parent) {
            chains.push(parent);
            parent = getPrototype(parent);
        }
        return chains;
    }
    xgame.getPrototypeChains = getPrototypeChains;
})(xgame || (xgame = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-23
*************************************************/
/// <reference path="./getPrototype.ts" />

(function (xgame) {
    function getTypes(target) {
        var types = [];
        var prototype = xgame.getPrototype(target);
        while (prototype) {
            var list = prototype.__types__;
            if (list && list.length) {
                for (var _i = 0, list_2 = list; _i < list_2.length; _i++) {
                    var type = list_2[_i];
                    if (types.indexOf(type) == -1) {
                        types.push(type);
                    }
                }
            }
            prototype = xgame.getPrototype(prototype);
        }
        return types;
    }
    xgame.getTypes = getTypes;
})(xgame || (xgame = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-29
*************************************************/
/// <reference path="./isImplementOf.ts" />
/// <reference path="./getQualifiedClassName.ts" />
/// <reference path="./getTypes.ts" />

(function (xgame) {
    function is(instance, value) {
        if (!instance || typeof instance != "object") {
            return false;
        }
        var type = typeof (value);
        if (type == "symbol") {
            return xgame.isImplementOf(instance, value);
        }
        else if (type == "string") {
            return _is(instance, value);
        }
        else {
            return _is(instance, xgame.getQualifiedClassName(value));
        }
    }
    xgame.is = is;
    function _is(instance, typeName) {
        var types = xgame.getTypes(instance);
        if (!types) {
            return false;
        }
        return (types.indexOf(typeName) !== -1);
    }
})(xgame || (xgame = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-18
*************************************************/
/// <reference path="../core/XObject.ts" />
/// <reference path="../core/Attribute.ts" />
/// <reference path="../core/Mapping.ts" />
/// <reference path="../utils/is.ts" />
/// <reference path="../utils/Singleton.ts" />
/// <reference path="../interfaces/IMapping.ts" />
/// <reference path="../interfaces/IAttribute.ts" />
/// <reference path="../interfaces/IInjectableAttribute.ts" />
/// <reference path="../interfaces/IPropertyAttribute.ts" />

(function (xgame) {
    xgame.METADATA_ATTRIBUTES_KEY = "xgame:attributes";
    var ServiceContainer = (function (_super) {
        __extends(ServiceContainer, _super);
        function ServiceContainer() {
            var _this = _super.call(this) || this;
            _this.mappings = new Map();
            _this.aliases = new Map();
            return _this;
        }
        ServiceContainer.prototype.addAttributes = function (target, attribute, metadataKey) {
            metadataKey = metadataKey ? metadataKey : xgame.METADATA_ATTRIBUTES_KEY;
            var attributes = this.getOrCreateMetadata(metadataKey, target);
            attributes.push(attribute);
            return this;
        };
        ServiceContainer.prototype.getOrCreateMetadata = function (metadataKey, target) {
            var attributes = [];
            if (Reflect.hasOwnMetadata(metadataKey, target)) {
                attributes = Reflect.getMetadata(metadataKey, target);
            }
            else {
                Reflect.defineMetadata(metadataKey, attributes, target);
            }
            return attributes;
        };
        ServiceContainer.prototype.hasAttribute = function (target, identity, metadataKey) {
            if (this.getAttribute(target, identity, metadataKey)) {
                return true;
            }
            return false;
        };
        ServiceContainer.prototype.getAttributes = function (target, identity, metadataKey) {
            var results = this.getOwnAttributes(target, identity, metadataKey).slice();
            return results;
        };
        ServiceContainer.prototype.getOwnAttributes = function (target, identity, metadataKey) {
            metadataKey = metadataKey ? metadataKey : xgame.METADATA_ATTRIBUTES_KEY;
            var results = [];
            var attributes = Reflect.getMetadata(metadataKey, target) || [];
            if (attributes && attributes.length) {
                for (var _i = 0, attributes_1 = attributes; _i < attributes_1.length; _i++) {
                    var attr = attributes_1[_i];
                    if (xgame.is(attr, identity)) {
                        results.push(attr);
                    }
                }
            }
            var prototype = target.prototype;
            if (prototype) {
                prototype = Object.getPrototypeOf(prototype);
                if (prototype) {
                    var superConstructor_1 = Object.getPrototypeOf(prototype).constructor;
                    if (superConstructor_1 !== Object) {
                        var superResults = this.getOwnAttributes(superConstructor_1, identity, metadataKey);
                        results = results.concat(superResults);
                    }
                }
            }
            return results;
        };
        ServiceContainer.prototype.getAttribute = function (target, identity, metadataKey) {
            var attributes = this.getAttributes(target, identity, metadataKey);
            if (attributes && attributes.length) {
                return attributes[0];
            }
            return null;
        };
        ServiceContainer.prototype.isMapping = function (identity) {
            if (this.aliases.has(identity)) {
                identity = this.aliases.get(identity);
            }
            return this.mappings.has(identity);
        };
        ServiceContainer.prototype.bind = function (identity, service) {
            return this.getOrCreate(identity, service);
        };
        ServiceContainer.prototype.singleton = function (identity, service) {
            return this.getOrCreate(identity, service);
        };
        ServiceContainer.prototype.getOrCreate = function (identity, service) {
            if (this.mappings.has(identity)) {
                return this.mappings.get(identity);
            }
            var binding = new xgame.Mapping(this.aliases, identity, service);
            this.mappings.set(identity, binding);
            return binding;
        };
        ServiceContainer.prototype.getService = function (identity, named) {
            if (this.aliases.has(identity)) {
                identity = this.aliases.get(identity);
            }
            if (!this.mappings.has(identity)) {
                throw new Error("xgame.Container [" + identity.toString() + "] 此类型没有还没有注册.");
            }
            var binding = this.mappings.get(identity);
            return binding.create(named);
        };
        return ServiceContainer;
    }(xgame.Singleton));
    xgame.ServiceContainer = ServiceContainer;
    __reflect(ServiceContainer.prototype, "xgame.ServiceContainer");
})(xgame || (xgame = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-01-14
*************************************************/
/// <reference path="../interfaces/IAttribute.ts" />

(function (xgame) {
    function attributes() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return function (target) {
            for (var _i = 0, args_1 = args; _i < args_1.length; _i++) {
                var attribute = args_1[_i];
                xgame.ServiceContainer.Instance().addAttributes(target, attribute);
            }
        };
    }
    xgame.attributes = attributes;
})(xgame || (xgame = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-19
*************************************************/
/// <reference path="../core/XObject.ts" />
/// <reference path="./Event.ts" />

(function (xgame) {
    xgame.IEventManager = Symbol.for("IEventManager");
})(xgame || (xgame = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-19
*************************************************/
/// <reference path="../core/XObject.ts" />
/// <reference path="./IEventDispatcher.ts" />

(function (xgame) {
    var ONCE_EVENT_LIST = [];
    var EventDispatcher = (function (_super) {
        __extends(EventDispatcher, _super);
        function EventDispatcher(target) {
            if (target === void 0) { target = null; }
            var _this = _super.call(this) || this;
            _this.$EventDispatcher = {
                0: target ? target : _this,
                1: {},
                2: {},
                3: 0
            };
            return _this;
        }
        EventDispatcher.prototype.$getEventMap = function (useCapture) {
            var values = this.$EventDispatcher;
            var eventMap = useCapture ? values[2 /* captureEventsMap */] : values[1 /* eventsMap */];
            return eventMap;
        };
        EventDispatcher.prototype.addEventListener = function (type, listener, thisObject, useCapture, priority) {
            this.$addListener(type, listener, thisObject, useCapture, priority);
        };
        EventDispatcher.prototype.once = function (type, listener, thisObject, useCapture, priority) {
            this.$addListener(type, listener, thisObject, useCapture, priority, true);
        };
        EventDispatcher.prototype.$addListener = function (type, listener, thisObject, useCapture, priority, dispatchOnce) {
            var values = this.$EventDispatcher;
            var eventMap = useCapture ? values[2 /* captureEventsMap */] : values[1 /* eventsMap */];
            var list = eventMap[type];
            if (!list) {
                list = eventMap[type] = [];
            }
            else if (values[3 /* notifyLevel */] !== 0) {
                eventMap[type] = list = list.concat();
            }
            this.$insertEventBin(list, type, listener, thisObject, useCapture, priority, dispatchOnce);
        };
        EventDispatcher.prototype.$insertEventBin = function (list, type, listener, thisObject, useCapture, priority, dispatchOnce) {
            priority = +priority | 0;
            var insertIndex = -1;
            var length = list.length;
            for (var i = 0; i < length; i++) {
                var bin = list[i];
                if (bin.listener == listener && bin.thisObject == thisObject && bin.target == this) {
                    return false;
                }
                if (insertIndex == -1 && bin.priority < priority) {
                    insertIndex = i;
                }
            }
            var eventBin = {
                type: type, listener: listener, thisObject: thisObject, priority: priority,
                target: this, useCapture: useCapture, dispatchOnce: !!dispatchOnce
            };
            if (insertIndex !== -1) {
                list.splice(insertIndex, 0, eventBin);
            }
            else {
                list.push(eventBin);
            }
            return true;
        };
        EventDispatcher.prototype.removeEventListener = function (type, listener, thisObject, useCapture) {
            var values = this.$EventDispatcher;
            var eventMap = useCapture ? values[2 /* captureEventsMap */] : values[1 /* eventsMap */];
            var list = eventMap[type];
            if (!list) {
                return;
            }
            if (values[3 /* notifyLevel */] !== 0) {
                eventMap[type] = list = list.concat();
            }
            this.$removeEventBin(list, listener, thisObject);
            if (list.length == 0) {
                eventMap[type] = null;
            }
        };
        EventDispatcher.prototype.$removeEventBin = function (list, listener, thisObject) {
            var length = list.length;
            for (var i = 0; i < length; i++) {
                var bin = list[i];
                if (bin.listener == listener && bin.thisObject == thisObject && bin.target == this) {
                    list.splice(i, 1);
                    return true;
                }
            }
            return false;
        };
        EventDispatcher.prototype.hasEventListener = function (type) {
            var values = this.$EventDispatcher;
            return !!(values[1 /* eventsMap */][type] || values[2 /* captureEventsMap */][type]);
        };
        EventDispatcher.prototype.willTrigger = function (type) {
            return this.hasEventListener(type);
        };
        EventDispatcher.prototype.dispatchEvent = function (event) {
            event.$currentTarget = this.$EventDispatcher[0 /* eventTarget */];
            event.$setTarget(event.$currentTarget);
            return this.$notifyListener(event, false);
        };
        EventDispatcher.prototype.$notifyListener = function (event, capturePhase) {
            var values = this.$EventDispatcher;
            var eventMap = capturePhase ? values[2 /* captureEventsMap */] : values[1 /* eventsMap */];
            var list = eventMap[event.$type];
            if (!list) {
                return true;
            }
            var length = list.length;
            if (length == 0) {
                return true;
            }
            var onceList = ONCE_EVENT_LIST;
            //做个标记，防止外部修改原始数组导致遍历错误。这里不直接调用list.concat()因为dispatch()方法调用通常比on()等方法频繁。
            values[3 /* notifyLevel */]++;
            for (var i = 0; i < length; i++) {
                var eventBin = list[i];
                eventBin.listener.call(eventBin.thisObject, event);
                if (eventBin.dispatchOnce) {
                    onceList.push(eventBin);
                }
                if (event.$isPropagationImmediateStopped) {
                    break;
                }
            }
            values[3 /* notifyLevel */]--;
            while (onceList.length) {
                var eventBin = onceList.pop();
                eventBin.target.removeEventListener(eventBin.type, eventBin.listener, eventBin.thisObject, eventBin.useCapture);
            }
            return !event.$isDefaultPrevented;
        };
        EventDispatcher.prototype.dispatchEventWith = function (type, bubbles, data, cancelable) {
            if (bubbles || this.hasEventListener(type)) {
                var event_2 = xgame.Event.create(xgame.Event, type, bubbles, cancelable);
                event_2.data = data;
                var result = this.dispatchEvent(event_2);
                xgame.Event.release(event_2);
                return result;
            }
            return true;
        };
        EventDispatcher = __decorate([
            xgame.impl(xgame.IEventDispatcher),
            __metadata("design:paramtypes", [Object])
        ], EventDispatcher);
        return EventDispatcher;
    }(xgame.XObject));
    xgame.EventDispatcher = EventDispatcher;
    __reflect(EventDispatcher.prototype, "xgame.EventDispatcher", ["xgame.IEventDispatcher"]);
})(xgame || (xgame = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-20
*************************************************/
/// <reference path="../core/XObject.ts" />
/// <reference path="../core/DisposableObject.ts" />
/// <reference path="../interfaces/IDisposable.ts" />
/// <reference path="./IEventManager.ts" />

(function (xgame) {
    var EventListener = (function (_super) {
        __extends(EventListener, _super);
        function EventListener(manager, moduleid, type, listener, thisObject, useCapture, priority) {
            var _this = _super.call(this) || this;
            _this.manager = manager;
            _this.moduleid = moduleid;
            _this.type = type;
            _this.listener = listener;
            _this.thisObject = thisObject;
            _this.useCapture = useCapture;
            _this.priority = priority;
            return _this;
        }
        EventListener.prototype.dispose = function () {
            this.manager.removeEventListener(this.moduleid, this.type, this.listener, this.thisObject, this.useCapture);
        };
        return EventListener;
    }(xgame.DisposableObject));
    xgame.EventListener = EventListener;
    __reflect(EventListener.prototype, "xgame.EventListener");
})(xgame || (xgame = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-19
*************************************************/
/// <reference path="../core/XObject.ts" />
/// <reference path="../utils/Singleton.ts" />
/// <reference path="./IEventManager.ts" />
/// <reference path="./EventDispatcher.ts" />
/// <reference path="./EventListener.ts" />

(function (xgame) {
    var GlobalModuleId = 9999;
    var EventManager = (function (_super) {
        __extends(EventManager, _super);
        function EventManager() {
            var _this = _super.call(this) || this;
            _this.moduleDispatchers = new Map();
            return _this;
        }
        EventManager.prototype.addEventListener = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var moduleId = GlobalModuleId;
            var type, listener, thisObject, useCapture, priority;
            if (typeof (args[1]) == "function") {
                type = args[0];
                listener = args[1];
                thisObject = args[2];
                useCapture = args[3];
                priority = args[4];
            }
            else {
                moduleId = args[0];
                type = args[1];
                listener = args[2];
                thisObject = args[3];
                useCapture = args[4];
                priority = args[5];
            }
            var dispatcher = this.getDispatcher(moduleId);
            dispatcher.addEventListener(type, listener, thisObject, useCapture, priority);
            return new xgame.EventListener(this, moduleId, type, listener, thisObject, useCapture, priority);
        };
        EventManager.prototype.once = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var moduleId = GlobalModuleId;
            var type, listener, thisObject, useCapture, priority;
            if (typeof (args[0]) == "string") {
                type = args[0];
                listener = args[1];
                thisObject = args[2];
                useCapture = args[3];
                priority = args[4];
            }
            else {
                moduleId = args[0];
                type = args[1];
                listener = args[2];
                thisObject = args[3];
                useCapture = args[4];
                priority = args[5];
            }
            if (!moduleId) {
                moduleId = GlobalModuleId;
            }
            var dispatcher = this.getDispatcher(moduleId);
            dispatcher.once(type, listener, thisObject, useCapture, priority);
            return new xgame.EventListener(this, moduleId, type, listener, thisObject, useCapture, priority);
        };
        EventManager.prototype.removeEventListener = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var moduleId = GlobalModuleId;
            var type, listener, thisObject, useCapture;
            if (typeof (args[0]) == "string") {
                type = args[0];
                listener = args[1];
                thisObject = args[2];
                useCapture = args[3];
            }
            else {
                moduleId = args[0];
                type = args[1];
                listener = args[2];
                thisObject = args[3];
                useCapture = args[4];
            }
            var dispatcher = this.getDispatcher(moduleId);
            dispatcher.removeEventListener(type, listener, thisObject, useCapture);
        };
        EventManager.prototype.hasEventListener = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var moduleId, type;
            if (typeof (args[0]) == "number") {
                moduleId = args[0];
                type = args[1];
            }
            else {
                moduleId = GlobalModuleId;
                type = args[0];
            }
            var dispatcher = this.getDispatcher(moduleId);
            return dispatcher.hasEventListener(type);
        };
        EventManager.prototype.dispatchEvent = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var moduleId, event, data;
            if (typeof (args[0]) == "number") {
                moduleId = args[0];
                event = args[1];
                data = args[2];
            }
            else {
                moduleId = GlobalModuleId;
                event = args[0];
                data = args[1];
            }
            var dispatcher = this.getDispatcher(moduleId);
            if (typeof (event) == "string") {
                return dispatcher.dispatchEvent(new xgame.Event(event, false, false, data));
            }
            else {
                return dispatcher.dispatchEvent(event);
            }
        };
        EventManager.prototype.getDispatcher = function (moduleId) {
            moduleId = moduleId ? moduleId : GlobalModuleId;
            if (this.moduleDispatchers.has(moduleId)) {
                return this.moduleDispatchers.get(moduleId);
            }
            var dispatcher = new xgame.EventDispatcher();
            this.moduleDispatchers.set(moduleId, dispatcher);
            return dispatcher;
        };
        EventManager = __decorate([
            xgame.impl(xgame.IEventManager),
            __metadata("design:paramtypes", [])
        ], EventManager);
        return EventManager;
    }(xgame.Singleton));
    xgame.EventManager = EventManager;
    __reflect(EventManager.prototype, "xgame.EventManager", ["xgame.IEventManager", "xgame.IXObject"]);
})(xgame || (xgame = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-20
*************************************************/
/// <reference path="../core/DisposableGroup.ts" />
/// <reference path="../event/EventManager.ts" />
/// <reference path="../event/Event.ts" />
/// <reference path="../event/EventListener.ts" />

(function (xgame) {
    xgame.DisposableGroup.prototype["addEventListener"] = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var self = this;
        var manager = xgame.EventManager.Instance();
        var listener = manager.addEventListener.apply(manager, args);
        self.register(listener);
    };
    xgame.DisposableGroup.prototype["once"] = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var self = this;
        var manager = xgame.EventManager.Instance();
        var listener = manager.addEventListener.apply(manager, args);
        self.register(listener);
    };
})(xgame || (xgame = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-18
*************************************************/
/// <reference path="../event/EventManager.ts" />
/// <reference path="../event/EventExtensions.ts" />

(function (xgame) {
    function event(eventName, moduleId, priority) {
        return function (target, key, descriptor) {
            var subject = target;
            var method = descriptor.value;
            var invoke = descriptor.value = function () {
                method.apply(this, arguments);
            };
            if (!subject.__eventview__) {
                subject.__eventview__ = true;
                subject.eventDisposableGroup = new xgame.DisposableGroup();
                subject.eventObserves = [];
                subject.addEventObserves = function () {
                    var self = this;
                    if (self.eventObserves && self.eventObserves.length) {
                        for (var _i = 0, _a = self.eventObserves; _i < _a.length; _i++) {
                            var o = _a[_i];
                            self.eventDisposableGroup.addEventListener(o.moduleId, o.eventName, o.callback, self, false, priority);
                        }
                    }
                };
                subject.removeEventObserves = function () {
                    var self = this;
                    if (self.eventObserves && self.eventObserves.length) {
                        self.eventObserves.length = 0;
                    }
                    if (self.eventDisposableGroup) {
                        self.eventDisposableGroup.dispose();
                    }
                };
            }
            var item = { eventName: eventName, moduleId: moduleId, callback: invoke, priority: priority };
            subject.eventObserves.push(item);
        };
    }
    xgame.event = event;
})(xgame || (xgame = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-18
*************************************************/
/// <reference path="../core/ServiceContainer.ts" />

(function (xgame) {
    function inject(identity, named) {
        return function (target, key, indexOrDescriptor) {
            if (indexOrDescriptor != undefined) {
                var index = void 0, descriptor = void 0;
                //方法参数注入
                if (typeof (indexOrDescriptor) == "number") {
                    index = indexOrDescriptor;
                    var attribute = new xgame.MethodParamAttribute(identity, key, indexOrDescriptor, named);
                    xgame.ServiceContainer.Instance().addAttributes(target, attribute);
                }
                else {
                    descriptor = indexOrDescriptor;
                }
            }
            else {
                //属性依赖注入
                var attribute = new xgame.PropertyAttribute(identity, key, named);
                xgame.ServiceContainer.Instance().addAttributes(target, attribute);
            }
        };
    }
    xgame.inject = inject;
})(xgame || (xgame = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-19
*************************************************/

(function (xgame) {
    function superConstructor(constructor, args) {
        var clazz = function () {
            return constructor.apply(this, args);
        };
        clazz.prototype = constructor.prototype;
        return new clazz();
    }
    xgame.superConstructor = superConstructor;
})(xgame || (xgame = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-19
*************************************************/
/// <reference path="../core/ServiceContainer.ts" />

(function (xgame) {
    function injectInstance(instance) {
        var type = typeof instance;
        if (!instance || (type != "object")) {
            throw new Error("对象依赖注入失败:" + instance);
        }
        var attributes = xgame.ServiceContainer.Instance().getAttributes(instance, xgame.IPropertyAttribute);
        if (attributes && attributes.length) {
            for (var _i = 0, attributes_2 = attributes; _i < attributes_2.length; _i++) {
                var attr = attributes_2[_i];
                if (xgame.ServiceContainer.Instance().isMapping(attr.identity)) {
                    instance[attr.key] = xgame.ServiceContainer.Instance().getService(attr.identity, attr.named);
                }
            }
        }
        return instance;
    }
    xgame.injectInstance = injectInstance;
})(xgame || (xgame = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-23
*************************************************/
/// <reference path="../core/ServiceContainer.ts" />
/// <reference path="../utils/superConstructor.ts" />
/// <reference path="../utils/injectInstance.ts" />

(function (xgame) {
    function injectable() {
        return function (target, key, descriptor) {
            if (key && descriptor) {
                var invoke_1 = descriptor.value;
                descriptor.value = function () {
                    var len = arguments.length;
                    var last = 0;
                    var attributes = xgame.ServiceContainer.Instance().getAttributes(target, xgame.IMethodParamAttribute);
                    if (attributes && attributes.length) {
                        attributes = attributes.filter(function (item) { return item.key == key; }, this);
                        for (var _i = 0, attributes_3 = attributes; _i < attributes_3.length; _i++) {
                            var attr = attributes_3[_i];
                            arguments[attr.index] = xgame.ServiceContainer.Instance().getService(attr.identity, attr.named);
                            last = attr.index;
                        }
                    }
                    if (len <= last) {
                        arguments.length = last + 1;
                    }
                    return invoke_1.apply(this, arguments);
                };
            }
            else {
                //依赖注入标识
                var attribute = new xgame.InjectableAttribute();
                xgame.ServiceContainer.Instance().addAttributes(target, attribute);
            }
        };
    }
    xgame.injectable = injectable;
})(xgame || (xgame = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-19
*************************************************/

(function (xgame) {
    var StateMachine = (function (_super) {
        __extends(StateMachine, _super);
        function StateMachine(context, initialStateType, initialState) {
            var _this = _super.call(this) || this;
            _this.elapsedTimeInState = 0;
            _this.$states = new Map();
            _this.$context = context;
            _this.addState(initialStateType, initialState);
            _this.$currentState = initialState;
            _this.$currentState.onEnter();
            return _this;
        }
        Object.defineProperty(StateMachine.prototype, "currentState", {
            get: function () {
                return this.$currentState;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 将状态添加到状态机
         * @param stateType
         * @param state
         */
        StateMachine.prototype.addState = function (stateType, state) {
            state.setMachineAndContext(this, this.$context);
            this.$states.set(stateType, state);
        };
        /**
         * 使用提供的增量时间为状态机计时
         * @param deltaTime
         */
        StateMachine.prototype.update = function (deltaTime) {
            this.elapsedTimeInState += deltaTime;
            this.$currentState.onPrepare();
            this.$currentState.onUpdate(deltaTime);
        };
        /**
         * 从机器获取特定状态，而不必对其进行更改。
         * @param type
         */
        StateMachine.prototype.getState = function (type) {
            if (!this.$states.has(type)) {
                console.error("\u72B6\u6001" + type + "\u4E0D\u5B58\u5728\u3002\u4F60\u662F\u4E0D\u662F\u5728\u8C03\u7528addState\u7684\u65F6\u5019\u5FD8\u8BB0\u6DFB\u52A0\u4E86?");
                return null;
            }
            return this.$states.get(type);
        };
        /**
         * 更改当前状态
         * @param newType
         */
        StateMachine.prototype.changeState = function (newType) {
            if (this.$currentState instanceof newType) {
                return this.$currentState;
            }
            if (this.currentState) {
                this.$currentState.onExit();
            }
            if (!this.$states.has(newType)) {
                console.error("\u72B6\u6001" + newType + "\u4E0D\u5B58\u5728\u3002\u4F60\u662F\u4E0D\u662F\u5728\u8C03\u7528addState\u7684\u65F6\u5019\u5FD8\u8BB0\u6DFB\u52A0\u4E86?");
                return;
            }
            this.elapsedTimeInState = 0;
            this.previousState = this.$currentState;
            this.$currentState = this.$states.get(newType);
            this.$currentState.onEnter();
            if (this.onStateChanged) {
                this.onStateChanged();
            }
            return this.$currentState;
        };
        return StateMachine;
    }(xgame.XObject));
    xgame.StateMachine = StateMachine;
    __reflect(StateMachine.prototype, "xgame.StateMachine");
})(xgame || (xgame = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-19
*************************************************/
/// <reference path="./StateMachine.ts" />

(function (xgame) {
    var State = (function (_super) {
        __extends(State, _super);
        function State() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        State.prototype.setMachineAndContext = function (machine, context) {
            this.$machine = machine;
            this.$context = context;
            this.onInitialize();
        };
        /**
         * 在设置machine和context之后直接调用，允许状态执行任何所需的设置
         *
         * @memberof State
         */
        State.prototype.onInitialize = function () { };
        /**
         * 当状态变为活动状态时调用
         *
         * @memberof State
         */
        State.prototype.onEnter = function () { };
        /**
         * 在更新之前调用，允许状态最后一次机会改变状态
         *
         * @memberof State
         */
        State.prototype.onPrepare = function () { };
        /**
         * 此状态不再是活动状态时调用
         *
         * @memberof State
         */
        State.prototype.onExit = function () { };
        return State;
    }(xgame.XObject));
    xgame.State = State;
    __reflect(State.prototype, "xgame.State");
})(xgame || (xgame = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-01-07
*************************************************/
/// <reference path="./List.ts" />

(function (xgame) {
    var Enumerable = (function () {
        function Enumerable() {
        }
        /**
         * 在指定范围内生成一个整数序列。
         */
        Enumerable.range = function (start, count) {
            var result = new xgame.List();
            while (count--) {
                result.add(start++);
            }
            return result;
        };
        /**
         * 生成包含一个重复值的序列。
         */
        Enumerable.repeat = function (element, count) {
            var result = new xgame.List();
            while (count--) {
                result.add(element);
            }
            return result;
        };
        return Enumerable;
    }());
    xgame.Enumerable = Enumerable;
    __reflect(Enumerable.prototype, "xgame.Enumerable");
})(xgame || (xgame = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-19
*************************************************/
/// <reference path="../core/XObject.ts" />

(function (xgame) {
    var MathVector = (function (_super) {
        __extends(MathVector, _super);
        function MathVector(x, y) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            var _this = _super.call(this) || this;
            _this.x = x;
            _this.y = y;
            return _this;
        }
        MathVector.prototype.copy = function () {
            return new MathVector(this.x, this.y);
        };
        MathVector.prototype.copyFrom = function (vector) {
            this.x = vector.x;
            this.y = vector.y;
        };
        MathVector.prototype.copyFromPoint = function (point) {
            this.x = point.x;
            this.y = point.y;
        };
        MathVector.prototype.setTo = function (x, y) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            this.x = x;
            this.y = y;
        };
        MathVector.prototype.rotate = function (angle) {
            var a = angle;
            var ca = Math.cos(a);
            var sa = Math.sin(a);
            var tx = this.x;
            var ty = this.y;
            this.x = tx * ca - ty * sa;
            this.y = tx * sa + ty * ca;
        };
        MathVector.prototype.scaleEquals = function (value) {
            this.x *= value;
            this.y *= value;
        };
        MathVector.prototype.scale = function (value, result) {
            if (result === void 0) { result = null; }
            if (result) {
                result.x = this.x * value;
                result.y = this.y * value;
                return result;
            }
            return new MathVector(this.x * value, this.y * value);
        };
        MathVector.prototype.normalize = function () {
            var l = length;
            this.x /= l;
            this.y /= l;
        };
        MathVector.prototype.plusEquals = function (vector) {
            this.x += vector.x;
            this.y += vector.y;
        };
        MathVector.prototype.plus = function (vector, result) {
            if (result === void 0) { result = null; }
            if (result) {
                result.x = this.x + vector.x;
                result.y = this.y + vector.y;
                return result;
            }
            return new MathVector(this.x + vector.x, this.y + vector.y);
        };
        MathVector.prototype.minusEquals = function (vector) {
            this.x -= vector.x;
            this.y -= vector.y;
        };
        MathVector.prototype.minus = function (vector, result) {
            if (result === void 0) { result = null; }
            if (result) {
                result.x = this.x - vector.x;
                result.y = this.y - vector.y;
                return result;
            }
            return new MathVector(this.x - vector.x, this.y - vector.y);
        };
        MathVector.prototype.dot = function (vector) {
            return (this.x * vector.x) + (this.y * vector.y);
        };
        Object.defineProperty(MathVector.prototype, "angle", {
            get: function () {
                return Math.atan2(this.y, this.x);
            },
            set: function (value) {
                var l = length;
                var tx = l * Math.cos(value);
                var ty = l * Math.sin(value);
                this.x = tx;
                this.y = ty;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MathVector.prototype, "length", {
            get: function () {
                return Math.sqrt((this.x * this.x) + (this.y * this.y));
            },
            set: function (value) {
                this.scaleEquals(value / length);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MathVector.prototype, "normal", {
            get: function () {
                return new MathVector(-this.y, this.x);
            },
            enumerable: true,
            configurable: true
        });
        MathVector.prototype.toString = function () {
            return "[" + this.x + ", " + this.y + "]";
        };
        return MathVector;
    }(xgame.XObject));
    xgame.MathVector = MathVector;
    __reflect(MathVector.prototype, "xgame.MathVector");
})(xgame || (xgame = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-19
*************************************************/
/// <reference path="../core/XObject.ts" />

(function (xgame) {
    var PI = Math.PI;
    var TwoPI = PI * 2;
    var DEG_TO_RAD = PI / 180;
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
    var Matrix = (function (_super) {
        __extends(Matrix, _super);
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
        function Matrix(a, b, c, d, tx, ty) {
            if (a === void 0) { a = 1; }
            if (b === void 0) { b = 0; }
            if (c === void 0) { c = 0; }
            if (d === void 0) { d = 1; }
            if (tx === void 0) { tx = 0; }
            if (ty === void 0) { ty = 0; }
            var _this = _super.call(this) || this;
            _this.a = a;
            _this.b = b;
            _this.c = c;
            _this.d = d;
            _this.tx = tx;
            _this.ty = ty;
            return _this;
        }
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
        Matrix.prototype.clone = function () {
            return new Matrix(this.a, this.b, this.c, this.d, this.tx, this.ty);
        };
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
        Matrix.prototype.concat = function (other) {
            var a = this.a * other.a;
            var b = 0.0;
            var c = 0.0;
            var d = this.d * other.d;
            var tx = this.tx * other.a + other.tx;
            var ty = this.ty * other.d + other.ty;
            if (this.b !== 0.0 || this.c !== 0.0 || other.b !== 0.0 || other.c !== 0.0) {
                a += this.b * other.c;
                d += this.c * other.b;
                b += this.a * other.b + this.b * other.d;
                c += this.c * other.a + this.d * other.c;
                tx += this.ty * other.c;
                ty += this.tx * other.b;
            }
            this.a = a;
            this.b = b;
            this.c = c;
            this.d = d;
            this.tx = tx;
            this.ty = ty;
        };
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
        Matrix.prototype.copyFrom = function (other) {
            this.a = other.a;
            this.b = other.b;
            this.c = other.c;
            this.d = other.d;
            this.tx = other.tx;
            this.ty = other.ty;
            return this;
        };
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
        Matrix.prototype.identity = function () {
            this.a = this.d = 1;
            this.b = this.c = this.tx = this.ty = 0;
        };
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
        Matrix.prototype.invert = function () {
            this.$invertInto(this);
        };
        /**
         * @private
         */
        Matrix.prototype.$invertInto = function (target) {
            var a = this.a;
            var b = this.b;
            var c = this.c;
            var d = this.d;
            var tx = this.tx;
            var ty = this.ty;
            if (b == 0 && c == 0) {
                target.b = target.c = 0;
                if (a == 0 || d == 0) {
                    target.a = target.d = target.tx = target.ty = 0;
                }
                else {
                    a = target.a = 1 / a;
                    d = target.d = 1 / d;
                    target.tx = -a * tx;
                    target.ty = -d * ty;
                }
                return;
            }
            var determinant = a * d - b * c;
            if (determinant == 0) {
                target.identity();
                return;
            }
            determinant = 1 / determinant;
            var k = target.a = d * determinant;
            b = target.b = -b * determinant;
            c = target.c = -c * determinant;
            d = target.d = a * determinant;
            target.tx = -(k * tx + c * ty);
            target.ty = -(b * tx + d * ty);
        };
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
        Matrix.prototype.rotate = function (angle) {
            angle = +angle;
            if (angle !== 0) {
                angle = angle / DEG_TO_RAD;
                var u = Math.cos(angle);
                var v = Math.sin(angle);
                var ta = this.a;
                var tb = this.b;
                var tc = this.c;
                var td = this.d;
                var ttx = this.tx;
                var tty = this.ty;
                this.a = ta * u - tb * v;
                this.b = ta * v + tb * u;
                this.c = tc * u - td * v;
                this.d = tc * v + td * u;
                this.tx = ttx * u - tty * v;
                this.ty = ttx * v + tty * u;
            }
        };
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
        Matrix.prototype.scale = function (sx, sy) {
            if (sx !== 1) {
                this.a *= sx;
                this.c *= sx;
                this.tx *= sx;
            }
            if (sy !== 1) {
                this.b *= sy;
                this.d *= sy;
                this.ty *= sy;
            }
        };
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
        Matrix.prototype.setTo = function (a, b, c, d, tx, ty) {
            this.a = a;
            this.b = b;
            this.c = c;
            this.d = d;
            this.tx = tx;
            this.ty = ty;
            return this;
        };
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
        Matrix.prototype.transformPoint = function (pointX, pointY, resultPoint) {
            var x = this.a * pointX + this.c * pointY + this.tx;
            var y = this.b * pointX + this.d * pointY + this.ty;
            if (resultPoint) {
                resultPoint.setTo(x, y);
                return resultPoint;
            }
            return new xgame.Point(x, y);
        };
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
        Matrix.prototype.translate = function (dx, dy) {
            this.tx += dx;
            this.ty += dy;
        };
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
        Matrix.prototype.equals = function (other) {
            return this.a == other.a && this.b == other.b &&
                this.c == other.c && this.d == other.d &&
                this.tx == other.tx && this.ty == other.ty;
        };
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
        Matrix.prototype.prepend = function (a, b, c, d, tx, ty) {
            var tx1 = this.tx;
            if (a != 1 || b != 0 || c != 0 || d != 1) {
                var a1 = this.a;
                var c1 = this.c;
                this.a = a1 * a + this.b * c;
                this.b = a1 * b + this.b * d;
                this.c = c1 * a + this.d * c;
                this.d = c1 * b + this.d * d;
            }
            this.tx = tx1 * a + this.ty * c + tx;
            this.ty = tx1 * b + this.ty * d + ty;
            return this;
        };
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
        Matrix.prototype.append = function (a, b, c, d, tx, ty) {
            var a1 = this.a;
            var b1 = this.b;
            var c1 = this.c;
            var d1 = this.d;
            if (a != 1 || b != 0 || c != 0 || d != 1) {
                this.a = a * a1 + b * c1;
                this.b = a * b1 + b * d1;
                this.c = c * a1 + d * c1;
                this.d = c * b1 + d * d1;
            }
            this.tx = tx * a1 + ty * c1 + this.tx;
            this.ty = tx * b1 + ty * d1 + this.ty;
            return this;
        };
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
        Matrix.prototype.deltaTransformPoint = function (point) {
            var self = this;
            var x = self.a * point.x + self.c * point.y;
            var y = self.b * point.x + self.d * point.y;
            return new xgame.Point(x, y);
        };
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
        Matrix.prototype.toString = function () {
            return "(a=" + this.a + ", b=" + this.b + ", c=" + this.c + ", d=" + this.d + ", tx=" + this.tx + ", ty=" + this.ty + ")";
        };
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
        Matrix.prototype.createBox = function (scaleX, scaleY, rotation, tx, ty) {
            if (rotation === void 0) { rotation = 0; }
            if (tx === void 0) { tx = 0; }
            if (ty === void 0) { ty = 0; }
            var self = this;
            if (rotation !== 0) {
                rotation = rotation / DEG_TO_RAD;
                var u = Math.cos(rotation);
                var v = Math.sin(rotation);
                self.a = u * scaleX;
                self.b = v * scaleY;
                self.c = -v * scaleX;
                self.d = u * scaleY;
            }
            else {
                self.a = scaleX;
                self.b = 0;
                self.c = 0;
                self.d = scaleY;
            }
            self.tx = tx;
            self.ty = ty;
        };
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
        Matrix.prototype.createGradientBox = function (width, height, rotation, tx, ty) {
            if (rotation === void 0) { rotation = 0; }
            if (tx === void 0) { tx = 0; }
            if (ty === void 0) { ty = 0; }
            this.createBox(width / 1638.4, height / 1638.4, rotation, tx + width / 2, ty + height / 2);
        };
        /**
         * @private
         */
        Matrix.prototype.$transformBounds = function (bounds) {
            var a = this.a;
            var b = this.b;
            var c = this.c;
            var d = this.d;
            var tx = this.tx;
            var ty = this.ty;
            var x = bounds.x;
            var y = bounds.y;
            var xMax = x + bounds.width;
            var yMax = y + bounds.height;
            var x0 = a * x + c * y + tx;
            var y0 = b * x + d * y + ty;
            var x1 = a * xMax + c * y + tx;
            var y1 = b * xMax + d * y + ty;
            var x2 = a * xMax + c * yMax + tx;
            var y2 = b * xMax + d * yMax + ty;
            var x3 = a * x + c * yMax + tx;
            var y3 = b * x + d * yMax + ty;
            var tmp = 0;
            if (x0 > x1) {
                tmp = x0;
                x0 = x1;
                x1 = tmp;
            }
            if (x2 > x3) {
                tmp = x2;
                x2 = x3;
                x3 = tmp;
            }
            bounds.x = Math.floor(x0 < x2 ? x0 : x2);
            bounds.width = Math.ceil((x1 > x3 ? x1 : x3) - bounds.x);
            if (y0 > y1) {
                tmp = y0;
                y0 = y1;
                y1 = tmp;
            }
            if (y2 > y3) {
                tmp = y2;
                y2 = y3;
                y3 = tmp;
            }
            bounds.y = Math.floor(y0 < y2 ? y0 : y2);
            bounds.height = Math.ceil((y1 > y3 ? y1 : y3) - bounds.y);
        };
        /**
         * @private
         */
        Matrix.prototype.getDeterminant = function () {
            return this.a * this.d - this.b * this.c;
        };
        /**
         * @private
         */
        Matrix.prototype.$getScaleX = function () {
            var m = this;
            if (m.b == 0) {
                return m.a;
            }
            var result = Math.sqrt(m.a * m.a + m.b * m.b);
            return this.getDeterminant() < 0 ? -result : result;
        };
        /**
         * @private
         */
        Matrix.prototype.$getScaleY = function () {
            var m = this;
            if (m.c == 0) {
                return m.d;
            }
            var result = Math.sqrt(m.c * m.c + m.d * m.d);
            return this.getDeterminant() < 0 ? -result : result;
        };
        /**
         * @private
         */
        Matrix.prototype.$getSkewX = function () {
            if (this.d < 0) {
                return Math.atan2(this.d, this.c) + (PI / 2);
            }
            else {
                return Math.atan2(this.d, this.c) - (PI / 2);
            }
        };
        /**
         * @private
         */
        Matrix.prototype.$getSkewY = function () {
            if (this.a < 0) {
                return Math.atan2(this.b, this.a) - PI;
            }
            else {
                return Math.atan2(this.b, this.a);
            }
        };
        /**
         * @private
         */
        Matrix.prototype.$updateScaleAndRotation = function (scaleX, scaleY, skewX, skewY) {
            if ((skewX == 0 || skewX == TwoPI) && (skewY == 0 || skewY == TwoPI)) {
                this.a = scaleX;
                this.b = this.c = 0;
                this.d = scaleY;
                return;
            }
            skewX = skewX / DEG_TO_RAD;
            skewY = skewY / DEG_TO_RAD;
            var u = Math.cos(skewX);
            var v = Math.sin(skewX);
            if (skewX == skewY) {
                this.a = u * scaleX;
                this.b = v * scaleX;
            }
            else {
                this.a = Math.cos(skewY) * scaleX;
                this.b = Math.sin(skewY) * scaleX;
            }
            this.c = -v * scaleY;
            this.d = u * scaleY;
        };
        /**
         * @private
         * target = other * this
         */
        Matrix.prototype.$preMultiplyInto = function (other, target) {
            var a = other.a * this.a;
            var b = 0.0;
            var c = 0.0;
            var d = other.d * this.d;
            var tx = other.tx * this.a + this.tx;
            var ty = other.ty * this.d + this.ty;
            if (other.b !== 0.0 || other.c !== 0.0 || this.b !== 0.0 || this.c !== 0.0) {
                a += other.b * this.c;
                d += other.c * this.b;
                b += other.a * this.b + other.b * this.d;
                c += other.c * this.a + other.d * this.c;
                tx += other.ty * this.c;
                ty += other.tx * this.b;
            }
            target.a = a;
            target.b = b;
            target.c = c;
            target.d = d;
            target.tx = tx;
            target.ty = ty;
        };
        return Matrix;
    }(xgame.XObject));
    xgame.Matrix = Matrix;
    __reflect(Matrix.prototype, "xgame.Matrix");
})(xgame || (xgame = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-19
*************************************************/
/// <reference path="../core/XObject.ts" />

(function (xgame) {
    var DEG_TO_RAD = Math.PI / 180;
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
    var Point = (function (_super) {
        __extends(Point, _super);
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
        function Point(x, y) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            var _this = _super.call(this) || this;
            _this.x = x;
            _this.y = y;
            return _this;
        }
        Object.defineProperty(Point.prototype, "length", {
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
            get: function () {
                return Math.sqrt(this.x * this.x + this.y * this.y);
            },
            enumerable: true,
            configurable: true
        });
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
        Point.prototype.setTo = function (x, y) {
            this.x = x;
            this.y = y;
            return this;
        };
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
        Point.prototype.clone = function () {
            return new Point(this.x, this.y);
        };
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
        Point.prototype.equals = function (toCompare) {
            return this.x == toCompare.x && this.y == toCompare.y;
        };
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
        Point.distance = function (p1, p2) {
            return Math.sqrt((p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y));
        };
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
        Point.prototype.copyFrom = function (sourcePoint) {
            this.x = sourcePoint.x;
            this.y = sourcePoint.y;
        };
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
        Point.prototype.add = function (v) {
            return new Point(this.x + v.x, this.y + v.y);
        };
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
        Point.interpolate = function (pt1, pt2, f) {
            var f1 = 1 - f;
            return new Point(pt1.x * f + pt2.x * f1, pt1.y * f + pt2.y * f1);
        };
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
        Point.prototype.normalize = function (thickness) {
            if (this.x != 0 || this.y != 0) {
                var relativeThickness = thickness / this.length;
                this.x *= relativeThickness;
                this.y *= relativeThickness;
            }
        };
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
        Point.prototype.offset = function (dx, dy) {
            this.x += dx;
            this.y += dy;
        };
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
        Point.polar = function (len, angle) {
            return new Point(len * Math.cos(angle / DEG_TO_RAD), len * Math.sin(angle / DEG_TO_RAD));
        };
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
        Point.prototype.subtract = function (v) {
            return new Point(this.x - v.x, this.y - v.y);
        };
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
        Point.prototype.toString = function () {
            return "(x=" + this.x + ", y=" + this.y + ")";
        };
        return Point;
    }(xgame.XObject));
    xgame.Point = Point;
    __reflect(Point.prototype, "xgame.Point");
})(xgame || (xgame = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-19
*************************************************/
/// <reference path="../core/XObject.ts" />

(function (xgame) {
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
    var Rectangle = (function (_super) {
        __extends(Rectangle, _super);
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
        function Rectangle(x, y, width, height) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (width === void 0) { width = 0; }
            if (height === void 0) { height = 0; }
            var _this = _super.call(this) || this;
            _this.x = x;
            _this.y = y;
            _this.width = width;
            _this.height = height;
            return _this;
        }
        Object.defineProperty(Rectangle.prototype, "right", {
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
            get: function () {
                return this.x + this.width;
            },
            set: function (value) {
                this.width = value - this.x;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Rectangle.prototype, "bottom", {
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
            get: function () {
                return this.y + this.height;
            },
            set: function (value) {
                this.height = value - this.y;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Rectangle.prototype, "left", {
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
            get: function () {
                return this.x;
            },
            set: function (value) {
                this.width += this.x - value;
                this.x = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Rectangle.prototype, "top", {
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
            get: function () {
                return this.y;
            },
            set: function (value) {
                this.height += this.y - value;
                this.y = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Rectangle.prototype, "topLeft", {
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
            get: function () {
                return new xgame.Point(this.left, this.top);
            },
            set: function (value) {
                this.top = value.y;
                this.left = value.x;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Rectangle.prototype, "bottomRight", {
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
            get: function () {
                return new xgame.Point(this.right, this.bottom);
            },
            set: function (value) {
                this.bottom = value.y;
                this.right = value.x;
            },
            enumerable: true,
            configurable: true
        });
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
        Rectangle.prototype.copyFrom = function (sourceRect) {
            this.x = sourceRect.x;
            this.y = sourceRect.y;
            this.width = sourceRect.width;
            this.height = sourceRect.height;
            return this;
        };
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
        Rectangle.prototype.setTo = function (x, y, width, height) {
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
            return this;
        };
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
        Rectangle.prototype.contains = function (x, y) {
            return this.x <= x &&
                this.x + this.width >= x &&
                this.y <= y &&
                this.y + this.height >= y;
        };
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
        Rectangle.prototype.intersection = function (toIntersect) {
            return this.clone().$intersectInPlace(toIntersect);
        };
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
        Rectangle.prototype.inflate = function (dx, dy) {
            this.x -= dx;
            this.width += 2 * dx;
            this.y -= dy;
            this.height += 2 * dy;
        };
        /**
         * @private
         */
        Rectangle.prototype.$intersectInPlace = function (clipRect) {
            var x0 = this.x;
            var y0 = this.y;
            var x1 = clipRect.x;
            var y1 = clipRect.y;
            var l = Math.max(x0, x1);
            var r = Math.min(x0 + this.width, x1 + clipRect.width);
            if (l <= r) {
                var t = Math.max(y0, y1);
                var b = Math.min(y0 + this.height, y1 + clipRect.height);
                if (t <= b) {
                    this.setTo(l, t, r - l, b - t);
                    return this;
                }
            }
            this.setEmpty();
            return this;
        };
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
        Rectangle.prototype.intersects = function (toIntersect) {
            return Math.max(this.x, toIntersect.x) <= Math.min(this.right, toIntersect.right)
                && Math.max(this.y, toIntersect.y) <= Math.min(this.bottom, toIntersect.bottom);
        };
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
        Rectangle.prototype.isEmpty = function () {
            return this.width <= 0 || this.height <= 0;
        };
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
        Rectangle.prototype.setEmpty = function () {
            this.x = 0;
            this.y = 0;
            this.width = 0;
            this.height = 0;
        };
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
        Rectangle.prototype.clone = function () {
            return new Rectangle(this.x, this.y, this.width, this.height);
        };
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
        Rectangle.prototype.containsPoint = function (point) {
            if (this.x <= point.x
                && this.x + this.width >= point.x
                && this.y <= point.y
                && this.y + this.height >= point.y) {
                return true;
            }
            return false;
        };
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
        Rectangle.prototype.containsRect = function (rect) {
            var r1 = rect.x + rect.width;
            var b1 = rect.y + rect.height;
            var r2 = this.x + this.width;
            var b2 = this.y + this.height;
            return (rect.x >= this.x) && (rect.x < r2) && (rect.y >= this.y) && (rect.y < b2) && (r1 > this.x) && (r1 <= r2) && (b1 > this.y) && (b1 <= b2);
        };
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
        Rectangle.prototype.equals = function (toCompare) {
            if (this === toCompare) {
                return true;
            }
            return this.x === toCompare.x && this.y === toCompare.y
                && this.width === toCompare.width && this.height === toCompare.height;
        };
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
        Rectangle.prototype.inflatePoint = function (point) {
            this.inflate(point.x, point.y);
        };
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
        Rectangle.prototype.offset = function (dx, dy) {
            this.x += dx;
            this.y += dy;
        };
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
        Rectangle.prototype.offsetPoint = function (point) {
            this.offset(point.x, point.y);
        };
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
        Rectangle.prototype.toString = function () {
            return "(x=" + this.x + ", y=" + this.y + ", width=" + this.width + ", height=" + this.height + ")";
        };
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
        Rectangle.prototype.union = function (toUnion) {
            var result = this.clone();
            if (toUnion.isEmpty()) {
                return result;
            }
            if (result.isEmpty()) {
                result.copyFrom(toUnion);
                return result;
            }
            var l = Math.min(result.x, toUnion.x);
            var t = Math.min(result.y, toUnion.y);
            result.setTo(l, t, Math.max(result.right, toUnion.right) - l, Math.max(result.bottom, toUnion.bottom) - t);
            return result;
        };
        /**
         * @private
         */
        Rectangle.prototype.$getBaseWidth = function (angle) {
            var u = Math.abs(Math.cos(angle));
            var v = Math.abs(Math.sin(angle));
            return u * this.width + v * this.height;
        };
        /**
         * @private
         */
        Rectangle.prototype.$getBaseHeight = function (angle) {
            var u = Math.abs(Math.cos(angle));
            var v = Math.abs(Math.sin(angle));
            return v * this.width + u * this.height;
        };
        return Rectangle;
    }(xgame.XObject));
    xgame.Rectangle = Rectangle;
    __reflect(Rectangle.prototype, "xgame.Rectangle");
})(xgame || (xgame = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2020-09-15
*************************************************/

(function (xgame) {
    /**
     * The base class for all the signal classes.
     */
    var SignalBase = (function (_super) {
        __extends(SignalBase, _super);
        function SignalBase() {
            var _this = _super.call(this) || this;
            _this._numListeners = 0;
            _this.sortEnable = false;
            _this.invalidateSort = false;
            _this.nodes = new Map();
            _this.listenerNodePool = new xgame.ListenerNodePool();
            return _this;
        }
        Object.defineProperty(SignalBase.prototype, "numListeners", {
            get: function () {
                return this._numListeners;
            },
            enumerable: true,
            configurable: true
        });
        SignalBase.prototype.has = function (listener) {
            return this.nodes.has(listener);
        };
        SignalBase.prototype.add = function (listener, thisObject, priority) {
            if (thisObject === void 0) { thisObject = null; }
            if (priority === void 0) { priority = 0; }
            if (this.nodes.has(listener)) {
                return;
            }
            var node = this.listenerNodePool.get();
            node.listener = listener;
            node.priority = priority;
            node.thisObject = thisObject;
            this.nodes.set(listener, node);
            this.addNode(node);
        };
        SignalBase.prototype.addOnce = function (listener, thisObject, priority) {
            if (thisObject === void 0) { thisObject = null; }
            if (priority === void 0) { priority = 0; }
            if (this.nodes.has(listener)) {
                return;
            }
            var node = this.listenerNodePool.get();
            node.listener = listener;
            node.priority = priority;
            node.thisObject = thisObject;
            node.once = true;
            this.nodes.set(listener, node);
            this.addNode(node);
        };
        SignalBase.prototype.remove = function (listener) {
            var node = this.nodes.get(listener);
            if (node) {
                if (this.sortEnable) {
                    this.invalidateSort = true;
                }
                if (this.head === node) {
                    this.head = this.head.next;
                }
                if (this.tail === node) {
                    this.tail = this.tail.previous;
                }
                if (this.toAddHead === node) {
                    this.toAddHead = this.toAddHead.next;
                }
                if (this.toAddTail === node) {
                    this.toAddTail = this.toAddTail.previous;
                }
                if (node.previous) {
                    node.previous.next = node.next;
                }
                if (node.next) {
                    node.next.previous = node.previous;
                }
                this.nodes.delete(listener);
                if (this.dispatching) {
                    this.listenerNodePool.cache(node);
                }
                else {
                    this.listenerNodePool.dispose(node);
                }
                this._numListeners--;
            }
            if (this.numListeners == 0) {
                this.sortEnable = false;
                this.invalidateSort = false;
            }
        };
        SignalBase.prototype.removeAll = function () {
            while (this.head) {
                var node = this.head;
                this.head = this.head.next;
                this.nodes.delete(node.listener);
                this.listenerNodePool.dispose(node);
            }
            this.tail = null;
            this.toAddHead = null;
            this.toAddTail = null;
            this._numListeners = 0;
            this.invalidateSort = false;
            this.sortEnable = false;
        };
        SignalBase.prototype.startDispatch = function () {
            this.dispatching = true;
            if (this.sortEnable && this.invalidateSort) {
                this.sorts(this.head);
            }
        };
        SignalBase.prototype.endDispatch = function () {
            this.dispatching = false;
            if (this.toAddHead) {
                if (!this.head) {
                    this.head = this.toAddHead;
                    this.tail = this.toAddTail;
                }
                else {
                    this.tail.next = this.toAddHead;
                    this.toAddHead.previous = this.tail;
                    this.tail = this.toAddTail;
                }
                this.toAddHead = null;
                this.toAddTail = null;
            }
            this.listenerNodePool.releaseCache();
        };
        SignalBase.prototype.addNode = function (node) {
            if (node.priority) {
                this.sortEnable = true;
            }
            if (this.sortEnable) {
                this.invalidateSort = true;
            }
            if (this.dispatching) {
                if (!this.toAddHead) {
                    this.toAddHead = this.toAddTail = node;
                }
                else {
                    this.toAddTail.next = node;
                    node.previous = this.toAddTail;
                    this.toAddTail = node;
                }
            }
            else {
                if (!this.head) {
                    this.head = this.tail = node;
                }
                else {
                    this.tail.next = node;
                    node.previous = this.tail;
                    this.tail = node;
                }
            }
            this._numListeners++;
        };
        SignalBase.prototype.sorts = function (head) {
            var p;
            var q;
            p = head;
            while (p) {
                for (q = p.next; q != null; q = q.next) {
                    if (p.priority < q.priority) {
                        p.switchNode(q);
                        this.nodes.set(p.listener, p);
                        this.nodes.set(q.listener, q);
                    }
                }
                p = p.next;
            }
        };
        return SignalBase;
    }(xgame.XObject));
    xgame.SignalBase = SignalBase;
    __reflect(SignalBase.prototype, "xgame.SignalBase");
})(xgame || (xgame = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2020-09-15
*************************************************/
/// <reference path="SignalBase.ts"/>

(function (xgame) {
    /**
     * Provides a fast signal for use where one parameter is dispatched with the signal.
     */
    var Signal1 = (function (_super) {
        __extends(Signal1, _super);
        function Signal1() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Signal1.prototype.dispatch = function (o) {
            this.startDispatch();
            var node;
            for (node = this.head; node; node = node.next) {
                var cancel = node.execute(o);
                if (node.once) {
                    this.remove(node.listener);
                }
                if (cancel) {
                    break;
                }
            }
            this.endDispatch();
        };
        Signal1.prototype.add = function (listener, thisObject, priority) {
            if (thisObject === void 0) { thisObject = null; }
            if (priority === void 0) { priority = 0; }
            _super.prototype.add.call(this, listener, thisObject, priority);
        };
        Signal1.prototype.addOnce = function (listener, thisObject, priority) {
            if (thisObject === void 0) { thisObject = null; }
            if (priority === void 0) { priority = 0; }
            _super.prototype.addOnce.call(this, listener, thisObject, priority);
        };
        return Signal1;
    }(xgame.SignalBase));
    xgame.Signal1 = Signal1;
    __reflect(Signal1.prototype, "xgame.Signal1");
})(xgame || (xgame = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-19
*************************************************/
/// <reference path="../interfaces/IDisposable.ts" />
/// <reference path="../signals/Signal1.ts" />
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-19
*************************************************/

(function (xgame) {
    xgame.IPlayableManager = Symbol.for("IPlayableManager");
})(xgame || (xgame = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-19
*************************************************/

(function (xgame) {
    xgame.IPlayableManagerInternal = Symbol.for("IPlayableManagerInternal");
})(xgame || (xgame = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-19
*************************************************/
/// <reference path="./IPlayable.ts" />
/// <reference path="./IPlayableManager.ts" />
/// <reference path="./IPlayableManagerInternal.ts" />

(function (xgame) {
    var PlayableManager = (function (_super) {
        __extends(PlayableManager, _super);
        function PlayableManager() {
            var _this = _super.call(this) || this;
            _this.playables = new xgame.Dictionary();
            _this.isUpdating = false;
            return _this;
        }
        PlayableManager.prototype.initialize = function () {
            xgame.SchedulerManager.Instance().registerUpdate(this.advanceTime, this);
        };
        PlayableManager.prototype.advanceTime = function () {
            var _this = this;
            if (this.isUpdating) {
                return;
            }
            this.isUpdating = true;
            xgame.__lockobject__(this).simple(function () {
                var time = xgame.Time.Instance().deltaTime;
                _this.playables.forValues(function (playable) {
                    playable.advanceTime(time);
                }, _this);
                _this.isUpdating = false;
            }, this);
        };
        Object.defineProperty(PlayableManager.prototype, "count", {
            get: function () {
                return this.playables.length;
            },
            enumerable: true,
            configurable: true
        });
        PlayableManager.prototype.addPlayable = function (playable) {
            var _this = this;
            if (this.playables.containsKey(playable.hashCode)) {
                return;
            }
            xgame.__lockobject__(this).simple(function () {
                playable.onComplete.addOnce(_this.onPlayComplete, _this);
                _this.playables.add(playable.hashCode, playable);
            }, this);
        };
        PlayableManager.prototype.onPlayComplete = function (playable) {
            this.removePlayable(playable);
        };
        PlayableManager.prototype.removePlayable = function (value) {
            var _this = this;
            var guid, playable;
            if (typeof (value) == "number") {
                guid = value;
                playable = this.playables.get(guid);
            }
            else {
                playable = value;
            }
            if (!playable) {
                return;
            }
            xgame.__lockobject__(this).simple(function () {
                playable.onComplete.removeAll();
                playable.stop();
                _this.playables.remove(playable.hashCode);
                playable.dispose();
            }, this);
        };
        PlayableManager = __decorate([
            xgame.impl(xgame.IPlayableManager, xgame.IPlayableManagerInternal),
            __metadata("design:paramtypes", [])
        ], PlayableManager);
        return PlayableManager;
    }(xgame.Singleton));
    xgame.PlayableManager = PlayableManager;
    __reflect(PlayableManager.prototype, "xgame.PlayableManager", ["xgame.IPlayableManager", "xgame.IPlayableManagerInternal"]);
})(xgame || (xgame = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-19
*************************************************/

(function (xgame) {
    xgame.IPoolable = Symbol.for("IPoolable");
})(xgame || (xgame = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-19
*************************************************/

(function (xgame) {
    xgame.IPoolManager = Symbol.for("IPoolManager");
})(xgame || (xgame = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-19
*************************************************/
/// <reference path="../core/XObject.ts" />
/// <reference path="../utils/Dictionary.ts" />

(function (xgame) {
    var PoolGroup = (function (_super) {
        __extends(PoolGroup, _super);
        function PoolGroup(group) {
            var _this = _super.call(this) || this;
            _this.$pools = new xgame.Dictionary();
            _this.$group = group;
            return _this;
        }
        Object.defineProperty(PoolGroup.prototype, "group", {
            get: function () {
                return this.$group;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PoolGroup.prototype, "pools", {
            get: function () {
                return this.$pools;
            },
            enumerable: true,
            configurable: true
        });
        PoolGroup.prototype.getPool = function (key, ClassType, initCount) {
            if (initCount === void 0) { initCount = 0; }
            if (this.pools.containsKey(key)) {
                return this.pools.get(key);
            }
            var pool = new xgame.PoolObject(ClassType, initCount);
            pool.group = this.group;
            pool.key = key;
            this.pools.add(key, pool);
            return pool;
        };
        PoolGroup.prototype.fetch = function (key, ClassType, newInstance, thisObject) {
            var args = [];
            for (var _i = 4; _i < arguments.length; _i++) {
                args[_i - 4] = arguments[_i];
            }
            var pool = this.getPool(key, ClassType);
            return pool.fetch.apply(pool, [newInstance, thisObject].concat(args));
        };
        PoolGroup.prototype.recycle = function (key, ClassType, o) {
            var pool = this.getPool(key, ClassType);
            pool.recycle(o);
        };
        PoolGroup.prototype.release = function (key, ClassType, loop, thisObject) {
            var pool = this.getPool(key, ClassType);
            pool.release(loop, thisObject);
        };
        PoolGroup.prototype.releases = function (loop, thisObject) {
            this.pools.forValues(function (pool) {
                pool.release(loop, thisObject);
            }, this);
        };
        PoolGroup.prototype.forEach = function (loop, thisObject) {
            this.pools.forValues(function (pool) {
                loop.apply(thisObject, [pool]);
            }, this);
        };
        return PoolGroup;
    }(xgame.XObject));
    xgame.PoolGroup = PoolGroup;
    __reflect(PoolGroup.prototype, "xgame.PoolGroup");
})(xgame || (xgame = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-19
*************************************************/
/// <reference path="../utils/Singleton.ts" />

(function (xgame) {
    var PoolManager = (function (_super) {
        __extends(PoolManager, _super);
        function PoolManager() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.object_pools = new xgame.Dictionary();
            _this.group_pools = new xgame.Dictionary();
            return _this;
        }
        PoolManager.prototype.debug = function (includeGroups) {
            var _this = this;
            this.object_pools.forValues(function (v) {
                console.log(v.toString());
            }, this);
            if (includeGroups) {
                this.group_pools.forValues(function (v) {
                    v.pools.forValues(function (vv) {
                        console.log(vv.toString());
                    }, _this);
                }, this);
            }
        };
        PoolManager.prototype.getPool = function (Clazz, initCount) {
            if (initCount === void 0) { initCount = 0; }
            if (this.object_pools.containsKey(Clazz)) {
                return this.object_pools.get(Clazz);
            }
            var pool = new xgame.PoolObject(Clazz, initCount);
            this.object_pools.add(Clazz, pool);
            return pool;
        };
        PoolManager.prototype.fetch = function (Clazz, newInstance, thisObject) {
            var args = [];
            for (var _i = 3; _i < arguments.length; _i++) {
                args[_i - 3] = arguments[_i];
            }
            var pool = this.getPool(Clazz);
            return pool.fetch.apply(pool, [newInstance, thisObject].concat(args));
        };
        PoolManager.prototype.recycle = function (Clazz, o) {
            var pool = this.getPool(Clazz);
            pool.recycle(o);
        };
        PoolManager.prototype.release = function (Clazz, loop, thisObject) {
            var pool = this.getPool(Clazz);
            pool.release(loop, thisObject);
        };
        PoolManager.prototype.getPoolGroup = function (group) {
            var poolGroup = this.group_pools.get(group);
            if (poolGroup == null) {
                poolGroup = new xgame.PoolGroup(group);
                this.group_pools.add(group, poolGroup);
            }
            else {
                poolGroup = this.group_pools.get(group);
            }
            return poolGroup;
        };
        PoolManager = __decorate([
            xgame.impl(xgame.IPoolManager)
        ], PoolManager);
        return PoolManager;
    }(xgame.Singleton));
    xgame.PoolManager = PoolManager;
    __reflect(PoolManager.prototype, "xgame.PoolManager", ["xgame.IPoolManager"]);
})(xgame || (xgame = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-19
*************************************************/
/// <reference path="../core/XObject.ts" />
/// <reference path="../utils/isImplementOf.ts" />

(function (xgame) {
    function get_timestamp() {
        return Math.floor(new Date().valueOf() / 1000);
    }
    var PoolObject = (function (_super) {
        __extends(PoolObject, _super);
        function PoolObject(Clazz, count_init) {
            if (count_init === void 0) { count_init = 0; }
            var _this = _super.call(this) || this;
            _this.instances = [];
            _this.$timestamp = 0;
            _this.$create = 0;
            _this.group = "";
            _this.key = "";
            _this.$timestamp = get_timestamp();
            _this.Clazz = Clazz;
            if (count_init > 0) {
                for (var i = 0; i < count_init; i++) {
                    _this.instances.push(new Clazz());
                }
            }
            return _this;
        }
        Object.defineProperty(PoolObject.prototype, "timestamp", {
            get: function () {
                return this.$timestamp;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PoolObject.prototype, "create", {
            get: function () {
                return this.$create;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PoolObject.prototype, "count", {
            get: function () {
                return this.instances.length;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PoolObject.prototype, "expired", {
            get: function () {
                if (this.fulled && (get_timestamp() - this.timestamp >= 30)) {
                    return true;
                }
                return false;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PoolObject.prototype, "fulled", {
            get: function () {
                return this.create > 0 && this.create == this.count;
            },
            enumerable: true,
            configurable: true
        });
        PoolObject.prototype.toString = function () {
            var info = { create: this.create, count: this.count, group: this.group, key: this.key, ClassType: xgame.getQualifiedClassName(this.Clazz) };
            return JSON.stringify(info);
        };
        PoolObject.prototype.fetch = function (newInstance, thisObject) {
            var args = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                args[_i - 2] = arguments[_i];
            }
            if (this.count > 0) {
                return this.instances.shift();
            }
            var instance;
            if (newInstance) {
                instance = newInstance.apply(thisObject, args);
            }
            else {
                instance = new ((_a = this.Clazz).bind.apply(_a, [void 0].concat(args)))();
            }
            instance.fromPoolHashCode = this.hashCode;
            this.$create++;
            this.$timestamp = get_timestamp();
            return instance;
            var _a;
        };
        PoolObject.prototype.ping = function (instance) {
            instance.fromPoolHashCode = this.hashCode;
            this.$create++;
            this.$timestamp = get_timestamp();
        };
        PoolObject.prototype.recycle = function (instance) {
            if (instance.fromPoolHashCode == this.hashCode) {
                if (this.instances.indexOf(instance) == -1) {
                    this.instances.push(instance);
                    if (instance.dispose) {
                        instance.dispose();
                    }
                    this.$timestamp = get_timestamp();
                }
            }
        };
        PoolObject.prototype.release = function (loop, thisObject) {
            while (this.instances.length) {
                var instance = this.instances.shift();
                if (loop) {
                    loop.apply(thisObject, [instance]);
                }
                if (instance.release) {
                    instance.release();
                }
            }
            this.$timestamp = get_timestamp();
        };
        PoolObject.EXPIRE_TIME = 60;
        return PoolObject;
    }(xgame.XObject));
    xgame.PoolObject = PoolObject;
    __reflect(PoolObject.prototype, "xgame.PoolObject");
})(xgame || (xgame = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-19
*************************************************/

(function (xgame) {
    xgame.DisposableGroup.prototype["registerPreUpdate"] = function (action, thisObject, order) {
        var self = this;
        var manager = xgame.SchedulerManager.Instance();
        var scheduler = manager.registerPreUpdate(action, thisObject, order);
        self.register(scheduler);
    };
    xgame.DisposableGroup.prototype["registerUpdate"] = function (action, thisObject, order) {
        var self = this;
        var manager = xgame.SchedulerManager.Instance();
        var scheduler = manager.registerUpdate(action, thisObject, order);
        self.register(scheduler);
    };
    xgame.DisposableGroup.prototype["registerPostUpdate"] = function (action, thisObject, order) {
        var self = this;
        var manager = xgame.SchedulerManager.Instance();
        var scheduler = manager.registerPostUpdate(action, thisObject, order);
        self.register(scheduler);
    };
    xgame.DisposableGroup.prototype["registerTimer"] = function (timeout, action, thisObject, times, order) {
        var self = this;
        var manager = xgame.SchedulerManager.Instance();
        var scheduler = manager.registerTimer(timeout, action, thisObject, times, order);
        self.register(scheduler);
    };
})(xgame || (xgame = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2020-09-15
*************************************************/
/**
 * A node in the list of listeners in a signal.
 */

(function (xgame) {
    var ListenerNode = (function (_super) {
        __extends(ListenerNode, _super);
        function ListenerNode() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ListenerNode.prototype.switchNode = function (node) {
            var listener = node.listener;
            var thisObject = node.thisObject;
            var once = node.once;
            var priority = node.priority;
            node.listener = this.listener;
            node.thisObject = this.thisObject;
            node.once = this.once;
            node.priority = this.priority;
            this.listener = listener;
            this.thisObject = thisObject;
            this.once = once;
            this.priority = priority;
        };
        ListenerNode.prototype.execute = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if (this.listener != null) {
                var i = void 0;
                var maxNumArgs = this.listener.length;
                for (i = args.length; i < maxNumArgs; ++i) {
                    args[i] = null;
                }
                switch (maxNumArgs) {
                    case 0:
                        return this.listener.apply(this.thisObject);
                    default:
                        return this.listener.apply(this.thisObject, args.slice(0, maxNumArgs));
                }
            }
        };
        return ListenerNode;
    }(xgame.XObject));
    xgame.ListenerNode = ListenerNode;
    __reflect(ListenerNode.prototype, "xgame.ListenerNode");
})(xgame || (xgame = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2020-09-15
*************************************************/

(function (xgame) {
    /**
     * This internal class maintains a pool of deleted listener nodes for reuse by framework. This reduces
     * the overhead from object creation and garbage collection.
     */
    var ListenerNodePool = (function (_super) {
        __extends(ListenerNodePool, _super);
        function ListenerNodePool() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ListenerNodePool.prototype.get = function () {
            if (this.tail) {
                var node = this.tail;
                this.tail = this.tail.previous;
                node.previous = null;
                return node;
            }
            else {
                return new xgame.ListenerNode();
            }
        };
        ListenerNodePool.prototype.dispose = function (node) {
            node.listener = null;
            node.thisObject = null;
            node.once = false;
            node.next = null;
            node.previous = this.tail;
            this.tail = node;
        };
        ListenerNodePool.prototype.cache = function (node) {
            node.listener = null;
            node.thisObject = null;
            node.previous = this.cacheTail;
            this.cacheTail = node;
        };
        ListenerNodePool.prototype.releaseCache = function () {
            while (this.cacheTail) {
                var node = this.cacheTail;
                this.cacheTail = node.previous;
                node.next = null;
                node.previous = this.tail;
                this.tail = node;
            }
        };
        return ListenerNodePool;
    }(xgame.XObject));
    xgame.ListenerNodePool = ListenerNodePool;
    __reflect(ListenerNodePool.prototype, "xgame.ListenerNodePool");
})(xgame || (xgame = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2020-09-15
*************************************************/
/// <reference path="SignalBase.ts"/>

(function (xgame) {
    /**
     * Provides a fast signal for use where no parameters are dispatched with the signal.
     */
    var Signal0 = (function (_super) {
        __extends(Signal0, _super);
        function Signal0() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Signal0.prototype.dispatch = function () {
            this.startDispatch();
            var node;
            for (node = this.head; node; node = node.next) {
                var cancel = node.execute();
                if (node.once) {
                    this.remove(node.listener);
                }
                if (cancel) {
                    break;
                }
            }
            this.endDispatch();
        };
        Signal0.prototype.add = function (listener, thisObject, priority) {
            if (thisObject === void 0) { thisObject = null; }
            if (priority === void 0) { priority = 0; }
            _super.prototype.add.call(this, listener, thisObject, priority);
        };
        Signal0.prototype.addOnce = function (listener, thisObject, priority) {
            if (thisObject === void 0) { thisObject = null; }
            if (priority === void 0) { priority = 0; }
            _super.prototype.addOnce.call(this, listener, thisObject, priority);
        };
        return Signal0;
    }(xgame.SignalBase));
    xgame.Signal0 = Signal0;
    __reflect(Signal0.prototype, "xgame.Signal0");
})(xgame || (xgame = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2020-09-15
*************************************************/
/// <reference path="SignalBase.ts"/>

(function (xgame) {
    /**
     * Provides a fast signal for use where two parameters are dispatched with the signal.
     */
    var Signal2 = (function (_super) {
        __extends(Signal2, _super);
        function Signal2() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Signal2.prototype.dispatch = function (o1, o2) {
            this.startDispatch();
            var node;
            for (node = this.head; node; node = node.next) {
                var cancel = node.execute(o1, o2);
                if (node.once) {
                    this.remove(node.listener);
                }
                if (cancel) {
                    break;
                }
            }
            this.endDispatch();
        };
        Signal2.prototype.add = function (listener, thisObject, priority) {
            if (thisObject === void 0) { thisObject = null; }
            if (priority === void 0) { priority = 0; }
            _super.prototype.add.call(this, listener, thisObject, priority);
        };
        Signal2.prototype.addOnce = function (listener, thisObject, priority) {
            if (thisObject === void 0) { thisObject = null; }
            if (priority === void 0) { priority = 0; }
            _super.prototype.addOnce.call(this, listener, thisObject, priority);
        };
        return Signal2;
    }(xgame.SignalBase));
    xgame.Signal2 = Signal2;
    __reflect(Signal2.prototype, "xgame.Signal2");
})(xgame || (xgame = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2020-09-15
*************************************************/
/// <reference path="SignalBase.ts"/>

(function (xgame) {
    /**
     * Provides a fast signal for use where three parameters are dispatched with the signal.
     */
    var Signal3 = (function (_super) {
        __extends(Signal3, _super);
        function Signal3() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Signal3.prototype.dispatch = function (o1, o2, o3) {
            this.startDispatch();
            var node;
            for (node = this.head; node; node = node.next) {
                var cancel = node.execute(o1, o2, o3);
                if (node.once) {
                    this.remove(node.listener);
                }
                if (cancel) {
                    break;
                }
            }
            this.endDispatch();
        };
        Signal3.prototype.add = function (listener, thisObject, priority) {
            if (thisObject === void 0) { thisObject = null; }
            if (priority === void 0) { priority = 0; }
            _super.prototype.add.call(this, listener, thisObject, priority);
        };
        Signal3.prototype.addOnce = function (listener, thisObject, priority) {
            if (thisObject === void 0) { thisObject = null; }
            if (priority === void 0) { priority = 0; }
            _super.prototype.addOnce.call(this, listener, thisObject, priority);
        };
        return Signal3;
    }(xgame.SignalBase));
    xgame.Signal3 = Signal3;
    __reflect(Signal3.prototype, "xgame.Signal3");
})(xgame || (xgame = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2020-09-15
*************************************************/
/// <reference path="SignalBase.ts"/>

(function (xgame) {
    /**
     * Provides a fast signal for use where three parameters are dispatched with the signal.
     */
    var Signal4 = (function (_super) {
        __extends(Signal4, _super);
        function Signal4() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Signal4.prototype.dispatch = function (o1, o2, o3, o4) {
            this.startDispatch();
            var node;
            for (node = this.head; node; node = node.next) {
                var cancel = node.execute(o1, o2, o3, o4);
                if (node.once) {
                    this.remove(node.listener);
                }
                if (cancel) {
                    break;
                }
            }
            this.endDispatch();
        };
        Signal4.prototype.add = function (listener, thisObject, priority) {
            if (thisObject === void 0) { thisObject = null; }
            if (priority === void 0) { priority = 0; }
            _super.prototype.add.call(this, listener, thisObject, priority);
        };
        Signal4.prototype.addOnce = function (listener, thisObject, priority) {
            if (thisObject === void 0) { thisObject = null; }
            if (priority === void 0) { priority = 0; }
            _super.prototype.addOnce.call(this, listener, thisObject, priority);
        };
        return Signal4;
    }(xgame.SignalBase));
    xgame.Signal4 = Signal4;
    __reflect(Signal4.prototype, "xgame.Signal4");
})(xgame || (xgame = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2020-09-15
*************************************************/
/// <reference path="SignalBase.ts"/>

(function (xgame) {
    /**
     * Provides a fast signal for use where three parameters are dispatched with the signal.
     */
    var Signal5 = (function (_super) {
        __extends(Signal5, _super);
        function Signal5() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Signal5.prototype.dispatch = function (o1, o2, o3, o4, o5) {
            this.startDispatch();
            var node;
            for (node = this.head; node; node = node.next) {
                var cancel = node.execute(o1, o2, o3, o4, o5);
                if (node.once) {
                    this.remove(node.listener);
                }
                if (cancel) {
                    break;
                }
            }
            this.endDispatch();
        };
        Signal5.prototype.add = function (listener, thisObject, priority) {
            if (thisObject === void 0) { thisObject = null; }
            if (priority === void 0) { priority = 0; }
            _super.prototype.add.call(this, listener, thisObject, priority);
        };
        Signal5.prototype.addOnce = function (listener, thisObject, priority) {
            if (thisObject === void 0) { thisObject = null; }
            if (priority === void 0) { priority = 0; }
            _super.prototype.addOnce.call(this, listener, thisObject, priority);
        };
        return Signal5;
    }(xgame.SignalBase));
    xgame.Signal5 = Signal5;
    __reflect(Signal5.prototype, "xgame.Signal5");
})(xgame || (xgame = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2020-09-15
*************************************************/
/// <reference path="SignalBase.ts"/>

(function (xgame) {
    /**
     * Provides a fast signal for use where any number of parameters are dispatched with the signal.
     */
    var SignalAny = (function (_super) {
        __extends(SignalAny, _super);
        function SignalAny() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        SignalAny.prototype.dispatch = function () {
            var objects = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                objects[_i] = arguments[_i];
            }
            this.startDispatch();
            var node;
            for (node = this.head; node; node = node.next) {
                var cancel = node.execute.apply(node, objects);
                if (node.once) {
                    this.remove(node.listener);
                }
                if (cancel) {
                    break;
                }
            }
            this.endDispatch();
        };
        return SignalAny;
    }(xgame.SignalBase));
    xgame.SignalAny = SignalAny;
    __reflect(SignalAny.prototype, "xgame.SignalAny");
})(xgame || (xgame = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-01-21
*************************************************/

(function (xgame) {
    var STR = '0123456789abcdefghijklmnopqrstuvwxyz';
    var Random = (function () {
        function Random() {
        }
        Random.range = function (min, max) {
            var seed = new Date().getTime();
            max = max || 1;
            min = min || 0;
            seed = (seed * 9301 + 49297) % 233280;
            var rnd = seed / 233280.0;
            return min + rnd * (max - min);
        };
        Random.chars = function (len) {
            if (len === void 0) { len = 6; }
            var char = '';
            var count = STR.length;
            for (var i = len; i > 0; --i) {
                char += STR[Math.floor(Math.random() * count)];
            }
            return char;
        };
        return Random;
    }());
    xgame.Random = Random;
    __reflect(Random.prototype, "xgame.Random");
})(xgame || (xgame = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-01-21
*************************************************/
/// <reference path="./Random.ts" />

(function (xgame) {
    var ArrayUtils = (function () {
        function ArrayUtils() {
        }
        /**
         * 将数组打乱顺序
         */
        ArrayUtils.shuffle = function (list) {
            var n = list.length - 1;
            while (n > 1) {
                n--;
                var k = xgame.Random.range(0, n + 1);
                var value = list[k];
                list[k] = list[n];
                list[n] = value;
            }
        };
        /**
         * 取出数组第一个项
         */
        ArrayUtils.peek = function (list) {
            return list[0];
        };
        /**
         * 向数组头部添加一个项
         */
        ArrayUtils.push = function (list, item) {
            list.splice(0, 0, item);
        };
        /**
         * 移除数组第一个项并返回它
         */
        ArrayUtils.pop = function (list) {
            return list.shift();
        };
        return ArrayUtils;
    }());
    xgame.ArrayUtils = ArrayUtils;
    __reflect(ArrayUtils.prototype, "xgame.ArrayUtils");
})(xgame || (xgame = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-23
*************************************************/
/// <reference path="../core/XObject.ts" />

(function (xgame) {
    var Deferred = (function (_super) {
        __extends(Deferred, _super);
        function Deferred() {
            var _this = _super.call(this) || this;
            _this.$promise = new Promise(function (resolve, reject) {
                _this.$resolve = resolve;
                _this.$reject = reject;
            });
            return _this;
        }
        Deferred.prototype.resolve = function (value) {
            this.$resolve(value);
        };
        Deferred.prototype.reject = function (reason) {
            this.$reject(reason);
        };
        Object.defineProperty(Deferred.prototype, "promise", {
            get: function () {
                return this.$promise;
            },
            enumerable: true,
            configurable: true
        });
        return Deferred;
    }(xgame.XObject));
    xgame.Deferred = Deferred;
    __reflect(Deferred.prototype, "xgame.Deferred");
})(xgame || (xgame = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-01-17
*************************************************/
/// <reference path="../core/XObject.ts" />
/// <reference path="../interfaces/IDisposable.ts" />
/// <reference path="../pool/PoolObject.ts" />
/// <reference path="../signals/Signal0.ts" />
/// <reference path="../utils/Deferred.ts" />
/// <reference path="../scheduler/SchedulerManager.ts" />
/// <reference path="../scheduler/Scheduler.ts" />

(function (xgame) {
    var AwaitType;
    (function (AwaitType) {
        AwaitType[AwaitType["Frame"] = 1] = "Frame";
        AwaitType[AwaitType["Milliseconds"] = 2] = "Milliseconds";
        AwaitType[AwaitType["Seconds"] = 3] = "Seconds";
        AwaitType[AwaitType["WaitUntil"] = 4] = "WaitUntil";
    })(AwaitType = xgame.AwaitType || (xgame.AwaitType = {}));
    var Awaiter = (function (_super) {
        __extends(Awaiter, _super);
        function Awaiter() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.timer = 0;
            _this.callback_complete = new xgame.Signal0();
            _this.deferred = new xgame.Deferred();
            return _this;
        }
        Awaiter.prototype.onComplete = function () {
            this.callback_complete.removeAll();
            return this.callback_complete;
        };
        Awaiter.prototype.setAwaiter = function (timeOrHandler, type) {
            if (type === void 0) { type = AwaitType.Frame; }
            this.type = type;
            if (AwaitType.WaitUntil == type) {
                this.handler = timeOrHandler;
            }
            else {
                var time = timeOrHandler;
                if (type == AwaitType.Frame) {
                    this.timer = timeOrHandler * (1000 / Awaiter.FPS);
                }
                else if (type == AwaitType.Seconds) {
                    this.timer = timeOrHandler * 1000;
                }
                else {
                    this.timer = timeOrHandler;
                }
            }
        };
        Awaiter.prototype.await = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    this.deferred = new xgame.Deferred();
                    this.scheduler = xgame.SchedulerManager.Instance().registerUpdate(this.advanceTime, this);
                    return [2 /*return*/, this.deferred.promise];
                });
            });
        };
        Awaiter.prototype.advanceTime = function () {
            if (this.type == AwaitType.WaitUntil) {
                if (this.handler()) {
                    if (this.deferred) {
                        this.deferred.resolve();
                    }
                    this.callback_complete.dispatch();
                    this.deferred = undefined;
                    this.dispose();
                }
            }
            else {
                this.timer -= xgame.Time.Instance().deltaTime;
                if (this.timer <= 0) {
                    if (this.deferred) {
                        this.deferred.resolve();
                    }
                    this.callback_complete.dispatch();
                    this.deferred = undefined;
                    this.dispose();
                }
            }
        };
        Awaiter.prototype.dispose = function () {
            if (this.scheduler) {
                xgame.SchedulerManager.Instance().removeUpdate(this.scheduler);
                this.scheduler = undefined;
            }
            this.deferred = undefined;
            this.callback_complete.removeAll();
            pools.recycle(this);
        };
        Awaiter.FPS = 60;
        return Awaiter;
    }(xgame.XObject));
    xgame.Awaiter = Awaiter;
    __reflect(Awaiter.prototype, "xgame.Awaiter", ["xgame.IDisposable"]);
    var pools = new xgame.PoolObject(Awaiter);
    function waitEndFrames(frame, payload, thisObject) {
        if (frame === void 0) { frame = 0; }
        return __awaiter(this, void 0, void 0, function () {
            var awaiter;
            return __generator(this, function (_a) {
                awaiter = pools.fetch(function () { return new Awaiter(); }, this);
                awaiter.setAwaiter(frame, AwaitType.Frame);
                if (payload) {
                    payload.apply(thisObject, [awaiter]);
                }
                return [2 /*return*/, awaiter.await()];
            });
        });
    }
    xgame.waitEndFrames = waitEndFrames;
    function waitMilliseconds(milliseconds, payload, thisObject) {
        return __awaiter(this, void 0, void 0, function () {
            var awaiter;
            return __generator(this, function (_a) {
                awaiter = pools.fetch(function () { return new Awaiter(); }, this);
                if (payload) {
                    payload.apply(thisObject, [awaiter]);
                }
                awaiter.setAwaiter(milliseconds, AwaitType.Milliseconds);
                return [2 /*return*/, awaiter.await()];
            });
        });
    }
    xgame.waitMilliseconds = waitMilliseconds;
    function waitSeconds(seconds, payload, thisObject) {
        return __awaiter(this, void 0, void 0, function () {
            var awaiter;
            return __generator(this, function (_a) {
                awaiter = pools.fetch(function () { return new Awaiter(); }, this);
                awaiter.setAwaiter(seconds, AwaitType.Seconds);
                if (payload) {
                    payload.apply(thisObject, [awaiter]);
                }
                return [2 /*return*/, awaiter.await()];
            });
        });
    }
    xgame.waitSeconds = waitSeconds;
    function waitUntil(handler, payload, thisObject) {
        return __awaiter(this, void 0, void 0, function () {
            var awaiter;
            return __generator(this, function (_a) {
                awaiter = pools.fetch(function () { return new Awaiter(); }, this);
                awaiter.setAwaiter(handler, AwaitType.WaitUntil);
                if (payload) {
                    payload.apply(thisObject, [awaiter]);
                }
                return [2 /*return*/, awaiter.await()];
            });
        });
    }
    xgame.waitUntil = waitUntil;
})(xgame || (xgame = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-19
*************************************************/
/// <reference path="./injectInstance.ts" />

(function (xgame) {
    function createInstance(Clazz) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var instance = new (Clazz.bind.apply(Clazz, [void 0].concat(args)))();
        return xgame.injectInstance(instance);
    }
    xgame.createInstance = createInstance;
})(xgame || (xgame = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-29
*************************************************/

(function (xgame) {
    var getDefinitionByNameCache = {};
    /**
     * Returns a reference to the class object of the class specified by the name parameter.
     * @param name The name of a class.
     */
    function getDefinitionByName(name) {
        if (!name)
            return null;
        var definition = getDefinitionByNameCache[name];
        if (definition) {
            return definition;
        }
        var paths = name.split(".");
        var length = paths.length;
        definition = __global;
        for (var i = 0; i < length; i++) {
            var path = paths[i];
            definition = definition[path];
            if (!definition) {
                return null;
            }
        }
        getDefinitionByNameCache[name] = definition;
        return definition;
    }
    xgame.getDefinitionByName = getDefinitionByName;
})(xgame || (xgame = {}));
var __global = this.__global || this;
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-29
*************************************************/
/// <reference path="./getPrototype.ts" />
/// <reference path="./getQualifiedClassName.ts" />

(function (xgame) {
    function getQualifiedClassChainNames(value) {
        var names = [];
        names.push(xgame.getQualifiedClassName(value));
        var prototype = xgame.getPrototype(value);
        while (prototype) {
            var name_1 = xgame.getQualifiedClassName(prototype);
            if (name_1 && names.indexOf(name_1) == -1) {
                names.push(name_1);
            }
            prototype = xgame.getPrototype(prototype);
        }
        return names;
    }
    xgame.getQualifiedClassChainNames = getQualifiedClassChainNames;
})(xgame || (xgame = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-29
*************************************************/
/// <reference path="./getQualifiedClassName.ts" />

(function (xgame) {
    /**
     * Returns the fully qualified class name of the base class of the object specified by the value parameter.
     * @param value The object for which a parent class is desired. Any JavaScript value may be passed to this method including
     * all available JavaScript types, object instances, primitive types such as number, and class objects.
     * @returns  A fully qualified base class name, or null if none exists.
     */
    function getQualifiedSuperclassName(value) {
        if (!value || (typeof value != "object" && !value.prototype)) {
            return null;
        }
        var prototype = value.prototype ? value.prototype : Object.getPrototypeOf(value);
        var superProto = Object.getPrototypeOf(prototype);
        if (!superProto) {
            return null;
        }
        var superClass = xgame.getQualifiedClassName(superProto.constructor);
        if (!superClass) {
            return null;
        }
        return superClass;
    }
    xgame.getQualifiedSuperclassName = getQualifiedSuperclassName;
})(xgame || (xgame = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-19
*************************************************/

(function (xgame) {
    var MathParser = (function (_super) {
        __extends(MathParser, _super);
        function MathParser(varnames) {
            var _this = _super.call(this) || this;
            _this.varnames = varnames;
            _this.pos = 0;
            _this.tokenprio = 0;
            _this.tokenindex = 0;
            _this.tmpprio = 0;
            _this.funcs1 = ["sin", "cos", "tan", "asin", "acos", "atan", "sqrt", "log", "abs", "ceil", "floor", "round", "random", "fac"];
            _this._funcs1 = [_this._sin, _this._cos, _this._tan, _this._asin, _this._acos, _this._atan, _this._sqrt, _this._log, _this._abs, _this._ceil, _this._floor, _this._round, _this._random, _this._fac];
            _this.funcs2 = ["min", "max", "pyt"];
            _this._funcs2 = [_this._min, _this._max, _this._pyt, _this._add, _this._sub, _this._mult, _this._div, _this._mod, _this._pow];
            _this.consts = ["E", "PI"];
            _this.constvalues = [Math.E, Math.PI];
            _this.TNUMBER = 0;
            _this.TFUNC1 = 1;
            _this.TFUNC2 = 2;
            _this.TVAR = 3;
            return _this;
        }
        MathParser.prototype.parse = function (expr) {
            this.errormsg = "";
            this.success = true;
            var operstack = [];
            var tokenstack = [];
            this.tmpprio = 0;
            var expected = [1, 0, 1, 1, 0, 0, 1];
            var noperators = 0;
            this.expression = expr;
            this.pos = 0;
            while (this.pos < this.expression.length) {
                if (this.isOperator()) {
                    if (this.isSign() && expected[6] == 1) {
                        var mintoken = new Token(this.TNUMBER, 0, 0, -1);
                        tokenstack.push(mintoken);
                        this.tokenprio = 4;
                        this.tokenindex = 5;
                        noperators += 2;
                        this.addfunc(tokenstack, operstack, this.TFUNC2);
                        expected = [1, 0, 1, 1, 0, 0, 1];
                    }
                    else if (this.isComment()) {
                    }
                    else {
                        if (expected[1] == 0) {
                            this.error_parsing(this.pos, "unexpected operator");
                            return [];
                        }
                        noperators += 2;
                        this.addfunc(tokenstack, operstack, this.TFUNC2);
                        expected = [1, 0, 1, 1, 0, 0, 1];
                    }
                }
                else if (this.isNumber()) {
                    if (expected[0] == 0) {
                        this.error_parsing(this.pos, "unexpected number");
                        return [];
                    }
                    var token = new Token(this.TNUMBER, 0, 0, this.tokennumber);
                    tokenstack.push(token);
                    expected = [0, 1, 0, 0, 1, 1, 0];
                }
                else if (this.isLeftParenth()) {
                    if (expected[3] == 0) {
                        this.error_parsing(this.pos, "unexpected \"(\"");
                        return [];
                    }
                    expected = [1, 0, 1, 1, 0, 0, 1];
                }
                else if (this.isRightParenth()) {
                    if (expected[4] == 0) {
                        this.error_parsing(this.pos, "unexpected \")\"");
                        return [];
                    }
                    expected = [0, 1, 0, 0, 1, 0, 0];
                }
                else if (this.isComma()) {
                    if (expected[5] == 0) {
                        this.error_parsing(this.pos, "unexpected \",\"");
                        return [];
                    }
                    expected = [1, 0, 0, 0, 0, 0, 1];
                }
                else if (this.isConst()) {
                    if (expected[0] == 0) {
                        this.error_parsing(this.pos, "unexpected constant");
                        return [];
                    }
                    var consttoken = new Token(this.TNUMBER, 0, 0, this.tokennumber);
                    tokenstack.push(consttoken);
                    expected = [0, 1, 0, 0, 1, 1, 0];
                }
                else if (this.isFunc1()) {
                    if (expected[3] == 0) {
                        this.error_parsing(this.pos, "unexpected function");
                        return [];
                    }
                    this.addfunc(tokenstack, operstack, this.TFUNC1);
                    noperators++;
                    expected = [0, 0, 0, 1, 0, 0, 0];
                }
                else if (this.isFunc2()) {
                    if (expected[3] == 0) {
                        this.error_parsing(this.pos, "unexpected function");
                        return [];
                    }
                    this.addfunc(tokenstack, operstack, this.TFUNC2);
                    noperators += 2;
                    expected = [0, 0, 0, 1, 0, 0, 0];
                }
                else if (this.isVar()) {
                    if (expected[0] == 0) {
                        this.error_parsing(this.pos, "unexpected variable");
                        return [];
                    }
                    var vartoken = new Token(this.TVAR, this.tokenindex, 0, 0);
                    tokenstack.push(vartoken);
                    expected = [0, 1, 0, 0, 1, 1, 0];
                }
                else if (this.isWhite()) {
                }
                else {
                    if (this.errormsg == "") {
                        this.error_parsing(this.pos, "unknown character");
                    }
                    else {
                        this.error_parsing(this.pos, this.errormsg);
                    }
                    return [];
                }
            }
            if (this.tmpprio < 0 || this.tmpprio >= 10) {
                this.error_parsing(this.pos, "unmatched \"()\"");
                return [];
            }
            while (operstack.length > 0) {
                var tmp = operstack.pop();
                tokenstack.push(tmp);
            }
            if (noperators + 1 != tokenstack.length) {
                this.error_parsing(this.pos, "parity");
                return [];
            }
            return tokenstack;
        };
        MathParser.prototype.simplify = function (parsedexpression) {
            var nstack = [];
            var newexpression = [];
            var n1;
            var n2;
            var f;
            var L = parsedexpression.length;
            var item;
            var i = 0;
            for (i = 0; i < L; i++) {
                item = parsedexpression[i];
                var type_ = item.type_;
                if (type_ == this.TNUMBER) {
                    nstack.push(item);
                }
                else {
                    if (type_ == this.TFUNC2 && nstack.length > 1) {
                        n2 = nstack.pop();
                        n1 = nstack.pop();
                        f = this._funcs2[item.index_];
                        item = new Token(this.TNUMBER, 0, 0, f(n1.number_, n2.number_));
                        nstack.push(item);
                    }
                    else if (type_ == this.TFUNC1 && nstack.length > 0) {
                        n1 = nstack.pop();
                        f = this._funcs1[item.index_];
                        item = new Token(this.TNUMBER, 0, 0, f(n1.number_));
                        nstack.push(item);
                    }
                    else {
                        while (nstack.length > 0) {
                            newexpression.push(nstack.shift());
                        }
                        newexpression.push(item);
                    }
                }
            }
            while (nstack.length > 0) {
                newexpression.push(nstack.shift());
            }
            return newexpression;
        };
        MathParser.prototype.eval = function (pexpression, values) {
            var nstack = [];
            var n1;
            var n2;
            var f;
            var L = pexpression.length;
            var item;
            var i = 0;
            for (i = 0; i < L; i++) {
                item = pexpression[i];
                var type_ = item.type_;
                if (type_ == this.TNUMBER) {
                    nstack.push(item.number_);
                }
                else if (type_ == this.TFUNC2) {
                    n2 = nstack.pop();
                    n1 = nstack.pop();
                    f = this._funcs2[item.index_];
                    nstack.push(f(n1, n2));
                }
                else if (type_ == this.TVAR) {
                    nstack.push(values[item.index_]);
                }
                else if (type_ == this.TFUNC1) {
                    n1 = nstack.pop();
                    f = this._funcs1[item.index_];
                    nstack.push(f(n1));
                }
            }
            return nstack[0];
        };
        MathParser.prototype.addfunc = function (tokenstack, operstack, type_) {
            var operator = new Token(type_, this.tokenindex, this.tokenprio + this.tmpprio, 0);
            while (operstack.length > 0) {
                if (operator.prio_ <= operstack[operstack.length - 1].prio_) {
                    tokenstack.push(operstack.pop());
                }
                else {
                    break;
                }
            }
            operstack.push(operator);
        };
        MathParser.prototype.error_parsing = function (column, msg) {
            this.success = false;
            this.errormsg = "parse error [column " + (column) + "]: " + msg;
            console.log(this.errormsg);
        };
        MathParser.prototype.isNumber = function () {
            var r = false;
            var str = "";
            while (this.pos < this.expression.length) {
                var code = this.expression.charCodeAt(this.pos);
                if ((code >= 48 && code <= 57) || code == 46) {
                    str += this.expression.charAt(this.pos);
                    this.pos++;
                    this.tokennumber = parseFloat(str);
                    r = true;
                }
                else {
                    break;
                }
            }
            return r;
        };
        MathParser.prototype.isConst = function () {
            var str;
            for (var i = 0; i < this.consts.length; i++) {
                str = this.expression.substr(this.pos, this.consts[i].length);
                if (this.consts[i] == str) {
                    this.tokennumber = this.constvalues[i];
                    this.pos += str.length;
                    return true;
                }
            }
            return false;
        };
        MathParser.prototype.isOperator = function () {
            var code = this.expression.charCodeAt(this.pos);
            if (code == 43) {
                this.tokenprio = 0;
                this.tokenindex = 3;
            }
            else if (code == 45) {
                this.tokenprio = 0;
                this.tokenindex = 4;
            }
            else if (code == 42) {
                this.tokenprio = 1;
                this.tokenindex = 5;
            }
            else if (code == 47) {
                this.tokenprio = 2;
                this.tokenindex = 6;
            }
            else if (code == 37) {
                this.tokenprio = 2;
                this.tokenindex = 7;
            }
            else if (code == 94) {
                this.tokenprio = 3;
                this.tokenindex = 8;
            }
            else {
                return false;
            }
            this.pos++;
            return true;
        };
        MathParser.prototype.isSign = function () {
            var code = this.expression.charCodeAt(this.pos - 1);
            if (code == 45) {
                return true;
            }
            return false;
        };
        MathParser.prototype.isLeftParenth = function () {
            var code = this.expression.charCodeAt(this.pos);
            if (code == 40) {
                this.pos++;
                this.tmpprio += 10;
                return true;
            }
            return false;
        };
        MathParser.prototype.isRightParenth = function () {
            var code = this.expression.charCodeAt(this.pos);
            if (code == 41) {
                this.pos++;
                this.tmpprio -= 10;
                return true;
            }
            return false;
        };
        MathParser.prototype.isComma = function () {
            var code = this.expression.charCodeAt(this.pos);
            if (code == 44) {
                this.pos++;
                return true;
            }
            return false;
        };
        MathParser.prototype.isWhite = function () {
            var code = this.expression.charCodeAt(this.pos);
            if (code == 32) {
                this.pos++;
                return true;
            }
            return false;
        };
        MathParser.prototype.isFunc1 = function () {
            var str;
            for (var i = 0; i < this.funcs1.length; i++) {
                var L = this.funcs1[i].length;
                str = this.expression.substr(this.pos, L);
                if (this.funcs1[i] == str) {
                    this.tokenindex = i;
                    this.tokenprio = 5;
                    this.pos += L;
                    return true;
                }
            }
            return false;
        };
        MathParser.prototype.isFunc2 = function () {
            var str;
            for (var i = 0; i < this.funcs2.length; i++) {
                var L = this.funcs2[i].length;
                str = this.expression.substr(this.pos, L);
                if (this.funcs2[i] == str) {
                    this.tokenindex = i;
                    this.tokenprio = 5;
                    this.pos += L;
                    return true;
                }
            }
            return false;
        };
        MathParser.prototype.isVar = function () {
            var str = "";
            for (var i = 0; i < this.varnames.length; i++) {
                str = this.expression.substr(this.pos, this.varnames[i].length);
                if (this.varnames[i] == str) {
                    this.tokenindex = i;
                    this.tokenprio = 4;
                    this.pos += str.length;
                    return true;
                }
            }
            return false;
        };
        MathParser.prototype.isComment = function () {
            var code = this.expression.charCodeAt(this.pos - 1);
            if (code == 47 && this.expression.charCodeAt(this.pos) == 42) {
                this.pos = this.expression.indexOf("*/", this.pos) + 2;
                if (this.pos == 1) {
                    this.pos = this.expression.length;
                }
                return true;
            }
            return false;
        };
        MathParser.prototype._add = function (a, b) {
            return a + b;
        };
        MathParser.prototype._sub = function (a, b) {
            return a - b;
        };
        MathParser.prototype._mult = function (a, b) {
            return a * b;
        };
        MathParser.prototype._div = function (a, b) {
            return a / b;
        };
        MathParser.prototype._mod = function (a, b) {
            return a % b;
        };
        MathParser.prototype._pow = function (a, b) {
            return Math.pow(a, b);
        };
        MathParser.prototype._sin = function (a) {
            return Math.sin(a);
        };
        MathParser.prototype._cos = function (a) {
            return Math.cos(a);
        };
        MathParser.prototype._tan = function (a) {
            return Math.tan(a);
        };
        MathParser.prototype._asin = function (a) {
            return Math.asin(a);
        };
        MathParser.prototype._acos = function (a) {
            return Math.acos(a);
        };
        MathParser.prototype._atan = function (a) {
            return Math.atan(a);
        };
        MathParser.prototype._sqrt = function (a) {
            return Math.sqrt(a);
        };
        MathParser.prototype._log = function (a) {
            return Math.log(a);
        };
        MathParser.prototype._abs = function (a) {
            return Math.abs(a);
        };
        MathParser.prototype._ceil = function (a) {
            return Math.ceil(a);
        };
        MathParser.prototype._floor = function (a) {
            return Math.floor(a);
        };
        MathParser.prototype._round = function (a) {
            return Math.round(a);
        };
        MathParser.prototype._random = function (a) {
            return Math.random() * a;
        };
        MathParser.prototype._fac = function (a) {
            a = Math.floor(a);
            var b = a;
            while (a > 1) {
                b = b * (--a);
            }
            return b;
        };
        MathParser.prototype._min = function (a, b) {
            return Math.min(a, b);
        };
        MathParser.prototype._max = function (a, b) {
            return Math.max(a, b);
        };
        MathParser.prototype._pyt = function (a, b) {
            return Math.sqrt(a * a + b * b);
        };
        return MathParser;
    }(xgame.XObject));
    xgame.MathParser = MathParser;
    __reflect(MathParser.prototype, "xgame.MathParser");
    var Token = (function () {
        function Token(type_, index_, prio_, number_) {
            if (index_ === void 0) { index_ = 0; }
            if (prio_ === void 0) { prio_ = 0; }
            if (number_ === void 0) { number_ = 0; }
            this.type_ = type_;
            this.index_ = index_;
            this.prio_ = prio_;
            this.number_ = number_;
        }
        return Token;
    }());
    xgame.Token = Token;
    __reflect(Token.prototype, "xgame.Token");
})(xgame || (xgame = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-01-19
*************************************************/

(function (xgame) {
    var Point = xgame.Point;
    var Rectangle = xgame.Rectangle;
    var MathUtils = (function () {
        function MathUtils() {
        }
        MathUtils.distanceBetweenTwoPoints = function (x1, x2, y1, y2) {
            var dx = x1 - x2;
            var dy = y1 - y2;
            return Math.sqrt(dx * dx + dy * dy);
        };
        /*
        public static rotateAroundInternalPoint(object: DisplayObject, pointToRotateAround: Point, rotation: number): void {
            // Thanks : http://blog.open-design.be/2009/02/05/rotate-a-movieclipdisplayobject-around-a-point/

            var m: Matrix = object.transform.matrix;

            var point: Point = pointToRotateAround;
            point = m.transformPoint(point);

            RotateAroundExternalPoint(object, point, rotation);
        }

        public static rotateAroundExternalPoint(object: DisplayObject, pointToRotateAround: Point, rotation: number): void {
            var m: Matrix = object.transform.matrix;

            m.translate(-pointToRotateAround.x, -pointToRotateAround.y);
            m.rotate(rotation * (Math.PI / 180));
            m.translate(pointToRotateAround.x, pointToRotateAround.y);

            object.transform.matrix = m;
        }
        */
        /**
         * Rotates x,y around Origin (like MathVector.rotate() )
         * if resultPoint is define, will set resultPoint to new values, otherwise, it will return a new point.
         * @param	p flash.geom.Point
         * @param	a angle in radians
         * @return	returns a new rotated point.
         */
        MathUtils.rotatePoint = function (x, y, a, resultPoint) {
            if (resultPoint === void 0) { resultPoint = null; }
            var c = Math.cos(a);
            var s = Math.sin(a);
            if (resultPoint) {
                resultPoint.setTo(x * c + y * s, -x * s + y * c);
                return null;
            }
            else
                return new Point(x * c + y * s, -x * s + y * c);
        };
        /**
         * Get the linear equation from two points.
         * @return an object, m is the slope and b a constant term.
         */
        MathUtils.lineEquation = function (p0, p1) {
            var a = (p1.y - p0.y) / (p1.x - p0.x);
            var b = p0.y - a * p0.x;
            return { m: a, b: b };
        };
        /**
         * Linear interpolation function
         * @param	a start value
         * @param	b end value
         * @param	ratio interpolation amount
         * @return
         */
        MathUtils.lerp = function (a, b, ratio) {
            return a + (b - a) * ratio;
        };
        /**
         * returns the lerp parameter ( between 0 and 1) that produces the interpolant 'value' within the [a,b] range
         * accepts a>b or b<a but does not clamp value to [a,b] range.
         */
        MathUtils.inverseLerp = function (a, b, value) {
            if (a > b) {
                return (value - b) / (a - b);
            }
            else if (a < b) {
                return (value - a) / (b - a);
            }
            else {
                throw new Error("a argument must be different from b argument.");
            }
        };
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
        MathUtils.map = function (value, minA, maxA, minB, maxB) {
            if (minB === void 0) { minB = 0; }
            if (maxB === void 0) { maxB = 1; }
            var t = MathUtils.clamp01(MathUtils.inverseLerp(minA, maxA, value));
            return t * (maxB - minB) + minB;
        };
        /**
         * Creates the axis aligned bounding box for a rotated rectangle.
         * @param w width of the rotated rectangle
         * @param h height of the rotated rectangle
         * @param a angle of rotation around the topLeft point in radian
         * @return Rectangle
         */
        MathUtils.createAABB = function (x, y, w, h, a) {
            if (a === void 0) { a = 0; }
            var aabb = new Rectangle(x, y, w, h);
            if (a == 0)
                return aabb;
            var c = Math.cos(a);
            var s = Math.sin(a);
            var cpos;
            var spos;
            if (s < 0) {
                s = -s;
                spos = false;
            }
            else {
                spos = true;
            }
            if (c < 0) {
                c = -c;
                cpos = false;
            }
            else {
                cpos = true;
            }
            aabb.width = h * s + w * c;
            aabb.height = h * c + w * s;
            if (cpos)
                if (spos)
                    aabb.x -= h * s;
                else
                    aabb.y -= w * s;
            else if (spos) {
                aabb.x -= w * c + h * s;
                aabb.y -= h * c;
            }
            else {
                aabb.x -= w * c;
                aabb.y -= w * s + h * c;
            }
            return aabb;
        };
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
        MathUtils.createAABBData = function (x, y, w, h, a, aabbdata) {
            if (a === void 0) { a = 0; }
            if (aabbdata === void 0) { aabbdata = null; }
            if (aabbdata == null) {
                aabbdata = { offsetX: 0, offsetY: 0, rect: new Rectangle() };
            }
            aabbdata.rect.setTo(x, y, w, h);
            var offX = 0;
            var offY = 0;
            if (a == 0) {
                aabbdata.offsetX = 0;
                aabbdata.offsetY = 0;
                return aabbdata;
            }
            var c = Math.cos(a);
            var s = Math.sin(a);
            var cpos;
            var spos;
            if (s < 0) {
                s = -s;
                spos = false;
            }
            else {
                spos = true;
            }
            if (c < 0) {
                c = -c;
                cpos = false;
            }
            else {
                cpos = true;
            }
            aabbdata.rect.width = h * s + w * c;
            aabbdata.rect.height = h * c + w * s;
            if (cpos)
                if (spos)
                    offX -= h * s;
                else
                    offY -= w * s;
            else if (spos) {
                offX -= w * c + h * s;
                offY -= h * c;
            }
            else {
                offX -= w * c;
                offY -= w * s + h * c;
            }
            aabbdata.rect.x += aabbdata.offsetX = offX;
            aabbdata.rect.y += aabbdata.offsetY = offY;
            return aabbdata;
        };
        /**
         * check if angle is between angle a and b
         * thanks to http://www.xarg.org/2010/06/is-an-angle-between-two-other-angles/
         */
        MathUtils.angleBetween = function (angle, a, b) {
            var mod = Math.PI * 2;
            angle = (mod + (angle % mod)) % mod;
            a = (mod * 100 + a) % mod;
            b = (mod * 100 + b) % mod;
            if (a < b)
                return a <= angle && angle <= b;
            return a <= angle || angle <= b;
        };
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
        MathUtils.linesIntersection = function (x1, y1, x2, y2, x3, y3, x4, y4, asSegments) {
            if (asSegments === void 0) { asSegments = true; }
            var ip;
            var a1, a2, b1, b2, c1, c2;
            a1 = y2 - y1;
            b1 = x1 - x2;
            c1 = x2 * y1 - x1 * y2;
            a2 = y4 - y3;
            b2 = x3 - x4;
            c2 = x4 * y3 - x3 * y4;
            var denom = a1 * b2 - a2 * b1;
            if (denom == 0)
                return null;
            ip = new Point();
            ip.x = (b1 * c2 - b2 * c1) / denom;
            ip.y = (a2 * c1 - a1 * c2) / denom;
            // ---------------------------------------------------
            // Do checks to see if intersection to endpoints
            // distance is longer than actual Segments.
            // Return null if it is with any.
            // ---------------------------------------------------
            if (asSegments) {
                if (MathUtils.pow2(ip.x - x2) + MathUtils.pow2(ip.y - y2) > MathUtils.pow2(x1 - x2) + MathUtils.pow2(y1 - y2))
                    return null;
                if (MathUtils.pow2(ip.x - x1) + MathUtils.pow2(ip.y - y1) > MathUtils.pow2(x1 - x2) + MathUtils.pow2(y1 - y2))
                    return null;
                if (MathUtils.pow2(ip.x - x4) + MathUtils.pow2(ip.y - y4) > MathUtils.pow2(x3 - x4) + MathUtils.pow2(y3 - y4))
                    return null;
                if (MathUtils.pow2(ip.x - x3) + MathUtils.pow2(ip.y - y3) > MathUtils.pow2(x3 - x4) + MathUtils.pow2(y3 - y4))
                    return null;
            }
            return ip;
        };
        MathUtils.pow2 = function (value) {
            return value * value;
        };
        MathUtils.clamp01 = function (value) {
            return value < 0 ? 0 : (value > 1 ? 1 : value);
        };
        MathUtils.clamp = function (value, min, max) {
            return Math.max(min, Math.min(max, value));
        };
        /**
         * returns random Number between min and max
         */
        MathUtils.random = function (min, max) {
            if (min === void 0) { min = 0; }
            if (max === void 0) { max = 1; }
            return min + (max - min) * Math.random();
        };
        /**
         * returns random int between min and max
         */
        MathUtils.randomInt = function (min, max) {
            return Math.floor(Math.random() * (1 + max - min)) + min;
        };
        /**
         * best fits the rect Rectangle into the into Rectangle, and returns what scale factor applied to into was necessary to do so.
         * @param	rect
         * @param	into
         * @return
         */
        MathUtils.getBestFitRatio = function (rect, into) {
            if (into.height / into.width > rect.height / rect.width)
                return into.width / rect.width;
            else
                return into.height / rect.height;
        };
        /**
         * use to get the ratio required for one rectangle to fill the other.
         * Either the width, the height, or both will fill the into rectangle.
         * Useful to make a background take up all the screen space even though the background
         * will be cropped if the aspect ratio is not the same.
         * @param	rect
         * @param	into
         */
        MathUtils.getFillRatio = function (rect, into) {
            if (into.height / into.width > rect.height / rect.width)
                return into.height / rect.height;
            else
                return into.width / rect.width;
        };
        /**
         * get a random item from an array with an almost uniform distribution of probabilities using randomInt.
         * @param	arr
         * @return
         */
        MathUtils.getArrayRandomItem = function (arr) {
            return arr[MathUtils.randomInt(0, arr.length - 1)];
        };
        /**
         * gets the next element in an array based on the currentElement's position, cyclically.
         * - so if currentElement is the last element, you'll get the first in the array.
         * @param	currentElement
         * @param	array
         */
        MathUtils.getNextInArray = function (currentElement, array) {
            var currIndex = array.lastIndexOf(currentElement) + 1;
            if (currIndex >= array.length)
                currIndex = 0;
            return array[currIndex];
        };
        /**
         * gets the previous element in an array based on the currentElement's position, cyclically.
         * - so if currentElement is the first element, you'll get the last in the array.
         * @param	currentElement
         * @param	array
         */
        MathUtils.getPreviousInArray = function (currentElement, array) {
            var currIndex = array.lastIndexOf(currentElement) - 1;
            if (currIndex < 0)
                currIndex = array.length - 1;
            return array[currIndex];
        };
        /**
         * returns a random color in given range.
         *
         * @param minLum minimum for the r, g and b values.
         * @param maxLum maximum for the r, g and b values.
         * @param b32 return color with alpha channel (ARGB)
         * @param randAlpha if format is ARGB, shall we set a random alpha value?
         * @return
         */
        MathUtils.getRandomColor = function (minLum, maxLum, b32, randAlpha) {
            if (minLum === void 0) { minLum = 0; }
            if (maxLum === void 0) { maxLum = 0xFF; }
            if (b32 === void 0) { b32 = false; }
            if (randAlpha === void 0) { randAlpha = false; }
            maxLum = maxLum > 0xFF ? 0xFF : maxLum;
            minLum = minLum > 0xFF ? 0xFF : minLum;
            var r = MathUtils.randomInt(minLum, maxLum);
            var g = MathUtils.randomInt(minLum, maxLum);
            var b = MathUtils.randomInt(minLum, maxLum);
            if (!b32)
                return r << 16 | g << 8 | b;
            else {
                var a = randAlpha ? MathUtils.randomInt(0, 255) : 255;
                return a << 24 | r << 16 | g << 8 | b;
            }
        };
        /**
         * http://snipplr.com/view/12514/as3-interpolate-color/
         * @param	fromColor
         * @param	toColor
         * @param	t a number from 0 to 1
         * @return
         */
        MathUtils.colorLerp = function (fromColor, toColor, t) {
            var q = 1 - t;
            var fromA = (fromColor >> 24) & 0xFF;
            var fromR = (fromColor >> 16) & 0xFF;
            var fromG = (fromColor >> 8) & 0xFF;
            var fromB = fromColor & 0xFF;
            var toA = (toColor >> 24) & 0xFF;
            var toR = (toColor >> 16) & 0xFF;
            var toG = (toColor >> 8) & 0xFF;
            var toB = toColor & 0xFF;
            var resultA = fromA * q + toA * t;
            var resultR = fromR * q + toR * t;
            var resultG = fromG * q + toG * t;
            var resultB = fromB * q + toB * t;
            var resultColor = resultA << 24 | resultR << 16 | resultG << 8 | resultB;
            return resultColor;
        };
        MathUtils.abs = function (num) {
            return num < 0 ? -num : num;
        };
        /**
         * returns -1 for negative numbers, 1 for positive (zero included)
         */
        MathUtils.sign = function (num) {
            return num < 0 ? -1 : 1;
        };
        /**
         * quick and dirty wrap around. returns a positive value.
         */
        MathUtils.Repeat = function (value, range) {
            var val = value;
            while (val < 0) {
                val += range;
            }
            ;
            return val % range;
        };
        // robert penner's formula for a log of variable base
        MathUtils.logx = function (val, base) {
            if (base === void 0) { base = 10; }
            return Math.log(val) / Math.log(base);
        };
        /**
         * Evaluate quadratic curve ( f(x)=y ) for x = t
         * a = start
         * b = control
         * c = end
         */
        MathUtils.evaluateQuadraticCurve = function (a, b, c, t) {
            if (t === void 0) { t = 0; }
            return (1 - t) * (1 - t) * a + 2 * (1 - t) * t * b + t * t * c;
        };
        /**
         * Evaluate cubic curve ( f(x)=y ) for x = t
         * a = start
         * b = first control
         * c = second control
         * d = end
         */
        MathUtils.evaluateCubicCurve = function (a, b, c, d, t) {
            if (t === void 0) { t = 0; }
            return a + (-a * 3 + t * (3 * a - a * t)) * t + (3 * b + t * (-6 * b + b * 3 * t)) * t + (c * 3 - c * 3 * t) * t * t + d * t * t * t;
        };
        /**
         * http://www.robertpenner.com/easing/
         * t current time
         * b start value
         * c change in value
         * d duration
         */
        MathUtils.easeInQuad = function (t, b, c, d) {
            return c * (t /= d) * t + b;
        };
        MathUtils.easeOutQuad = function (t, b, c, d) {
            return -c * (t /= d) * (t - 2) + b;
        };
        MathUtils.easeInCubic = function (t, b, c, d) {
            return c * (t /= d) * t * t + b;
        };
        MathUtils.easeOutCubic = function (t, b, c, d) {
            return c * ((t = t / d - 1) * t * t + 1) + b;
        };
        MathUtils.easeInQuart = function (t, b, c, d) {
            return c * (t /= d) * t * t * t + b;
        };
        MathUtils.easeOutQuart = function (t, b, c, d) {
            return -c * ((t = t / d - 1) * t * t * t - 1) + b;
        };
        return MathUtils;
    }());
    xgame.MathUtils = MathUtils;
    __reflect(MathUtils.prototype, "xgame.MathUtils");
})(xgame || (xgame = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-19
*************************************************/

(function (xgame) {
    var EXCLUDES = ["__meta__", "__class__", "__types__", "__xgame_attributes__", "__ns__", "__implements__", "__xlisteners__", "__xbindables__"];
    function isEmptyFunction(prototype, key) {
        if (typeof prototype[key] != "function") {
            return false;
        }
        var body = prototype[key].toString();
        var index = body.indexOf("{");
        var lastIndex = body.lastIndexOf("}");
        body = body.substring(index + 1, lastIndex);
        return body.trim() == "";
    }
    function mixin() {
        var templates = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            templates[_i] = arguments[_i];
        }
        return function (target) {
            for (var _i = 0, templates_1 = templates; _i < templates_1.length; _i++) {
                var template = templates_1[_i];
                __mixin__(target, template);
            }
        };
    }
    xgame.mixin = mixin;
    function __mixin__(target, template) {
        for (var property in template) {
            if (property != "prototype" && template.hasOwnProperty(property)) {
                target[property] = template[property];
            }
        }
        var prototype = target.prototype;
        var protoBase = template.prototype;
        var keys = Object.keys(protoBase);
        var length = keys.length;
        for (var i = 0; i < length; i++) {
            var key = keys[i];
            if (EXCLUDES.indexOf(key) >= 0) {
                continue;
            }
            if (!prototype.hasOwnProperty(key) || isEmptyFunction(prototype, key)) {
                var value = Object.getOwnPropertyDescriptor(protoBase, key);
                Object.defineProperty(prototype, key, value);
            }
        }
    }
    xgame.__mixin__ = __mixin__;
})(xgame || (xgame = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-19
*************************************************/

(function (xgame) {
    var StringUtils = (function () {
        function StringUtils() {
        }
        StringUtils.html2Escape = function (html) {
            var entities = { '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;' };
            return html.replace(/[<>&"]/g, function (c) {
                return entities[c];
            });
        };
        StringUtils.escape2Html = function (html) {
            var entities = { 'lt': '<', 'gt': '>', 'nbsp': ' ', 'amp': '&', 'quot': '"' };
            return html.replace(/&(lt|gt|nbsp|amp|quot);/ig, function (c) {
                return entities[c];
            });
        };
        StringUtils.nbsp2Space = function (html) {
            var entities = { 'nbsp': ' ' };
            return html.replace(/&(nbsp);/ig, function (c) {
                return entities[c];
            });
        };
        StringUtils.format = function (value) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            var reg;
            var len = args.length;
            for (var i = 0; i < len; i++) {
                if (StringUtils.reg_caches[i]) {
                    reg = StringUtils.reg_caches[i];
                }
                else {
                    reg = new RegExp("\\{" + i + "\\}", "gm");
                    StringUtils.reg_caches[i] = reg;
                }
                value = value.replace(reg, args[i]);
            }
            return value;
        };
        StringUtils.beginWiths = function (originstr, beginstr) {
            var index = originstr.indexOf(beginstr);
            if (index == 0) {
                return true;
            }
            return false;
        };
        StringUtils.endWiths = function (originstr, endstr) {
            var str = originstr.slice(originstr.length - endstr.length);
            if (str == endstr) {
                return true;
            }
            return false;
        };
        StringUtils.trim = function (str, all) {
            str = str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
            if (all) {
                str = str.replace(/\s+/g, '');
            }
            return str;
        };
        StringUtils.eraseHtml = function (str) {
            return str.replace(/<\/?.+?>/g, "");
        };
        StringUtils.reg_caches = [];
        return StringUtils;
    }());
    xgame.StringUtils = StringUtils;
    __reflect(StringUtils.prototype, "xgame.StringUtils");
    String.prototype["beginWiths"] = function (str) {
        return StringUtils.beginWiths(this, str);
    };
    String.prototype["endWiths"] = function (str) {
        return StringUtils.endWiths(this, str);
    };
    String.prototype["trim"] = function (all) {
        return StringUtils.trim(this, all);
    };
    String.prototype["eraseHtml"] = function () {
        return StringUtils.eraseHtml(this);
    };
    String.prototype["html2Escape"] = function () {
        return StringUtils.html2Escape(this);
    };
    String.prototype["escape2Html"] = function () {
        return StringUtils.escape2Html(this);
    };
    String.prototype["nbsp2Space"] = function () {
        return StringUtils.nbsp2Space(this);
    };
    String.prototype["format"] = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return StringUtils.format.apply(StringUtils, [this].concat(args));
    };
    String.prototype['padLeft'] = function (len, separator) {
        if (separator == undefined) {
            separator = ' ';
        }
        var s = this + '';
        if (s.length < len) {
            return new Array(len - s.length + 1).join(separator) + s;
        }
        return s;
    };
    String.prototype['padRight'] = function (len, separator) {
        if (separator == undefined) {
            separator = ' ';
        }
        var s = this + '';
        if (s.length < len) {
            return s + new Array(len - s.length + 1).join(separator);
        }
        return s;
    };
})(xgame || (xgame = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-20
*************************************************/
/// <reference path="../../interfaces/IXObject.ts" />

(function (xgame) {
    xgame.IXTaskManager = Symbol.for("IXTaskManager");
})(xgame || (xgame = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-23
*************************************************/

(function (xgame) {
    xgame.IXTaskManagerInternal = Symbol.for("IXTaskManagerInternal");
})(xgame || (xgame = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-20
*************************************************/
/// <reference path="../utils/Singleton.ts" />
/// <reference path="../scheduler/SchedulerManager.ts" />
/// <reference path="./interfaces/IXTaskManager.ts" />
/// <reference path="./interfaces/IXTaskManagerInternal.ts" />

(function (xgame) {
    var XTaskManager = (function (_super) {
        __extends(XTaskManager, _super);
        function XTaskManager() {
            var _this = _super.call(this) || this;
            _this.isRunning = true;
            return _this;
        }
        XTaskManager.prototype.initialize = function () {
            this.mainTask = new xgame.MainTask();
            xgame.SchedulerManager.Instance().registerUpdate(this.onUpdate, this);
        };
        XTaskManager.prototype.onUpdate = function () {
            if (!this.isRunning) {
                return;
            }
            this.mainTask.mainLoop();
        };
        XTaskManager.prototype.addTask = function (onMainRunning, task, life) {
            if (life === void 0) { life = 0; }
            var item = this.mainTask.addTask(task, life);
            item.onMainRunning = onMainRunning;
            return item;
        };
        XTaskManager.prototype.removeTask = function (task) {
            this.mainTask.removeTask(task);
        };
        XTaskManager.prototype.pause = function () {
            this.isRunning = false;
        };
        XTaskManager.prototype.resume = function () {
            this.isRunning = true;
        };
        XTaskManager = __decorate([
            xgame.impl(xgame.IXTaskManager),
            __metadata("design:paramtypes", [])
        ], XTaskManager);
        return XTaskManager;
    }(xgame.Singleton));
    xgame.XTaskManager = XTaskManager;
    __reflect(XTaskManager.prototype, "xgame.XTaskManager", ["xgame.IXTaskManager", "xgame.IXObject", "xgame.IXTaskManagerInternal"]);
})(xgame || (xgame = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-20
*************************************************/

(function (xgame) {
    var XTaskResult;
    (function (XTaskResult) {
        XTaskResult[XTaskResult["Invalidate"] = 0] = "Invalidate";
        XTaskResult[XTaskResult["Success"] = 1] = "Success";
        XTaskResult[XTaskResult["Failure"] = 2] = "Failure";
    })(XTaskResult = xgame.XTaskResult || (xgame.XTaskResult = {}));
})(xgame || (xgame = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-20
*************************************************/

(function (xgame) {
    var XTaskMode;
    (function (XTaskMode) {
        XTaskMode[XTaskMode["Parallel"] = 1] = "Parallel";
        XTaskMode[XTaskMode["Selector"] = 2] = "Selector";
        XTaskMode[XTaskMode["Sequence"] = 3] = "Sequence";
        XTaskMode[XTaskMode["RacingSequence"] = 4] = "RacingSequence";
    })(XTaskMode = xgame.XTaskMode || (xgame.XTaskMode = {}));
})(xgame || (xgame = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-20
*************************************************/

(function (xgame) {
    var XTaskState;
    (function (XTaskState) {
        XTaskState[XTaskState["UnInitialize"] = 1] = "UnInitialize";
        XTaskState[XTaskState["Initialized"] = 2] = "Initialized";
        XTaskState[XTaskState["Validated"] = 3] = "Validated";
        XTaskState[XTaskState["Executing"] = 4] = "Executing";
        XTaskState[XTaskState["SelfCompleted"] = 5] = "SelfCompleted";
        XTaskState[XTaskState["Failured"] = 6] = "Failured";
        XTaskState[XTaskState["Completed"] = 7] = "Completed";
    })(XTaskState = xgame.XTaskState || (xgame.XTaskState = {}));
})(xgame || (xgame = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-20
*************************************************/

(function (xgame) {
    var XTaskLifeMode;
    (function (XTaskLifeMode) {
        XTaskLifeMode[XTaskLifeMode["Infinite"] = 1] = "Infinite";
        XTaskLifeMode[XTaskLifeMode["Limit"] = 2] = "Limit";
    })(XTaskLifeMode = xgame.XTaskLifeMode || (xgame.XTaskLifeMode = {}));
})(xgame || (xgame = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-20
*************************************************/
/// <reference path="../../core/XObject.ts" />
/// <reference path="../structs/XTaskMode.ts" />
/// <reference path="../structs/XTaskState.ts" />
/// <reference path="../structs/XTaskResult.ts" />
/// <reference path="../structs/XTaskLifeMode.ts" />

(function (xgame) {
    xgame.IXTask = Symbol.for("IXTask");
})(xgame || (xgame = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-20
*************************************************/
/// <reference path="../../core/Locker.ts" />
/// <reference path="../../utils/Dictionary.ts" />
/// <reference path="../structs/XTaskResult.ts" />
/// <reference path="../interfaces/IXTask.ts" />

(function (xgame) {
    var Dictionary = xgame.Dictionary;
    var XTask = (function (_super) {
        __extends(XTask, _super);
        function XTask(mode, life) {
            if (mode === void 0) { mode = xgame.XTaskMode.Parallel; }
            if (life === void 0) { life = 0; }
            var _this = _super.call(this) || this;
            _this.isMain = false;
            _this.isRoot = false;
            _this.children = new Dictionary();
            _this.countCompleted = 0;
            _this.walkIndex = 0;
            _this.currentChildComplete = 0;
            _this.currentComplete = 0;
            _this.$forRemoves = [];
            _this.$forResets = [];
            _this.setTaskState(xgame.XTaskState.UnInitialize);
            _this.mode = mode;
            _this.lifeCount = life;
            _this.result = xgame.XTaskResult.Invalidate;
            _this.lifeMode = life > 0 ? xgame.XTaskLifeMode.Limit : xgame.XTaskLifeMode.Infinite;
            return _this;
        }
        Object.defineProperty(XTask.prototype, "root", {
            get: function () {
                var parent = this;
                while (parent) {
                    if (parent && parent.isRoot) {
                        return parent;
                    }
                    parent = parent.parent;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(XTask.prototype, "childCount", {
            get: function () {
                return this.children.length;
            },
            enumerable: true,
            configurable: true
        });
        XTask.prototype.setDelegate = function (delegate) {
            this.$delegate = delegate;
        };
        XTask.prototype.addTask = function (task, mode, life) {
            var _this = this;
            if (mode === void 0) { mode = xgame.XTaskMode.Parallel; }
            if (life === void 0) { life = 0; }
            this.simple(function () {
                var item = task;
                if (typeof (task) == "function") {
                    item = new task(mode, life);
                }
                item.parent = _this;
                if (_this.isMain) {
                    item.isRoot = true;
                }
                _this.children.add(item.hashCode, item);
            }, this);
        };
        XTask.prototype.removeTask = function (task) {
            var _this = this;
            this.simple(function () {
                var hashCode = task;
                if (typeof (task) != "number") {
                    hashCode = task.hashCode;
                }
                if (_this.children.containsKey(hashCode)) {
                    var value = _this.children.remove(hashCode);
                    value.parent = undefined;
                }
            }, this);
        };
        XTask.prototype.mainLoop = function () {
            this.checkRemoves();
            this.checkResets();
            if (this.state == xgame.XTaskState.SelfCompleted && this.childCount > 0) {
                this.currentChildComplete = 0;
                this.currentComplete = this.childCount;
                if (this.mode == xgame.XTaskMode.Selector) {
                    this.currentComplete = 1;
                }
                for (var i = this.walkIndex; i < this.childCount; i++) {
                    var task = this.children.indexValue(i);
                    this.walkTask(task);
                    if (this.mode == xgame.XTaskMode.Sequence || this.mode == xgame.XTaskMode.RacingSequence) {
                        if (this.mode == xgame.XTaskMode.Sequence && task.state != xgame.XTaskState.Completed) {
                            break;
                        }
                        if (task.state == xgame.XTaskState.Executing) {
                            this.walkIndex = i;
                            break;
                        }
                        if (task.state == xgame.XTaskState.Completed) {
                            if (this.walkIndex < this.childCount - 1) {
                                this.walkIndex++;
                            }
                            break;
                        }
                    }
                    else if (this.mode == xgame.XTaskMode.Selector) {
                        if (task.state == xgame.XTaskState.Validated || task.state == xgame.XTaskState.Executing) {
                            this.walkIndex = i;
                            break;
                        }
                        if (task.state == xgame.XTaskState.SelfCompleted || task.state == xgame.XTaskState.Completed) {
                            break;
                        }
                    }
                }
                this.CheckComplete();
            }
        };
        XTask.prototype.initialize = function () {
            this.setTaskState(xgame.XTaskState.Initialized);
            this.walkIndex = 0;
            this.currentChildComplete = 0;
            this.currentComplete = 0;
            if (this.$delegate && this.$delegate.initialize) {
                this.$delegate.initialize(this);
            }
        };
        XTask.prototype.validate = function () {
            if (this.$delegate && this.$delegate.validate) {
                return this.$delegate.validate(this);
            }
            return true;
        };
        XTask.prototype.execute = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/];
                });
            });
        };
        XTask.prototype.update = function () {
            if (this.$delegate && this.$delegate.update) {
                this.$delegate.update(this);
            }
        };
        XTask.prototype.selfComplete = function (result) {
            if (result === void 0) { result = xgame.XTaskResult.Success; }
            this.setTaskState(xgame.XTaskState.SelfCompleted);
            this.result = result;
            if (this.$delegate && this.$delegate.selfComplete) {
                this.$delegate.selfComplete(this);
            }
        };
        XTask.prototype.complete = function () {
            this.setTaskState(xgame.XTaskState.Completed);
            this.countCompleted++;
            var parent = this.parent;
            if (parent && parent.isMain && this.onMainRunning) {
                xgame.XTaskManager.Instance().mainTask.unlock(this);
            }
            if (this.$delegate && this.$delegate.complete) {
                this.$delegate.complete(this);
            }
        };
        XTask.prototype.failure = function () {
            this.setTaskState(xgame.XTaskState.Failured);
            var parent = this.parent;
            if (parent && parent.isMain && this.onMainRunning) {
                xgame.XTaskManager.Instance().mainTask.unlock(this);
            }
            if (this.$delegate && this.$delegate.failure) {
                this.$delegate.failure(this);
            }
        };
        XTask.prototype.reset = function () {
            this.result = xgame.XTaskResult.Invalidate;
            this.setTaskState(xgame.XTaskState.Initialized);
            this.walkIndex = 0;
            this.currentChildComplete = 0;
            this.currentComplete = 0;
            this.children.forValues(function (value) {
                value.reset();
            });
            if (this.$delegate && this.$delegate.reset) {
                this.$delegate.reset(this);
            }
        };
        //================================================
        //protected functions
        //================================================
        XTask.prototype.setTaskState = function (state) {
            var _this = this;
            this.simple(function () {
                _this.state = state;
            }, this);
        };
        XTask.prototype.internalExecute = function () {
            return __awaiter(this, void 0, void 0, function () {
                var parent;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.setTaskState(xgame.XTaskState.Executing);
                            parent = this.parent;
                            if (parent.isMain && this.onMainRunning) {
                                xgame.XTaskManager.Instance().mainTask.lock(this);
                            }
                            return [4 /*yield*/, this.execute()];
                        case 1:
                            _a.sent();
                            if (!(this.$delegate && this.$delegate.execute)) return [3 /*break*/, 3];
                            return [4 /*yield*/, this.$delegate.execute(this)];
                        case 2:
                            _a.sent();
                            _a.label = 3;
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        XTask.prototype.walkTask = function (task) {
            var isMainLocked = this.isMain && xgame.XTaskManager.Instance().mainTask.isLockTask(task);
            switch (task.state) {
                case xgame.XTaskState.UnInitialize:
                    task.initialize();
                    break;
                case xgame.XTaskState.Initialized:
                    if (!isMainLocked) {
                        if (task.validate()) {
                            task.state = xgame.XTaskState.Validated;
                        }
                    }
                    break;
                case xgame.XTaskState.Validated:
                    if (!isMainLocked) {
                        task.internalExecute();
                    }
                    break;
                case xgame.XTaskState.Executing:
                    if (!isMainLocked) {
                        task.update();
                    }
                    break;
                case xgame.XTaskState.SelfCompleted:
                    if (task.childCount == 0) {
                        if (task.result == xgame.XTaskResult.Success) {
                            task.complete();
                        }
                        else {
                            task.failure();
                        }
                    }
                    break;
                case xgame.XTaskState.Completed:
                    this.currentChildComplete++;
                    var removed = false;
                    if (task.result == xgame.XTaskResult.Success && task.lifeMode == xgame.XTaskLifeMode.Limit) {
                        task.lifeCount--;
                        if (task.lifeCount <= 0) {
                            removed = true;
                        }
                    }
                    if (!removed) {
                        if (this.isMain) {
                            this.$forResets.push(task.hashCode);
                        }
                    }
                    else {
                        this.$forRemoves.push(task.hashCode);
                    }
                    break;
                case xgame.XTaskState.Failured:
                    break;
                default:
                    break;
            }
            task.mainLoop();
        };
        Object.defineProperty(XTask.prototype, "isSelfCompleteSucceed", {
            get: function () {
                return this.state == xgame.XTaskState.SelfCompleted && this.result == xgame.XTaskResult.Success;
            },
            enumerable: true,
            configurable: true
        });
        XTask.prototype.CheckComplete = function () {
            if (this.isSelfCompleteSucceed && this.childCount > 0) {
                if (this.mode == xgame.XTaskMode.Sequence || this.mode == xgame.XTaskMode.RacingSequence) {
                    var last = this.children.last().value;
                    if (last.state == xgame.XTaskState.Completed) {
                        this.complete();
                    }
                }
                else {
                    if (this.currentChildComplete >= this.currentComplete) {
                        this.complete();
                    }
                }
            }
        };
        //================================================
        //private functions
        //================================================
        XTask.prototype.checkResets = function () {
            while (this.$forResets.length) {
                var hashCode = this.$forResets.shift();
                if (this.children.containsKey(hashCode)) {
                    var value = this.children.get(hashCode);
                    value.reset();
                }
            }
        };
        XTask.prototype.checkRemoves = function () {
            while (this.$forRemoves.length) {
                var hashCode = this.$forRemoves.shift();
                this.removeTask(hashCode);
            }
        };
        XTask = __decorate([
            xgame.impl(xgame.IXTask),
            __metadata("design:paramtypes", [Number, Number])
        ], XTask);
        return XTask;
    }(xgame.Locker));
    xgame.XTask = XTask;
    __reflect(XTask.prototype, "xgame.XTask", ["xgame.IXTask", "xgame.IXObject"]);
})(xgame || (xgame = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-20
*************************************************/
/// <reference path="./XTask.ts" />
/// <reference path="../interfaces/IXTask.ts" />

(function (xgame) {
    var MainTask = (function (_super) {
        __extends(MainTask, _super);
        function MainTask() {
            var _this = _super.call(this, xgame.XTaskMode.Parallel, 0) || this;
            _this.isLocked = false;
            _this.$idWithLocked = 0;
            _this.name = "MainTask";
            _this.isMain = true;
            return _this;
        }
        MainTask.prototype.isLockTask = function (task) {
            return task.onMainRunning && task.parent == this && this.isLocked && this.$idWithLocked != task.hashCode;
        };
        MainTask.prototype.lock = function (task) {
            var _this = this;
            this.simple(function () {
                _this.isLocked = true;
                _this.$idWithLocked = task.hashCode;
            }, this);
        };
        MainTask.prototype.unlock = function (task) {
            var _this = this;
            this.simple(function () {
                _this.isLocked = false;
                _this.$idWithLocked = 0;
            }, this);
        };
        MainTask.prototype.initialize = function () {
            this.setTaskState(xgame.XTaskState.SelfCompleted);
        };
        MainTask.prototype.validate = function () {
            return true;
        };
        MainTask.prototype.reset = function () {
        };
        MainTask.prototype.complete = function () {
        };
        MainTask = __decorate([
            xgame.impl(xgame.IXTask),
            __metadata("design:paramtypes", [])
        ], MainTask);
        return MainTask;
    }(xgame.XTask));
    xgame.MainTask = MainTask;
    __reflect(MainTask.prototype, "xgame.MainTask");
})(xgame || (xgame = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-20
*************************************************/
/// <reference path="./IXTask.ts" />

(function (xgame) {
    xgame.IXTaskDelegate = Symbol.for("IXTaskDelegate");
})(xgame || (xgame = {}));
