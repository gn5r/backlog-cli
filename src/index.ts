#!/usr/bin/env node
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import pkg from "../package.json" with { type: "json" };
import { fileURLToPath } from "node:url";

export function createCli() {
  return yargs(hideBin(process.argv))
    .scriptName("backlog")
    .usage("使い方: $0 <command> [args]")
    .version(pkg.version)
    .alias("v", "version")
    .describe("version", "バージョン情報を表示します")
    .help("help", "ヘルプを表示します")
    .alias("h", "help")
    .strict()
    .demandCommand(1, "コマンドを指定してください");
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  createCli().parse();
}
