const { Command } = require('@greencoast/discord.js-extended');
const { MessageEmbed } = require('discord.js');
const { MESSAGE_EMBED } = require('../../common/constants');

class LangsCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'langs',
      description: 'Display a list of the supported languages.',
      emoji: ':page_facing_up:',
      group: 'google-tts',
      guildOnly: true
    });

    this.langsEmbed = new MessageEmbed()
      .setTitle('List of supported languages:')
      .setColor(MESSAGE_EMBED.color)
      .setDescription(`This is a full list of all the languages that are supported by this TTS bot. 
    
      To change language, use **${client.prefix}lang <lang_code>**.`)
      .setThumbnail(MESSAGE_EMBED.langThumbnail)
      .setURL(MESSAGE_EMBED.langURL)
      .addField('Part 1:',
        `
          :flag_za: Afrikaans - '**${client.prefix}lang af**'
          :flag_am: Armenian - '**${client.prefix}lang hy**'
          :flag_id: Indonesian - '**${client.prefix}lang id**'
          :flag_bd: Bengali - '**${client.prefix}lang bn**'
          :flag_es: Catalan - '**${client.prefix}lang ca**'
          :flag_cz: Czech - '**${client.prefix}lang cs**'
          :flag_dk: Danish - '**${client.prefix}lang da**'
          :flag_de: German - '**${client.prefix}lang de**'
          :flag_us: English - '**${client.prefix}lang en**'
          :flag_es: Spanish - '**${client.prefix}lang es**'
          :flag_ph: Filipino - '**${client.prefix}lang fil**'
          :flag_fr: French - '**${client.prefix}lang fr**'
          :flag_hr: Croatian - '**${client.prefix}lang hr**'
          :flag_is: Icelandic - '**${client.prefix}lang is**'
          :flag_it: Italian - '**${client.prefix}lang it**'
          :flag_id: Javanese - '**${client.prefix}lang jv**'
          :flag_kh: Khmer - '**${client.prefix}lang km**'
        `
      )
      .addField('Part 2:',
        `
          :flag_lv: Latvian - '**${client.prefix}lang lv**'
          :flag_hu: Hungarian - '**${client.prefix}lang hu**'
          :flag_my: Malayalam - '**${client.prefix}lang ml**'
          :flag_in: Marathi - '**${client.prefix}lang mr**'
          :flag_nl: Dutch - '**${client.prefix}lang nl**'
          :flag_np: Nepali - '**${client.prefix}lang ne**'
          :flag_no: Norwegian - '**${client.prefix}lang nb**'
          :flag_pl: Polish - '**${client.prefix}lang pl**'
          :flag_pt: Portuguese - '**${client.prefix}lang pt**'
          :flag_ro: Romanian - '**${client.prefix}lang ro**'
          :flag_lk: Sinhala - '**${client.prefix}lang si**'
          :flag_sk: Slovak - '**${client.prefix}lang sk**'
          :flag_id: Sundanese - '**${client.prefix}lang su**'
          :flag_tz: Swahili - '**${client.prefix}lang sw**'
          :flag_fi: Finnish - '**${client.prefix}lang fi**'
          :flag_se: Swedish - '**${client.prefix}lang sv**'
          :flag_id: Tamil - '**${client.prefix}lang ta**'
        `
      )
      .addField('Part 3:',
        `
          :flag_id: Telugu - '**${client.prefix}lang te**'
          :flag_vn: Vietnamese - '**${client.prefix}lang vi**'
          :flag_tr: Turkish - '**${client.prefix}lang tr**'
          :flag_gr: Greek - '**${client.prefix}lang el**'
          :flag_ru: Russian - '**${client.prefix}lang ru**'
          :flag_rs: Serbian - '**${client.prefix}lang sr**'
          :flag_ua: Ukranian - '**${client.prefix}lang uk**'
          :flag_sa: Arabic - '**${client.prefix}lang ar**'
          :flag_id: Hindi - '**${client.prefix}lang hi**'
          :flag_th: Thai - '**${client.prefix}lang th**'
          :flag_kr: Korean - '**${client.prefix}lang ko**'
          :flag_cn: Chinese - '**${client.prefix}lang cmn**'
          :flag_jp: Japanese - '**${client.prefix}lang ja**'
        `
      );
  }

  run(message) {
    message.channel.send(this.langsEmbed);
  }
}

module.exports = LangsCommand;
