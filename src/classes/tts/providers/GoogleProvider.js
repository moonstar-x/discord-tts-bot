const googleTTS = require('google-tts-api');
const AbstractProvider = require('./AbstractProvider');
const Payload = require('../Payload');

/**
 * A concrete TTS provider for the Google Translate API TTS.
 */
class GoogleProvider extends AbstractProvider {
  constructor() {
    super();
    this.lang = GoogleProvider.EXTRA_DEFAULTS.lang;
    this.speed = GoogleProvider.EXTRA_DEFAULTS.speed;
  }

  createPayload(sentence) {
    return new Promise((resolve, reject) => {
      try {
        const data = googleTTS.getAllAudioUrls(sentence, {
          lang: this.lang,
          slow: this.speed === 'normal',
          splitPunct: ',.?!'
        });

        resolve(data.map(({ url, shortText }) => {
          return new Payload(url, shortText, GoogleProvider.NAME, {
            lang: this.lang,
            speed: this.speed
          });
        }));
      } catch (error) {
        reject(error);
      }
    });
  }

  getPlayLogMessage(payload, guild) {
    const { sentence, extras: { lang, speed } } = payload;

    return `(TTS): Playing googleTTS for ${sentence} with language ${lang} with ${speed} speed in guild ${guild.name}.`;
  }
}

GoogleProvider.NAME = 'Google';
GoogleProvider.FRIENDLY_NAME = 'Google Translate Provider';

GoogleProvider.EXTRA_FIELDS = ['lang', 'speed'];
GoogleProvider.EXTRA_DEFAULTS = {
  lang: 'en',
  speed: 'normal'
};

GoogleProvider.getSupportedSpeedChoices = () => {
  return [
    ['Slow Speed', 'slow'],
    ['Normal Speed', 'normal']
  ];
};

module.exports = GoogleProvider;
