const { Logger } = require('logger');
const { prefix } = require('../../../config/settings.json');
const { updatePresence, executeCommand } = require('../../common/utils');

const logger = new Logger();

const handleDebug = (info) => {
  logger.debug(info);
};

const handleError = (error) => {
  logger.error(error);
};

const handleGuildCreate = (guild) => {
  logger.info(`Joined ${guild.name} guild!`);
};

const handleGuildDelete = (guild) => {
  logger.info(`Left ${guild.name} guild!`);
};

const handleGuildMemberAdd = (member) => {
  logger.info(`${member.displayName} joined ${member.guild.name}!`);
};

const handleGuildMemberRemove = (member) => {
  logger.info(`${member.displayName} left ${member.guild.name}!`);
};

const handleGuildUnavailable = (guild) => {
  logger.warn(`Guild ${guild.name} is currently unavailable!`);
};

const handleInvalidated = () => {
  logger.error('Client connection invalidated, terminating execution with code 1.');
  process.exit(1);
};

const handleMessage = (message, client) => {
  if (!message.content.startsWith(prefix) || message.author.bot) {
    return;
  }

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  const options = {
    args,
    commands: client.commands
  };

  executeCommand(client, message, options, command);
};

const handleReady = (client) => {
  logger.info('Connected to Discord! - Ready.');
  updatePresence(client);
};

const handleWarn = (info) => {
  logger.warn(info);
};

module.exports = {
  handleDebug,
  handleError,
  handleGuildCreate,
  handleGuildDelete,
  handleGuildMemberAdd,
  handleGuildMemberRemove,
  handleGuildUnavailable,
  handleInvalidated,
  handleMessage,
  handleReady,
  handleWarn
};