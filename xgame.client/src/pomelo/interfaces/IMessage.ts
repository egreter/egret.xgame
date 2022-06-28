/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-01
*************************************************/
module pomelo {
    export interface IMessage {
        id: number;
        type: MessageType;
        route: string;
        body: any;
    }
}