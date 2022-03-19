const { SlashCommand } = require('@greencoast/discord.js-extended');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { MESSAGE_EMBED } = require('../../../common/constants');
const { splitContentForEmbedFields } = require('../../../utils/embed');
const languages = require('../../../../provider-data/google_languages.json');

class GoogleLangsCommand extends SlashCommand {
  constructor(client) {
    super(client, {
      name: 'google_langs',
      description: 'Display a list of the languages supported by the Google Translate provider.',
      emoji: ':page_facing_up:',
      group: 'google-tts',
      guildOnly: true,
      dataBuilder: new SlashCommandBuilder()
    });

    this.embed = null;
  }

  createEmbed(localizer) {
    const embed = new MessageEmbed()
      .setTitle(localizer.t('command.google.langs.embed.title'))
      .setColor(MESSAGE_EMBED.color)
      .setDescription(localizer.t('command.google.langs.embed.description'))
      .setThumbnail(MESSAGE_EMBED.langThumbnail)
      .setURL(MESSAGE_EMBED.langURL);

    const content = this.sortedLanguageKeys().map((key) => {
      const cur = languages[key];
      return `${cur.emoji} ${cur.name} - '**/google_set_my language ${key}**'\n`;
    });
    const splitContent = splitContentForEmbedFields(content);

    splitContent.forEach((field, index) => {
      embed.addField(localizer.t('command.google.langs.embed.page', { number: index + 1 }), field);
    });

    return embed;
  }

  sortedLanguageKeys() {
    return Object.keys(languages).sort((a, b) => {
      return languages[a].name.localeCompare(languages[b].name);
    });
  }

  run(interaction) {
    if (!this.embed) {
      this.embed = this.createEmbed(this.client.localizer.getLocalizer(interaction.guild));
    }

    return interaction.reply({ embeds: [this.embed] });
  }
}

module.exports = GoogleLangsCommand;
