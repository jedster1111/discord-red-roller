import path from "node:path";
import os from "node:os";

export type EnvConfig = {
  discordBotToken: string;
  discordBotClientId: string;
  storePath: string;
};

const defaultStoreDirectory = path.join(os.homedir(), "discord-red-loader");
const defaultStoreName = "store.json";
const defaultStorePath = path.join(defaultStoreDirectory, defaultStoreName);

export const loadEnvVars = (): EnvConfig => {
  const discordBotToken = process.env.DISCORD_BOT_TOKEN;
  const discordBotClientId = process.env.DISCORD_BOT_CLIENT_ID;

  const storePath = process.env.STORE_PATH || defaultStorePath;

  if (!discordBotToken || !discordBotClientId) throw new Error();

  return {
    discordBotToken,
    discordBotClientId,
    storePath,
  };
};

export const envVars = loadEnvVars();
