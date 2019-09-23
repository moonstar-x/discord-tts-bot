const googleTTS = require('google-tts-api');
const { Logger } = require('logger');
const dispatcherEvents = require('../events/dispatcherEvents');
const languages = require('../../data/languages.json');
const { prefix } = require('../../config/settings.json');

const logger = new Logger();

class TTSPlayer {
  constructor(guild) {
    this.guild = guild;

    this.queue = [];
    this.speaking = false;
    this.lang = 'en';
    this.speed = 1;
  }

  say() {
    const [firstInQueue] = this.queue[0];

    if (!firstInQueue) {
      return;
    }

    googleTTS(firstInQueue, this.lang, this.speed)
      .then(async (url) => {
        logger.info(`(TTS): Received TTS for ${firstInQueue} with language '${this.lang} and speed ${this.speed} in guild ${this.guild.name}.'`);
        this.speaking = true;
        const { connection } = this.guild.voice;
        const dispatcher = await connection.play(url);

        dispatcher.on(dispatcherEvents.end, () => {
          this.queue.shift();
          this.speaking = false;
          this.say();
        });

        dispatcher.on(dispatcherEvents.error, (error) => {
          logger.error(error);
        });
      })
      .catch((error) => {
        logger.error(error);
      });
  }

  stop() {
    const { channel } = this.guild.voice;
    
    this.queue = [];
    this.speaking = false;
    channel.leave();

    logger.info(`Successfully left the voice channel ${channel.name} from guild ${this.guild.name}.`);
  }

  setLang(newLang) {
    return new Promise((resolve, reject) => {
      if (!languages[newLang]) {
        reject(`invalid language. Type **${prefix}langs** for a list of available languages.`);
        return;
      }

      if (this.lang === newLang) {
        reject(`language is already set to **${languages[newLang]}**.`);
        return;
      }

      this.lang = newLang;
      logger.info(`Guild ${this.guild.name} has changed its language to ${languages[this.lang]}.`);
      resolve(languages[newLang]);
    });
  }

  setSpeed(newSpeed) {
    // validate newSpeed
    this.speed = newSpeed / 100;
    logger.info(`Guild ${this.guild.name} has changed its speed to ${this.speed}%.`);
  }
}

module.exports = TTSPlayer;
