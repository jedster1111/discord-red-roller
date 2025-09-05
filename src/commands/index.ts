import ping from "./ping.js";
import rolld6 from "./rolld6.js";
import rolld10 from "./rolld10.js";
import { Command } from "./types.js";

export const commands = [ping, rolld6, rolld10];

export const commandsMap: Record<string, Command> = commands.reduce<Record<string, Command>>((accum, command) => {
  accum[command.commandJson.name] = command;
  return accum;
}, {});
