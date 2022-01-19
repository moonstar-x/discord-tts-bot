const googleTTS = require('google-tts-api');
const AbstractProvider = require('./AbstractProvider');
const Payload = require('../Payload');
const { GoogleProviderError } = require('../../../errors');
const languages = require('../../../../provider-data/google_languages.json');

/**
 * A concrete TTS provider for the Google Translate API TTS.
 */
class GoogleProvider extends AbstractProvider {
  constructor() {
    super();
    this.lang = 'en';
    this.slow = false;
  }

  createPayload(sentence) {
    return new Promise((resolve, reject) => {
      try {
        const data = googleTTS.getAllAudioUrls(sentence, {
          lang: this.lang,
          slow: this.slow,
          splitPunct: ',.?!'
        });

        resolve(data.map(({ url, shortText }) => {
          return new Payload(url, shortText, GoogleProvider.NAME, {
            lang: this.lang,
            slow: this.slow
          });
        }));
      } catch (error) {
        reject(error);
      }
    });
  }

  getPlayLogMessage(payload, guild) {
    const { sentence, extras: { lang, slow } } = payload;
    const speed = slow ? 'slow' : 'normal';

    return `(TTS): Playing googleTTS for ${sentence} with language ${lang} with ${speed} speed in guild ${guild.name}.`;
  }

  setLang(newLang) {
    if (!languages[newLang]) {
      throw new GoogleProviderError('Invalid language!', GoogleProviderError.REASON.invalid);
    }

    if (this.lang === newLang) {
      throw new GoogleProviderError(`Language is already set to ${newLang}!`, GoogleProviderError.REASON.same);
    }

    this.lang = newLang;
    return languages[this.lang].name;
  }

  getLang() {
    return languages[this.lang].name;
  }

  setSpeed(newSpeed) {
    if (newSpeed !== 'normal' && newSpeed !== 'slow') {
      throw new GoogleProviderError('Invalid speed!', GoogleProviderError.REASON.invalid);
    }

    this.slow = newSpeed === 'slow';
    return newSpeed;
  }
}

GoogleProvider.NAME = 'Google';
GoogleProvider.FRIENDLY_NAME = 'Google Translate Provider';

GoogleProvider.getSupportedSpeedChoices = () => {
  return [
    ['Slow Speed', 'slow'],
    ['Normal Speed', 'normal']
  ];
};

module.exports = GoogleProvider;
