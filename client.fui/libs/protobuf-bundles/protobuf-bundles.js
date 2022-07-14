/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
(function($protobuf) {
    "use strict";

    // Common aliases
    var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;
    
    // Exported root namespace
    var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = window);
    
    $root.ro3 = (function() {
    
        /**
         * Namespace ro3.
         * @exports ro3
         * @namespace
         */
        var ro3 = {};
    
        ro3.LoginReq = (function() {
    
            /**
             * Properties of a LoginReq.
             * @memberof ro3
             * @interface ILoginReq
             * @property {string} uid LoginReq uid
             * @property {string|null} [password] LoginReq password
             * @property {string|null} [account] LoginReq account
             * @property {number|null} [platform] LoginReq platform
             * @property {number|null} [version] LoginReq version
             * @property {number|null} [reconnect] LoginReq reconnect
             */
    
            /**
             * Constructs a new LoginReq.
             * @memberof ro3
             * @classdesc Represents a LoginReq.
             * @implements ILoginReq
             * @constructor
             * @param {ro3.ILoginReq=} [p] Properties to set
             */
            function LoginReq(p) {
                if (p)
                    for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                        if (p[ks[i]] != null)
                            this[ks[i]] = p[ks[i]];
            }
    
            /**
             * LoginReq uid.
             * @member {string} uid
             * @memberof ro3.LoginReq
             * @instance
             */
            LoginReq.prototype.uid = "";
    
            /**
             * LoginReq password.
             * @member {string} password
             * @memberof ro3.LoginReq
             * @instance
             */
            LoginReq.prototype.password = "";
    
            /**
             * LoginReq account.
             * @member {string} account
             * @memberof ro3.LoginReq
             * @instance
             */
            LoginReq.prototype.account = "";
    
            /**
             * LoginReq platform.
             * @member {number} platform
             * @memberof ro3.LoginReq
             * @instance
             */
            LoginReq.prototype.platform = 0;
    
            /**
             * LoginReq version.
             * @member {number} version
             * @memberof ro3.LoginReq
             * @instance
             */
            LoginReq.prototype.version = 0;
    
            /**
             * LoginReq reconnect.
             * @member {number} reconnect
             * @memberof ro3.LoginReq
             * @instance
             */
            LoginReq.prototype.reconnect = 0;
    
            /**
             * Creates a new LoginReq instance using the specified properties.
             * @function create
             * @memberof ro3.LoginReq
             * @static
             * @param {ro3.ILoginReq=} [properties] Properties to set
             * @returns {ro3.LoginReq} LoginReq instance
             */
            LoginReq.create = function create(properties) {
                return new LoginReq(properties);
            };
    
            /**
             * Encodes the specified LoginReq message. Does not implicitly {@link ro3.LoginReq.verify|verify} messages.
             * @function encode
             * @memberof ro3.LoginReq
             * @static
             * @param {ro3.ILoginReq} m LoginReq message or plain object to encode
             * @param {$protobuf.Writer} [w] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            LoginReq.encode = function encode(m, w) {
                if (!w)
                    w = $Writer.create();
                w.uint32(10).string(m.uid);
                if (m.password != null && Object.hasOwnProperty.call(m, "password"))
                    w.uint32(18).string(m.password);
                if (m.account != null && Object.hasOwnProperty.call(m, "account"))
                    w.uint32(26).string(m.account);
                if (m.platform != null && Object.hasOwnProperty.call(m, "platform"))
                    w.uint32(32).int32(m.platform);
                if (m.version != null && Object.hasOwnProperty.call(m, "version"))
                    w.uint32(40).int32(m.version);
                if (m.reconnect != null && Object.hasOwnProperty.call(m, "reconnect"))
                    w.uint32(48).int32(m.reconnect);
                return w;
            };
    
            /**
             * Decodes a LoginReq message from the specified reader or buffer.
             * @function decode
             * @memberof ro3.LoginReq
             * @static
             * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
             * @param {number} [l] Message length if known beforehand
             * @returns {ro3.LoginReq} LoginReq
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            LoginReq.decode = function decode(r, l) {
                if (!(r instanceof $Reader))
                    r = $Reader.create(r);
                var c = l === undefined ? r.len : r.pos + l, m = new $root.ro3.LoginReq();
                while (r.pos < c) {
                    var t = r.uint32();
                    switch (t >>> 3) {
                    case 1:
                        m.uid = r.string();
                        break;
                    case 2:
                        m.password = r.string();
                        break;
                    case 3:
                        m.account = r.string();
                        break;
                    case 4:
                        m.platform = r.int32();
                        break;
                    case 5:
                        m.version = r.int32();
                        break;
                    case 6:
                        m.reconnect = r.int32();
                        break;
                    default:
                        r.skipType(t & 7);
                        break;
                    }
                }
                if (!m.hasOwnProperty("uid"))
                    throw $util.ProtocolError("missing required 'uid'", { instance: m });
                return m;
            };
    
            return LoginReq;
        })();
    
        ro3.LoginResp = (function() {
    
            /**
             * Properties of a LoginResp.
             * @memberof ro3
             * @interface ILoginResp
             * @property {ro3.LoginResp.LoginRet} result LoginResp result
             * @property {string|null} [uid] LoginResp uid
             * @property {number|null} [nowtime] LoginResp nowtime
             * @property {number|null} [version] LoginResp version
             * @property {number|null} [reconnect] LoginResp reconnect
             */
    
            /**
             * Constructs a new LoginResp.
             * @memberof ro3
             * @classdesc Represents a LoginResp.
             * @implements ILoginResp
             * @constructor
             * @param {ro3.ILoginResp=} [p] Properties to set
             */
            function LoginResp(p) {
                if (p)
                    for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                        if (p[ks[i]] != null)
                            this[ks[i]] = p[ks[i]];
            }
    
            /**
             * LoginResp result.
             * @member {ro3.LoginResp.LoginRet} result
             * @memberof ro3.LoginResp
             * @instance
             */
            LoginResp.prototype.result = 0;
    
            /**
             * LoginResp uid.
             * @member {string} uid
             * @memberof ro3.LoginResp
             * @instance
             */
            LoginResp.prototype.uid = "";
    
            /**
             * LoginResp nowtime.
             * @member {number} nowtime
             * @memberof ro3.LoginResp
             * @instance
             */
            LoginResp.prototype.nowtime = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
            /**
             * LoginResp version.
             * @member {number} version
             * @memberof ro3.LoginResp
             * @instance
             */
            LoginResp.prototype.version = 0;
    
            /**
             * LoginResp reconnect.
             * @member {number} reconnect
             * @memberof ro3.LoginResp
             * @instance
             */
            LoginResp.prototype.reconnect = 0;
    
            /**
             * Creates a new LoginResp instance using the specified properties.
             * @function create
             * @memberof ro3.LoginResp
             * @static
             * @param {ro3.ILoginResp=} [properties] Properties to set
             * @returns {ro3.LoginResp} LoginResp instance
             */
            LoginResp.create = function create(properties) {
                return new LoginResp(properties);
            };
    
            /**
             * Encodes the specified LoginResp message. Does not implicitly {@link ro3.LoginResp.verify|verify} messages.
             * @function encode
             * @memberof ro3.LoginResp
             * @static
             * @param {ro3.ILoginResp} m LoginResp message or plain object to encode
             * @param {$protobuf.Writer} [w] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            LoginResp.encode = function encode(m, w) {
                if (!w)
                    w = $Writer.create();
                w.uint32(8).int32(m.result);
                if (m.uid != null && Object.hasOwnProperty.call(m, "uid"))
                    w.uint32(18).string(m.uid);
                if (m.nowtime != null && Object.hasOwnProperty.call(m, "nowtime"))
                    w.uint32(64).int64(m.nowtime);
                if (m.version != null && Object.hasOwnProperty.call(m, "version"))
                    w.uint32(80).int32(m.version);
                if (m.reconnect != null && Object.hasOwnProperty.call(m, "reconnect"))
                    w.uint32(88).int32(m.reconnect);
                return w;
            };
    
            /**
             * Decodes a LoginResp message from the specified reader or buffer.
             * @function decode
             * @memberof ro3.LoginResp
             * @static
             * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
             * @param {number} [l] Message length if known beforehand
             * @returns {ro3.LoginResp} LoginResp
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            LoginResp.decode = function decode(r, l) {
                if (!(r instanceof $Reader))
                    r = $Reader.create(r);
                var c = l === undefined ? r.len : r.pos + l, m = new $root.ro3.LoginResp();
                while (r.pos < c) {
                    var t = r.uint32();
                    switch (t >>> 3) {
                    case 1:
                        m.result = r.int32();
                        break;
                    case 2:
                        m.uid = r.string();
                        break;
                    case 8:
                        m.nowtime = r.int64();
                        break;
                    case 10:
                        m.version = r.int32();
                        break;
                    case 11:
                        m.reconnect = r.int32();
                        break;
                    default:
                        r.skipType(t & 7);
                        break;
                    }
                }
                if (!m.hasOwnProperty("result"))
                    throw $util.ProtocolError("missing required 'result'", { instance: m });
                return m;
            };
    
            /**
             * LoginRet enum.
             * @name ro3.LoginResp.LoginRet
             * @enum {number}
             * @property {number} OK=0 OK value
             * @property {number} FAIL=-1 FAIL value
             */
            LoginResp.LoginRet = (function() {
                var valuesById = {}, values = Object.create(valuesById);
                values[valuesById[0] = "OK"] = 0;
                values[valuesById[-1] = "FAIL"] = -1;
                return values;
            })();
    
            return LoginResp;
        })();
    
        ro3.Notify = (function() {
    
            /**
             * Properties of a Notify.
             * @memberof ro3
             * @interface INotify
             * @property {string|null} [type] Notify type
             * @property {Uint8Array|null} [buffer] Notify buffer
             */
    
            /**
             * Constructs a new Notify.
             * @memberof ro3
             * @classdesc Represents a Notify.
             * @implements INotify
             * @constructor
             * @param {ro3.INotify=} [p] Properties to set
             */
            function Notify(p) {
                if (p)
                    for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                        if (p[ks[i]] != null)
                            this[ks[i]] = p[ks[i]];
            }
    
            /**
             * Notify type.
             * @member {string} type
             * @memberof ro3.Notify
             * @instance
             */
            Notify.prototype.type = "";
    
            /**
             * Notify buffer.
             * @member {Uint8Array} buffer
             * @memberof ro3.Notify
             * @instance
             */
            Notify.prototype.buffer = $util.newBuffer([]);
    
            /**
             * Creates a new Notify instance using the specified properties.
             * @function create
             * @memberof ro3.Notify
             * @static
             * @param {ro3.INotify=} [properties] Properties to set
             * @returns {ro3.Notify} Notify instance
             */
            Notify.create = function create(properties) {
                return new Notify(properties);
            };
    
            /**
             * Encodes the specified Notify message. Does not implicitly {@link ro3.Notify.verify|verify} messages.
             * @function encode
             * @memberof ro3.Notify
             * @static
             * @param {ro3.INotify} m Notify message or plain object to encode
             * @param {$protobuf.Writer} [w] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Notify.encode = function encode(m, w) {
                if (!w)
                    w = $Writer.create();
                if (m.type != null && Object.hasOwnProperty.call(m, "type"))
                    w.uint32(10).string(m.type);
                if (m.buffer != null && Object.hasOwnProperty.call(m, "buffer"))
                    w.uint32(18).bytes(m.buffer);
                return w;
            };
    
            /**
             * Decodes a Notify message from the specified reader or buffer.
             * @function decode
             * @memberof ro3.Notify
             * @static
             * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
             * @param {number} [l] Message length if known beforehand
             * @returns {ro3.Notify} Notify
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Notify.decode = function decode(r, l) {
                if (!(r instanceof $Reader))
                    r = $Reader.create(r);
                var c = l === undefined ? r.len : r.pos + l, m = new $root.ro3.Notify();
                while (r.pos < c) {
                    var t = r.uint32();
                    switch (t >>> 3) {
                    case 1:
                        m.type = r.string();
                        break;
                    case 2:
                        m.buffer = r.bytes();
                        break;
                    default:
                        r.skipType(t & 7);
                        break;
                    }
                }
                return m;
            };
    
            return Notify;
        })();
    
        ro3.NetMsg = (function() {
    
            /**
             * Properties of a NetMsg.
             * @memberof ro3
             * @interface INetMsg
             * @property {number} cmd NetMsg cmd
             * @property {number} cmdNo NetMsg cmdNo
             * @property {string} uid NetMsg uid
             * @property {Uint8Array} buffer NetMsg buffer
             * @property {Array.<ro3.INotify>|null} [notifies] NetMsg notifies
             */
    
            /**
             * Constructs a new NetMsg.
             * @memberof ro3
             * @classdesc Represents a NetMsg.
             * @implements INetMsg
             * @constructor
             * @param {ro3.INetMsg=} [p] Properties to set
             */
            function NetMsg(p) {
                this.notifies = [];
                if (p)
                    for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                        if (p[ks[i]] != null)
                            this[ks[i]] = p[ks[i]];
            }
    
            /**
             * NetMsg cmd.
             * @member {number} cmd
             * @memberof ro3.NetMsg
             * @instance
             */
            NetMsg.prototype.cmd = 0;
    
            /**
             * NetMsg cmdNo.
             * @member {number} cmdNo
             * @memberof ro3.NetMsg
             * @instance
             */
            NetMsg.prototype.cmdNo = 0;
    
            /**
             * NetMsg uid.
             * @member {string} uid
             * @memberof ro3.NetMsg
             * @instance
             */
            NetMsg.prototype.uid = "";
    
            /**
             * NetMsg buffer.
             * @member {Uint8Array} buffer
             * @memberof ro3.NetMsg
             * @instance
             */
            NetMsg.prototype.buffer = $util.newBuffer([]);
    
            /**
             * NetMsg notifies.
             * @member {Array.<ro3.INotify>} notifies
             * @memberof ro3.NetMsg
             * @instance
             */
            NetMsg.prototype.notifies = $util.emptyArray;
    
            /**
             * Creates a new NetMsg instance using the specified properties.
             * @function create
             * @memberof ro3.NetMsg
             * @static
             * @param {ro3.INetMsg=} [properties] Properties to set
             * @returns {ro3.NetMsg} NetMsg instance
             */
            NetMsg.create = function create(properties) {
                return new NetMsg(properties);
            };
    
            /**
             * Encodes the specified NetMsg message. Does not implicitly {@link ro3.NetMsg.verify|verify} messages.
             * @function encode
             * @memberof ro3.NetMsg
             * @static
             * @param {ro3.INetMsg} m NetMsg message or plain object to encode
             * @param {$protobuf.Writer} [w] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            NetMsg.encode = function encode(m, w) {
                if (!w)
                    w = $Writer.create();
                w.uint32(8).uint32(m.cmd);
                w.uint32(16).int32(m.cmdNo);
                w.uint32(26).string(m.uid);
                w.uint32(34).bytes(m.buffer);
                if (m.notifies != null && m.notifies.length) {
                    for (var i = 0; i < m.notifies.length; ++i)
                        $root.ro3.Notify.encode(m.notifies[i], w.uint32(42).fork()).ldelim();
                }
                return w;
            };
    
            /**
             * Decodes a NetMsg message from the specified reader or buffer.
             * @function decode
             * @memberof ro3.NetMsg
             * @static
             * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
             * @param {number} [l] Message length if known beforehand
             * @returns {ro3.NetMsg} NetMsg
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            NetMsg.decode = function decode(r, l) {
                if (!(r instanceof $Reader))
                    r = $Reader.create(r);
                var c = l === undefined ? r.len : r.pos + l, m = new $root.ro3.NetMsg();
                while (r.pos < c) {
                    var t = r.uint32();
                    switch (t >>> 3) {
                    case 1:
                        m.cmd = r.uint32();
                        break;
                    case 2:
                        m.cmdNo = r.int32();
                        break;
                    case 3:
                        m.uid = r.string();
                        break;
                    case 4:
                        m.buffer = r.bytes();
                        break;
                    case 5:
                        if (!(m.notifies && m.notifies.length))
                            m.notifies = [];
                        m.notifies.push($root.ro3.Notify.decode(r, r.uint32()));
                        break;
                    default:
                        r.skipType(t & 7);
                        break;
                    }
                }
                if (!m.hasOwnProperty("cmd"))
                    throw $util.ProtocolError("missing required 'cmd'", { instance: m });
                if (!m.hasOwnProperty("cmdNo"))
                    throw $util.ProtocolError("missing required 'cmdNo'", { instance: m });
                if (!m.hasOwnProperty("uid"))
                    throw $util.ProtocolError("missing required 'uid'", { instance: m });
                if (!m.hasOwnProperty("buffer"))
                    throw $util.ProtocolError("missing required 'buffer'", { instance: m });
                return m;
            };
    
            return NetMsg;
        })();
    
        return ro3;
    })();

    return $root;
})(protobuf);
