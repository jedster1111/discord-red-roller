import { SlashCommandBuilder } from "discord.js";
import { Command, CommandConfig, CommandHandler } from "./types.js";
import { DiceRoll } from "@dice-roller/rpg-dice-roller";

const config: CommandConfig = {};

const commandJson = new SlashCommandBuilder()
  .setName("roll")
  .setDescription("Rolls arbitrary die command")
  .addStringOption((o) =>
    o.setName("roll-command").setDescription("The roll to make, see /roll-help for documentation").setRequired(true),
  )
  .addStringOption((o) => o.setName("description").setDescription("Add a description to your roll").setRequired(false))
  .toJSON();

const handler: CommandHandler = async (interaction) => {
  const rollCommand = interaction.options.getString("roll-command", true);
  const rollDescription = interaction.options.getString("description", false) || "Result";

  try {
    const roll = new DiceRoll(rollCommand);
    await interaction.reply(`${rollDescription}: __**${roll.total}**__ | *(${roll.output})*`);
  } catch (e: unknown) {
    await interaction.reply(`Couldn't roll: ${e}`);
  }
};

const command: Command = {
  config,
  commandJson,
  handler,
  stores: {},
};

export default command;
