const { SlashCommand } = require('@greencoast/discord.js-extended');
const { SlashCommandBuilder } = require('@discordjs/builders');
const logger = require('@greencoast/logger');
const TTSPlayer = require('../../classes/tts/TTSPlayer');

class SetMyProviderCommand extends SlashCommand {
  constructor(client) {
    super(client, {
      name: 'set_my_provider',
      description: 'Sets the provider to be used by the say command for yourself.',
      emoji: ':pencil2:',
      group: 'config',
      guildOnly: true,
      dataBuilder: new SlashCommandBuilder()
        .addStringOption((input) => {
          return input
            .setName('provider')
            .setDescription('The provider to use from now on.')
            .setRequired(true)
            .addChoices(TTSPlayer.getSupportedProviderChoices());
        })
    });
  }

  async run(interaction) {
    const providerName = interaction.options.getString('provider');

    await this.client.ttsSettings.set(interaction.member, { provider: providerName });

    logger.info(`User ${interaction.member.displayName} in ${interaction.guild.name} has changed their provider to ${providerName}.`);
    return interaction.reply({ content: `You have successfully changed your provider to ${providerName}.`, ephemeral: true });
  }
}

module.exports = SetMyProviderCommand;
