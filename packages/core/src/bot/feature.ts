import type { Command } from "../command/command.ts";
import type { AnyBotEvent } from "../event/bot-event.ts";

/** A self-contained slice of bot behaviour: the commands and events of one domain. */
export interface Feature {
  commands?: readonly Command[];
  events?: readonly AnyBotEvent[];
  name: string;
}
