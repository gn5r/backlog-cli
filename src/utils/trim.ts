import type { ArgumentsCamelCase } from "yargs";

export function trim<U extends object>(argv: ArgumentsCamelCase<U>): Omit<U, "_" | "$0"> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { _, $0, ...args } = argv;
  return args as Omit<U, "_" | "$0">;
}
