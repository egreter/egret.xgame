/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-01
*************************************************/
module pomelo {
    export interface IProtos {
        client?: any;
        server?: any;
        version?: string;
    }
    export interface ISys {
        type?: string;
        version?: string;
        heartbeat?: number;
        dict?: { [key: string]: any };
        dictVersion?: string;
        protos?: IProtos;
        useDict?: boolean;
        useProto?: boolean;
    }
    export interface IHandShake {
        code?: number;
        sys?: ISys;
        user?: any;
    }
}