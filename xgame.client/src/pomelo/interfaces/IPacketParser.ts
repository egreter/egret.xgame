/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-01
*************************************************/
module pomelo {
    export interface IPacketParser {
        encode(type: number, body?: egret.ByteArray): egret.ByteArray
        decode(buffer: egret.ByteArray): IPacket
    }
}