/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-07
*************************************************/
module xgame {
    export interface IDateInfo {
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
    export let DATE_HOUR_TIME: number = 3600;
    export let DATE_DAY_TIME: number = 86400;
    /**
     * 日期，时间戳管理器
     */
    export class DateTimeManager extends Singleton implements IDateTimeManager {
        public diffTimestamp: number = 0;
        //默认中国时区GMT+8
        public timeZone: number = 28800;
        public constructor() {
            super();
        }
        /**
         * 设置当前时间戳和时区偏差，一般是服务器时间和时区
         * @param timestamp 
         * @param timeZone 
         */
        public setNowTimestamp(timestamp: number, timeZone: number = 0): void {
            this.diffTimestamp = timestamp - Math.floor(new Date().valueOf() / 1000);
            this.timeZone = timeZone;
        }
        /**
         * 获得当前时间戳
         * @returns 
         */
        public getNowTimestamp(): number {
            return Math.floor(new Date().valueOf() / 1000) + this.diffTimestamp;
        }
        /**
         * 格式化日期和时间
         * @param formatString 
         * @param timestamp 
         * @returns 
         */
        public formatDateTime(formatString?: string, timestamp?: number): string {
            if (formatString == undefined) {
                formatString = "yyyy-MM-dd hh:mm:ss";
            }
            timestamp = timestamp || this.getNowTimestamp();
            timestamp = this.convertTimestamp(timestamp);
            timestamp *= 1000;
            let date = new Date(timestamp);
            let o = {
                "M+": date.getMonth() + 1, //月份 
                "d+": date.getDate(), //日 
                "h+": date.getHours(), //小时 
                "m+": date.getMinutes(), //分 
                "s+": date.getSeconds(), //秒 
                "S": date.getMilliseconds() //毫秒 
            };
            if (/(y+)/.test(formatString)) {
                formatString = formatString.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
            }
            for (let k in o) {
                if (new RegExp("(" + k + ")").test(formatString)) formatString = formatString.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            }
            return formatString;
        }
        /**
         * 格式化秒数
         * @param formatString 
         * @param time 
         * @returns 
         */
        public formatSeconds(formatString: string, time: number): string {
            let day = Math.floor(time / 86400);
            let hour = Math.floor(time % 86400 / 3600);
            let min = Math.floor(time % 3600 / 60);
            let sec = Math.floor(time % 60);
            if (!new RegExp("(d+)").test(formatString)) {
                hour += day * 24;
            }
            if (!new RegExp("(h+)").test(formatString)) {
                min += hour * 60;
            }
            let o = {
                "d+": day, //日 
                "h+": hour, //小时 
                "m+": min, //分 
                "s+": sec, //秒 
            };
            for (let k in o) {
                if (new RegExp("(" + k + ")").test(formatString)) {
                    formatString = formatString.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : ("" + o[k]).length == 1 ? "0" + o[k] : o[k]);
                }
            }
            return formatString;
        }
        /**
         * 转换时间戳
         * @param timestamp 
         * @param mode 
         * @returns 
         */
        public convertTimestamp(timestamp: number, mode?: boolean): number {
            const GMT: number = new Date().getTimezoneOffset() * 60;
            if (mode) {
                return timestamp - this.timeZone - GMT;
            }
            else {
                return timestamp + this.timeZone + GMT;
            }
        }
        /**
         * 获取当前或指定时间的详情
         * @param timestamp 
         * @param offset 
         * @returns 
         */
        public getDateInfo(timestamp?: number, offset?: number): IDateInfo {
            timestamp = timestamp || this.getNowTimestamp();
            if (offset) {
                timestamp += offset;
            }
            timestamp = this.convertTimestamp(timestamp);
            timestamp *= 1000;
            let info = <IDateInfo>{};
            let date = new Date(timestamp);
            info.year = date.getFullYear();
            info.month = date.getMonth() + 1;
            info.day = date.getDate();
            info.hour = date.getHours();
            info.min = date.getMinutes();
            info.sec = date.getSeconds();
            info.ms = date.getMilliseconds();
            info.timestamp = Math.floor(date.valueOf() / 1000);
            info.timestamp = this.convertTimestamp(info.timestamp, true);
            info.week = date.getDay();
            info.string = this.getStringFromDate(info);
            return info;
        }
        /**
         * 当前时间转成模板字符串
         * @param formatString 
         */
        public getStringFromDate(formatString?: string): string
        public getStringFromDate(info?: IDateInfo, formatString?: string): string
        public getStringFromDate(info_or_formatString?: IDateInfo | string, formatString: string = "yyyy/MM/dd hh:mm:ss"): string {
            let info: IDateInfo;
            if (typeof (info_or_formatString) === "object") {
                info = info_or_formatString;
            }
            else {
                formatString = info_or_formatString;
            }
            if (!info) {
                info = this.getDateInfo();
            }
            let year: number = info.year;
            let month: number = info.month;
            let day: number = info.day;
            let hour: number = info.hour || 0;
            let min: number = info.min || 0;
            let sec: number = info.sec || 0;
            let ms: number = info.ms || 0;
            let o: { [key: string]: string } = {
                "M+": month.toString(), //月份 
                "d+": day.toString(), //日 
                "h+": hour.toString(), //小时 
                "m+": min.toString(), //分 
                "s+": sec.toString(), //秒 
            };
            let rets = formatString.match(/(y+)/);
            if (rets && rets.length) {
                formatString = formatString.replace(rets[1], (year + "").substr(4 - rets[1].length));
            }
            rets = formatString.match(/(S+)/);
            if (rets && rets.length) {
                formatString = formatString.replace(rets[1], ms.toString().padLeft(3, "0"));
            }
            let reg: RegExp;
            for (let k in o) {
                reg = new RegExp("(" + k + ")");
                rets = formatString.match(reg);
                if (rets && rets.length) {
                    formatString = formatString.replace(rets[1], (rets[1].length == 1) ? (o[k]) : o[k].padLeft(2, "0"));
                }
            }
            return formatString;
        }
        /**
         * 时间字符串转成时间信息
         * @param text 格式: "yyyy/M/d hh:mm:ss" 或 "yyyy-MM-dd hh:mm" 或 "hh:mm:ss" 或 "mm:ss"
         * @param timestamp 当时间信息不足时，用来修正的时间戳
         */
        public getDateFromString(text: string, timestamp?: number): IDateInfo {
            text = text.replace(/-/g, "/");
            let list = text.split(" ");
            let dateString: string, timeString: string;
            let info = this.getDateInfo(timestamp);
            if (list.length == 1) {
                if (list[0].indexOf("/") >= 0) {
                    dateString = list[0];
                    timeString = "{0}:{1}:{2}".format(info.hour, info.min, info.sec);
                }
                else {
                    dateString = "{0}/{1}/{2}".format(info.year, info.month, info.day);
                    timeString = list[0];
                }
            }
            else {
                dateString = list[0];
                timeString = list[1];
            }
            let time_list = timeString.split(":");
            if (time_list.length < 3) {
                while (time_list.length < 3) {
                    time_list.push("00");
                }
                timeString = time_list.join(":");
            }
            timestamp = Math.floor(Date.parse("{0} {1}".format(dateString, timeString)) / 1000);
            timestamp = this.convertTimestamp(timestamp, true);
            return this.getDateInfo(timestamp);
        }
        /**
         * 时间字符串转成时间戳
         * @param text 格式: "yyyy/M/d hh:mm:ss" 或 "yyyy-MM-dd hh:mm" 或 "hh:mm:ss" 或 "mm:ss"
         * @param timestamp 当时间信息不足时，用来修正的时间戳
         */
        public getTimestampFromString(text: string, timestamp?: number): number {
            return this.getDateFromString(text, timestamp).timestamp;
        }
        /**
         * 时间详情转服务器时间戳
         * @param info 时间详情
         * @param timestamp 参考修正的服务器时间戳
         */
        public getTimestampFromDate(info: IDateInfo, timestamp?: number): number {
            let now = this.getDateInfo(timestamp);
            if (info.year == undefined) {
                info.year = now.year;
            }
            if (info.month == undefined) {
                info.month = now.month;
            }
            if (info.day == undefined) {
                info.day = now.day;
            }
            if (info.hour == undefined) {
                info.hour = now.hour;
            }
            if (info.min == undefined) {
                info.min = now.min;
            }
            if (info.sec == undefined) {
                info.sec = now.sec;
            }
            return this.getTimestampFromString(this.getStringFromDate(info));
        }
        /**
         * 服务器时间戳对应的日期是否是周几
         * @param week 周一至周日(1,...,7)
         * @param timestamp 服务器时间戳(默认当前服务器时间)
         */
        public isWeekDay(week: number, timestamp?: number): boolean {
            if (week == 7) {
                week = 0;
            }
            let info = this.getDateInfo(timestamp);
            if (info.week == week) {
                return true;
            }
            return false;
        }
        /**
         * 获取当前日期或指定日期所在周对应的服务器时间戳
         * @param week 周一至周日(1,...,7)
         * @param timestamp 服务器时间戳(默认当前服务器时间)
         * @fixed 具体时间修正(只参考时分秒)
         */
        public getTimestampWithWeek(week: number, timestamp?: number, fixed?: IDateInfo): number {
            fixed = this.fixedDateInfo(fixed);
            if (week == 7) {
                week = 0;
            }
            let info = this.getDateInfo(timestamp);
            let diff_days = week - info.week;
            info = this.getDateInfo(timestamp, diff_days * DATE_DAY_TIME);
            info.ms = 0;
            if (fixed) {
                if (fixed.hour != undefined) {
                    info.hour = fixed.hour;
                }
                if (fixed.min != undefined) {
                    info.min = fixed.min;
                }
                if (fixed.sec != undefined) {
                    info.sec = fixed.sec;
                }
            }
            return this.getTimestampFromDate(info);
        }
        /**
         * 获取当前日期或指定日期下一周对应的服务器时间戳
         * @param week 周一至周日(1,...,7)
         * @param timestamp 服务器时间戳(默认当前服务器时间)
         * @param fixed 具体时间修正(只参考时分秒)
         */
        public getTimestampWithNextWeek(week: number, timestamp?: number, fixed?: IDateInfo): number {
            let time = this.getTimestampWithWeek(week, timestamp, fixed);
            return time + 7 * DATE_DAY_TIME;
        }
        /**
         * 获取当前日期或指定日期所在月份的第一天服务器时间戳
         * @param timestamp 服务器时间戳(默认当前服务器时间)
         * @param fixed 具体时间修正(只参考时分秒)
         */
        public getFirstDayTimestampWithMonth(timestamp?: number, fixed?: IDateInfo): number {
            fixed = this.fixedDateInfo(fixed);
            let info = this.getDateInfo(timestamp);
            info.day = 1;
            info.ms = 0;
            if (fixed) {
                if (fixed.hour != undefined) {
                    info.hour = fixed.hour;
                }
                if (fixed.min != undefined) {
                    info.min = fixed.min;
                }
                if (fixed.sec != undefined) {
                    info.sec = fixed.sec;
                }
            }
            return this.getTimestampFromDate(info);
        }
        /**
         * 获取当前日期或指定日期所在月份下月第一天服务器时间戳
         * @param timestamp 服务器时间戳(默认当前服务器时间)
         * @param fixed 具体时间修正(只参考时分秒)
         */
        public getFirstDayTimestampWithNextMonth(timestamp?: number, fixed?: IDateInfo): number {
            fixed = this.fixedDateInfo(fixed);
            let info = this.getDateInfo(timestamp);
            if (info.month == 11) {
                info.year += 1;
                info.month = 0;
            }
            else {
                info.month += 1;
            }
            info.day = 1;
            info.ms = 0;
            if (fixed) {
                if (fixed.hour != undefined) {
                    info.hour = fixed.hour;
                }
                if (fixed.min != undefined) {
                    info.min = fixed.min;
                }
                if (fixed.sec != undefined) {
                    info.sec = fixed.sec;
                }
            }
            return this.getTimestampFromDate(info);
        }
        /**
         * 获取当前日期或指定日期所在月份的最后一天服务器时间戳
         * @param timestamp 服务器时间戳(默认当前服务器时间)
         * @param fixed 具体时间修正(只参考时分秒)
         */
        public getLastDayTimestampWithMonth(timestamp?: number, fixed?: IDateInfo): number {
            let time = this.getFirstDayTimestampWithNextMonth(timestamp, fixed);
            return this.getDateInfo(time, -DATE_DAY_TIME).timestamp;
        }
        /**
         * 修正服务器时间戳到指定时间
         * @param timestamp 要修正的服务器时间戳
         * @param fixed 修正的时间参数(只参考时分秒)
         */
        public fixedTimestamp(timestamp?: number, fixed?: IDateInfo): number {
            fixed = this.fixedDateInfo(fixed);
            let info = this.getDateInfo(timestamp);
            info.ms = 0;
            if (fixed) {
                if (fixed.hour != undefined) {
                    info.hour = fixed.hour;
                }
                if (fixed.min != undefined) {
                    info.min = fixed.min;
                }
                if (fixed.sec != undefined) {
                    info.sec = fixed.sec;
                }
            }
            return this.getTimestampFromDate(info);
        }
        /**
         * 获取明天的服务器时间戳（默认获取明天凌晨0点）
         * @param timestamp 服务器时间戳
         * @param fixed 时间修正
         */
        public getTimestampWithTomorrow(timestamp?: number, fixed?: IDateInfo): number {
            fixed = this.fixedDateInfo(fixed);
            let info = this.getDateInfo(timestamp, DATE_DAY_TIME);
            info.ms = 0;
            if (fixed) {
                if (fixed.hour != undefined) {
                    info.hour = fixed.hour;
                }
                if (fixed.min != undefined) {
                    info.min = fixed.min;
                }
                if (fixed.sec != undefined) {
                    info.sec = fixed.sec;
                }
            }
            return this.getTimestampFromDate(info);
        }
        /**
         * 获取当前时间戳的总天数
         * @param timestamp 
         * @returns 
         */
        public getDayID(timestamp?: number): number {
            timestamp = timestamp || this.getNowTimestamp();
            let time = timestamp + this.timeZone;
            return Math.floor(time / DATE_DAY_TIME);
        }
        //================================================
        // private
        //================================================
        private fixedDateInfo(fixed: IDateInfo): IDateInfo {
            if (!fixed) {
                fixed = <IDateInfo>{};
            }
            if (fixed.hour == undefined) {
                fixed.hour = 0;
            }
            if (fixed.min == undefined) {
                fixed.min = 0;
            }
            if (fixed.sec == undefined) {
                fixed.sec = 0;
            }
            return fixed;
        }
    }
}