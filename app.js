const { Client, MessageEmbed } = require('discord.js');
const Opus = require('node-opus');
const googleTTS = require('google-tts-api');
const fs = require('fs');

const client = new Client();
const config = require('./settings.json');
const languages = require('./languages.json');

let language = config.language;
let speed = 1;

client.on('ready', () => {
  console.log('Ready!');
  updatePresence(language);
});

client.on('message', async message => {
  if (!message.guild || !message.content.startsWith(config.prefix) || message.author.bot) return;

  const args = message.content.slice(config.prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();

  const { channel } = message.member.voice;

  if (command === 'say') {
    if (channel) {
      if (channel.joinable) {
        if (channel.connection) {
          if (args.length > 0) {
            playTTS(args.join(' '), language, speed, channel.connection, message);
          } else {
            message.reply('you need to specify a message.');
          }
        } else {
          channel.join()
          .then(connection => {
            console.log(`Joined ${channel.name} voice channel.`);
            message.channel.send(`Joined ${channel}.`);
            if (args.length > 0) {
              playTTS(args.join(' '), language, speed, connection, message);
            }
          });
        }
      } else {
        message.reply('I cannot join your voice channel.');
      }
    } else {
      message.reply('you need to be in a voice channel first.');
    }
  } else if (command === 'stop') {
    if (message.guild.voiceConnection) {
      message.guild.voiceConnection.channel.leave()
      console.log('Successfully left the voice channel.');
      message.channel.send('Successfully left the voice channel.');
    } else {
      message.reply('I need to be in a voice channel to do that.');
    }
  } else if (command === 'lang') {
    if (args.length > 0) {
      if (args.toString().toLowerCase() === language) {
        message.reply(`Language is already set to ${languages[language]}.`);
      } else if (languages.hasOwnProperty(args.toString())) {
        language = args.toString().toLowerCase();
        config.language = language;
        fs.writeFile('./settings.json', JSON.stringify(config, null, 2), function(err) {
          if (err) return console.log(err);
        });
        updatePresence(language);
        message.channel.send(`Language has been changed to ${languages[language]}.`);
      } else {
        message.reply(`invalid language. Type **${config.prefix}langs** for a list of available languages.`);
      }
    } else {
      sendLangs(message);
    } 
  } else if (command === 'langs'){
    sendLangs(message);
  } else if (command === 'speed') {
    const spd = Number(args);
    if (!isNaN(spd) && spd > 0 && spd <= 100) {
      speed = spd / 100;
      console.log(`Speaking speed has been set to: ${spd}%`);
      message.channel.send(`Speaking speed has been set to: ${spd}%`);
    } else {
      message.reply('invalid speed, must be between 1 and 100.');
    }
  } else if (command === 'help') {
    sendHelp(message);
  }
});

client.login(config.discord_token);

function playTTS(phrase, lang, spd, conn, msg) {
  googleTTS(phrase, lang, spd)
    .then(function (url) {
        console.log(`Received TTS for '${phrase}' with language code '${lang}' and ${spd} speed.`);
        const dispatcher = conn.play(url);
        dispatcher.on('end', () => {
          console.log('TTS dispatch ended successfully.');
        });
        dispatcher.on('error', err => {
          console.error(err);
        })
    })
    .catch(function (err) {
      console.error(err.stack);
      if (err.name === 'RangeError') {
        msg.reply('your TTS message needs to be under 200 characters long.');
      }
    });
}

function updatePresence(lang) {
  client.user.setPresence({
    activity: {
      name: `in ${languages[lang]}!`,
      type: 'PLAYING'
    }
  }).then(console.log(`Presence changed to: ${languages[lang]}.`))
  .catch(console.error);
}

function sendLangs(msg) {
  const embed = new MessageEmbed()
    .setTitle('List of supported languages:')
    .setColor("GREY")
    .setDescription(`This is a full list of all the languages that are supported by this TTS bot. 

    To change language, use **${config.prefix}lang <lang_code>**.`)
    .setThumbnail("https://i.imgur.com/QbNXO4q.jpg")
    .setURL("https://github.com/moonstar-x/discord-tts-bot#language-support")
    .addField("Part 1:", 
      `
        :flag_za: Afrikaans - '**${config.prefix}lang af**'
        :flag_am: Armenian - '**${config.prefix}lang hy**'
        :flag_id: Indonesian - '**${config.prefix}lang id**'
        :flag_bd: Bengali - '**${config.prefix}lang bn**'
        :flag_es: Catalan - '**${config.prefix}lang ca**'
        :flag_cz: Czech - '**${config.prefix}lang cs**'
        :flag_dk: Danish - '**${config.prefix}lang da**'
        :flag_de: German - '**${config.prefix}lang de**'
        :flag_us: English - '**${config.prefix}lang en**'
        :flag_es: Spanish - '**${config.prefix}lang es**'
        :flag_ph: Filipino - '**${config.prefix}lang fil**'
        :flag_fr: French - '**${config.prefix}lang fr**'
        :flag_hr: Croatian - '**${config.prefix}lang hr**'
        :flag_is: Icelandic - '**${config.prefix}lang is**'
        :flag_it: Italian - '**${config.prefix}lang it**'
        :flag_id: Javanese - '**${config.prefix}lang jv**'
        :flag_kh: Khmer - '**${config.prefix}lang km**'
      `
    )
    .addField("Part 2:", 
      `
        :flag_lv: Latvian - '**${config.prefix}lang lv**'
        :flag_hu: Hungarian - '**${config.prefix}lang hu**'
        :flag_my: Malayalam - '**${config.prefix}lang ml**'
        :flag_in: Marathi - '**${config.prefix}lang mr**'
        :flag_nl: Dutch - '**${config.prefix}lang nl**'
        :flag_np: Nepali - '**${config.prefix}lang ne**'
        :flag_no: Norwegian - '**${config.prefix}lang nb**'
        :flag_pl: Polish - '**${config.prefix}lang pl**'
        :flag_pt: Portuguese - '**${config.prefix}lang pt**'
        :flag_ro: Romanian - '**${config.prefix}lang ro**'
        :flag_lk: Sinhala - '**${config.prefix}lang si**'
        :flag_sk: Slovak - '**${config.prefix}lang sk**'
        :flag_id: Sundanese - '**${config.prefix}lang su**'
        :flag_tz: Swahili - '**${config.prefix}lang sw**'
        :flag_fi: Finnish - '**${config.prefix}lang fi**'
        :flag_se: Swedish - '**${config.prefix}lang sv**'
        :flag_id: Tamil - '**${config.prefix}lang ta**'
      `
    )
    .addField("Part 3:", 
      `
        :flag_id: Telugu - '**${config.prefix}lang te**'
        :flag_vn: Vietnamese - '**${config.prefix}lang vi**'
        :flag_tr: Turkish - '**${config.prefix}lang tr**'
        :flag_gr: Greek - '**${config.prefix}lang el**'
        :flag_ru: Russian - '**${config.prefix}lang ru**'
        :flag_rs: Serbian - '**${config.prefix}lang sr**'
        :flag_ua: Ukranian - '**${config.prefix}lang uk**'
        :flag_sa: Arabic - '**${config.prefix}lang ar**'
        :flag_id: Hindi - '**${config.prefix}lang hi**'
        :flag_th: Thai - '**${config.prefix}lang th**'
        :flag_kr: Korean - '**${config.prefix}lang ko**'
        :flag_cn: Chinese - '**${config.prefix}lang cmn**'
        :flag_jp: Japanese - '**${config.prefix}lang ja**'
      `
    ); 
  msg.channel.send(embed);
}

function sendHelp(msg) {
  const embed = new MessageEmbed()
    .setTitle("List of available commands:")
    .setColor("GREY")
    .setThumbnail("https://i.imgur.com/Tqnk48j.png")
    .addField("You can use the following commands with this bot:",
      `
        :speaking_head: **${config.prefix}say <message>** - Send a TTS message in your voice channel (up to 200 characters).
        :x: **${config.prefix}stop** - Stop the TTS bot and leave the channel.
        :beginner: **${config.prefix}lang <lang_code>** - Change the TTS language.
        :page_facing_up: **${config.prefix}langs** - Display a list of the supported languages.
        :fast_forward: **${config.prefix}speed <number>** - Change the TTS spoken speed (must be between 1% and 100%).
        :question: **${config.prefix}help** - Display this message.
      `
    );
  msg.channel.send(embed);
}