/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-01
*************************************************/
module pomelo {
    export class PacketParser implements IPacketParser {

        public encode(type: number, body?: egret.ByteArray) {
            let length: number = body ? body.length : 0;
            let buffer: egret.ByteArray = new egret.ByteArray();
            buffer.writeByte(type & 0xff);
            buffer.writeByte((length >> 16) & 0xff);
            buffer.writeByte((length >> 8) & 0xff);
            buffer.writeByte(length & 0xff);

            if (body) buffer.writeBytes(body, 0, body.length);

            return buffer;
        }
        public decode(buffer: egret.ByteArray) {

            let type: number = buffer.readUnsignedByte();
            let len: number = (buffer.readUnsignedByte() << 16 | buffer.readUnsignedByte() << 8 | buffer.readUnsignedByte()) >>> 0;

            let body: egret.ByteArray;

            if (buffer.bytesAvailable >= len) {
                body = new egret.ByteArray();
                if (len) buffer.readBytes(body, 0, len);
            }
            else {
                console.log("[Package] no enough length for current type:", type);
            }

            return { type: type, body: body, length: len };
        }
    }
}