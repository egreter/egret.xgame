/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-01
*************************************************/
module pomelo {
    export enum PacketType {
        HANDSHAKE = 1,
        HANDSHAKE_ACK = 2,
        HEARTBEAT = 3,
        DATA = 4,
        KICK = 5,
    }
}