import { ApplicationIntegrationType, InteractionContextType, SlashCommandBuilder } from "discord.js";
import { Command, CommandConfig, CommandHandler } from "./types.js";
import { rollD6 } from "./utils/roll.js";
import { sum } from "./utils/sum.js";
import { parseModifier } from "./utils/modifier.js";

const config: CommandConfig = {};

const commandJson = new SlashCommandBuilder()
  .setName("roll-d6")
  .setDescription("Rolls nd6 dice")
  .setContexts(InteractionContextType.Guild, InteractionContextType.BotDM, InteractionContextType.PrivateChannel)
  .setIntegrationTypes(ApplicationIntegrationType.GuildInstall, ApplicationIntegrationType.UserInstall)
  .addIntegerOption((o) =>
    o.setName("how-many-d6").setDescription("How many d6 to roll").setMaxValue(50).setMinValue(1).setRequired(false),
  )
  .addStringOption((s) =>
    s
      .setName("modifier")
      .setDescription("What to add or subtract to your roll, e.g. '15' or '15 + 2 - 3'")
      .setRequired(false),
  )
  .addStringOption((o) => o.setName("description").setDescription("Add a description to your roll").setRequired(false))
  .toJSON();

const handler: CommandHandler = async (interaction) => {
  const numberDiceToRoll = interaction.options.getInteger("how-many-d6", false) || 1;
  const modifier = interaction.options.getString("modifier", false);
  const rollDescription = interaction.options.getString("description", false) || "Result";

  const parsedModifier = parseModifier(modifier);
  if (!parsedModifier.ok) {
    await interaction.reply(
      `Failed to parse modifier: \`${modifier}\`, please double check your syntax.\nOnly adding and subtracting digits is allowed (i.e. \`1 + 2 - 3\`)`,
    );
    return;
  }

  const rolls = Array(numberDiceToRoll)
    .fill(0)
    .map(() => rollD6());

  const result = rolls.reduce(sum) + parsedModifier.value.total;

  const stringifiedResults = rolls.map((roll) => {
    return roll === 6 ? `__${roll}__` : `${roll}`;
  });

  let explanation = `[${stringifiedResults.join(" + ")}]`;

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
