import { withDebugOption, DebugOption } from "../options/debug";
import { isBacklogError } from "../utils/backlog";
import { Backlog, Error } from "backlog-js";

import type { ArgumentsCamelCase, CommandBuilder, CommandModule, Argv } from "yargs";

export abstract class AbstractSubCommand<T = unknown, U = unknown>
  implements CommandModule<T, U & DebugOption>
{
  protected client: Backlog;
  abstract command: string;
  abstract describe: string;
  constructor(client: Backlog) {
    this.client = client;
  }
  protected build?: (argv: Argv<T>) => Argv<U & DebugOption>;
  public builder: CommandBuilder<T, U & DebugOption> = (yargs) => {
    if (this.build) {
      return this.build(withDebugOption(yargs));
    } else {
      return withDebugOption(yargs) as unknown as Argv<U & DebugOption>;
    }
  };
  protected abstract execute(args: ArgumentsCamelCase<U & DebugOption>): void | Promise<void>;
  public handler = async (args: ArgumentsCamelCase<U & DebugOption>) => {
    try {
      await this.execute(args);
    } catch (error: any) {
      if (error instanceof Error.BacklogError) {
        console.error(error.body);
      } else if (isBacklogError(error)) {
        console.error(error._body);
      } else {
        console.error(error);
      }
      process.exit(1);
    }
  };
}
