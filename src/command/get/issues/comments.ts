import { AbstractSubCommand } from "@/command/abstractSubCommand";
import { createBacklog } from "@/client";
import {
  getIssueCommentsOption,
  type GetIssueCommentsOption,
} from "@/options/issue/getIssueCommentsOptions";
import { trim } from "@/utils/trim";

import type { ArgumentsCamelCase, CommandBuilder } from "yargs";

export class GetIssueComments extends AbstractSubCommand<unknown, GetIssueCommentsOption> {
  command = "issue-comments";
  describe =
    "課題に登録されているコメントの一覧を取得します。\nhttps://developer.nulab.com/ja/docs/backlog/api/2/get-comment-list/";
  public builder: CommandBuilder<unknown, GetIssueCommentsOption> = (yargs) =>
    yargs.options(getIssueCommentsOption).parserConfiguration({ "camel-case-expansion": false });
  protected async execute(argv: ArgumentsCamelCase<GetIssueCommentsOption>): Promise<void> {
    const { issueIdOrKey, ...params } = trim<GetIssueCommentsOption>(argv);
    const client = createBacklog();
    const comments = await client.getIssueComments(issueIdOrKey, params);
    console.log(JSON.stringify(comments, null, 2));
  }
}
