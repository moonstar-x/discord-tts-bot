const { Command } = require('@greencoast/discord.js-extended');
const languages = require('../../../data/languages.json');

class LangCommand extends Command {
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
    const { ttsPlayer } = message.guild;

    if (!newLang) {
      message.reply(`to set-up the TTS language, run: **${this.client.prefix}lang <lang_code>**
      To see a list of the available lang codes, run: **${this.client.prefix}langs**.
      The current language is set to: **${languages[ttsPlayer.lang]}**.`);
      return;
    }

    newLang = newLang.toString().toLowerCase();

    ttsPlayer.setLang(newLang)
      .then((setLang) => {
        message.reply(`language has been set to **${setLang}**.`);
      })
      .catch((error) => {
        message.reply(error);
      });
  }
}

module.exports = LangCommand;
