/* eslint-disable max-statements */
const { Command } = require('@greencoast/discord.js-extended');
const logger = require('@greencoast/logger');
const GoogleProvider = require('../../classes/tts/providers/GoogleProvider');

class SayCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'say',
      aliases: ['tts', 's'],
      description: 'Send a TTS message in your voice channel.',
      emoji: ':speaking_head:',
      group: 'google-tts',
      guildOnly: true
    });
  }

  run(message, args) {
    const { channel } = message.member.voice;
    const { ttsPlayer, name: guildName, voice } = message.guild;
    const connection = voice ? voice.connection : null;

    if (!channel) {
      return message.reply('you need to be in a voice channel first.');
    }

    if (args.length < 1) {
      return message.reply('you need to specify a message.');
    }

    if (connection) {
      if (voice.channel !== channel) {
        return message.reply('you need to be in the same voice channel as me.');
      }

      return ttsPlayer.say(args.join(' '), GoogleProvider.NAME);
    }

    if (!channel.viewable) {
      return message.reply('I cannot view your voice channel.');
    }

    if (!channel.joinable) {
      return message.reply('I cannot join your voice channel.');
    }

    if (!channel.speakable) {
      return message.reply('I cannot speak in your voice channel.');
    }

    if (channel.full) {
      return message.reply('Your voice channel is full.');
    }

    return channel.join()
      .then(() => {
        logger.info(`Joined ${channel.name} in ${guildName}.`);
        message.channel.send(`Joined ${channel}.`);
        return ttsPlayer.say(args.join(' '), GoogleProvider.NAME);
      });
  }
}

module.exports = SayCommand;
