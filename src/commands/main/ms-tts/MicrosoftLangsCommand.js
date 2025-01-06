const LangsBaseCommand = require('../../base/LangsBaseCommand');
const { EmbedBuilder } = require('discord.js');
const { MESSAGE_EMBED } = require('../../../common/constants');
const { splitContentForEmbedFields } = require('../../../utils/embed');
const languageData = require('../../../../provider-data/ttstool_microsoft_languages.json');

class MicrosoftLangsCommand extends LangsBaseCommand {
  constructor(client) {
    super(client, {
      name: 'ms_langs',
      description: 'Display a list of the languages supported by the Microsoft provider.',
      emoji: ':page_facing_up:',
      group: 'ms-tts'
    });
  }

  createEmbed(localizer) {
    const embed = new EmbedBuilder()
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
    
    const fields = splitContent.map((field, index) => ({
      name: localizer.t('command.microsoft.langs.embed.page', { number: index + 1 }),
      value: field
    }));
    
    embed.addFields(fields);
    
    return embed;
  }

  sortedLanguageKeys() {
    return Object.keys(languageData).sort((a, b) => {
      return languageData[a].name.localeCompare(languageData[b].name);
    });
  }
}

module.exports = MicrosoftLangsCommand;
