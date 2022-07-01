import { Command } from 'commander';
import { resolve } from 'path';
import { compileProtos } from './compileProtos';
import { exportExcels } from './exportExcels';
const program = new Command();
program.version("1.0.0");
program.description("命令行工具")
program.command("proto").action(() => {
    const inputPath = resolve("../protos");;
    const outPath = resolve("../libs/protobuf-bundles");;
    compileProtos(inputPath, outPath);
});
program.command("config").action(() => {
    const inputPath = resolve("../excels");;
    const libsPath = resolve("../libs");
    const outPath = resolve("../resource/config");
    exportExcels(inputPath, libsPath, outPath);
});
program.parse();