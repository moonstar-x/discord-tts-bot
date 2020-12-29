const { MessageEmbed } = require('discord.js');
const { MESSAGE_EMBED } = require('../common/constants');
const { prefix } = require('../common/settings');

const langsEmbed = new MessageEmbed()
  .setTitle('List of supported languages:')
  .setColor(MESSAGE_EMBED.color)
  .setDescription(`This is a full list of all the languages that are supported by this TTS bot. 

  To change language, use **${prefix}lang <lang_code>**.`)
  .setThumbnail(MESSAGE_EMBED.langThumbnail)
  .setURL(MESSAGE_EMBED.langURL)
  .addField('Part 1:',
    `
      :flag_za: Afrikaans - '**${prefix}lang af**'
      :flag_am: Armenian - '**${prefix}lang hy**'
      :flag_id: Indonesian - '**${prefix}lang id**'
      :flag_bd: Bengali - '**${prefix}lang bn**'
      :flag_es: Catalan - '**${prefix}lang ca**'
      :flag_cz: Czech - '**${prefix}lang cs**'
      :flag_dk: Danish - '**${prefix}lang da**'
      :flag_de: German - '**${prefix}lang de**'
      :flag_us: English - '**${prefix}lang en**'
      :flag_es: Spanish - '**${prefix}lang es**'
      :flag_ph: Filipino - '**${prefix}lang fil**'
      :flag_fr: French - '**${prefix}lang fr**'
      :flag_hr: Croatian - '**${prefix}lang hr**'
      :flag_is: Icelandic - '**${prefix}lang is**'
      :flag_it: Italian - '**${prefix}lang it**'
      :flag_id: Javanese - '**${prefix}lang jv**'
      :flag_kh: Khmer - '**${prefix}lang km**'
    `
  )
  .addField('Part 2:',
    `
      :flag_lv: Latvian - '**${prefix}lang lv**'
      :flag_hu: Hungarian - '**${prefix}lang hu**'
      :flag_my: Malayalam - '**${prefix}lang ml**'
      :flag_in: Marathi - '**${prefix}lang mr**'
      :flag_nl: Dutch - '**${prefix}lang nl**'
      :flag_np: Nepali - '**${prefix}lang ne**'
      :flag_no: Norwegian - '**${prefix}lang nb**'
      :flag_pl: Polish - '**${prefix}lang pl**'
      :flag_pt: Portuguese - '**${prefix}lang pt**'
      :flag_ro: Romanian - '**${prefix}lang ro**'
      :flag_lk: Sinhala - '**${prefix}lang si**'
      :flag_sk: Slovak - '**${prefix}lang sk**'
      :flag_id: Sundanese - '**${prefix}lang su**'
      :flag_tz: Swahili - '**${prefix}lang sw**'
      :flag_fi: Finnish - '**${prefix}lang fi**'
      :flag_se: Swedish - '**${prefix}lang sv**'
      :flag_id: Tamil - '**${prefix}lang ta**'
    `
  )
  .addField('Part 3:',
    `
      :flag_id: Telugu - '**${prefix}lang te**'
      :flag_vn: Vietnamese - '**${prefix}lang vi**'
      :flag_tr: Turkish - '**${prefix}lang tr**'
      :flag_gr: Greek - '**${prefix}lang el**'
      :flag_ru: Russian - '**${prefix}lang ru**'
      :flag_rs: Serbian - '**${prefix}lang sr**'
      :flag_ua: Ukranian - '**${prefix}lang uk**'
      :flag_sa: Arabic - '**${prefix}lang ar**'
      :flag_id: Hindi - '**${prefix}lang hi**'
      :flag_th: Thai - '**${prefix}lang th**'
      :flag_kr: Korean - '**${prefix}lang ko**'
      :flag_cn: Chinese - '**${prefix}lang cmn**'
      :flag_jp: Japanese - '**${prefix}lang ja**'
    `
  );

module.exports = {
  name: 'langs',
  description: 'Display a list of the supported languages.',
  emoji: ':page_facing_up:',
  execute(message) {
    message.channel.send(langsEmbed);
  }
};
