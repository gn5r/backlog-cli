#!/usr/bin/env node
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { version } from "../package.json";

export function createCli() {
  return yargs(hideBin(process.argv))
    .scriptName("backlog")
    .usage("使い方: $0 <command> [args]")
    .version(version)
    .alias("v", "version")
    .describe("version", "バージョン情報を表示します")
    .help("help", "ヘルプを表示します")
    .alias("h", "help")
    .strict()
    .demandCommand(1, "コマンドを指定してください");
}

if (require.main === module) {
  createCli().parse();
}
