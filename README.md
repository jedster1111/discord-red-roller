# discord-red-roller

## Run locally

### Ensure env vars are set correctly

- See `.env.template` for a template for the required `.env` file.
- See [these discord docs](https://discord.com/developers/docs/quick-start/getting-started#step-1-creating-an-app) for details on how to create a discord app, and how to get the required information.

### Run it!

```sh
npm install
npm run deploy-discord-commands # Only need to run if you've made changes to command metadata
npm run start:dev

# You should now be able to use commands you've created in Discord
```

## Deployment

TBD

<!-- Pushing to main will trigger an automatic deployment.
If you've added or updated any command names or descriptions, manually trigger [the deploy-discord-commands action](https://github.com/jedster1111/twitch-discord-bot/actions/workflows/deploy-discord-commands.yml) from the GitHub action tab. -->
