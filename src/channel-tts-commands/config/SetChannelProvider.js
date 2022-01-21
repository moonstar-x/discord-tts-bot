const { SlashCommand } = require('@greencoast/discord.js-extended');
const { SlashCommandBuilder } = require('@discordjs/builders');
const logger = require('@greencoast/logger');
const TTSPlayer = require('../../classes/tts/TTSPlayer');

class SetChannelProvider extends SlashCommand {
  constructor(client) {
    super(client, {
      name: 'set_channel_provider',
      description: 'Sets the provider to be used by the message-only based TTS on specific channels.',
      emoji: ':pencil2:',
      group: 'config',
      guildOnly: true,
      userPermissions: ['MANAGE_GUILD'],
      dataBuilder: new SlashCommandBuilder()
        .addStringOption((input) => {
          return input
            .setName('provider')
            .setDescription('The provider to use from now on.')
            .setRequired(true)
            .addChoices(TTSPlayer.SUPPORTED_PROVIDERS.map((p) => [p.FRIENDLY_NAME, p.NAME]));
        })
    });
  }

  async run(interaction) {
    const localizer = this.client.localizer.getLocalizer(interaction.guild);
    const providerName = interaction.options.getString('provider');
    const providerFriendlyName = TTSPlayer.PROVIDER_FRIENDLY_NAMES[providerName];

    await this.client.ttsSettings.set(interaction.channel, { provider: providerName });

    logger.info(`${interaction.guild.name} has changed its provider for ${interaction.channel.name} to ${providerName}.`);
    return interaction.reply({ content: localizer.t('channel_commands.set.success', { name: providerFriendlyName }) });
  }
}

module.exports = SetChannelProvider;
