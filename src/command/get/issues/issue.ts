import { AbstractSubCommand } from "@/command/abstractSubCommand";
import { createBacklog } from "@/client";
import { trim } from "@/utils/trim";

import type { IssueIdOrKeyOption } from "@/options/issue/issueIdOrKeyOption";
import type { ArgumentsCamelCase, CommandBuilder } from "yargs";

export class GetIssue extends AbstractSubCommand<unknown, IssueIdOrKeyOption> {
  command = "issue";
  describe =
    "参加しているプロジェクトから課題の情報を取得します。\n課題は、課題一覧の取得から検索できます。\n自分が参加しているプロジェクトの一覧はプロジェクト一覧の取得から取得できます。\nhttps://developer.nulab.com/ja/docs/backlog/api/2/get-issue/";
  public builder: CommandBuilder<unknown, IssueIdOrKeyOption> = (yargs) =>
    yargs
      .options({ issueIdOrKey: { type: "string", description: "", demandOption: true } })
      .parserConfiguration({ "camel-case-expansion": false });
  protected async execute(argv: ArgumentsCamelCase<IssueIdOrKeyOption>): Promise<void> {
    const { issueIdOrKey } = trim<IssueIdOrKeyOption>(argv);
    const client = createBacklog();
    const issue = await client.getIssue(issueIdOrKey);
    console.log(JSON.stringify(issue, null, 2));
  }
}
