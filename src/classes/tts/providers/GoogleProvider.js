const googleTTS = require('google-tts-api');
const AbstractProvider = require('./AbstractProvider');
const Payload = require('../Payload');

/**
 * A concrete TTS provider for the Google Translate API TTS.
 */
class GoogleProvider extends AbstractProvider {
  createPayload(sentence, extras) {
    return new Promise((resolve, reject) => {
      try {
        const data = googleTTS.getAllAudioUrls(sentence, {
          lang: extras.language,
          slow: extras.speed === 'normal',
          splitPunct: ',.?!'
        });

        resolve(data.map(({ url, shortText }) => {
          return new Payload(url, shortText, GoogleProvider.NAME, extras);
        }));
      } catch (error) {
        reject(error);
      }
    });
  }

  getPlayLogMessage(payload, guild) {
    const { sentence, extras: { language, speed } } = payload;

    return `(Google): Saying ${sentence} with language ${language} with ${speed} speed in guild ${guild.name} (${guild.id}).`;
  }
}

GoogleProvider.NAME = 'Google';
GoogleProvider.FRIENDLY_NAME = 'Google Translate Provider';

GoogleProvider.EXTRA_FIELDS = ['language', 'speed'];
GoogleProvider.EXTRA_DEFAULTS = {
  language: 'en',
  speed: 'normal'
};

GoogleProvider.getSupportedSpeedChoices = () => {
  return [
    ['Slow Speed', 'slow'],
    ['Normal Speed', 'normal']
  ];
};

module.exports = GoogleProvider;
