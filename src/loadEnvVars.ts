import path from "node:path";
import os from "node:os";

export type EnvConfig = {
  environment: "dev" | "prod";
  hostName: string;
  discordBotToken: string;
  discordBotClientId: string;
  storePath: string;
};

const defaultStoreDirectory = path.join(os.homedir(), "discord-red-loader");
const defaultStoreName = "store.json";
const defaultStorePath = path.join(defaultStoreDirectory, defaultStoreName);

export const loadEnvVars = (): EnvConfig => {
  const environment = process.env.ENVIRONMENT || "prod";
  const hostName = process.env.HOST_NAME;

  const discordBotToken = process.env.DISCORD_BOT_TOKEN;
  const discordBotClientId = process.env.DISCORD_BOT_CLIENT_ID;

  const storePath = process.env.STORE_PATH || defaultStorePath;

  if (!hostName || !discordBotToken || !discordBotClientId) throw new Error();
  if (!(environment === "dev" || environment === "prod"))
    throw new Error("ENVIRONMENT variable was not either 'dev' or 'prod'!");

  return {
    environment,
    hostName,
    discordBotToken,
    discordBotClientId,
    storePath,
  };
};

export const envVars = loadEnvVars();
