import { AbstractSubCommand } from "@/command/abstractSubCommand";
import { createBacklog } from "@/client";
import { getIssuesOptions, type GetIssuesOptions } from "@/options/issue/getIssuesOptions";
import { trim } from "@/utils/trim";

import type { ArgumentsCamelCase, CommandBuilder } from "yargs";

export class GetIssues extends AbstractSubCommand<unknown, GetIssuesOptions> {
  command = "issues";
  describe =
    "参加しているプロジェクトから課題を取得します。\nクエリパラメーターで指定された条件で、取得する課題を絞り込むことができます。\n自分が参加しているプロジェクトの一覧はプロジェクトの状態一覧の取得から取得できます。\nhttps://developer.nulab.com/ja/docs/backlog/api/2/get-issue-list/";
  public builder: CommandBuilder<unknown, GetIssuesOptions> = (yargs) =>
    yargs.options(getIssuesOptions).parserConfiguration({ "camel-case-expansion": false });
  protected async execute(argv: ArgumentsCamelCase<GetIssuesOptions>): Promise<void> {
    const client = createBacklog();
    const issues = await client.getIssues(trim(argv));
    console.log(JSON.stringify(issues, null, 2));
  }
}
