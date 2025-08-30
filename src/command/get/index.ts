import { GetIssues } from "./issues/issues";
import { GetIssue } from "./issues/issue";
import { GetIssueComments } from "./issues/comments";

import type { CommandModule } from "yargs";

export function createGetCommand() {
  return {
    command: "get",
    describe: "GETリクエストを実行します",
    builder: (yargs) =>
      yargs
        .wrap(null)
        .usage("使い方: $0 get <subCommand>")
        .command(new GetIssues())
        .command(new GetIssue())
        .command(new GetIssueComments())
        .demandCommand(1, "コマンドを指定してください")
        .strict(),
    handler: () => {},
  } as CommandModule<unknown, unknown>;
}
