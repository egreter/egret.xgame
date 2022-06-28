/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-01
*************************************************/
module pomelo {
    export interface IPacket {
        type: PacketType;
        body: egret.ByteArray;
        length: number;
    }
}