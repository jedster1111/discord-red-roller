import { SlashCommandBuilder } from "discord.js";
import { Command, CommandConfig, CommandHandler } from "./types.js";

const config: CommandConfig = {};

const commandJson = new SlashCommandBuilder()
  .setName("roll-d10")
  .setDescription("Rolls a d10")
  .addIntegerOption((o) =>
    o.setName("modifier").setDescription("What to add or subtract to your roll").setRequired(false),
  )
  .addStringOption((o) => o.setName("description").setDescription("Add a description to your roll").setRequired(false))
  .toJSON();

const handler: CommandHandler = async (interaction) => {
  const modifier = interaction.options.getInteger("modifier", false) || 0;
  const rollDescription = interaction.options.getString("description", false) || "Result";

  const initialRoll = rollD10();

  const explodeRoll = initialRoll === 10 ? rollD10() : 0;
  const implodeRoll = initialRoll === 1 ? rollD10() : 0;

  const result = initialRoll + explodeRoll - implodeRoll + modifier;

  let explanation = `**${initialRoll}**`;
  if (explodeRoll) explanation += ` + **${explodeRoll}**`;
  if (implodeRoll) explanation += ` - **${implodeRoll}**`;
  explanation += ` + ${modifier}`;

  await interaction.reply(`${rollDescription}: __**${result}**__ | *(${explanation})*`);
};

const randomInt = (min: number, max: number): number => Math.floor(Math.random() * (max - min + 1)) + min;
const rollD10 = () => randomInt(1, 10);

const command: Command = {
  config,
  commandJson,
  handler,
  stores: {},
};

export default command;
