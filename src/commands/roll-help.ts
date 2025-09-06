import { ApplicationIntegrationType, InteractionContextType, SlashCommandBuilder } from "discord.js";
import { Command, CommandConfig, CommandHandler } from "./types.js";

const config: CommandConfig = {};

const commandJson = new SlashCommandBuilder()
  .setName("roll-help")
  .setDescription("Documentation for the roll command")
  .setContexts(InteractionContextType.Guild, InteractionContextType.BotDM, InteractionContextType.PrivateChannel)
  .setIntegrationTypes(ApplicationIntegrationType.GuildInstall, ApplicationIntegrationType.UserInstall)
  .toJSON();

const handler: CommandHandler = async (interaction) => {
  await interaction.reply("See https://dice-roller.github.io/documentation/guide/notation/");
};

const command: Command = {
  config,
  commandJson,
  handler,
  stores: {},
};

export default command;
