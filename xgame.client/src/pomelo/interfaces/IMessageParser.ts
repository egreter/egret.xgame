/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-01
*************************************************/
module pomelo {
    export interface IMessageParser {
        /**
         * encode
         * @param id
         * @param route
         * @param msg
         * @return ByteArray
         */
        encode(id: number, route: string, msg: any): egret.ByteArray;

        /**
         * decode
         * @param buffer
         * @return Object
         */
        decode(buffer: egret.ByteArray): IMessage;
    }
}