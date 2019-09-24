const { Client, Collection, Structures } = require('discord.js');
const fs = require('fs-extra');
const path = require('path');
const discordToken = process.env.DISCORD_TOKEN || require('../config/settings.json').discord_token;
const appEvents = require('./events/appEvents');
const appHandlers = require('./events/handlers/app');
const { TTSGuild } = require('./classes/extensions');

Structures.extend('Guild', TTSGuild);

const client = new Client();

client.commands = new Collection();
const commandFiles = fs.readdirSync(path.join(__dirname, '/commands')).filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
  const command = require(path.join(__dirname, './commands', file));
  client.commands.set(command.name, command);
}

client.on(appEvents.error, (error) => appHandlers.handleError(error));
client.on(appEvents.guildCreate, (guild) => appHandlers.handleGuildCreate(guild));
client.on(appEvents.guildDelete, (guild) => appHandlers.handleGuildDelete(guild));
client.on(appEvents.guildUnavailable, (guild) => appHandlers.handleGuildUnavailable(guild));
client.on(appEvents.invalidated, appHandlers.handleInvalidated);
client.on(appEvents.message, (message) => appHandlers.handleMessage(message, client));
client.on(appEvents.ready, () => appHandlers.handleReady(client));
client.on(appEvents.warn, (info) => appHandlers.handleReady(info));

if (process.argv[2] === '--debug') {
  client.on(appEvents.debug, (info) => appHandlers.debug(info));
}

client.login(discordToken);
