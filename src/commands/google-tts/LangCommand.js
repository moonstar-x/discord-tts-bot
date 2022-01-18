const { RegularCommand } = require('@greencoast/discord.js-extended');
const logger = require('@greencoast/logger');
const { GoogleProviderError } = require('../../errors');

class LangCommand extends RegularCommand {
  constructor(client) {
    super(client, {
      name: 'lang',
      description: 'Change the TTS language.',
      emoji: ':map:',
      group: 'google-tts',
      guildOnly: true
    });
  }

  run(message, args) {
    let [newLang] = args;
    const { googleProvider } = message.guild.ttsPlayer;

    if (!newLang) {
      return message.reply(`to set-up the TTS language, run: **${this.client.prefix}lang <lang_code>**
      To see a list of the available lang codes, run: **${this.client.prefix}langs**.
      The current language is set to: **${googleProvider.getLang()}**.`);
    }

    newLang = newLang.toString().toLowerCase();

    try {
      const setLang = googleProvider.setLang(newLang);
      logger.info(`Guild ${message.guild.name} has changed its language to ${googleProvider.getLang()}.`);
      return message.reply(`language has been set to **${setLang}**.`);
    } catch (error) {
      if (error instanceof GoogleProviderError) {
        if (error.reason === GoogleProviderError.REASON.invalid) {
          return message.reply(`invalid language. Type **${this.client.prefix}langs** for a list of available languages.`);
        } else if (error.reason === GoogleProviderError.REASON.same) {
          return message.reply(`language is already set to **${googleProvider.getLang()}**.`);
        }

        throw error;
      }

      throw error;
    }
  }
}

module.exports = LangCommand;
