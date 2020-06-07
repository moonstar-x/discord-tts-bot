const googleTTS = require('google-tts-api');
const axios = require('axios');
const { Logger } = require('logger');
const dispatcherEvents = require('../events/dispatcherEvents');
const languages = require('../../data/languages.json');
const { TTS_ENGINES, AEIOU_API_URL } = require('../common/constants');
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
    this.addToQueue(queue, TTS_ENGINES.google);

    if (!this.speaking) {
      this.playTTS();
    }
  }

  aeiou(messageContent) {
    const message = messageContent.join(' ');
    this.addToQueue([message], TTS_ENGINES.aeiou);

    if (!this.speaking) {
      this.playTTS();
    }
  }

  addToQueue(queue, engine) {
    const parsedQueue = queue.map((phrase) => {
      return {
        phrase,
        lang: this.lang,
        speed: this.speed,
        engine
      };
    });

    this.queue = [...this.queue, ...parsedQueue];
  }

  playTTS() {
    const [firstInQueue] = this.queue;

    if (!firstInQueue) {
      return;
    }

    switch (firstInQueue.engine) {
      case TTS_ENGINES.google:
        this.playGoogle(firstInQueue);
        break;

      case TTS_ENGINES.aeiou:
        this.playAeiou(firstInQueue);
        break;

      default:
        throw new Error('Invalid TTS engine!');
    }
  }

  playGoogle(firstInQueue) {
    const { phrase, lang, speed } = firstInQueue;

    googleTTS(phrase, lang, speed)
      .then(async (url) => {
        logger.info(`(TTS): Received googleTTS for ${phrase} with language '${lang}' and speed ${speed} in guild ${this.guild.name}.`);
        this.speaking = true;
        const { connection } = this.guild.voice;
        const dispatcher = await connection.play(url);

        dispatcher.on(dispatcherEvents.speaking, (speaking) => {
          if (!speaking) {
            this.queue.shift();
            this.speaking = false;
            this.playTTS();
          }
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

  playAeiou(firstInQueue) {
    const { phrase } = firstInQueue;

    axios.get(`${AEIOU_API_URL}/tts`, {
      params: {
        text: phrase
      }
    })
      .then(async (response) => {
        const url = `${AEIOU_API_URL}${response.request.path}`;

        logger.info(`(TTS): Received aeiou for ${phrase} in guild ${this.guild.name}.`);
        this.speaking = true;
        const { connection } = this.guild.voice;
        const dispatcher = await connection.play(url);

        dispatcher.on(dispatcherEvents.speaking, (speaking) => {
          if (!speaking) {
            this.queue.shift();
            this.speaking = false;
            this.playTTS();
          }
        });

        dispatcher.on(dispatcherEvents.error, (error) => {
          logger.error(error);
          this.queue.shift();
          this.speaking = false;
          this.playTTS();
        });
      })
      .catch((error) => {
        logger.error(error.message);
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
