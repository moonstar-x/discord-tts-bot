// Required dependencies:
const {
  Client,
  MessageEmbed
} = require('discord.js');
const Opus = require('node-opus');
const googleTTS = require('google-tts-api');
const fs = require('fs');

// Required configs:
const client = new Client();
const config = require('./settings.json');
const languages = require('./languages.json');
let language = config.language;
let speed = 1;

// State and queue.
let speaking = false;
let queue = [];

// updatePresence(String)
// Updates the presence of the bot to the language that has been changed.
function updatePresence(lang) {
  client.user.setPresence({
      activity: {
        name: `in ${languages[lang]}!`,
        type: 'PLAYING'
      }
    }).then(console.log('[' + new Date().toLocaleTimeString() + ']', `Presence changed to: ${languages[lang]}.`))
    .catch(console.error);
}

// sendLangs(Message)
// Send the language list message as an embed.
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

// sendHelp(Message)
// Send the help message as an embed.
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

// playTTS(String, Int, VoiceConnection)
// Requests a TTS audio URL from the Google Translate API, once it receives it, stream it to the voice channel the bot is connected to.
function playTTS(lang, spd, conn) {
  if (queue[0]) {
    googleTTS(queue[0], lang, spd).then(async function (url) {
      console.log('[' + new Date().toLocaleTimeString() + ']', `Received TTS for '${queue[0]}' with language code '${lang}' and ${spd} speed.`);
      speaking = true;
      const dispatcher = await conn.play(url);

      dispatcher.on('end', () => {
        queue.shift();
        speaking = false;
        console.log('[' + new Date().toLocaleTimeString() + ']', 'TTS dispatch ended successfully.');
        if (queue[0]) {
          playTTS(lang, spd, conn)
        };
      });
      dispatcher.on('error', err => {
        console.error(err);
      })
    }).catch(function (err) {
      console.error(err.stack);
    });
  }
}

// splitToPlayable([Str], Message)
// Splits strings of over 200 characters in order to let TTS messages of over 200 characters in length to play.
function splitToPlayable(msgArgs, msg) {
  const msgAsString = msgArgs.join(' ');
  let pushToQueue = "";
  let wordToPush = undefined;
  if (msgAsString.length <= 200) {
    queue.push(msgAsString);
  } else {
    if (config.allow_more_than_200_chars === "yes") {
      let pushed = false;
      while (msgArgs.length > 0) {
        if (!pushed) {
          wordToPush = msgArgs.shift()
          if (wordToPush.length > 200) {
            msg.reply('one or more of your words has over 200 characters.');
            break;
          }
        }
        if (pushToQueue.length < 200 - wordToPush.length) {
          pushToQueue = pushToQueue.concat(' ', wordToPush);
          pushed = false;
        } else {
          pushed = true;
          queue.push(pushToQueue);
          pushToQueue = "";
        }
      }
    } else {
      msg.reply('your TTS message is longer than 200 characters.');
    }
  }
}

client.on('ready', () => {
  console.log('[' + new Date().toLocaleTimeString() + ']', 'Ready!');
  updatePresence(language);
});

client.on('message', async message => {
  if (!message.guild || !message.content.startsWith(config.prefix) || message.author.bot) return;

  const args = message.content.slice(config.prefix.length).trimEnd().split(/ +/)
  const command = args.shift().toLowerCase();

  const {
    channel
  } = message.member.voice;

  switch (command) {
    case "say":
      if (channel) {
        if (channel.joinable) {
          if (channel.connection) {
            if (args.length > 0) {
              splitToPlayable(args, message);
              if (!speaking) {
                playTTS(language, speed, channel.connection);
              }
            } else {
              message.reply('you need to specify a message.');
            }
          } else {
            channel.join().then(connection => {
              console.log('[' + new Date().toLocaleTimeString() + ']', `Joined the ${channel.name} voice channel.`);
              message.channel.send(`Joined ${channel}.`);
              if (args.length > 0) {
                splitToPlayable(args, message);
                if (!speaking) {
                  playTTS(language, speed, channel.connection);
                }
              }
            });
          }
        } else {
          message.reply('I cannot join your voice channel.');
        }
      } else {
        message.reply('you need to be in a voice channel first.');
      }
      break;
    case "stop":
      if (message.guild.voiceConnection) {
        speaking = false;
        queue = [];
        message.guild.voiceConnection.channel.leave();
        console.log('[' + new Date().toLocaleTimeString() + ']', 'Successfully left the voice channel.');
        message.channel.send('Successfully left the voice channel.');
      } else {
        message.reply('I need to be in a voice channel to do that.')
      }
      break;
    case "lang":
      if (args.length > 0) {
        if (args.toString().toLowerCase() === language) {
          message.reply(`Language is already set to ${languages[language]}.`);
        } else if (languages.hasOwnProperty(args.toString())) {
          language = args.toString().toLowerCase();
          config.language = language;
          fs.writeFile('./settings.json', JSON.stringify(config, null, 2), function (err) {
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
      break;
    case "langs":
      sendLangs(message);
      break;
    case "speed":
      const spd = Number(args);
      if (!isNaN(spd) && spd > 0 && spd <= 100) {
        speed = spd / 100;
        console.log('[' + new Date().toLocaleTimeString() + ']', `Speaking speed has been set to: ${spd}%`);
        message.reply(`Speaking speed has been set to: ${spd}%`);
      } else {
        message.reply('invalid speed, must be between 1 and 100.');
      }
      break;
    case "help":
      sendHelp(message);
      break;
    default:
      break;
  }
});

client.on("reconnecting", () => {
  console.log('[' + new Date().toLocaleTimeString() + ']', 'Trying to reconnect...');
});

client.on("disconnect", () => {
  console.log('[' + new Date().toLocaleTimeString() + ']', 'Lost connection.');
});

client.on("error", error => {
  console.log('[' + new Date().toLocaleTimeString() + ']', 'Something went wrong with the connection to the WebSocket.');
  console.error(error);
});

client.login(config.discord_token);