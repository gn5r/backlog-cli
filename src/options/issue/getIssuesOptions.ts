export const getIssuesOptions = {
  projectId: {
    type: "array",
    description:
      "プロジェクトのID。プロジェクトのIDはプロジェクトの状態一覧の取得から取得できます。",
  },
  issueTypeId: {
    type: "array",
    description: "課題の種別のID。種別のIDは種別一覧の取得から取得できます。",
  },
  categoryId: {
    type: "array",
    description: "課題のカテゴリーのID。カテゴリーのIDはカテゴリー一覧の取得から取得できます。",
  },
  versionId: {
    type: "array",
    description:
      "課題のバージョンのID。バージョンのIDはバージョン(マイルストーン)一覧の取得から取得できます。",
  },
  milestoneId: {
    type: "array",
    description:
      "課題のマイルストーンのID。マイルストーンのIDはバージョン(マイルストーン)一覧の取得から取得できます。",
  },
  statusId: {
    type: "array",
    description: "課題の状態のID。状態のIDはプロジェクトの状態一覧の取得から取得できます。",
  },
  priorityId: {
    type: "array",
    description: "課題の優先度のID。優先度のIDは優先度一覧の取得から取得できます。",
  },
  assigneeId: {
    type: "array",
    description:
      "課題の担当者のユーザーのID。ユーザーのIDはプロジェクトユーザー一覧の取得から取得できます。",
  },
  createdUserId: {
    type: "array",
    description:
      "課題の登録者のユーザーのID。ユーザーのIDはプロジェクトユーザー一覧の取得から取得できます。",
  },
  resolutionId: {
    type: "array",
    description: "課題の完了理由のID。完了理由のIDは完了理由一覧の取得から取得できます。",
  },
  parentChild: {
    type: "string",
    description: "親子課題の条件。指定が無い場合は0が使われます。",
    choices: [0, 1, 2, 3, 4],
  },
  attachment: {
    type: "boolean",
    description: "課題が添付ファイルを含むかどうか。",
  },
  sharedFile: {
    type: "boolean",
    description: "課題が共有ファイルを含むかどうか。",
  },
  sort: {
    type: "string",
    description:
      "課題一覧の並び順に使用する属性。カスタム属性のIDはカスタム属性一覧の取得から取得できます。",
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
  },
  order: {
    type: "string",
    description: "課題一覧の並び順。指定が無い場合はdescが使われます。",
    choices: ["asc", "desc"],
  },
  offset: {
    type: "number",
    description: "課題の取得開始位置。0以上の整数を指定してください。",
  },
  count: {
    type: "number",
    description:
      "課題の件数の上限。1〜100の範囲で指定してください。指定が無い場合は20が使われます。",
  },
  createdSince: {
    type: "string",
    description: "課題の登録日の期間の開始（yyyy-MM-dd）",
  },
  createdUntil: {
    type: "string",
    description: "課題の登録日の期間の終了（yyyy-MM-dd）",
  },
  updatedSince: {
    type: "string",
    description: "課題の更新日の期間の開始（yyyy-MM-dd）",
  },
  updatedUntil: {
    type: "string",
    description: "課題の更新日の期間の終了（yyyy-MM-dd）",
  },
  startDateSince: {
    type: "string",
    description: "課題の開始日の期間の開始（yyyy-MM-dd）",
  },
  startDateUntil: {
    type: "string",
    description: "課題の開始日の期間の終了（yyyy-MM-dd）",
  },
  dueDateSince: {
    type: "string",
    description: "課題の期限日の期間の開始（yyyy-MM-dd）",
  },
  dueDateUntil: {
    type: "string",
    description: "課題の期限日の期間の終了（yyyy-MM-dd）",
  },
  hasDueDate: {
    type: "boolean",
    description:
      "falseを指定すると、期限日が設定されていない課題を返します。trueの指定はサポートされておらず、エラーが返されます。",
  },
  id: {
    type: "array",
    description: "課題のID。課題のIDは課題情報の取得から取得できます。",
  },
  parentIssueId: {
    type: "array",
    description: "課題の親課題のID。課題のIDは課題情報の取得から取得できます。",
  },
  keyword: {
    type: "string",
    description: "検索キーワード",
  },
} as const;
