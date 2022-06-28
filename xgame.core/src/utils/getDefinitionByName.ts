/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-29
*************************************************/
module xgame {
    let getDefinitionByNameCache = {};
    /**
     * Returns a reference to the class object of the class specified by the name parameter.
     * @param name The name of a class.
     */
    export function getDefinitionByName(name: string): any {
        if (!name)
            return null;
        let definition = getDefinitionByNameCache[name];
        if (definition) {
            return definition;
        }
        let paths = name.split(".");
        let length = paths.length;
        definition = __global;
        for (let i = 0; i < length; i++) {
            let path = paths[i];
            definition = definition[path];
            if (!definition) {
                return null;
            }
        }
        getDefinitionByNameCache[name] = definition;
        return definition;
    }
}
var __global = this.__global || this;