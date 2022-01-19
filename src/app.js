const path = require('path');
const { ConfigProvider } = require('@greencoast/discord.js-extended');
const TTSClient = require('./classes/extensions/TTSClient');

const config = new ConfigProvider({
  configPath: path.join(__dirname, '../config/settings.json'),
  env: process.env,
  default: {
    PREFIX: '$',
    OWNER_ID: null,
    OWNER_REPORTING: false,
    PRESENCE_REFRESH_INTERVAL: 15 * 60 * 1000, // 15 Minutes
    DISCONNECT_TIMEOUT: 5 * 60 * 1000, // 5 Minutes,
    TESTING_GUILD_ID: null
  },
  types: {
    TOKEN: 'string',
    PREFIX: 'string',
    OWNER_ID: ['string', 'null'],
    OWNER_REPORTING: 'boolean',
    PRESENCE_REFRESH_INTERVAL: ['number', 'null'],
    DISCONNECT_TIMEOUT: ['number', 'null'],
    TESTING_GUILD_ID: ['string', 'null']
  }
});

const client = new TTSClient({
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
  },
  testingGuildID: config.get('TESTING_GUILD_ID'),
  intents: ['GUILD_MESSAGES', 'GUILD_MEMBERS', 'GUILDS', 'GUILD_VOICE_STATES', 'GUILD_MESSAGES']
});

client
  .registerDefaultEvents()
  .registerExtraDefaultEvents();

client.registry
  .registerGroups([
    ['all-tts', 'All TTS Commands'],
    ['config', 'Configuration Commands'],
    ['google-tts', 'Google TTS Commands'],
    ['other-tts', 'Other TTS Commands'],
    ['misc', 'Miscellaneous Commands']
  ])
  .registerCommandsIn(path.join(__dirname, './commands'));

client.on('ready', async() => {
  client.initializeDependencies();

  if (config.get('TESTING_GUILD_ID')) {
    client.deployer.rest.setToken(config.get('TOKEN'));
    await client.deployer.deployToTestingGuild();
  }
});

// This will be removed in a future update.
client.on('messageCreate', (message) => {
  if (message.author.bot || !message.guild || !message.content.startsWith(client.prefix)) {
    return;
  }

  const args = message.content.slice(client.prefix.length).trim().split(/ +/);
  const commandName = args.shift()?.toLowerCase();
  const command = client.registry.resolveCommand(commandName);

  if (command) {
    return message.reply(`Commands have been turned into slash commands and you may not use them with the prefix anymore. You can run the command you tried to input by running: **/${commandName}**`);
  }
});

client.login(config.get('TOKEN'));
