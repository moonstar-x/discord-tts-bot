const LangsBaseCommand = require('../../base/LangsBaseCommand');
const { MessageEmbed } = require('discord.js');
const { MESSAGE_EMBED } = require('../../../common/constants');
const { splitContentForEmbedFields } = require('../../../utils/embed');
const languageData = require('../../../../provider-data/ttstool_amazon_languages.json');

class AmazonLangsCommand extends LangsBaseCommand {
  constructor(client) {
    super(client, {
      name: 'amazon_langs',
      description: 'Display a list of the languages supported by the Amazon Provider.',
      emoji: ':page_facing_up:',
      group: 'amazon-tts'
    });
  }

  createEmbed(localizer) {
    const embed = new MessageEmbed()
      .setTitle(localizer.t('command.amazon.langs.embed.title'))
      .setColor(MESSAGE_EMBED.color)
      .setDescription(localizer.t('command.amazon.langs.embed.description'))
      .setThumbnail(MESSAGE_EMBED.langThumbnail)
      .setURL(MESSAGE_EMBED.amazonLangURL);

    const content = this.sortedLanguageKeys().map((key) => {
      const cur = languageData[key];
      return `${cur.emoji} ${cur.name} - '**/amazon_set_my language ${key}**'\n`;
    });
    const splitContent = splitContentForEmbedFields(content);

    splitContent.forEach((field, index) => {
      embed.addField(localizer.t('command.amazon.langs.embed.page', { number: index + 1 }), field);
    });

    return embed;
  }

  sortedLanguageKeys() {
    return Object.keys(languageData).sort((a, b) => {
      return languageData[a].name.localeCompare(languageData[b].name);
    });
  }
}

module.exports = AmazonLangsCommand;
