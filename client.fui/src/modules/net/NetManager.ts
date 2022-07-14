/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-01
*************************************************/

import { inject } from "../../decorators/inject";
import { IProtocal } from "./NetBase";
import { INetReq, INetResp, registerNetProtocals } from "./NetDefine";
import { Packet } from "./Packet";
import { SocketHelper } from "./SocketHelper";




/**
 * 此处于网络模块的二次封装，需要根据自己的网络协议来定义，此处仅供参考
 */
export class NetManager extends xgame.Singleton {
    private $main: egretx.SocketInstance;
    public get main(): egretx.SocketInstance {
        return this.$main;
    }
    @inject(egretx.ISocketManager)
    public socketManager: egretx.ISocketManager;
    private dictRPC = new xgame.Dictionary<number | string, IProtocal>();
    public initialize(): void {
        xgame.injectInstance(this);
        registerNetProtocals();
        this.socketManager.defaultSocketHelper = SocketHelper.Instance();
        this.$main = this.socketManager.getOrCreateInstance();
    }
    public on<T extends keyof INetResp>(cmd: T): xgame.Signal1<INetResp[T]> {
        let define = this.getDefine(cmd);
        if (!define) {
            throw new Error("没有网络协议[{0}]的定义".format(cmd));
        }
        return define.callback;
    }
    public async ask<T extends keyof INetReq>(cmd: T, req: INetReq[T], name?: string): Promise<INetResp[T]> {
        let define = this.getDefine(cmd);
        if (!define) {
            throw new Error("没有网络协议[{0}]的定义".format(cmd));
        }
        return await this._ask(define.reqCode, req, name)
    }
    private async _ask(code: number, req: any, name?: string): Promise<any> {
        let instance = this.socketManager.getOrCreateInstance(name);
        if (!instance) {
            throw new Error("没有网络实例[{0}]".format(name));
        }
        let packet = new Packet();
        packet.deferred = new xgame.Deferred<any>();
        packet.cmd = code;
        packet.message = req;
        instance.sendPacket(packet);
        return packet.deferred.promise;
    }
    public getDefine(code: number): IProtocal
    public getDefine(name: string): IProtocal
    public getDefine(name: string | number): IProtocal {
        return this.dictRPC.get(name);
    }
    public registRPC(name: string, reqCode: number, reqType: any, reqName: string, respCode: number, respType: any, respName: string): void {
        let p = <IProtocal>{ name: name, reqCode: reqCode, reqType: reqType, reqName: reqName, respCode: respCode, respType: respType, respName: respName };
        this.dictRPC.set(name, p);
        this.dictRPC.set(reqCode, p);
        this.dictRPC.set(reqName, p);
        this.dictRPC.set(respCode, p);
        this.dictRPC.set(respName, p);
        p.callback = new xgame.Signal1<any>();
    }
    public registNotify(name: string, respCode: number, respType: any, respName: string): void {
        let p = <IProtocal>{ respCode: respCode, respType: respType, respName: respName };
        this.dictRPC.set(name, p);
        this.dictRPC.set(respCode, p);
        this.dictRPC.set(respName, p);
        p.callback = new xgame.Signal1<any>();
    }
}