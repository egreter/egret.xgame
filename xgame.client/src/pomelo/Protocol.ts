/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-01
*************************************************/
module pomelo {
    export class Protocol {

        public static strencode(str: string): egret.ByteArray {
            let buffer: egret.ByteArray = new egret.ByteArray();
            buffer.length = str.length;
            buffer.writeUTFBytes(str);
            return buffer;
        }

        public static strdecode(byte: egret.ByteArray): string {
            let str = byte.readUTFBytes(byte.bytesAvailable);
            //console.log(str);
            return str;
        }
    }
}