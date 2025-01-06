const LangsBaseCommand = require('../../base/LangsBaseCommand');
const { EmbedBuilder } = require('discord.js');
const { MESSAGE_EMBED } = require('../../../common/constants');
const { splitContentForEmbedFields } = require('../../../utils/embed');
const languageData = require('../../../../provider-data/ttstool_amazon_languages.json');

class AmazonLangsCommand extends LangsBaseCommand {
  constructor(client) {
    super(client, {
      name: 'amazon_langs',
      description: 'Display a list of the languages supported by the Amazon provider.',
      emoji: ':page_facing_up:',
      group: 'amazon-tts'
    });
  }

  createEmbed(localizer) {
    const embed = new EmbedBuilder()
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

    // Prepare fields for addFields in one go
    const fields = splitContent.map((field, index) => ({
      name: localizer.t('command.amazon.langs.embed.page', { number: index + 1 }),
      value: field
    }));

    // Add all fields at once
    embed.addFields(fields);

    return embed;
  }

  sortedLanguageKeys() {
    return Object.keys(languageData).sort((a, b) => {
      return languageData[a].name.localeCompare(languageData[b].name);
    });
  }
}

module.exports = AmazonLangsCommand;
