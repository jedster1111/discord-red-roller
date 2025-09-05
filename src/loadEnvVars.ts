export type EnvConfig = {
  environment: "dev" | "prod";
  hostName: string;
  discordBotToken: string;
  discordBotClientId: string;
};

export const loadEnvVars = (): EnvConfig => {
  const environment = process.env.ENVIRONMENT || "prod";
  const hostName = process.env.HOST_NAME;

  const discordBotToken = process.env.DISCORD_BOT_TOKEN;
  const discordBotClientId = process.env.DISCORD_BOT_CLIENT_ID;

  if (!hostName || !discordBotToken || !discordBotClientId) throw new Error();
  if (!(environment === "dev" || environment === "prod"))
    throw new Error("ENVIRONMENT variable was not either 'dev' or 'prod'!");

  return {
    environment,
    hostName,
    discordBotToken,
    discordBotClientId,
  };
};

export const envVars = loadEnvVars();
