import type { ArgumentsCamelCase, CommandBuilder, CommandModule } from "yargs";

export abstract class AbstractSubCommand<T = unknown, U = unknown> implements CommandModule<T, U> {
  abstract command: string;
  abstract describe: string;
  public builder?: CommandBuilder<T, U> | undefined;
  protected abstract execute(argv: ArgumentsCamelCase<U>): Promise<void>;
  public handler = async (argv: ArgumentsCamelCase<U>) => {
    try {
      await this.execute(argv);
    } catch (error: any) {
      console.error(error._body);
      process.exit(1);
    }
  };
}
