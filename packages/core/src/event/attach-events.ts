import type { Client, ClientEvents } from "discord.js";
import { logger } from "../logger/logger.ts";
import type { AnyBotEvent, BotEvent } from "./bot-event.ts";

function attachEvent<Name extends keyof ClientEvents>(client: Client, event: BotEvent<Name>) {
  const listener = async (...args: ClientEvents[Name]) => {
    try {
      await event.run(...args);
    } catch (error) {
      logger.error(error, `Event "${event.name}" failed`);
    }
  };

  if (event.once) {
    client.once(event.name, listener);
  } else {
    client.on(event.name, listener);
  }
}

export function attachEvents(client: Client, events: readonly AnyBotEvent[]) {
  for (const event of events) {
    attachEvent(client, event);
  }
}
