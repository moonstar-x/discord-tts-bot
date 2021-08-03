/* eslint-disable max-statements */
const logger = require('@greencoast/logger');
const { Command } = require('@greencoast/discord.js-extended');
const AeiouProvider = require('../../classes/tts/providers/AeiouProvider');

class AeiouCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'aeiou',
      aliases: ['moonbase'],
      description: 'Send an aeiou (similar to Moonbase Alpha) TTS message in your voice channel.',
      emoji: ':robot:',
      group: 'other-tts',
      guildOnly: true
    });
  }

  run(message, args) {
    const { channel } = message.member.voice;
    const { ttsPlayer, name: guildName, voice } = message.guild;
    const connection = voice ? voice.connection : null;

    if (!channel) {
      message.reply('you need to be in a voice channel first.');
      return;
    }

    if (!channel.joinable) {
      message.reply('I cannot join your voice channel.');
      return;
    }

    if (args.length < 1) {
      message.reply('you need to specify a message.');
      return;
    }

    if (connection) {
      return ttsPlayer.say(args.join(' '), AeiouProvider.NAME);
    }

    return channel.join()
      .then(() => {
        logger.info(`Joined ${channel.name} in ${guildName}.`);
        message.channel.send(`Joined ${channel}.`);
        return ttsPlayer.say(args.join(' '), AeiouProvider.NAME);
      });
  }
}

module.exports = AeiouCommand;
