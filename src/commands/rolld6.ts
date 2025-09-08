import { ApplicationIntegrationType, InteractionContextType, SlashCommandBuilder } from "discord.js";
import { Command, CommandConfig, CommandHandler } from "./types.js";
import { rollD6 } from "./utils/roll.js";

const config: CommandConfig = {};

const commandJson = new SlashCommandBuilder()
  .setName("roll-d6")
  .setDescription("Rolls nd6 dice")
  .setContexts(InteractionContextType.Guild, InteractionContextType.BotDM, InteractionContextType.PrivateChannel)
  .setIntegrationTypes(ApplicationIntegrationType.GuildInstall, ApplicationIntegrationType.UserInstall)
  .addIntegerOption((o) =>
    o.setName("how-many-d6").setDescription("How many d6 to roll").setMaxValue(50).setMinValue(1).setRequired(true),
  )
  .addStringOption((o) => o.setName("description").setDescription("Add a description to your roll").setRequired(false))
  .toJSON();

const handler: CommandHandler = async (interaction) => {
  const numberDiceToRoll = interaction.options.getInteger("how-many-d6", true);
  const rollDescription = interaction.options.getString("description", false) || "Result";

  const rolls = Array(numberDiceToRoll)
    .fill(0)
    .map(() => rollD6());

  const result = rolls.reduce(sum);

  const stringifiedResults = rolls.map((roll) => {
    return roll === 6 ? `__${roll}__` : `${roll}`;
  });

  const explanation = stringifiedResults.join(" + ");

  await interaction.reply(`${rollDescription}: __**${result}**__ | *(${explanation})*`);
};

const sum = (a: number, b: number): number => a + b;

const command: Command = {
  config,
  commandJson,
  handler,
  stores: {},
};

export default command;
