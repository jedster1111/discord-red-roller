# discord-red-roller

## Run locally

### Ensure env vars are set correctly

- Create a `.env` file. See `.env.template` for a guide on what's needed.
- See [these discord docs](https://discord.com/developers/docs/quick-start/getting-started#step-1-creating-an-app) for details on how to create a discord app, and how to get your bot's client id and auth token.

### Run it!

```sh
npm install
npm run deploy-discord-commands # Only need to run if you've made changes to command metadata
npm run start:dev

# You should now be able to use commands you've created in Discord
```

## Deployment

Pushing to main will trigger an automatic deployment.

If you've added or updated any command names or descriptions, manually trigger [the deploy-discord-commands action](https://github.com/jedster1111/discord-red-roller/actions/workflows/deploy-discord-commands.yml) from the GitHub action tab.

### Sytemd setup

Copy the files in `./deployment/systemd/` to `/lib/systemd/system` on your deployment machine.

Then run

```
sudo systemctl daemon-reload

sudo systemctl enable discord-red-roller.service
sudo systemctl enable discord-red-roller-watcher.path
sudo systemctl enable discord-red-roller-watcher.service

sudo systemctl start discord-red-roller.service
sudo systemctl start discord-red-roller-watcher.path
sudo systemctl start discord-red-roller-watcher.service
```

### Actions setup

Ensure the required secrets are added to your repository's secrets.

- The variables mentioned in the `.env.template` file must be provided.
- A `DEPLOY_KEY` secret must also be provided. The `DEPLOY_KEY` is a private ssh key that has been added to your server's authorized keys (`~/.ssh/authorized_keys`).
