const { SlashCommand } = require('@greencoast/discord.js-extended');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { MESSAGE_EMBED } = require('../../common/constants');
const TTSPlayer = require('../../classes/tts/TTSPlayer');
const merge = require('deepmerge');

class DefaultSettingsCommand extends SlashCommand {
  constructor(client) {
    super(client, {
      name: 'default_settings',
      description: 'Get the default TTS settings currently set for the guild.',
      emoji: ':wrench:',
      group: 'config',
      guildOnly: true,
      dataBuilder: new SlashCommandBuilder()
    });
  }

  prepareFields(settings) {
    return Object.keys(TTSPlayer.PROVIDER_FRIENDLY_NAMES).map((name) => {
      const friendlyName = TTSPlayer.PROVIDER_FRIENDLY_NAMES[name];
      const values = settings[name];
      const valueKeys = Object.keys(values);

      if (valueKeys.length < 1) {
        return { title: friendlyName, text: 'No settings associated to this provider.' };
      }

      const text = valueKeys.reduce((text, key) => {
        const setting = values[key];
        return text.concat(`• **${key}**: ${setting}\n`);
      }, '');

      return { title: friendlyName, text };
    });
  }

  async run(interaction) {
    const guildSettings = await this.client.ttsSettings.get(interaction.guild);
    const currentSettings = merge(TTSPlayer.DEFAULT_SETTINGS, guildSettings);
    const { provider, ...restSettings } = currentSettings;

    const fields = this.prepareFields(restSettings);
    const embed = new MessageEmbed()
      .setTitle("Here's the current default settings for this guild")
      .setColor(MESSAGE_EMBED.color)
      .setDescription('Keep in mind that these settings do not reflect what your personal may be. These settings will be used if you have not set your own.')
      .addField('Current Provider', TTSPlayer.PROVIDER_FRIENDLY_NAMES[provider]);

    for (const key in fields) {
      const field = fields[key];
      embed.addField(field.title, field.text, true);
    }

    return interaction.reply({ embeds: [embed] });
  }
}

module.exports = DefaultSettingsCommand;
