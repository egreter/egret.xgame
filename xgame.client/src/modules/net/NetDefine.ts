/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-01
/* 此文件应该由工具自动生成，此处只为演示而直接定义了
*************************************************/
module ro {
    export interface INetReq {
        CMD_LOGIN: ro3.LoginReq;
    }
    export interface INetResp {
        CMD_LOGIN: ro3.LoginResp;
    }
    export function registerNetProtocals(): void {
        NetManager.Instance().registRPC("CMD_LOGIN", 0xb029be26, ro3.LoginReq, "ro3.LoginReq", 0xb029be27, ro3.LoginResp, "ro3.LoginResp");
    }
}