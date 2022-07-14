/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-13
*************************************************/
module fui {
    interface ChildTypes {
        "0": fairygui.GObject;
        "1": fairygui.Controller;
        "2": fairygui.Transition;
    }
    function getFairyGUI(root: fairygui.GComponent, name: string, type: string): any {
        switch (type) {
            case "1":
                return root.getController(name);
            case "2":
                return root.getTransition(name);
            default:
                return root.getChild(name);
        }
    }
    function findPath<T extends keyof ChildTypes>(root: fairygui.GComponent, path: string, type: T): ChildTypes[T] {
        path = path.replace(/\./g, "/");
        let paths = path.split("/");
        if (paths.length > 1) {
            let name = paths.pop();
            for (let i = 0; i < paths.length; i++) {
                let ui = root.getChild(paths[i]);
                if (!ui || !ui.asCom) {
                    return null;
                }
                root = ui.asCom;
            }
            return getFairyGUI(root, name, type);
        }
        return getFairyGUI(root, path, type);
    }
    export function fairy_ui(name?: string) {
        return function (target: any, key: string) {
            Object.defineProperty(target, key, {
                get: function () {
                    let ui = (this as UIPage<fairygui.GObject>).view.asCom;
                    if (!name) {
                        name = key;
                    }
                    return findPath(ui, name, "0");
                }
            });
        }
    }
    export function fairy_controller(name?: string) {
        return function (target: any, key: string) {
            Object.defineProperty(target, key, {
                get: function () {
                    let ui = (this as UIPage<fairygui.GObject>).view.asCom;
                    if (!name) {
                        name = key;
                    }
                    return findPath(ui, name, "1");
                }
            });
        }
    }

    export function fairy_transition(name?: string) {
        return function (target: any, key: string) {
            Object.defineProperty(target, key, {
                get: function () {
                    let ui = (this as UIPage<fairygui.GObject>).view.asCom;
                    if (!name) {
                        name = key;
                    }
                    return findPath(ui, name, "2");
                }
            });
        }
    }
}