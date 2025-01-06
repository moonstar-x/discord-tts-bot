const LangsBaseCommand = require('../../base/LangsBaseCommand');
const { EmbedBuilder, Collection } = require('discord.js');
const { MESSAGE_EMBED } = require('../../../common/constants');
const { splitContentForEmbedFields } = require('../../../utils/embed');
const languages = require('../../../../provider-data/google_languages.json');

class GoogleLangsCommand extends LangsBaseCommand {
  constructor(client) {
    super(client, {
      name: 'google_langs',
      description: 'Display a list of the languages supported by the Google Translate provider.',
      emoji: ':page_facing_up:',
      group: 'google-tts'
    });

    this.embeds = new Collection();
  }

  createEmbed(localizer) {
    const embed = new EmbedBuilder()
      .setTitle(localizer.t('command.google.langs.embed.title'))
      .setColor(MESSAGE_EMBED.color)
      .setDescription(localizer.t('command.google.langs.embed.description'))
      .setThumbnail(MESSAGE_EMBED.langThumbnail)
      .setURL(MESSAGE_EMBED.googleLangURL);

    const content = this.sortedLanguageKeys().map((key) => {
      const cur = languages[key];
      return `${cur.emoji} ${cur.name} - '**/google_set_my language ${key}**'\n`;
    });
    const splitContent = splitContentForEmbedFields(content);

    const fields = splitContent.map((field, index) => ({
      name: localizer.t('command.google.langs.embed.page', { number: index + 1 }),
      value: field
    }));
    
    embed.addFields(fields);

    return embed;
  }

  sortedLanguageKeys() {
    return Object.keys(languages).sort((a, b) => {
      return languages[a].name.localeCompare(languages[b].name);
    });
  }
}

module.exports = GoogleLangsCommand;
