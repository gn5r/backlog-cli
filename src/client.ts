import "dotenv/config";
import { Backlog } from "backlog-js";

export function createBacklog() {
  const host = process.env.BACKLOG_HOST;
  const apiKey = process.env.BACKLOG_API_KEY;
  if (!host) {
    console.error("BACKLOG_HOSTが設定されていません。");
    process.exit(1);
  }
  if (!apiKey) {
    console.error("BACKLOG_API_KEYが設定されていません。");
    process.exit(1);
  }
  return new Backlog({ host, apiKey });
}
