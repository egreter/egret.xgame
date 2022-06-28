/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-19
*************************************************/
module xgame {
    export class StringUtils {
        public static html2Escape(html: string): string {
            let entities: any = { '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;' };
            return html.replace(/[<>&"]/g, (c: string) => {
                return entities[c];
            });
        }
        public static escape2Html(html: string): string {
            let entities: any = { 'lt': '<', 'gt': '>', 'nbsp': ' ', 'amp': '&', 'quot': '"' };
            return html.replace(/&(lt|gt|nbsp|amp|quot);/ig, (c: string) => {
                return entities[c];
            });
        }
        public static nbsp2Space(html: string): string {
            let entities: any = { 'nbsp': ' ' };
            return html.replace(/&(nbsp);/ig, (c: string) => {
                return entities[c]
            });
        }
        private static reg_caches: RegExp[] = [];
        public static format(value: string, ...args): string {
            var reg: RegExp;
            var len: number = args.length;
            for (var i: number = 0; i < len; i++) {
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
        }
        public static beginWiths(originstr: string, beginstr: string): boolean {
            let index: number = originstr.indexOf(beginstr);
            if (index == 0) {
                return true;
            }
            return false;
        }
        public static endWiths(originstr: string, endstr: string): boolean {
            let str = originstr.slice(originstr.length - endstr.length);
            if (str == endstr) {
                return true;
            }
            return false;
        }
        public static trim(str: string, all?: boolean): string {
            str = str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
            if (all) {
                str = str.replace(/\s+/g, '');
            }
            return str;
        }
        public static eraseHtml(str: string): string {
            return str.replace(/<\/?.+?>/g, "");
        }
    }

    String.prototype["beginWiths"] = function (str: string): boolean {
        return StringUtils.beginWiths(this, str);
    }

    String.prototype["endWiths"] = function (str: string): boolean {
        return StringUtils.endWiths(this, str);
    }

    String.prototype["trim"] = function (all?: boolean): string {
        return StringUtils.trim(this, all);
    }

    String.prototype["eraseHtml"] = function (): string {
        return StringUtils.eraseHtml(this);
    }
    String.prototype["html2Escape"] = function (): string {
        return StringUtils.html2Escape(this);
    }
    String.prototype["escape2Html"] = function (): string {
        return StringUtils.escape2Html(this);
    }
    String.prototype["nbsp2Space"] = function (): string {
        return StringUtils.nbsp2Space(this);
    }

    String.prototype["format"] = function (...args: any[]): string {
        return StringUtils.format(this, ...args);
    }
    String.prototype['padLeft'] = function (len: number, separator?: string) {
        if (separator == undefined) {
            separator = ' ';
        }
        let s = this + '';
        if (s.length < len) {
            return new Array(len - s.length + 1).join(separator) + s;
        }
        return s;
    }
    String.prototype['padRight'] = function (len: number, separator?: string) {
        if (separator == undefined) {
            separator = ' ';
        }
        let s = this + '';
        if (s.length < len) {
            return s + new Array(len - s.length + 1).join(separator);
        }
        return s;
    }
}