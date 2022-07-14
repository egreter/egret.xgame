/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-01
*************************************************/

import { inject } from "../../decorators/inject";
import { IUserData } from "../login/UserData";
import { PBType } from "./NetBase";
import { NetManager } from "./NetManager";
import { Packet } from "./Packet";

/**
 * 网络通信助手，实现了egretx.ISocketHelper接口来实现数据包相关的自定义功能
 * 可以按自己的需求来实现封包和解包，以及其他相关参数
 */
export class SocketHelper extends xgame.Singleton implements egretx.ISocketHelper {

    @inject(IUserData)
    public user: IUserData;
    public constructor() {
        super();
        xgame.injectInstance(this);
    }

    public decodePackets(data: egret.ByteArray): egretx.IPacket[] {
        let msg = ro3.NetMsg.decode(data.bytes);
        let primary = new Packet();
        primary.guid = msg.cmdNo;
        primary.cmd = msg.cmd;
        primary.message = this._decodePacket(msg.cmd, msg.buffer);
        let list: Packet[] = [primary];
        //附带的同步数据包
        if (msg.notifies.length) {
            for (let i = 0; i < msg.notifies.length; i++) {
                let notify = msg.notifies[i];
                let packet = this._decodePacket(notify.type, notify.buffer);
                if (packet) {
                    list.push(packet);
                }
            }
        }
        return list;
    }
    private _decodePacket(code: any, buffer: Uint8Array): Packet {
        let define = NetManager.Instance().getDefine(code);
        if (define) {
            let packet = new Packet();
            let PB: PBType = define.respType
            packet.message = PB.decode(buffer);
            return packet;
        }
    }
    public encodePacket(packet: egretx.IPacket): egret.ByteArray {
        let define = NetManager.Instance().getDefine(packet.cmd);
        if (define) {
            let PB: PBType = define.reqType;
            let buffer = PB.encode(packet.message).finish();
            let msg = new ro3.NetMsg();
            msg.cmd = packet.cmd;
            msg.cmdNo = packet.guid;
            msg.uid = this.user.platUsername;
            msg.buffer = buffer;
            return new egret.ByteArray(ro3.NetMsg.encode(msg).finish());
        }
    }
    public hideAnimation(): void {

    }
    public showAnimation(): void {

    }
    public needSendLoginPacket(): boolean {
        return true;
    }
    public isLoginRespPacket(packet: egretx.IPacket): boolean {
        if (packet.cmd) {
            let define = NetManager.Instance().getDefine(packet.cmd);
            if (define.respCode == packet.cmd) {
                return true;
            }
        }
        return false;
    }
    public isLoginSuccess(packet: egretx.IPacket): boolean {
        if (packet.message) {
            let resp: ro3.ILoginResp = packet.message;
            if (resp.result != ro3.LoginResp.LoginRet.FAIL) {
                return true;
            }
        }
        return false;
    }
    public generateLoginPacket(reconnect: boolean): egretx.IPacket {
        let req = new ro3.LoginReq();
        req.reconnect = reconnect ? 1 : 0;
        req.uid = this.user.platUsername;
        req.platform = 2;
        req.version = 10;
        let packet = new Packet();
        packet.cmd = 0xb029be26;
        packet.message = req;
        return packet;
    }
    public enableHeartBeatCheck(): boolean {
        return false;
    }
    public isHeartBeatPacket(packet: egretx.IPacket): boolean {
        return false;
    }
    public sendHeartBeatPacket(): void {

    }
    public isKickOutPacket(packet: egretx.IPacket): boolean {
        return false;
    }
    public isDataLocked(packet: egretx.IPacket): boolean {
        return false;
    }
    public receivePacket(packet: egretx.IPacket): void {
        packet.onResponse();
    }
}