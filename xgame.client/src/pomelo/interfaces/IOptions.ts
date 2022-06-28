/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-01
*************************************************/
module pomelo {
    export interface IOptions {
        host: string;
        port: number;
        user?: any;
        log?: boolean;
        handshakeCallback?: Function;
    }
}