/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-19
*************************************************/

declare interface String {
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