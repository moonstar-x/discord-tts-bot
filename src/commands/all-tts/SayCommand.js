/* eslint-disable max-statements */
const { SlashCommand } = require('@greencoast/discord.js-extended');
const { SlashCommandBuilder } = require('@discordjs/builders');
const logger = require('@greencoast/logger');
const GoogleProvider = require('../../classes/tts/providers/GoogleProvider');
const { getCantConnectToChannelReason } = require('../../utils/channel');

class SayCommand extends SlashCommand {
  constructor(client) {
    super(client, {
      name: 'say',
      aliases: ['s'],
      description: 'Send a TTS message in your voice channel with your own settings or the ones saved for this server.',
      emoji: ':speaking_head:',
      group: 'all-tts',
      guildOnly: true,
      dataBuilder: new SlashCommandBuilder()
        .addStringOption((input) => {
          return input
            .setName('message')
            .setDescription('The message to say in your voice channel.')
            .setRequired(true);
        })
    });
  }

  async run(interaction) {
    const ttsPlayer = this.client.getTTSPlayer(interaction.guild);
    const connection = ttsPlayer.voice.getConnection();

    const { me: { voice: myVoice }, name: guildName } = interaction.guild;
    const { channel: memberChannel } = interaction.member.voice;
    const myChannel = myVoice?.channel;
    const message = interaction.options.getString('message');

    if (!memberChannel) {
      return interaction.reply('You need to be in a voice channel first.');
    }

    if (!message) {
      return interaction.reply('You need to specify a message.');
    }

    if (connection) {
      if (myChannel !== memberChannel) {
        return interaction.reply('You need to be in my same voice channel to say something.');
      }

      return ttsPlayer.say(message, GoogleProvider.NAME);
    }

    const cantConnectReason = getCantConnectToChannelReason(memberChannel);
    if (cantConnectReason) {
      return interaction.reply(cantConnectReason);
    }

    await ttsPlayer.voice.connect(memberChannel);
    logger.info(`Joined ${memberChannel.name} in ${guildName}.`);
    await interaction.reply(`Joined ${memberChannel}.`);
    return ttsPlayer.say(message, GoogleProvider.NAME);
  }
}

module.exports = SayCommand;
