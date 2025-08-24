import { GetIssues } from "./issues";
import { GetIssue } from "./issue";
import { GetIssueComments } from "./comments";

export function createGetIssuesCommands() {
  return [new GetIssues(), new GetIssue(), new GetIssueComments()];
}
