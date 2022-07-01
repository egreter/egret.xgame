/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-01
*************************************************/
module egretx {
    export interface ISocketHelper extends xgame.IXObject {
        //反序列化数据
        decodePackets(data: egret.ByteArray): IPacket[];
        //序列化数据包
        encodePacket(packet: IPacket): egret.ByteArray;
        //隐藏连接动画
        hideAnimation(): void;
        //显示连接动画
        showAnimation(): void;
        //连接成功后是否自动发送登录数据包
        needSendLoginPacket(): boolean;
        //是否登录返回包
        isLoginRespPacket(packet: IPacket): boolean;
        //是否成功登录
        isLoginSuccess(packet: IPacket): boolean;
        //构建登录数据包
        generateLoginPacket(reconnect: boolean): IPacket;
        //是否启用心跳探针检测
        enableHeartBeatCheck(): boolean;
        //是否心跳包
        isHeartBeatPacket(packet: IPacket): boolean;
        //发送心跳探针
        sendHeartBeatPacket(): void;
        //是否被服务器踢出
        isKickOutPacket(packet: IPacket): boolean;
        //是否发生数据锁定
        isDataLocked(packet: IPacket): boolean;
        //收到解码后的数据包，可以广播或回调了
        receivePacket(packet: IPacket): void;
    }
}