const { SlashCommand } = require('@greencoast/discord.js-extended');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { MESSAGE_EMBED } = require('../../common/constants');
const { splitContentForEmbedFields } = require('../../utils/embed');
const languages = require('../../../data/google_languages.json');

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

    this.embed = this.createEmbed();
  }

  createEmbed() {
    const embed = new MessageEmbed()
      .setTitle('List of supported languages:')
      .setColor(MESSAGE_EMBED.color)
      .setDescription(`This is a full list of all the languages that are supported by this TTS bot. 
    
      To change language for yourself, use **/google_set_my language <lang_code>**.
      You may also use **/google_set_default language <lang_code>** to change the default language in case
      someone else does not have one set.`)
      .setThumbnail(MESSAGE_EMBED.langThumbnail)
      .setURL(MESSAGE_EMBED.langURL);

    const content = this.sortedLanguageKeys().map((key) => {
      const cur = languages[key];
      return `${cur.emoji} ${cur.name} - '**/google_set_my language ${key}**'\n`;
    });
    const splitContent = splitContentForEmbedFields(content);

    splitContent.forEach((field, index) => {
      embed.addField(`Page ${index + 1}:`, field);
    });

    return embed;
  }

  sortedLanguageKeys() {
    return Object.keys(languages).sort((a, b) => {
      return languages[a].name.localeCompare(languages[b].name);
    });
  }

  run(interaction) {
    return interaction.reply({ embeds: [this.embed] });
  }
}

module.exports = GoogleLangsCommand;
