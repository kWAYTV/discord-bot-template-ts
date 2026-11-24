import type { ClientEvents } from "discord.js";

export interface BotEvent<Name extends keyof ClientEvents> {
  name: Name;
  once?: boolean;
  // biome-ignore lint/style/useConsistentMethodSignatures: method bivariance lets every typed event be attached generically
  run(...args: ClientEvents[Name]): Promise<void> | void;
}

/** Any event, with `run` arguments correctly tied to its `name`. */
export type AnyBotEvent = { [Name in keyof ClientEvents]: BotEvent<Name> }[keyof ClientEvents];
