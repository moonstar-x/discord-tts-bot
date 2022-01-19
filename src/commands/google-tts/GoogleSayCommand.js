/* eslint-disable max-statements */
const { SlashCommand } = require('@greencoast/discord.js-extended');
const { SlashCommandBuilder } = require('@discordjs/builders');
const logger = require('@greencoast/logger');
const GoogleProvider = require('../../classes/tts/providers/GoogleProvider');
const { getCantConnectToChannelReason } = require('../../utils/channel');

class GoogleSayCommand extends SlashCommand {
  constructor(client) {
    super(client, {
      name: 'google_say',
      description: 'Send a Google Translate TTS message with multi-language support in your voice channel.',
      emoji: ':speaking_head:',
      group: 'google-tts',
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
      return interaction.reply({ content: 'You need to be in a voice channel first.', ephemeral: true });
    }

    if (connection) {
      if (myChannel !== memberChannel) {
        return interaction.reply({ content: 'You need to be in my same voice channel to say something.', ephemeral: true });
      }

      await interaction.reply({ content: 'I will say that now.', ephemeral: true });
      return ttsPlayer.say(message, GoogleProvider.NAME);
    }

    const cantConnectReason = getCantConnectToChannelReason(memberChannel);
    if (cantConnectReason) {
      return interaction.reply({ content: cantConnectReason, ephemeral: true });
    }

    await ttsPlayer.voice.connect(memberChannel);
    logger.info(`Joined ${memberChannel.name} in ${guildName}.`);
    await interaction.reply({ content: `Joined ${memberChannel}.` });
    return ttsPlayer.say(message, GoogleProvider.NAME);
  }
}

module.exports = GoogleSayCommand;
