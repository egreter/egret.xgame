/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-19
*************************************************/
module xgame {
    export class MathParser extends XObject {
        public success: boolean;
        public errormsg: string;
        private expression: string;

        private pos: number = 0;

        private tokennumber: number;
        private tokenprio: number = 0;
        private tokenindex: number = 0;
        private tmpprio: number = 0;

        private funcs1: string[] = ["sin", "cos", "tan", "asin", "acos", "atan", "sqrt", "log", "abs", "ceil", "floor", "round", "random", "fac"];
        private _funcs1: Function[] = [this._sin, this._cos, this._tan, this._asin, this._acos, this._atan, this._sqrt, this._log, this._abs, this._ceil, this._floor, this._round, this._random, this._fac];

        private funcs2: string[] = ["min", "max", "pyt"];
        private _funcs2: Function[] = [this._min, this._max, this._pyt, this._add, this._sub, this._mult, this._div, this._mod, this._pow];

        private consts: string[] = ["E", "PI"];
        private constvalues: number[] = [Math.E, Math.PI];

        private TNUMBER: number = 0;
        private TFUNC1: number = 1;
        private TFUNC2: number = 2;
        private TVAR: number = 3;
        public constructor(protected varnames: string[]) {
            super();
        }
        public parse(expr: string): Token[] {
            this.errormsg = "";
            this.success = true;
            let operstack: Token[] = [];
            let tokenstack: Token[] = [];
            this.tmpprio = 0;
            let expected: number[] = [1, 0, 1, 1, 0, 0, 1];
            let noperators: number = 0;
            this.expression = expr;
            this.pos = 0;
            while (this.pos < this.expression.length) {
                if (this.isOperator()) {
                    if (this.isSign() && expected[6] == 1) {
                        let mintoken: Token = new Token(this.TNUMBER, 0, 0, -1);
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
                    let token: Token = new Token(this.TNUMBER, 0, 0, this.tokennumber);
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
                    let consttoken: Token = new Token(this.TNUMBER, 0, 0, this.tokennumber);
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
                    let vartoken: Token = new Token(this.TVAR, this.tokenindex, 0, 0);
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
                let tmp: Token = operstack.pop();
                tokenstack.push(tmp);
            }
            if (noperators + 1 != tokenstack.length) {
                this.error_parsing(this.pos, "parity");
                return [];
            }
            return tokenstack;
        }

        public simplify(parsedexpression: Token[]): Token[] {
            let nstack: Token[] = [];
            let newexpression: Token[] = [];
            let n1: Token;
            let n2: Token;
            let f: Function;
            let L: number = parsedexpression.length;
            let item: Token;
            let i: number = 0;
            for (i = 0; i < L; i++) {
                item = parsedexpression[i];
                let type_: number = item.type_;
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
        }

        public eval(pexpression: Token[], values: number[]): number {
            let nstack: number[] = [];
            let n1: number;
            let n2: number;
            let f: Function;
            let L: number = pexpression.length;
            let item: Token;
            let i: number = 0;
            for (i = 0; i < L; i++) {
                item = pexpression[i];
                let type_: number = item.type_;
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
        }

        private addfunc(tokenstack: Token[], operstack: Token[], type_: number): void {
            let operator: Token = new Token(type_, this.tokenindex, this.tokenprio + this.tmpprio, 0);
            while (operstack.length > 0) {
                if (operator.prio_ <= operstack[operstack.length - 1].prio_) {
                    tokenstack.push(operstack.pop());
                }
                else {
                    break;
                }
            }
            operstack.push(operator);
        }

        private error_parsing(column: number, msg: string): void {
            this.success = false;
            this.errormsg = "parse error [column " + (column) + "]: " + msg;
            console.log(this.errormsg);
        }

        private isNumber(): boolean {
            let r: boolean = false;
            let str: string = "";
            while (this.pos < this.expression.length) {
                let code: number = this.expression.charCodeAt(this.pos);
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
        }

        private isConst(): boolean {
            let str: string;
            for (let i: number = 0; i < this.consts.length; i++) {
                str = this.expression.substr(this.pos, this.consts[i].length);
                if (this.consts[i] == str) {
                    this.tokennumber = this.constvalues[i];
                    this.pos += str.length;
                    return true;
                }
            }
            return false;
        }

        private isOperator(): boolean {
            let code: number = this.expression.charCodeAt(this.pos);
            if (code == 43) { // +
                this.tokenprio = 0;
                this.tokenindex = 3;
            }
            else if (code == 45) { // -
                this.tokenprio = 0;
                this.tokenindex = 4;
            }
            else if (code == 42) { // *
                this.tokenprio = 1;
                this.tokenindex = 5;
            }
            else if (code == 47) { // /
                this.tokenprio = 2;
                this.tokenindex = 6;
            }
            else if (code == 37) { // %
                this.tokenprio = 2;
                this.tokenindex = 7;
            }
            else if (code == 94) { // ^
                this.tokenprio = 3;
                this.tokenindex = 8;
            }
            else {
                return false;
            }
            this.pos++;
            return true;
        }

        private isSign(): boolean {
            let code: number = this.expression.charCodeAt(this.pos - 1);
            if (code == 45) {
                return true;
            }
            return false;
        }

        private isLeftParenth(): boolean {
            let code: number = this.expression.charCodeAt(this.pos);
            if (code == 40) {
                this.pos++;
                this.tmpprio += 10;
                return true;
            }
            return false;
        }

        private isRightParenth(): boolean {
            let code: number = this.expression.charCodeAt(this.pos);
            if (code == 41) {
                this.pos++;
                this.tmpprio -= 10;
                return true;
            }
            return false;
        }

        private isComma(): boolean {
            let code: number = this.expression.charCodeAt(this.pos);
            if (code == 44) {
                this.pos++;
                return true;
            }
            return false;
        }

        private isWhite(): boolean {
            let code: number = this.expression.charCodeAt(this.pos);
            if (code == 32) {
                this.pos++;
                return true;
            }
            return false;
        }

        private isFunc1(): boolean {
            let str: string;
            for (let i: number = 0; i < this.funcs1.length; i++) {
                let L: number = this.funcs1[i].length;
                str = this.expression.substr(this.pos, L);
                if (this.funcs1[i] == str) {
                    this.tokenindex = i;
                    this.tokenprio = 5;
                    this.pos += L;
                    return true;
                }
            }
            return false;
        }

        private isFunc2(): boolean {
            let str: string;
            for (let i: number = 0; i < this.funcs2.length; i++) {
                let L: number = this.funcs2[i].length;
                str = this.expression.substr(this.pos, L);
                if (this.funcs2[i] == str) {
                    this.tokenindex = i;
                    this.tokenprio = 5;
                    this.pos += L;
                    return true;
                }
            }
            return false;
        }

        private isVar(): boolean {
            let str: string = "";
            for (let i: number = 0; i < this.varnames.length; i++) {
                str = this.expression.substr(this.pos, this.varnames[i].length);
                if (this.varnames[i] == str) {
                    this.tokenindex = i;
                    this.tokenprio = 4;
                    this.pos += str.length;
                    return true;
                }
            }
            return false;
        }

        private isComment(): boolean {
            let code: number = this.expression.charCodeAt(this.pos - 1);
            if (code == 47 && this.expression.charCodeAt(this.pos) == 42) {
                this.pos = this.expression.indexOf("*/", this.pos) + 2;
                if (this.pos == 1) {
                    this.pos = this.expression.length;
                }
                return true;
            }
            return false;
        }

        private _add(a: number, b: number): number {
            return a + b;
        }

        private _sub(a: number, b: number): number {
            return a - b;
        }

        private _mult(a: number, b: number): number {
            return a * b;
        }

        private _div(a: number, b: number): number {
            return a / b;
        }

        private _mod(a: number, b: number): number {
            return a % b;
        }

        private _pow(a: number, b: number): number {
            return Math.pow(a, b);
        }

        private _sin(a: number): number {
            return Math.sin(a);
        }

        private _cos(a: number): number {
            return Math.cos(a);
        }

        private _tan(a: number): number {
            return Math.tan(a);
        }

        private _asin(a: number): number {
            return Math.asin(a);
        }

        private _acos(a: number): number {
            return Math.acos(a);
        }

        private _atan(a: number): number {
            return Math.atan(a);
        }

        private _sqrt(a: number): number {
            return Math.sqrt(a);
        }

        private _log(a: number): number {
            return Math.log(a);
        }

        private _abs(a: number): number {
            return Math.abs(a);
        }

        private _ceil(a: number): number {
            return Math.ceil(a);
        }

        private _floor(a: number): number {
            return Math.floor(a);
        }

        private _round(a: number): number {
            return Math.round(a);
        }

        private _random(a: number): number {
            return Math.random() * a;
        }

        private _fac(a: number): number {
            a = Math.floor(a);
            let b: number = a;
            while (a > 1) {
                b = b * (--a);
            }
            return b;
        }

        private _min(a: number, b: number): number {
            return Math.min(a, b);
        }

        private _max(a: number, b: number): number {
            return Math.max(a, b);
        }

        private _pyt(a: number, b: number): number {
            return Math.sqrt(a * a + b * b);
        }
    }
    export class Token {
        public constructor(public type_: number, public index_: number = 0, public prio_: number = 0, public number_: number = 0) {
        }
    }
}