const { SlashCommand } = require('@greencoast/discord.js-extended');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, Collection } = require('discord.js');
const { MESSAGE_EMBED } = require('../../../common/constants');
const languageData = require('../../../../provider-data/ttstool_microsoft_languages.json');
const { splitContentForEmbedFields } = require('../../../utils/embed');

class MicrosoftLangsCommand extends SlashCommand {
  constructor(client) {
    super(client, {
      name: 'ms_langs',
      description: 'Display a list of the languages supported by the Microsoft Provider.',
      emoji: ':page_facing_up:',
      group: 'ms-tts',
      guildOnly: true,
      dataBuilder: new SlashCommandBuilder()
    });

    this.embeds = new Collection();
  }

  createEmbed(localizer) {
    const embed = new MessageEmbed()
      .setTitle(localizer.t('command.microsoft.langs.embed.title'))
      .setColor(MESSAGE_EMBED.color)
      .setDescription(localizer.t('command.microsoft.langs.embed.description'))
      .setThumbnail(MESSAGE_EMBED.langThumbnail)
      .setURL(MESSAGE_EMBED.amazonLangURL);

    const content = this.sortedLanguageKeys().map((key) => {
      const cur = languageData[key];
      return `${cur.emoji} ${cur.name} - '**/ms_set_my language ${key}**'\n`;
    });
    const splitContent = splitContentForEmbedFields(content);

    splitContent.forEach((field, index) => {
      embed.addField(localizer.t('command.microsoft.langs.embed.page', { number: index + 1 }), field);
    });

    return embed;
  }

  sortedLanguageKeys() {
    return Object.keys(languageData).sort((a, b) => {
      return languageData[a].name.localeCompare(languageData[b].name);
    });
  }

  run(interaction) {
    const localizer = this.client.localizer.getLocalizer(interaction.guild);
    let embed;

    if (!this.embeds.has(localizer.locale)) {
      embed = this.createEmbed(localizer);
      this.embeds.set(localizer.locale, embed);
    } else {
      embed = this.embeds.get(localizer.locale);
    }

    return interaction.reply({ embeds: [embed] });
  }
}

module.exports = MicrosoftLangsCommand;
