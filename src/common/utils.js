const logger = require('@greencoast/logger');
const { ACTIVITY_TYPE, TTS_MAX_CHARS } = require('./constants');
const allowOver200 = process.env.ALLOW_OVER_200 || require('../../config/settings.json').allow_more_than_200_chars;

/**
 * Updates the presence of the Discord bot.
 * @param {Discord.Client} client The Discord client to update the presence.
 * @returns {void}
 */
const updatePresence = (client) => {
  const presence = `${Array.from(client.guilds.cache.array()).length} servers!`;
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
 * @param {String} commandName The name of the command being run.
 * @returns {void}
 */
const executeCommand = (client, message, options, commandName) => {
  const author = message.guild ? message.member.displayName : message.author.username;
  const origin = message.guild ? message.guild.name : `DM with ${author}`;

  const command = client.commands.get(commandName);

  if (!command) {
    return;
  }

  try {
    logger.info(`User ${author} issued command ${commandName} in ${origin}.`);
    command.execute(message, options);
  } catch (err) {
    logger.error(err);
    message.reply("there's been a problem executing your command.");
  }
};

const splitToPlayable = (words) => {
  return new Promise((resolve, reject) => {
    const phrase = words.join(' ');
    const charCount = phrase.length;
    if (charCount <= TTS_MAX_CHARS) {
      resolve([phrase]);
      return;
    }

    if (allowOver200 !== 'yes') {
      reject(`your TTS message is ${charCount} characters long. Since the maximum number of characters is ${TTS_MAX_CHARS}, you'll need to remove ${charCount - TTS_MAX_CHARS} characters.`);
      return;
    }

    try {
      const splitPhrases = [];
      const remainingPhrase = words.reduce((phrase, word) => {
        const wordLength = word.length;

        if (wordLength > TTS_MAX_CHARS) {
          throw 'one or more of your words is over 200 characters.';
        }

        if (wordLength + 1 < TTS_MAX_CHARS - phrase.length) {
          phrase += `${word} `;
        } else {
          splitPhrases.push(phrase.trimEnd());
          phrase = `${word} `;
        }

        return phrase;
      }, '');

      if (remainingPhrase) {
        splitPhrases.push(remainingPhrase.trimEnd());
      }

      resolve(splitPhrases);
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  updatePresence,
  executeCommand,
  splitToPlayable
};
