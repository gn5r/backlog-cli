import type { Option } from "backlog-js";
import type { IssueIdOrKeyOption } from "./issueIdOrKeyOption";

export type GetIssueCommentsOption = IssueIdOrKeyOption & {
  minId?: number;
  maxId?: number;
  count?: number;
  order?: Option.Order;
};

export const getIssueCommentsOption = {
  issueIdOrKey: {
    type: "string",
    description: "課題のID または 課題キー",
    demandOption: true,
  },
  minId: {
    type: "number",
    description: "最小ID",
  },
  maxId: {
    type: "number",
    description: "最大ID",
  },
  count: {
    type: "number",
    description: "取得上限(1-100) 指定が無い場合は20",
  },
  order: {
    type: "string",
    description: "”asc”または”desc” 指定が無い場合は”desc”",
    choices: ["asc", "desc"],
  },
} as const;
