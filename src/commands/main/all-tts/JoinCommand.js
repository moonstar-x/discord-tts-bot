const { SlashCommand } = require('@greencoast/discord.js-extended');
const { SlashCommandBuilder } = require('@discordjs/builders');
const logger = require('@greencoast/logger');
const { getCantConnectToChannelReason } = require('../../../utils/channel');

class JoinCommand extends SlashCommand {
  constructor(client) {
    super(client, {
      name: 'join',
      description: 'Makes the bot join the current user\'s voice channel.',
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

    if (!connection) {
      await ttsPlayer.voice.connect(memberChannel);
      logger.info(`Joined ${memberChannel.name} in ${guildName}.`);
      await interaction.editReply(localizer.t('command.join.joined', { channel: memberChannel.toString() }));
    } else {
      await interaction.editReply(localizer.t('command.join.already_connected'));
    }
  }
}

module.exports = JoinCommand;
