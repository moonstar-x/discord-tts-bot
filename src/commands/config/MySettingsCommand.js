const { SlashCommand } = require('@greencoast/discord.js-extended');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { MESSAGE_EMBED } = require('../../common/constants');
const TTSPlayer = require('../../classes/tts/TTSPlayer');

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
    const { provider, ...restSettings } = await this.client.ttsSettings.getCurrent(interaction);

    const fields = this.prepareFields(restSettings);
    const embed = new MessageEmbed()
      .setTitle(`Here's your current settings ${interaction.member.displayName}`)
      .setColor(MESSAGE_EMBED.color)
      .setDescription("Keep in mind that if you haven't set a setting yet you will see the default ones here.")
      .addField('Current Provider', TTSPlayer.PROVIDER_FRIENDLY_NAMES[provider]);

    for (const key in fields) {
      const field = fields[key];
      embed.addField(field.title, field.text, true);
    }

    return interaction.reply({ embeds: [embed], ephemeral: true });
  }
}

module.exports = MySettingsCommand;
