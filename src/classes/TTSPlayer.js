const googleTTS = require('google-tts-api');
const { Logger } = require('logger');
const dispatcherEvents = require('../events/dispatcherEvents');
const languages = require('../../data/languages.json');
const prefix = process.env.PREFIX || require('../../config/settings.json').prefix;

const logger = new Logger();

class TTSPlayer {
  constructor(guild) {
    this.guild = guild;

    this.queue = [];
    this.speaking = false;
    this.lang = 'en';
    this.speed = 1;
  }

  say(queue) {
    this.queue = [...this.queue, ...queue];
    if (!this.speaking) {
      this.playTTS();
    }
  }

  playTTS() {
    const [firstInQueue] = this.queue;

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
          this.playTTS();
        });

        dispatcher.on(dispatcherEvents.error, (error) => {
          logger.error(error);
          this.queue.shift();
          this.speaking = false;
          this.playTTS();
        });
      })
      .catch((error) => {
        logger.error(error);
      });
  }

  stop() {
    return new Promise((resolve, reject) => {
      try {
        const { channel } = this.guild.voice;
      
        this.queue = [];
        this.speaking = false;
        channel.leave();
    
        logger.info(`Successfully left the voice channel ${channel.name} from guild ${this.guild.name}.`);
        resolve();
      } catch (error) {
        reject(error);
      }
    });
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
    return new Promise((resolve, reject) => {
      if (isNaN(newSpeed) || newSpeed < 1 || newSpeed > 100) {
        reject('invalid speed, it must be between 1 and 100.');
        return;
      }

      this.speed = newSpeed / 100;
      logger.info(`Guild ${this.guild.name} has changed its speed to ${newSpeed}%.`);
      resolve(newSpeed);
    });
  }
}

module.exports = TTSPlayer;
