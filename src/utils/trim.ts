import type { ArgumentsCamelCase } from "yargs";

export function trim<U = unknown>(argv: ArgumentsCamelCase<U>) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { _, $0, ...args } = argv;
  return args;
}
