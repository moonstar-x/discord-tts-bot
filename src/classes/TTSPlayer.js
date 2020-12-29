const googleTTS = require('google-tts-api');
const axios = require('axios');
const logger = require('@greencoast/logger');
const languages = require('../../data/languages.json');
const { TTS_ENGINES, AEIOU_API_URL } = require('../common/constants');
const { prefix } = require('../common/settings');

class TTSPlayer {
  constructor(guild) {
    this.guild = guild;

    this.queue = [];
    this.speaking = false;
    this.lang = 'en';
    this.slow = false;
  }

  say(phrase) {
    const urls = googleTTS.getAllAudioUrls(phrase, {
      lang: this.lang,
      slow: this.slow
    });

    urls.forEach(({ url, shortText }) => {
      this.addToQueue(url, shortText, TTS_ENGINES.google);
    });

    if (!this.speaking) {
      this.playTTS();
    }
  }

  aeiou(phrase) {
    this.addToQueue(phrase, phrase, TTS_ENGINES.aeiou);

    if (!this.speaking) {
      this.playTTS();
    }
  }

  addToQueue(source, phrase, engine) {
    const parsedEntry = {
      source,
      phrase,
      lang: this.lang,
      slow: this.slow,
      engine
    };

    this.queue.push(parsedEntry);
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

  async playGoogle(firstInQueue) {
    const { source, phrase, lang, slow } = firstInQueue;

    logger.info(`(TTS): Received googleTTS for ${phrase} with language '${lang}' with ${slow ? 'slow' : 'normal'} speed in guild ${this.guild.name}.`);
    this.speaking = true;
    const { connection } = this.guild.voice;
    const dispatcher = await connection.play(source);

    dispatcher.on('speaking', (speaking) => {
      if (!speaking) {
        this.queue.shift();
        this.speaking = false;
        this.playTTS();
      }
    });

    dispatcher.on('error', (error) => {
      logger.error(error);
      this.queue.shift();
      this.speaking = false;
      this.playTTS();
    });
  }

  playAeiou(firstInQueue) {
    const { phrase } = firstInQueue;

    axios.get(`${AEIOU_API_URL}/tts`, {
      params: {
        text: phrase
      }
    })
      .then(async(response) => {
        const url = `${AEIOU_API_URL}${response.request.path}`;

        logger.info(`(TTS): Received aeiou for ${phrase} in guild ${this.guild.name}.`);
        this.speaking = true;
        const { connection } = this.guild.voice;
        const dispatcher = await connection.play(url);

        dispatcher.on('speaking', (speaking) => {
          if (!speaking) {
            this.queue.shift();
            this.speaking = false;
            this.playTTS();
          }
        });

        dispatcher.on('error', (error) => {
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

  setSpeed(value) {
    return new Promise((resolve, reject) => {
      if (value !== 'normal' && value !== 'slow') {
        reject('invalid speed, it must be either *normal* or *slow*.');
        return;
      }

      this.slow = value === 'slow';
      const setSpeed = this.slow ? 'slow' : 'normal';
      logger.info(`Guild ${this.guild.name} has changed its speed to ${setSpeed}.`);
      resolve(setSpeed);
    });
  }
}

module.exports = TTSPlayer;
