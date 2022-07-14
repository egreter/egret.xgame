type Long = protobuf.Long;
// DO NOT EDIT! This is a generated file. Edit the JSDoc in src/*.js instead and run 'npm run types'.

/** Namespace ro3. */
declare namespace ro3 {

    /** Properties of a LoginReq. */
    interface ILoginReq {

        /** LoginReq uid */
        uid: string;

        /** LoginReq password */
        password?: (string|null);

        /** LoginReq account */
        account?: (string|null);

        /** LoginReq platform */
        platform?: (number|null);

        /** LoginReq version */
        version?: (number|null);

        /** LoginReq reconnect */
        reconnect?: (number|null);
    }

    /** Represents a LoginReq. */
    class LoginReq implements ILoginReq {

        /**
         * Constructs a new LoginReq.
         * @param [p] Properties to set
         */
        constructor(p?: ro3.ILoginReq);

        /** LoginReq uid. */
        public uid: string;

        /** LoginReq password. */
        public password: string;

        /** LoginReq account. */
        public account: string;

        /** LoginReq platform. */
        public platform: number;

        /** LoginReq version. */
        public version: number;

        /** LoginReq reconnect. */
        public reconnect: number;

        /**
         * Creates a new LoginReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns LoginReq instance
         */
        public static create(properties?: ro3.ILoginReq): ro3.LoginReq;

        /**
         * Encodes the specified LoginReq message. Does not implicitly {@link ro3.LoginReq.verify|verify} messages.
         * @param m LoginReq message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: ro3.ILoginReq, w?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a LoginReq message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns LoginReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: (protobuf.Reader|Uint8Array), l?: number): ro3.LoginReq;
    }

    /** Properties of a LoginResp. */
    interface ILoginResp {

        /** LoginResp result */
        result: ro3.LoginResp.LoginRet;

        /** LoginResp uid */
        uid?: (string|null);

        /** LoginResp nowtime */
        nowtime?: (number|null);

        /** LoginResp version */
        version?: (number|null);

        /** LoginResp reconnect */
        reconnect?: (number|null);
    }

    /** Represents a LoginResp. */
    class LoginResp implements ILoginResp {

        /**
         * Constructs a new LoginResp.
         * @param [p] Properties to set
         */
        constructor(p?: ro3.ILoginResp);

        /** LoginResp result. */
        public result: ro3.LoginResp.LoginRet;

        /** LoginResp uid. */
        public uid: string;

        /** LoginResp nowtime. */
        public nowtime: number;

        /** LoginResp version. */
        public version: number;

        /** LoginResp reconnect. */
        public reconnect: number;

        /**
         * Creates a new LoginResp instance using the specified properties.
         * @param [properties] Properties to set
         * @returns LoginResp instance
         */
        public static create(properties?: ro3.ILoginResp): ro3.LoginResp;

        /**
         * Encodes the specified LoginResp message. Does not implicitly {@link ro3.LoginResp.verify|verify} messages.
         * @param m LoginResp message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: ro3.ILoginResp, w?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a LoginResp message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns LoginResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: (protobuf.Reader|Uint8Array), l?: number): ro3.LoginResp;
    }

    namespace LoginResp {

        /** LoginRet enum. */
        enum LoginRet {
            OK = 0,
            FAIL = -1
        }
    }

    /** Properties of a Notify. */
    interface INotify {

        /** Notify type */
        type?: (string|null);

        /** Notify buffer */
        buffer?: (Uint8Array|null);
    }

    /** Represents a Notify. */
    class Notify implements INotify {

        /**
         * Constructs a new Notify.
         * @param [p] Properties to set
         */
        constructor(p?: ro3.INotify);

        /** Notify type. */
        public type: string;

        /** Notify buffer. */
        public buffer: Uint8Array;

        /**
         * Creates a new Notify instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Notify instance
         */
        public static create(properties?: ro3.INotify): ro3.Notify;

        /**
         * Encodes the specified Notify message. Does not implicitly {@link ro3.Notify.verify|verify} messages.
         * @param m Notify message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: ro3.INotify, w?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a Notify message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns Notify
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: (protobuf.Reader|Uint8Array), l?: number): ro3.Notify;
    }

    /** Properties of a NetMsg. */
    interface INetMsg {

        /** NetMsg cmd */
        cmd: number;

        /** NetMsg cmdNo */
        cmdNo: number;

        /** NetMsg uid */
        uid: string;

        /** NetMsg buffer */
        buffer: Uint8Array;

        /** NetMsg notifies */
        notifies?: (ro3.INotify[]|null);
    }

    /** Represents a NetMsg. */
    class NetMsg implements INetMsg {

        /**
         * Constructs a new NetMsg.
         * @param [p] Properties to set
         */
        constructor(p?: ro3.INetMsg);

        /** NetMsg cmd. */
        public cmd: number;

        /** NetMsg cmdNo. */
        public cmdNo: number;

        /** NetMsg uid. */
        public uid: string;

        /** NetMsg buffer. */
        public buffer: Uint8Array;

        /** NetMsg notifies. */
        public notifies: ro3.INotify[];

        /**
         * Creates a new NetMsg instance using the specified properties.
         * @param [properties] Properties to set
         * @returns NetMsg instance
         */
        public static create(properties?: ro3.INetMsg): ro3.NetMsg;

        /**
         * Encodes the specified NetMsg message. Does not implicitly {@link ro3.NetMsg.verify|verify} messages.
         * @param m NetMsg message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: ro3.INetMsg, w?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a NetMsg message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns NetMsg
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: (protobuf.Reader|Uint8Array), l?: number): ro3.NetMsg;
    }
}
