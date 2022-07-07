/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-07
*************************************************/
module xgame {
    export let IDateTimeManager = Symbol.for("IDateTimeManager");
    export interface IDateTimeManager extends IXObject {
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
        getStringFromDate(formatString?: string): string
        getStringFromDate(info?: IDateInfo, formatString?: string): string
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