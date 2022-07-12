export class ThemeAdapter implements eui.IThemeAdapter {

    /**
     * 解析主题
     * @param url 待解析的主题url
     * @param onSuccess 解析完成回调函数，示例：compFunc(e:egret.Event):void;
     * @param onError 解析失败回调函数，示例：errorFunc():void;
     * @param thisObject 回调的this引用
     */
    public getTheme(url: string, onSuccess: Function, onError: Function, thisObject: any): void {
        function onResGet(e: string): void {
            onSuccess.call(thisObject, e);
        }
        function onResError(e: RES.ResourceEvent): void {
            if (e.resItem.url == url) {
                RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, onResError, null);
                onError.call(thisObject);
            }
        }

        if (typeof window.generateEUI !== 'undefined') {
            egret.callLater(() => {
                onSuccess.call(thisObject, window.generateEUI);
            }, this);
        }
        else if (typeof window.generateEUI2 !== 'undefined') {
            RES.getResByUrl("resource/gameEui.json", (data, url) => {
                window["JSONParseClass"]["setData"](data);
                egret.callLater(() => {
                    onSuccess.call(thisObject, window.generateEUI2);
                }, this);
            }, this, RES.ResourceItem.TYPE_JSON);
        }
        else if (typeof window.generateJSON !== 'undefined') {
            if (url.indexOf(".exml") > -1) {
                let dataPath = url.split("/");
                dataPath.pop();
                let dirPath = dataPath.join("/") + "_EUI.json";
                if (!window.generateJSON.paths[url]) {
                    RES.getResByUrl(dirPath, (data) => {
                        window["JSONParseClass"]["setData"](data);
                        egret.callLater(() => {
                            onSuccess.call(thisObject, window.generateJSON.paths[url]);
                        }, this);
                    }, this, RES.ResourceItem.TYPE_JSON);
                } else {
                    egret.callLater(() => {
                        onSuccess.call(thisObject, window.generateJSON.paths[url]);
                    }, this);
                }
            }
            else {
                egret.callLater(() => {
                    onSuccess.call(thisObject, window.generateJSON);
                }, this);
            }
        }
        else {
            RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, onResError, null);
            RES.getResByUrl(url, onResGet, this, RES.ResourceItem.TYPE_TEXT);
        }
    }
}
declare global {
    interface Window {
        generateEUI?: { paths: string[], skins: any }
        generateEUI2?: { paths: string[], skins: any }
        generateJSON?: { paths: string[], skins: any }
    }
}