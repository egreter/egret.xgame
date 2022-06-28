module xgame {
    function is_simple(k: any): boolean {
        let kt = typeof k;
        if (kt === "string" || kt === "number") {
            return true;
        }
        return false;
    }
    export class Dictionary<TK, TV> {
        private limit: number = 0;
        private __hashobjects__: any = {};
        private m_keys: TK[] = [];
        private m_values: TV[] = [];
        public constructor(limit?: number, keys?: TK[], values?: TV[]) {
            this.limit = limit ? limit : 0;
            if (keys && values && keys.length && values.length) {
                for (let i: number = 0; i < keys.length; i++) {
                    this.add(keys[i], values[i]);
                }
            }
        }
        public copy(source: Dictionary<TK, TV>): void {
            this.m_keys = source.keys;
            this.m_values = source.values;
            this.__hashobjects__ = {};
            if (this.m_keys.length && is_simple(this.m_keys[0])) {
                let len = this.m_keys.length;
                for (let i: number = 0; i < len; i++) {
                    this.mapset(this.m_keys[i], this.m_values[i]);
                }
            }
        }
        public get length(): number {
            return this.m_keys.length;
        }
        public first(): { key: TK; value: TV } {
            if (this.length > 0) {
                return { key: this.m_keys[0], value: this.m_values[0] };
            }
            return null;
        }
        public last(): { key: TK; value: TV } {
            if (this.length > 0) {
                return { key: this.m_keys[this.length - 1], value: this.m_values[this.length - 1] };
            }
            return null;
        }
        public shift(): { key: TK; value: TV } {
            if (this.length > 0) {
                let item = { key: this.m_keys.shift(), value: this.m_values.shift() };
                this.mapdelete(item.key);
                return item;
            }
            return null;
        }
        public pop(): { key: TK; value: TV } {
            if (this.length > 0) {
                let item = { key: this.m_keys.pop(), value: this.m_values.pop() };
                this.mapdelete(item.key);
                return item;
            }
            return null;
        }
        public get values(): TV[] {
            return this.m_values.concat();
        }

        public get keys(): TK[] {
            return this.m_keys.concat();
        }
        public containsKey(key: TK): boolean {
            if (is_simple(key)) {
                return this.__hashobjects__[key] !== undefined;
            }
            let indexOf: number = this.indexOfKey(key);
            if (indexOf >= 0) {
                return true;
            }
            return false;
        }
        public indexOfKey(key: TK): number {
            return this.m_keys.indexOf(key);
        }
        public containsValue(value: TV): boolean {
            let indexOf: number = this.indexOfValue(value);
            if (indexOf >= 0) {
                return true;
            }
            return false;
        }
        public sortByKey(compare_handler: (a: TK, b: TK) => number): void {
            this.insertion_sort_for_key(compare_handler);
        }
        public sortByValue(compare_handler: (a: TV, b: TV) => number): void {
            this.insertion_sort_for_value(compare_handler);
        }
        public indexOfValue(value: TV): number {
            return this.m_values.indexOf(value);
        }

        public getKeyByValue(value: TV): any {
            return this.m_keys[this.indexOfValue(value)];
        }
        public set(key: TK, value: TV): void {
            if (is_simple(key) && !this.containsKey(key)) {
                this.add(key, value);
                return;
            }
            let indexOf: number = this.indexOfKey(key);
            if (indexOf >= 0) {
                this.m_values[indexOf] = value;
                this.mapset(key, value);
            } else {
                this.add(key, value);
            }
        }

        public add(key: TK, value: TV): void {
            this.checkRepeat(key, value);
            this.m_keys.push(key);
            this.m_values.push(value);
            this.mapset(key, value);
            if (this.limit) {
                this.checkLimit();
            }
        }
        public unshift(key: TK, value: TV): void {
            this.checkRepeat(key, value);
            this.m_keys.unshift(key);
            this.m_values.unshift(value);
            this.mapset(key, value);
            if (this.limit) {
                this.checkLimit();
            }
        }
        public push(key: TK, value: TV): void {
            this.checkRepeat(key, value);
            this.m_keys.push(key);
            this.m_values.push(value);
            this.mapset(key, value);
            if (this.limit) {
                this.checkLimit();
            }
        }

        public checkLimit(limit?: number, helper_handler?: (item: { key: TK; value: TV }) => void, helper_this?: any): void {
            if (!limit) {
                limit = this.limit;
            }
            if (limit && this.length > limit) {
                while (this.length > limit) {
                    let v = this.shift();
                    if (v && helper_handler) {
                        helper_handler.apply(helper_this, [v]);
                    }
                }
            }
        }
        public allocf(key: TK, defaultFactory: () => TV): TV {
            if (is_simple(key) && this.containsKey(key)) {
                return this.__hashobjects__[key];
            } else {
                let indexOf: number = this.indexOfKey(key);
                if (indexOf >= 0) {
                    return this.m_values[indexOf];
                }
            }
            let defaultValue: TV = defaultFactory();
            this.add(key, defaultValue);
            return defaultValue;
        }
        public alloc(key: TK, defaultValue: TV): TV {
            if (is_simple(key) && this.containsKey(key)) {
                return this.__hashobjects__[key];
            } else {
                let indexOf: number = this.indexOfKey(key);
                if (indexOf >= 0) {
                    return this.m_values[indexOf];
                }
            }
            this.add(key, defaultValue);
            return defaultValue;
        }
        public get(key: TK, defaultValue?: TV): TV {
            if (is_simple(key) && this.containsKey(key)) {
                return this.__hashobjects__[key];
            } else {
                let indexOf: number = this.indexOfKey(key);
                if (indexOf >= 0) {
                    return this.m_values[indexOf];
                }
            }
            return defaultValue;
        }

        public removeKeys(keys: TK[]): void {
            let len = keys.length;
            for (let i: number = 0; i < len; i++) {
                this.remove(keys[i]);
            }
        }

        public remove(key: TK): TV {
            let indexOf: number = this.indexOfKey(key);
            if (indexOf >= 0) {
                this.mapdelete(key);
                this.m_keys.splice(indexOf, 1);
                return this.m_values.splice(indexOf, 1)[0];
            }
            return null;
        }

        public removeByValue(value: TV): TK {
            let indexOf: number = this.indexOfValue(value);
            if (indexOf >= 0) {
                this.m_values.splice(indexOf, 1);
                let key = this.m_keys.splice(indexOf, 1)[0];
                this.mapdelete(key);
                return key;
            }
            return null;
        }

        public filter(keys: TK[], assist_handler?: (v: TV) => boolean, assist_thisObject?: any): TV[] {
            let rets: TV[] = [];
            for (let i: number = this.m_keys.length - 1; i >= 0; i--) {
                if (keys.indexOf(this.m_keys[i]) === -1) {
                    let flag: boolean = true;
                    let v = this.m_values[i];
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
        }

        public clear(recycle?: (item: TV) => void): void {
            if (recycle) {
                let len = this.m_values.length;
                for (let i: number = len - 1; i >= 0; i--) {
                    recycle(this.m_values[i]);
                }
            }
            if (this.length && is_simple(this.m_keys[0])) {
                this.__hashobjects__ = {};
            }
            this.m_keys.length = 0;
            this.m_values.length = 0;
        }

        public randomList(num: number = 5): TV[] {
            let list: TV[] = [];
            if (num > this.length) {
                num = this.length;
            }
            while (list.length < num) {
                let item = this.random();
                if (list.indexOf(item) === -1) {
                    list.push(item);
                }
            }
            return list;
        }
        public random(): TV {
            let index: number = (Math.random() * this.keys.length) << 0;
            return this.m_values[index];
        }
        public index(i: number): { key: TK; value: TV } {
            if (i < this.length) {
                return { key: this.m_keys[i], value: this.m_values[i] };
            }
            return null;
        }
        public indexKey(i: number): TK {
            if (i < this.length) {
                return this.m_keys[i];
            }
            return null;
        }
        public indexValue(i: number): TV {
            if (i < this.length) {
                return this.m_values[i];
            }
            return null;
        }
        public forEach(fn: (item: { key: TK; value: TV }, index: number) => boolean | void, thisObject?: any, reverse?: boolean): void {
            let len = this.length;
            let ret: boolean;
            if (reverse) {
                for (let i: number = len - 1; i >= 0; i--) {
                    ret = fn.apply(thisObject, [this.index(i), i]);
                    if (ret) {
                        break;
                    }
                }
            } else {
                for (let i: number = 0; i < len; i++) {
                    ret = fn.apply(thisObject, [this.index(i), i]);
                    if (ret) {
                        break;
                    }
                }
            }
        }
        public forKeys(fn: (key: TK, index: number) => boolean | void, thisObject?: any, reverse?: boolean): void {
            let len = this.length;
            let ret: boolean;
            if (reverse) {
                for (let i: number = len - 1; i >= 0; i--) {
                    ret = fn.apply(thisObject, [this.m_keys[i], i]);
                    if (ret) {
                        break;
                    }
                }
            } else {
                for (let i: number = 0; i < len; i++) {
                    ret = fn.apply(thisObject, [this.m_keys[i], i]);
                    if (ret) {
                        break;
                    }
                }
            }
        }
        public forValues(fn: (value: TV, index: number) => boolean | void, thisObject?: any, reverse?: boolean): void {
            let len = this.length;
            let ret: boolean;
            if (reverse) {
                for (let i: number = len - 1; i >= 0; i--) {
                    ret = fn.apply(thisObject, [this.m_values[i], i]);
                    if (ret) {
                        break;
                    }
                }
            } else {
                for (let i: number = 0; i < len; i++) {
                    ret = fn.apply(thisObject, [this.m_values[i], i]);
                    if (ret) {
                        break;
                    }
                }
            }
        }
        private insertion_sort_for_key(compare_handler: (a: TK, b: TK) => number): void {
            let len = this.m_keys.length;
            let preIndex: number;
            let current: TK;
            let current2: TV;
            for (let i = 1; i < len; i++) {
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
        }
        private insertion_sort_for_value(compare_handler: (a: TV, b: TV) => number): void {
            let len = this.m_values.length;
            let preIndex: number;
            let current: TV;
            let current2: TK;
            for (let i = 1; i < len; i++) {
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
        }

        private checkRepeat(key: TK, value: TV): boolean {
            if (!is_simple(key) || this.containsKey(key)) {
                let indexOf: number = this.indexOfKey(key);
                if (indexOf >= 0) {
                    this.m_values.splice(indexOf, 1);
                    this.m_keys.splice(indexOf, 1);
                }
                return true;
            }
            return false;
        }
        private mapdelete(key: TK): void {
            if (is_simple(key)) {
                delete this.__hashobjects__[key];
            }
        }
        private mapset(key: TK, value: TV): void {
            if (is_simple(key)) {
                this.__hashobjects__[key] = value;
            }
        }
    }
}