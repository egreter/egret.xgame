/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-01
*************************************************/
module egretx {
    export class HttpRequest extends xgame.XObject implements xgame.IPoolable {
        public reconnectTimes: number = 5;

        protected headers = new xgame.Dictionary<string, string>();
        protected values = new xgame.Dictionary<string, string | number>();
        public constructor(public uri?: string, public method?: string) {
            super();
        }
        public fromPoolHashCode: number;
        public release(): void {

        }
        public dispose(): void {
            this.headers.clear();
            this.values.clear();
            this.uri = undefined;
            this.method = undefined;
        }
        public setUri(uri: string): void {
            this.uri = uri;
        }
        public setMethod(method: string = egret.HttpMethod.GET): void {
            this.method = method;
        }
        public setHeader(key: string, value: string): void {
            this.headers.set(key, value);
        }
        public setValue(key: string, value: string | number): void {
            this.values.set(key, value);
        }
        public async send<T>(isJSON?: boolean): Promise<T | undefined> {
            let response: string | boolean;
            let times: number = this.reconnectTimes;
            while (times) {
                response = await this.request();
                if (typeof (response) === "boolean") {
                    times--;
                    await xgame.waitMilliseconds(500);
                }
                else {
                    break;
                }
            }
            if (typeof (response) === "boolean") {
                return undefined;
            }
            if (!isJSON) {
                return <T><any>response;
            }
            try {
                let resp = JSON.parse(response);
                return <T>resp;
            }
            catch (err) {

            }
            return undefined;
        }
        public async request(): Promise<string | boolean> {
            this.method = this.method || egret.HttpMethod.GET;
            return new Promise<string | boolean>((resolve, reject) => {
                let req = new egret.HttpRequest();
                req.open(this.uri, this.method);
                if (this.method == egret.HttpMethod.GET || this.values.length == 0) {
                    req.send();
                }
                else {
                    req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                    let sendData = "";
                    this.headers.forKeys((key) => {
                        req.setRequestHeader(key, this.headers.get(key));
                    }, this);
                    this.values.forKeys((key) => {
                        sendData += `${key}=${this.values.get(key)}&`;
                    }, this);
                    req.send(sendData);
                }
                req.addEventListener(egret.Event.COMPLETE, () => {
                    resolve(req.response);
                }, this);
                req.addEventListener(egret.IOErrorEvent.IO_ERROR, () => {
                    resolve(false);
                }, this);
            });
        }
    }
}