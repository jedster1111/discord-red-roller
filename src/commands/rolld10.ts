import { ApplicationIntegrationType, InteractionContextType, SlashCommandBuilder } from "discord.js";
import { Command, CommandConfig, CommandHandler } from "./types.js";
import { rollD10 } from "./utils/roll.js";
import { parseModifier } from "./utils/modifier.js";

const config: CommandConfig = {};

const commandJson = new SlashCommandBuilder()
  .setName("roll-d10")
  .setDescription("Rolls a d10")
  .setContexts(InteractionContextType.Guild, InteractionContextType.BotDM, InteractionContextType.PrivateChannel)
  .setIntegrationTypes(ApplicationIntegrationType.GuildInstall, ApplicationIntegrationType.UserInstall)
  .addStringOption((s) =>
    s
      .setName("modifier")
      .setDescription("What to add or subtract to your roll, e.g. '15' or '15 + 2 - 3'")
      .setRequired(false),
  )
  .addBooleanOption((o) =>
    o
      .setName("can-explode")
      .setDescription("If enabled a roll of 10 will explode (defaults to enabled)")
      .setRequired(false),
  )
  .addBooleanOption((o) =>
    o
      .setName("can-implode")
      .setDescription("If enabled a roll of 1 will implode (defaults to enabled)")
      .setRequired(false),
  )
  .addStringOption((o) => o.setName("description").setDescription("Add a description to your roll").setRequired(false))
  .toJSON();

const handler: CommandHandler = async (interaction) => {
  const modifier = interaction.options.getString("modifier", false);
  const rollDescription = interaction.options.getString("description", false) || "Result";
  const canExplode = interaction.options.getBoolean("can-explode", false) ?? true;
  const canImplode = interaction.options.getBoolean("can-implode", false) ?? true;

  const parsedModifier = parseModifier(modifier);
  if (!parsedModifier.ok) {
    await interaction.reply(
      `Failed to parse modifier: \`${modifier}\`, please double check your syntax.\nOnly adding and subtracting digits is allowed (i.e. \`1 + 2 - 3\`)`,
    );
    return;
  }

  const initialRoll = rollD10();

  const explodeRoll = canExplode && initialRoll === 10 ? rollD10() : 0;
  const implodeRoll = canImplode && initialRoll === 1 ? rollD10() : 0;

  const result = initialRoll + explodeRoll - implodeRoll + parsedModifier.value.total;

  const stringifiedInitialRoll = initialRoll === 10 || initialRoll === 1 ? `__${initialRoll}__` : initialRoll;

  let explanation = `**${stringifiedInitialRoll}**`;
  if (explodeRoll) explanation += ` + **${explodeRoll}**`;
  if (implodeRoll) explanation += ` - **${implodeRoll}**`;
  explanation = `[${explanation}]`;

  if (parsedModifier.value.modifiers.length > 0) {
    explanation += parsedModifier.value.stringifiedModifiers;
  }

  await interaction.reply(`${rollDescription}: __**${result}**__ | *${explanation}*`);
};

const command: Command = {
  config,
  commandJson,
  handler,
  stores: {},
};

export default command;
