import { createGetIssuesCommands } from "./issues";

import type { CommandModule } from "yargs";

export function createGetCommand() {
  return {
    command: "get",
    describe: "GETリクエストを実行します",
    builder: (yargs) =>
      yargs
        .wrap(null)
        .usage("使い方: $0 get <subCommand>")
        .command(createGetIssuesCommands())
        .demandCommand(1, "コマンドを指定してください")
        .strict(),
    handler: () => {},
  } as CommandModule<unknown, unknown>;
}
