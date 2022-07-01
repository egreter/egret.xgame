/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-03
*************************************************/
module ro {
    export interface PBType {
        encode(m: any, w?: protobuf.Writer): protobuf.Writer;
        decode(r: (protobuf.Reader | Uint8Array), l?: number): any;
    }
    export interface IProtocal {
        name: string;
        reqCode?: number;
        reqType?: any;
        reqName?: string;
        respCode: number;
        respType: any;
        respName: string;
        callback?: xgame.Signal1<any>;
    }
}
