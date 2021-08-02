const path = require('path');
const { Structures } = require('discord.js');
const { ExtendedClient, ConfigProvider } = require('@greencoast/discord.js-extended');
const TTSGuild = require('./classes/extensions/TTSGuild');

Structures.extend('Guild', TTSGuild);

const config = new ConfigProvider({
  configPath: path.join(__dirname, '../config/settings.json'),
  env: process.env,
  default: {
    PREFIX: '$',
    OWNER_REPORTING: false,
    PRESENCE_REFRESH_INTERVAL: 15 * 60 * 1000
  }
});

const client = new ExtendedClient({
  config,
  debug: process.argv.includes('--debug'),
  errorOwnerReporting: config.get('OWNER_REPORTING'),
  owner: config.get('OWNER_ID'),
  prefix: config.get('PREFIX'),
  presence: {
    refreshInterval: config.get('PRESENCE_REFRESH_INTERVAL'),
    templates: [
      '{num_guilds} servers!',
      '{prefix}help for help.',
      '{num_members} users!',
      'up for {uptime}.'
    ]
  }
});

client
  .registerDefaultEvents()
  .registerExtraDefaultEvents();

client.on('ready', () => {
  client.presenceManager.update('{num_guilds} servers!');
});

// TODO: Register commands and groups here.

client.login(config.get('TOKEN'));
