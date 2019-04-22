const { Client, Collection } = require('discord.js');
const { Logger } = require('logger');
const googleTTS = require('google-tts-api');
const fs = require('fs');
const events = require('events').EventEmitter;

const client = new Client();
const logger = new Logger();

const config = require('../config/settings.json');
const languages = require('../data/languages.json');

const tts = new events.EventEmitter();

let guildTTSData = {};
let defaultSettings = {
  queue: [],
  speaking: false,
  lang: 'en',
  speed: 1
}

client.commands = new Collection();
const commandFiles = fs.readdirSync(__dirname + '/commands').filter( file => file.endsWith('.js'));
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

function updatePresence() {
  client.user.setPresence({
    activity: {
      name: `in ${client.guilds.size} servers!`,
      type: 'PLAYING'
    }
  }).then(logger.info(`Presence changed to: ${client.guilds.size} servers.`))
  .catch(err => logger.error(err));
}

function initializeTTSObject() {
  client.guilds.each( guild => {
    guildTTSData[guild.id] = defaultSettings;
  });
}

function playTTS(queue, lang, speed, guild, conn) {
  if (queue[0]) {
    googleTTS(queue[0], lang, speed).then( async url => {
      logger.info(`Received TTS for '${queue[0]}' with language code '${lang} and speed ${speed} in guild ${guild.name}.`);
      guildTTSData[guild.id].speaking = true;
      const dispatcher = await conn.play(url);

      dispatcher.on('end', () => {
        queue.shift();
        guildTTSData[guild.id].speaking = false;
        if (queue[0]) playTTS(queue, lang, speed, guild, conn);
      });

      dispatcher.on('error', err => logger.error(err));
    }).catch(err => logger.error(err));
  }
}

tts.on('say', (guild, connection) => {
  const { queue, lang, speed } = guildTTSData[guild.id];
  playTTS(queue, lang, speed, guild, connection);
});

tts.on('stop', (guild, channel) => {
  guildTTSData[guild.id].queue = [];
  guildTTSData[guild.id].speaking = false;
  channel.leave();
  logger.info(`Successfully left the voice channel ${channel.name} from guild ${guild.name}.`)
});

tts.on('lang', (guild, lang) => {
  guildTTSData[guild.id].lang = lang;
  logger.info(`Guild ${guild.name} has changed its language to ${languages[lang]}.`);
});

tts.on('speed', (guild, speed) => {
  guildTTSData[guild.id].speed = speed / 100;
  logger.info(`Guild ${guild.name} has changed its speed to ${speed}%.`);
});

client.on('ready', () => {
  logger.info('Connected to Discord! - Ready.');
  updatePresence();
  initializeTTSObject();
});

client.on('message', async message => {
  if (!message.guild || !message.content.startsWith(config.prefix) || message.author.bot) return;

  const args = message.content.slice(config.prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (!client.commands.has(command)) return;

  const options = {
    args: args,
    prefix: config.prefix,
    commands: client.commands,
    tts: tts,
    ttsData: guildTTSData
  }

  try {
    logger.info(`User ${message.member.displayName} from guild ${message.guild.name} issued command ${command}.`);
    client.commands.get(command).execute(message, options);
  } catch (err) {
    logger.error(err);
    message.reply("there's been a problem executing your command.");
  }
});

client.on('guildCreate', guild => {
  logger.info(`Joined ${guild.name} guild!`);
  updatePresence();
  guildTTSData[guild.id] = defaultSettings;
});

client.on('guildDelete', guild => {
  logger.info(`Left ${guild.name} guild!`);
  updatePresence();
  delete guildTTSData[guild.id];
});

client.on('guildUnavailable', guild => {
  logger.warn(`Guild ${guild.name} is currently unavailable.`);
});

client.on('warn', info => {
  logger.warn(info);
});

client.on('resume', () => {
  logger.info('Client gateway resumed.');
});

client.on('invalidated', () => {
  logger.error('Client connection invalidated, terminating execution with code 1.');
  process.exit(1);
});

client.login(config.discord_token);