const path = require('path');
const { ConfigProvider } = require('@greencoast/discord.js-extended');
const RedisDataProvider = require('@greencoast/discord.js-extended/dist/providers/RedisDataProvider').default;
const LevelDataProvider = require('@greencoast/discord.js-extended/dist/providers/LevelDataProvider').default;
const TTSClient = require('./classes/extensions/TTSClient');
const { locales } = require('./locales');
const { keepAlive } = require('./utils/keep-alive');
const { DISCONNECT_TIMEOUT } = require('./common/constants');
const pkg = require('../package.json');

const SUPPORTED_PROVIDERS = ['level', 'redis'];

const config = new ConfigProvider({
  configPath: path.join(__dirname, '../config/settings.json'),
  env: process.env,
  default: {
    PREFIX: '$',
    OWNER_ID: null,
    OWNER_REPORTING: false,
    PRESENCE_REFRESH_INTERVAL: 15 * 60 * 1000, // 15 Minutes
    DEFAULT_DISCONNECT_TIMEOUT: 5, // 5 Minutes,
    TESTING_GUILD_ID: null,
    PROVIDER_TYPE: 'level',
    REDIS_URL: null,
    ENABLE_TTS_CHANNELS: false,
    ENABLE_KEEP_ALIVE: false,
    ENABLE_WHO_SAID: false
  },
  types: {
    TOKEN: 'string',
    PREFIX: 'string',
    OWNER_ID: ['string', 'null'],
    OWNER_REPORTING: 'boolean',
    PRESENCE_REFRESH_INTERVAL: ['number', 'null'],
    DEFAULT_DISCONNECT_TIMEOUT: 'number',
    TESTING_GUILD_ID: ['string', 'null'],
    PROVIDER_TYPE: 'string',
    REDIS_URL: ['string', 'null'],
    ENABLE_TTS_CHANNELS: 'boolean',
    ENABLE_KEEP_ALIVE: 'boolean',
    ENABLE_WHO_SAID: 'boolean'
  },
  customValidators: {
    PROVIDER_TYPE: (value) => {
      if (!SUPPORTED_PROVIDERS.includes(value)) {
        throw new TypeError(`${value} is not a valid data provider, it must be one of ${SUPPORTED_PROVIDERS.join(', ')}`);
      }
    },
    DEFAULT_DISCONNECT_TIMEOUT: (value) => {
      if (isNaN(value)) {
        throw new TypeError('DEFAULT_DISCONNECT_TIMEOUT must be a number!');
      }

      if (value > DISCONNECT_TIMEOUT.MAX || value < DISCONNECT_TIMEOUT.MIN) {
        throw new TypeError(`Invalid value for DEFAULT_DISCONNECT_TIMEOUT, it must be between ${DISCONNECT_TIMEOUT.MIN} and ${DISCONNECT_TIMEOUT.MAX}`);
      }
    }
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
      '/help for help.',
      '{num_members} users!',
      'up for {uptime}.',
      `Current version: ${pkg.version}`
    ]
  },
  testingGuildID: config.get('TESTING_GUILD_ID'),
  localizer: {
    defaultLocale: 'en',
    localeStrings: locales
  },
  intents: ['GUILD_MESSAGES', 'GUILDS', 'GUILD_VOICE_STATES']
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
  .registerCommandsIn(path.join(__dirname, './commands/main'));

if (config.get('ENABLE_TTS_CHANNELS')) {
  client.registry.registerCommandsIn(path.join(__dirname, './commands/optional/channel-tts'));
}

const createProvider = (type) => {
  switch (type) {
    case 'level':
      return new LevelDataProvider(client, path.join(__dirname, '../data'));
    case 'redis':
      return new RedisDataProvider(client, { url: config.get('REDIS_URL') });
    default:
      throw new TypeError(`${type} is not a valid data provider, it must be one of ${SUPPORTED_PROVIDERS.join(', ')}`);
  }
};

client.once('ready', async() => {
  await client.setDataProvider(createProvider(config.get('PROVIDER_TYPE')));
  await client.initializeDependencies();
  await client.localizer.init();

  if (config.get('TESTING_GUILD_ID')) {
    client.deployer.rest.setToken(config.get('TOKEN'));
    await client.deployer.deployToTestingGuild();
  }

  if (config.get('ENABLE_TTS_CHANNELS')) {
    client.ttsChannelHandler.initialize();
  }

  if (config.get('ENABLE_KEEP_ALIVE')) {
    keepAlive({ port: process.env.PORT || 3000 });
  }

  client.on('guildCreate', async(guild) => {
    await client.initializeDependenciesForGuild(guild);
  });

  client.on('guildDelete', async(guild) => {
    await client.dataProvider.clear(guild);
    client.deleteDependenciesForGuild(guild);
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
      const localizer = client.localizer.getLocalizer(message.guild);
      return message.reply(localizer.t('app.message.deprecated', { commandName }))
        .catch((error) => {
          client.emit('error', error);
        });
    }
  });
});

client.login(config.get('TOKEN'));
