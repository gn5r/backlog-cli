import { GetIssues } from "./issues";

export function createGetIssuesCommands() {
  return [new GetIssues()];
}
