const { SlashCommand } = require('@greencoast/discord.js-extended');
const { SlashCommandBuilder } = require('@discordjs/builders');
const logger = require('@greencoast/logger');

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

  run(interaction) {
    const localizer = this.client.localizer.getLocalizer(interaction.guild);
    const ttsPlayer = this.client.getTTSPlayer(interaction.guild);
    const connection = ttsPlayer.voice.getConnection();

    const { me: { voice: myVoice }, name: guildName } = interaction.guild;
    const myChannel = myVoice?.channel;
    const { channel: memberChannel } = interaction.member.voice;

    if (!connection) {
      return interaction.reply({ content: localizer.t('command.skip.no_connection') });
    }

    if (!memberChannel || myChannel !== memberChannel) {
      return interaction.reply({ content: localizer.t('command.skip.different_channel') });
    }

    ttsPlayer.skip();
    logger.info(`Skipped ${memberChannel.name} in ${guildName}.`);
    return interaction.reply({ content: localizer.t('command.skip.skipped', { channel: myChannel.toString() }) });
  }
}

module.exports = SkipCommand;
