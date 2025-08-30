export type IssueIdOrKeyOption = {
  issueIdOrKey: string;
};

export const issueIdOrKeyOption = {
  issueIdOrKey: {
    type: "string",
    description:
      "以下のいずれかを指定します。\n・課題のID\n・課題キー\n課題のIDと課題キーは課題一覧の取得から取得できます。",
    demandOption: true,
  },
} as const;
