import * as fs from "fs";
import * as path from "path";
import xlsx from 'node-xlsx';
interface IConfig {
    [key: string]: any;
    __INDEXES: number[];
}
export async function exportExcels(inputPath: string, libPath: string, outPath: string): Promise<void> {
    let files: string[] = [];
    fs.readdirSync(inputPath).forEach((file) => {
        if (path.extname(file) == ".xlsx" && file.indexOf(".~") == -1) {
            files.push(path.join(inputPath, file));
        }
    });
    const dtsFile = path.join(libPath, "config.d.ts");
    let dtsContent = '//此文件为数据表的类型声明，由工具生成，请不要手动编辑\n';
    dtsContent += "declare module rol {\n";
    if (fs.existsSync(dtsFile)) {
        fs.rmSync(dtsFile);
    }
    if (fs.existsSync(outPath)) {
        fs.rmdirSync(outPath, { recursive: true });
    }
    fs.mkdirSync(outPath);
    console.log("转换Excel文件为json文件\n");
    for (let file of files) {
        const baseName = path.basename(file, ".xlsx");
        dtsContent += "    interface I" + baseName + " {\n";

        const jsonFile = path.join(outPath, baseName + ".json");
        if (fs.existsSync(jsonFile)) {
            fs.rmSync(jsonFile);
        }
        const workSheets = xlsx.parse(file);
        //默认只导出第一张表
        const sheet = workSheets[0];

        const config = <IConfig>{ __INDEXES: [] };
        //第一行为字段名，首字符为!的不导出,另默认第一个字段为ID主键
        const fields: string[] = <string[]>sheet.data[0];
        let fixedFields: string[] = [];
        //第二行为数据类型,int,string,json三种简易类型，不建议表中配置复杂的数据类型
        const types: string[] = <string[]>sheet.data[1];
        //第三行为字段归属类型,(C=客户端,S=服务端,A=所有)
        const flags: string[] = <string[]>sheet.data[2];
        //生成表数据类型接口声明
        for (let i = 0; i < fields.length; i++) {
            let key = fields[i];
            if (key.charAt(0) == '!') {
                continue;
            }
            if (flags[i] == "S") {
                continue;
            }
            fixedFields.push(fields[i]);
            if (types[i] == "int") {
                dtsContent += "        " + key + ": number;\n";
            }
            else if (types[i] == "string") {
                dtsContent += "        " + key + ": string;\n";
            }
            else if (types[i] == "intArray") {
                dtsContent += "        " + key + ": number[];\n";
            }
            else if (types[i] == "stringArray") {
                dtsContent += "        " + key + ": number[];\n";
            }
            else {
                dtsContent += "        " + key + ": any;\n";
            }
        }
        for (let i = 3; i < sheet.data.length; i++) {
            let row: any[] = <any[]>sheet.data[i];
            if (row.length == 0) {
                continue;
            }
            if (row[0] == null) {
                continue;
            }
            let item = {};
            for (let j = 0; j < fields.length; j++) {
                if (fields[j].charAt(0) == '!') {
                    continue;
                }
                if (flags[j] == "S") {
                    continue;
                }
                let key = fields[j];
                let value = row[j];
                if (types[j] == "intArray" || types[j] == "stringArray" || types[j] == "json") {
                    item[key] = JSON.parse(value);
                }
                else {
                    item[key] = value;

                }
            }
            config[row[0]] = item;
            config.__INDEXES.push(row[0]);
        }
        dtsContent += "    }\n";
        fs.writeFileSync(jsonFile, JSON.stringify(config, null, 4));
        console.log(`--- 导出${baseName}.xlsx，声明rol.I${baseName}，有效字段:${fixedFields.join(",")}`);
    }
    dtsContent += "}\n";
    fs.writeFileSync(dtsFile, dtsContent);
    console.log("\n导出完成");
}