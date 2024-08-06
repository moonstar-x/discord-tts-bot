const { SlashCommand } = require('@greencoast/discord.js-extended');
const { SlashCommandBuilder } = require('@discordjs/builders');
const logger = require('@greencoast/logger');
const { getCantConnectToChannelReason } = require('../../../utils/channel');

class SkipCommand extends SlashCommand {
  constructor(client) {
    super(client, {
      name: 'skip',
      description: 'Skips the current TTS message.',
      emoji: ':fast_forward:',
      group: 'all-tts',
      guildOnly: true,
      dataBuilder: new SlashCommandBuilder()
    });
  }

  getProviderName(currentSettings) {
    return currentSettings.provider;
  }

  async run(interaction) {
    await interaction.deferReply({ ephemeral: true });

    const localizer = this.client.localizer.getLocalizer(interaction.guild);
    const ttsPlayer = this.client.getTTSPlayer(interaction.guild);
    const connection = ttsPlayer.voice.getConnection();

    const { name: guildName } = interaction.guild;
    const { channel: memberChannel } = interaction.member.voice;

    const cantConnectReason = getCantConnectToChannelReason(memberChannel);
    if (!memberChannel || cantConnectReason) {
      await interaction.editReply(cantConnectReason ? localizer.t(cantConnectReason) : localizer.t('command.join.no_channel'));
      return;
    }

    if (connection) {
      ttsPlayer.skip();
      logger.info(`Skipped ${memberChannel.name} in ${guildName}.`);
    } else {
      await interaction.editReply(localizer.t('command.skip.not_connected'));
    }
  }
}

module.exports = SkipCommand;
