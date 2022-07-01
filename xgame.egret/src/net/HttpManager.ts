/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-01
*************************************************/
/// <reference path="./interfaces/IHttpManager.ts" />

module egretx {
    export interface IRequestOptions {
        uri: string;
        method?: string;
        headers?: Array<string[]>;
        values?: Array<string[]>;
        isJSON?: boolean;
    }
    @impl(IHttpManager)
    export class HttpManager extends xgame.Singleton implements IHttpManager, IHttpManagerInternal {
        private pools = new xgame.PoolObject<HttpRequest>(HttpRequest);
        public constructor() {
            super();
        }
        public initialize(): void {

        }
        public async sendRequest<T>(uri: string, method?: string, values?: Array<string[]>, isJSON?: boolean): Promise<T | undefined>
        public async sendRequest<T>(options: IRequestOptions): Promise<T | undefined>
        public async sendRequest<T>(uri_or_options: string | IRequestOptions, method?: string, values?: Array<string[]>, isJSON?: boolean): Promise<T | undefined> {
            let options: IRequestOptions;
            if (typeof (uri_or_options) == "string") {
                options = {
                    uri: uri_or_options,
                    method: method,
                    values: values,
                    isJSON: isJSON
                }
            }
            else {
                options = uri_or_options;
            }
            let httpRequest = this.pools.fetch(() => new HttpRequest(options.uri, options.method), this);
            if (options.headers) {
                for (let i = 0; i < options.headers.length; i++) {
                    httpRequest.setHeader(options.headers[i][0], options.headers[i][1]);
                }
            }
            if (options.values) {
                for (let i = 0; i < options.values.length; i++) {
                    httpRequest.setValue(options.values[i][0], options.values[i][1]);
                }
            }
            let response = await httpRequest.send<T>(options.isJSON);
            this.pools.recycle(httpRequest);
            return response;
        }
    }
}