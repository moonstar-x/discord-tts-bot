/*
TODO:
Make bot so it can join multiple servers.
Remember that ffmpeg seems to be required
*/

const Discord = require('discord.js');
const Opus = require('node-opus');
const googleTTS = require('google-tts-api');
const fs = require('fs');

const client = new Discord.Client();
const config = require('./settings.json');
const languages = require('./languages.json');

let language = config.language;
let speed = 1;

client.on('ready', () => {
  console.log('Ready!');
  updatePresence(language);
});

client.on('message', message => {
  if (!message.guild || !message.content.startsWith(config.prefix) || message.author.bot) return;

  const args = message.content.slice(config.prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();

  const { voiceChannel } = message.member;

  if (command === 'say') {
    if (voiceChannel) {
      if (voiceChannel.joinable) {
        if (voiceChannel.connection) {
          if (args.length > 0) {
            playTTS(args.join(' '), language, speed, voiceChannel.connection, message);
          } else {
            message.reply('you need to specify a message.');
          }
        } else {
          voiceChannel.join()
          .then(connection => {
            console.log(`Joined ${voiceChannel.name} voice channel.`);
            message.channel.send(`Joined ${voiceChannel}.`);
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
      message.reply('you need to specify a language.');
    } 
  } else if (command === 'langs') {
    message.channel.send(`
    You can send TTS messages in the following languages:
      :flag_us: English - '**${config.prefix}lang en**'
      :flag_es: Spanish - '**${config.prefix}lang es**'
      :flag_br: Portuguese - '$**{config.prefix}lang pt**'
      :flag_fr: French - '**${config.prefix}lang fr**'
      :flag_de: German - '**${config.prefix}lang de**'
      :flag_ru: Russian - '**${config.prefix}lang ru**'
      :flag_cn: Chinese - '**${config.prefix}lang cmn**'
      :flag_kr: Korean - '**${config.prefix}lang ko**'
      :flag_jp: Japanese - '**${config.prefix}lang ja**'
    For other languages, visit the following link: https://github.com/moonstar-x/discord-tts-bot#language-support, 
    use '**${config.prefix}say <lang_code>**' command to set it to your preference.
    `);

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
    message.channel.send(`
    The commands you can use are the following:
      :speaking_head: **${config.prefix}say <message>** - Send a TTS message in your voice channel (up to 200 characters).
      :x: **${config.prefix}stop** - Stop the TTS bot and leave the channel.
      :beginner: **${config.prefix}lang <lang_code>** - Change the TTS language.
      :page_facing_up: **${config.prefix}langs** - Display a list of the supported languages.
      :fast_forward: **${config.prefix}speed <number>** - Change the TTS spoken speed (must be between 1% and 100%).
    `);
  }
});

client.login(config.discord_token);

function playTTS(phrase, lang, spd, conn, msg) {
  googleTTS(phrase, lang, spd)
    .then(function (url) {
        console.log(`Received TTS for '${phrase}' with language code '${lang}' and ${spd} speed.`);
        const dispatcher = conn.playArbitraryInput(url);
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
    game: {
      name: `in ${languages[lang]}!`,
      type: 'PLAYING'
    }
  });
  console.log(`Presence changed to: ${languages[lang]}.`);
}