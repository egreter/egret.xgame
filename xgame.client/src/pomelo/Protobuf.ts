/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-01
*************************************************/
module pomelo {
    export class Protobuf {
        static TYPES: any = {
            uInt32: 0,
            sInt32: 0,
            int32: 0,
            double: 1,
            string: 2,
            message: 2,
            float: 5
        };
        private static clients: any = {};
        private static servers: any = {};

        public static init(protos: any): void {
            this.clients = protos && protos.client || {};
            this.servers = protos && protos.server || {};
        }

        public static encode(route: string, msg: any): egret.ByteArray {
            let protos: any = this.clients[route];
            if (!protos) return null;
            return this.encodeProtos(protos, msg);
        }

        public static decode(route: string, buffer: egret.ByteArray): any {

            let protos: any = this.servers[route];

            if (!protos) return null;

            return this.decodeProtos(protos, buffer);
        }
        private static encodeProtos(protos: any, msg: any): egret.ByteArray {
            let buffer: egret.ByteArray = new egret.ByteArray();
            for (let name in msg) {
                if (protos[name]) {
                    let proto: any = protos[name];
                    switch (proto.option) {
                        case "optional":
                        case "required":
                            buffer.writeBytes(this.encodeTag(proto.type, proto.tag));
                            this.encodeProp(msg[name], proto.type, protos, buffer);
                            break;
                        case "repeated":
                            if (!!msg[name] && msg[name].length > 0) {
                                this.encodeArray(msg[name], proto, protos, buffer);
                            }
                            break;
                    }
                }
            }

            return buffer;
        }
        static decodeProtos(protos: any, buffer: egret.ByteArray): any {
            let msg: any = {};
            while (buffer.bytesAvailable) {
                let head: any = this.getHead(buffer);
                let name: string = protos.__tags[head.tag];
                switch (protos[name].option) {
                    case "optional":
                    case "required":
                        msg[name] = this.decodeProp(protos[name].type, protos, buffer);
                        break;
                    case "repeated":
                        if (!msg[name]) {
                            msg[name] = [];
                        }
                        this.decodeArray(msg[name], protos[name].type, protos, buffer);
                        break;
                }
            }

            return msg;
        }

        static encodeTag(type: number, tag: number): egret.ByteArray {
            let value: number = this.TYPES[type] != undefined ? this.TYPES[type] : 2;
            return this.encodeUInt32((tag << 3) | value);
        }
        static getHead(buffer: egret.ByteArray): any {
            let tag: number = this.decodeUInt32(buffer);
            return { type: tag & 0x7, tag: tag >> 3 };
        }
        static encodeProp(value: any, type: string, protos: any, buffer: egret.ByteArray): void {
            switch (type) {
                case 'uInt32':
                    buffer.writeBytes(this.encodeUInt32(value));
                    break;
                case 'int32':
                case 'sInt32':
                    buffer.writeBytes(this.encodeSInt32(value));
                    break;
                case 'float':
                    //Float32Array
                    let floats: egret.ByteArray = new egret.ByteArray();
                    floats.endian = egret.Endian.LITTLE_ENDIAN;
                    floats.writeFloat(value);
                    buffer.writeBytes(floats);
                    break;
                case 'double':
                    let doubles: egret.ByteArray = new egret.ByteArray();
                    doubles.endian = egret.Endian.LITTLE_ENDIAN;
                    doubles.writeDouble(value);
                    buffer.writeBytes(doubles);
                    break;
                case 'string':
                    buffer.writeBytes(this.encodeUInt32(value.length));
                    buffer.writeUTFBytes(value);
                    break;
                default:
                    let proto: any = protos.__messages[type] || this.clients["message " + type];
                    if (!!proto) {
                        let buf: egret.ByteArray = this.encodeProtos(proto, value);
                        buffer.writeBytes(this.encodeUInt32(buf.length));
                        buffer.writeBytes(buf);
                    }
                    break;
            }
        }

        static decodeProp(type: string, protos: any, buffer: egret.ByteArray): any {
            switch (type) {
                case 'uInt32':
                    return this.decodeUInt32(buffer);
                case 'int32':
                case 'sInt32':
                    return this.decodeSInt32(buffer);
                case 'float':
                    let floats: egret.ByteArray = new egret.ByteArray();
                    buffer.readBytes(floats, 0, 4);
                    floats.endian = egret.Endian.LITTLE_ENDIAN;
                    let float: number = buffer.readFloat();
                    return floats.readFloat();
                case 'double':
                    let doubles: egret.ByteArray = new egret.ByteArray();
                    buffer.readBytes(doubles, 0, 8);
                    doubles.endian = egret.Endian.LITTLE_ENDIAN;
                    return doubles.readDouble();
                case 'string':
                    let length: number = this.decodeUInt32(buffer);
                    return buffer.readUTFBytes(length);
                default:
                    let proto: any = protos && (protos.__messages[type] || this.servers["message " + type]);
                    if (proto) {
                        let len: number = this.decodeUInt32(buffer);
                        let buf: egret.ByteArray;
                        if (len) {
                            buf = new egret.ByteArray();
                            buffer.readBytes(buf, 0, len);
                        }
                        return len ? Protobuf.decodeProtos(proto, buf) : false;
                    }
                    break;
            }
        }

        private static isSimpleType(type: string): boolean {
            return (
                type === 'uInt32' ||
                type === 'sInt32' ||
                type === 'int32' ||
                type === 'uInt64' ||
                type === 'sInt64' ||
                type === 'float' ||
                type === 'double'
            );
        }
        private static encodeArray(array: Array<any>, proto: any, protos: any, buffer: egret.ByteArray): void {
            let isSimpleType = this.isSimpleType;
            if (isSimpleType(proto.type)) {
                buffer.writeBytes(this.encodeTag(proto.type, proto.tag));
                buffer.writeBytes(this.encodeUInt32(array.length));
                let encodeProp = this.encodeProp;
                for (let i: number = 0; i < array.length; i++) {
                    encodeProp(array[i], proto.type, protos, buffer);
                }
            } else {
                let encodeTag = this.encodeTag;
                for (let j: number = 0; j < array.length; j++) {
                    buffer.writeBytes(encodeTag(proto.type, proto.tag));
                    this.encodeProp(array[j], proto.type, protos, buffer);
                }
            }
        }
        private static decodeArray(array: Array<any>, type: string, protos: any, buffer: egret.ByteArray): void {
            let isSimpleType = this.isSimpleType;
            let decodeProp = this.decodeProp;
            if (isSimpleType(type)) {
                let length: number = this.decodeUInt32(buffer);
                for (let i: number = 0; i < length; i++) {
                    array.push(decodeProp(type, protos, buffer));
                }
            } else {
                array.push(decodeProp(type, protos, buffer));
            }
        }

        private static encodeUInt32(n: number): egret.ByteArray {
            let result: egret.ByteArray = new egret.ByteArray();
            do {
                let tmp: number = n % 128;
                let next: number = Math.floor(n / 128);
                if (next !== 0) {
                    tmp = tmp + 128;
                }
                result.writeByte(tmp);
                n = next;
            }
            while (n !== 0);
            return result;
        }
        private static decodeUInt32(buffer: egret.ByteArray): number {
            let n: number = 0;
            for (let i: number = 0; i < buffer.length; i++) {
                let m: number = buffer.readUnsignedByte();
                n = n + ((m & 0x7f) * Math.pow(2, (7 * i)));
                if (m < 128) {
                    return n;
                }
            }
            return n;
        }
        private static encodeSInt32(n: number): egret.ByteArray {
            n = n < 0 ? (Math.abs(n) * 2 - 1) : n * 2;
            return this.encodeUInt32(n);
        }
        private static decodeSInt32(buffer: egret.ByteArray): number {
            let n: number = this.decodeUInt32(buffer);
            let flag: number = ((n % 2) === 1) ? -1 : 1;
            n = ((n % 2 + n) / 2) * flag;
            return n;
        }

    }
}