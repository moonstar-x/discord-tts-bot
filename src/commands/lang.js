const languages = require('../../data/languages.json');

module.exports = {
  name: 'lang',
  description: 'Change the TTS language.',
  emoji: ':map:',
  execute(message, options) {
    if (!options.args[0]) {
      message.reply(`to set-up the TTS language, run: **${options.prefix}lang <lang_code>**
      To see a list of the available lang codes, run: **${options.prefix}langs**.
      The current language is set to: **${languages[options.ttsData[message.guild.id].lang]}**.`);
      return;
    }

    const newLang = options.args[0].toString().toLowerCase();

    if (!languages.hasOwnProperty(newLang)) {
      message.reply(`invalid language. Type **${options.prefix}langs** for a list of available languages.`);
      return;
    }

    if (options.ttsData[message.guild.id].lang == newLang) {
      message.reply(`language is already set to **${languages[newLang]}**.`);
      return;
    }
  
    options.tts.emit('lang', message.guild, newLang);
    message.reply(`language has been set to **${languages[newLang]}**.`);
  }
}