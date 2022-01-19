const path = require('path');
const { ExtendedClient, ConfigProvider } = require('@greencoast/discord.js-extended');
const logger = require('@greencoast/logger');

const config = new ConfigProvider({
  env: process.env,
  configPath: path.join(__dirname, '../config/settings.json'),
  types: {
    TOKEN: 'string'
  }
});

const client = new ExtendedClient({
  config,
  intents: []
});

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
  try {
    client.deployer.rest.setToken(config.get('TOKEN'));
    await client.deployer.deployGlobally();
  } catch (error) {
    logger.error('Something happened when trying to deploy the commands globally.', error);
    process.exit(1);
  }
});

client.on('commandsDeployed', (commands) => {
  commands.forEach((command) => {
    logger.info(`Successfully deployed ${command.name} command globally!`);
  });

  logger.info(`Finished deploying ${commands.length} commands globally. These changes can take up to an hour to be reflected on Discord.`);

  process.exit(0);
});

client.login(config.get('TOKEN'));
