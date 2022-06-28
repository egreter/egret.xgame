/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-01
*************************************************/
module pomelo {
    export class MessageParser implements IMessageParser {

        public static MSG_FLAG_BYTES: number = 1;
        public static MSG_ROUTE_CODE_BYTES: number = 2;
        public static MSG_ID_MAX_BYTES: number = 5;
        public static MSG_ROUTE_LEN_BYTES: number = 1;

        public static MSG_ROUTE_CODE_MAX: number = 0xffff;

        public static MSG_COMPRESS_ROUTE_MASK: number = 0x1;
        public static MSG_TYPE_MASK: number = 0x7;

        public encode(id: number, route: string, msg: any): egret.ByteArray {
            let buffer: egret.ByteArray = new egret.ByteArray();
            let type: number = id ? MessageType.REQUEST : MessageType.NOTIFY;
            let byte: egret.ByteArray = Protobuf.encode(route, msg) || Protocol.strencode(JSON.stringify(msg));
            let rot: any = RouteDicts.getID(route) || route;
            buffer.writeByte((type << 1) | ((typeof (rot) == "string") ? 0 : 1));
            if (id) {
                // 7.x
                do {
                    let tmp: number = id % 128;
                    let next: number = Math.floor(id / 128);
                    if (next != 0) {
                        tmp = tmp + 128;
                    }
                    buffer.writeByte(tmp);
                    id = next;
                } while (id != 0);
                // 5.x
                //				var len:Array = [];
                //				len.push(id & 0x7f);
                //				id >>= 7;
                //				while(id > 0)
                //				{
                //					len.push(id & 0x7f | 0x80);
                //					id >>= 7;
                //				}
                //
                //				for (var i:int = len.length - 1; i >= 0; i--)
                //				{
                //					buffer.writeByte(len[i]);
                //				}
            }
            if (rot) {
                if (typeof rot == "string") {
                    buffer.writeByte(rot.length & 0xff);
                    buffer.writeUTFBytes(rot);
                }
                else {
                    buffer.writeByte((rot >> 8) & 0xff);
                    buffer.writeByte(rot & 0xff);
                }
            }
            if (byte) {
                buffer.writeBytes(byte);
            }
            return buffer;
        }

        public decode(buffer: egret.ByteArray): IMessage {
            // parse flag
            let flag: number = buffer.readUnsignedByte();
            let compressRoute: number = flag & MessageParser.MSG_COMPRESS_ROUTE_MASK;
            let type: number = (flag >> 1) & MessageParser.MSG_TYPE_MASK;
            let route: any;
            // parse id
            let id: number = 0;
            let m: number = 0;
            if (type === MessageType.REQUEST || type === MessageType.RESPONSE) {
                // 7.x
                let i: number = 0;
                do {
                    m = buffer.readUnsignedByte();
                    id = id + ((m & 0x7f) * Math.pow(2, (7 * i)));
                    i++;
                } while (m >= 128);
                // 5.x
                //				var byte:int = buffer.readUnsignedByte();
                //				id = byte & 0x7f;
                //				while(byte & 0x80)
                //				{
                //					id <<= 7;
                //					byte = buffer.readUnsignedByte();
                //					id |= byte & 0x7f;
                //				}
            }
            // parse route
            if (type === MessageType.REQUEST || type === MessageType.NOTIFY || type === MessageType.PUSH) {
                if (compressRoute) {
                    route = buffer.readUnsignedShort();
                }
                else {
                    let routeLen: number = buffer.readUnsignedByte();
                    route = routeLen ? buffer.readUTFBytes(routeLen) : "";
                }
            }
            //else if (type === Message.TYPE_RESPONSE)
            //{
            //    route = Pomelo.requests[id].route;
            //}
            //
            if (!id && !(typeof (route) == "string")) {
                route = RouteDicts.getName(route);
            }
            let body: any = Protobuf.decode(route, buffer) || JSON.parse(Protocol.strdecode(buffer));
            return <IMessage>{ id: id, type: type, route: route, body: body };
        }

    }
}