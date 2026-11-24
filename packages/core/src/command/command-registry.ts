import type { Command } from "./command.ts";

export interface CommandRegistry {
  readonly commands: readonly Command[];
  find: (nameOrAlias: string) => Command | undefined;
}

export function createCommandRegistry(commands: readonly Command[]): CommandRegistry {
  const byName = new Map<string, Command>();

  for (const command of commands) {
    for (const key of [command.name, ...(command.aliases ?? [])]) {
      if (byName.has(key)) {
        throw new Error(`Duplicate command name or alias: "${key}"`);
      }
      byName.set(key, command);
    }
  }

  return {
    commands,
    find: (nameOrAlias) => byName.get(nameOrAlias),
  };
}
