const { Logger } = require('logger');

const logger = new Logger();

module.exports = {
  name: 'aeiou',
  description: 'Send an aeiou (similar to Moonbase Alpha) TTS message in your voice channel.',
  emoji: ':robot:',
  execute(message, options) {
    const { channel } = message.member.voice;
    const { ttsPlayer, name: guildName, voice } = message.guild;
    const connection = voice ? voice.connection : null;
    const [atLeastOneWord] = options.args;

    if (!channel) {
      message.reply('you need to be in a voice channel first.');
      return;
    }

    if (!channel.joinable) {
      message.reply('I cannot join your voice channel.');
      return;
    }

    if (!atLeastOneWord) {
      message.reply('you need to specify a message.');
      return;
    }

    if (connection) {
      ttsPlayer.aeiou(options.args);
    } else {
      channel.join()
        .then(() => {
          logger.info(`Joined ${channel.name} in ${guildName}.`);
          message.channel.send(`Joined ${channel}.`);
          ttsPlayer.aeiou(options.args);
        })
        .catch((error) => {
          throw error;
        });
    }
  }
}