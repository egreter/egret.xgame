import * as fs from "fs";
import * as path from "path";
import * as pbjs from "protobufjs/cli/pbjs";
import * as pbts from "protobufjs/cli/pbts";
import * as uglifyjs from "uglify-js";
export async function compileProtos(inputPath: string, outPath: string): Promise<void> {
    let files: string[] = [];
    fs.readdirSync(inputPath).forEach((file) => {
        if (path.extname(file) == ".proto") {
            files.push(path.join(inputPath, file));
        }
    });
    console.log("编译proto文件");
    const jsFile = path.join(outPath, "protobuf-bundles.js");
    if (fs.existsSync(jsFile)) {
        fs.rmSync(jsFile);
    }
    await new Promise<void>((resolve) => {
        pbjs.main([
            "--no-verify",
            "--no-delimited",
            "--no-beautify",
            "--no-convert",
            "--force-number",
            "--target", "static-module",
            "--wrap", "closure",
            "--out", jsFile,
            ...files
        ], () => resolve());
    });
    console.log("生成d.ts");
    const dtsFile = path.join(outPath, "protobuf-bundles.d.ts");
    if (fs.existsSync(dtsFile)) {
        fs.rmSync(dtsFile);
    }
    await new Promise<void>((resolve) => {
        pbts.main([
            "--main",
            "--out",
            dtsFile, jsFile], () => resolve());
    });
    console.log("修正js文件");
    const jsContent = fs.readFileSync(jsFile, "utf8");
    const jsFixedContent = jsContent.replace('["default"] = {}', '["default"] = window');
    fs.writeFileSync(jsFile, jsFixedContent);
    console.log("修正d.ts文件");
    const dtsContent = fs.readFileSync(dtsFile, "utf8");
    let dtsFixedContent = 'type Long = protobuf.Long;\n' + dtsContent;
    let regExp = new RegExp("\\$protobuf", "g");
    dtsFixedContent = dtsFixedContent.replace(regExp, 'protobuf');
    dtsFixedContent = dtsFixedContent.replace('export namespace', 'declare namespace');
    fs.writeFileSync(dtsFile, dtsFixedContent);
    console.log("压缩min.js文件");
    let code = fs.readFileSync(jsFile, "utf8");
    const minFile = path.join(outPath, "protobuf-bundles.min.js");
    if (fs.existsSync(minFile)) {
        fs.rmSync(minFile);
    }
    const result = uglifyjs.minify(code, { mangle: true });
    fs.writeFileSync(minFile, result.code);
    console.log("编译完成");
}