/* eslint-disable max-statements */
const { SlashCommand } = require('@greencoast/discord.js-extended');
const { SlashCommandBuilder } = require('@discordjs/builders');
const logger = require('@greencoast/logger');
const { getCantConnectToChannelReason } = require('../../utils/channel');
const { cleanMessage } = require('../../utils/mentions');

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
    await interaction.deferReply({ ephemeral: true });

    const localizer = this.client.localizer.getLocalizer(interaction.guild);
    const ttsPlayer = this.client.getTTSPlayer(interaction.guild);
    const connection = ttsPlayer.voice.getConnection();

    const currentSettings = await this.client.ttsSettings.getCurrent(interaction);
    const extras = currentSettings[currentSettings.provider] || {};

    const { me: { voice: myVoice }, name: guildName, members, channels, roles } = interaction.guild;
    const { channel: memberChannel } = interaction.member.voice;
    const myChannel = myVoice?.channel;
    const message = cleanMessage(interaction.options.getString('message'), {
      members: members.cache,
      channels: channels.cache,
      roles: roles.cache
    });

    if (!memberChannel) {
      await interaction.editReply(localizer.t('command.say.no_channel'));
      return;
    }

    if (connection) {
      if (myChannel !== memberChannel) {
        await interaction.editReply(localizer.t('command.say.different_channel'));
        return;
      }

      await interaction.editReply(localizer.t('command.say.success'));
      return ttsPlayer.say(message, currentSettings.provider, extras);
    }

    const cantConnectReason = getCantConnectToChannelReason(memberChannel);
    if (cantConnectReason) {
      await interaction.editReply(localizer.t(cantConnectReason));
      return;
    }

    await ttsPlayer.voice.connect(memberChannel);
    logger.info(`Joined ${memberChannel.name} in ${guildName}.`);
    await interaction.editReply(localizer.t('command.say.joined', { channel: memberChannel.toString() }));
    return ttsPlayer.say(message, currentSettings.provider, extras);
  }
}

module.exports = SayCommand;
