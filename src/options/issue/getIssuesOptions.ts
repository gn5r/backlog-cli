import { Option } from "backlog-js";
import { Options } from "yargs";

type GetIssuesParamsKeys = keyof Option.Issue.GetIssuesParams;

export const getIssuesOptions: Record<GetIssuesParamsKeys, Options> = {
  projectId: {
    description: "",
    type: "array",
    coerce: (v: any[]) => v.map(Number),
  },
  issueTypeId: {
    description: "",
    type: "array",
    coerce: (v: any[]) => v.map(Number),
  },
  categoryId: {
    description: "",
    type: "array",
    coerce: (v: any[]) => v.map(Number),
  },
  versionId: {
    description: "",
    type: "array",
    coerce: (v: any[]) => v.map(Number),
  },
  milestoneId: {
    description: "",
    type: "array",
    coerce: (v: any[]) => v.map(Number),
  },
  statusId: {
    description: "",
    type: "array",
    coerce: (v: any[]) => v.map(Number),
  },
  priorityId: {
    description: "",
    type: "array",
    coerce: (v: any[]) => v.map(Number),
  },
  assigneeId: {
    description: "",
    type: "array",
    coerce: (v: any[]) => v.map(Number),
  },
  createdUserId: {
    description: "",
    type: "array",
    coerce: (v: any[]) => v.map(Number),
  },
  resolutionId: {
    description: "",
    type: "array",
    coerce: (v: any[]) => v.map(Number),
  },
  parentChild: {
    description: "",
    choices: [0, 1, 2, 3, 4],
    type: "number",
  },
  attachment: {
    type: "string",
    description: "",
  },
  sharedFile: {
    type: "string",
    description: "",
  },
  sort: {
    description: "",
    choices: [
      "issueType",
      "category",
      "version",
      "milestone",
      "summary",
      "status",
      "priority",
      "attachment",
      "sharedFile",
      "created",
      "createdUser",
      "updated",
      "updatedUser",
      "assignee",
      "startDate",
      "dueDate",
      "estimatedHours",
      "actualHours",
      "childIssue",
    ],
    type: "string",
  },
  order: {
    description: "",
    choices: ["asc", "desc"],
    type: "string",
  },
  offset: {
    type: "number",
    description: "",
  },
  count: {
    type: "number",
    description: "",
  },
  createdSince: {
    type: "string",
    description: "",
  },
  createdUntil: {
    type: "string",
    description: "",
  },
  updatedSince: {
    type: "string",
    description: "",
  },
  updatedUntil: {
    type: "string",
    description: "",
  },
  startDateSince: {
    type: "string",
    description: "",
  },
  startDateUntil: {
    type: "string",
    description: "",
  },
  dueDateSince: {
    type: "string",
    description: "",
  },
  dueDateUntil: {
    type: "string",
    description: "",
  },
  id: {
    description: "",
    type: "array",
    coerce: (v: any[]) => v.map(Number),
  },
  parentIssueId: {
    description: "",
    type: "array",
    coerce: (v: any[]) => v.map(Number),
  },
  keyword: {
    type: "string",
    description: "",
  },
};
