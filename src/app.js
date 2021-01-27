const { Structures } = require('discord.js');
const logger = require('@greencoast/logger');
const { discordToken, prefix } = require('./common/settings');
const { TTSGuild, ExtendedClient } = require('./classes/extensions');

Structures.extend('Guild', TTSGuild);

const client = new ExtendedClient();
client.registerCommands();

client.on('error', (error) => {
  logger.error(error);
});

client.on('guildCreate', (guild) => {
  logger.info(`Joined ${guild.name} guild!`);
  client.updatePresence();
});

client.on('guildDelete', (guild) => {
  logger.info(`Left ${guild.name} guild!`);
  client.updatePresence();
  guild.ttsPlayer = null;
});

client.on('guildUnavailable', (guild) => {
  logger.warn(`Guild ${guild.name} is currently unavailable!`);
});

client.on('invalidated', () => {
  logger.error('Client connection invalidated, terminating execution with code 1.');
  process.exit(1);
});

client.on('message', (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot || !message.guild) {
    return;
  }

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  const options = {
    args,
    commands: client.commands
  };

  client.executeCommand(message, options, command);
});

client.on('ready', () => {
  logger.info('Connected to Discord! - Ready.');
  logger.info(`Using prefix: ${prefix}`);
  client.updatePresence();
});

client.on('warn', (info) => {
  logger.warn(info);
});

if (client.isDebugEnabled()) {
  client.on('debug', (info) => {
    logger.debug(info);
  });
}

client.login(discordToken);
