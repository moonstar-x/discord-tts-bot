const { Logger } = require('logger');
const { ACTIVITY_TYPE } = require('./constants');

const logger = new Logger();

/**
 * Updates the presence of the Discord bot.
 * @param {Discord.Client} client The Discord client to update the presence.
 * @returns {void}
 */
const updatePresence = (client) => {
  const presence = `${client.guilds.size} servers!`;
  client.user.setPresence({
    activity: {
      name: presence,
      type: ACTIVITY_TYPE.playing
    }
  }).then(() => {
    logger.info(`Presence updated to: ${presence}`);
  }).catch((err) => {
    logger.error(err);
  });
};

/**
 * Executes the specified command.
 * @param {Discord.Client} client The client instance of the bot.
 * @param {Discord.Message} message The message object that triggered this method.
 * @param {Object} options The object containing the data that the command may need.
 * @param {String} command The name of the command being run.
 * @returns {void}
 */
const executeCommand = (client, message, options, command) => {
  const author = message.guild ? message.member.displayName : message.author.username;
  const origin = message.guild ? message.guild.name : `DM with ${author}`;

  try {
    logger.info(`User ${author} issued command ${command} in ${origin}.`);
    client.commands.get(command).execute(message, options);
  } catch (err) {
    logger.error(err);
    message.reply("there's been a problem executing your command.");
  }
};

module.exports = {
  updatePresence,
  executeCommand
};