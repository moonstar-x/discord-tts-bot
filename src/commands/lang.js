const { prefix } = require('../common/settings');
const languages = require('../../data/languages.json');

module.exports = {
  name: 'lang',
  description: 'Change the TTS language.',
  emoji: ':map:',
  execute(message, options) {
    let [newLang] = options.args;
    const { ttsPlayer } = message.guild;

    if (!newLang) {
      message.reply(`to set-up the TTS language, run: **${prefix}lang <lang_code>**
      To see a list of the available lang codes, run: **${prefix}langs**.
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