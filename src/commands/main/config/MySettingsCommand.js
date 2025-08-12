const { SlashCommand } = require('@greencoast/discord.js-extended');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, MessageFlags } = require('discord.js');
const { MESSAGE_EMBED } = require('../../../common/constants');
const ProviderManager = require('../../../classes/tts/providers/ProviderManager');

class MySettingsCommand extends SlashCommand {
  constructor(client) {
    super(client, {
      name: 'my_settings',
      description: 'Get the TTS settings you currently have set for yourself.',
      emoji: ':wrench:',
      group: 'config',
      guildOnly: true,
      dataBuilder: new SlashCommandBuilder()
    });
  }

  prepareFields(settings, localizer) {
    return Object.keys(ProviderManager.PROVIDER_FRIENDLY_NAMES).map((name) => {
      const friendlyName = ProviderManager.PROVIDER_FRIENDLY_NAMES[name];
      const values = settings[name];
      const valueKeys = Object.keys(values);

      if (valueKeys.length < 1) {
        return { title: friendlyName, text: localizer.t('command.settings.my.no_settings') };
      }

      const text = valueKeys.reduce((text, key) => {
        const setting = values[key];
        return text.concat(`• **${key}**: ${setting}\n`);
      }, '');

      return { title: friendlyName, text };
    });
  }

  async run(interaction) {
    const localizer = this.client.localizer.getLocalizer(interaction.guild);
    const { provider, ...restSettings } = await this.client.ttsSettings.getCurrent(interaction);

    const fields = this.prepareFields(restSettings, localizer);
    const embed = new EmbedBuilder()
      .setTitle(localizer.t('command.settings.my.embed.title', { name: interaction.member.displayName }))
      .setColor(MESSAGE_EMBED.color)
      .setDescription(localizer.t('command.settings.my.embed.description'))
      .addFields([
        {
          name: localizer.t('command.settings.my.current.provider'),
          value: ProviderManager.PROVIDER_FRIENDLY_NAMES[provider]
        },
        ...fields.map((field) => ({
          name: field.title,
          value: field.text,
          inline: true
        }))
      ]);

    return interaction.reply({ embeds: [embed], flags: MessageFlags.Ephemeral }
    );
  }
}

module.exports = MySettingsCommand;
