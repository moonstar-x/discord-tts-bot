const axios = require('axios');
const AbstractProvider = require('./AbstractProvider');
const Payload = require('../Payload');
const languageData = require('../../../../provider-data/ttstool_microsoft_languages.json');

const POST_URL = 'https://support.readaloud.app/ttstool/createParts';
const GET_URL = 'https://support.readaloud.app/ttstool/getParts';

/**
 * A concrete TTS provider for TTS Tool Microsoft.
 */
class MicrosoftProvider extends AbstractProvider {
  async createParts(sentence, extras) {
    const { language, voice, volume, rate, pitch } = extras;

    const response = await axios.post(POST_URL, [{
      voiceId: voice,
      ssml: `<speak version="1.0" xml:lang="${languageData[language].id}"><prosody volume="${volume}" rate="${rate}" pitch="${pitch}">${sentence}</prosody></speak>`
    }]);

    return response.data[0];
  }

  async createPayload(sentence, extras) {
    const partId = await this.createParts(sentence, extras);
    const url = `${GET_URL}?q=${partId}`;

    return new Payload(url, sentence, MicrosoftProvider.NAME, extras);
  }

  getPlayLogMessage(payload, guild) {
    const { sentence, extras: { language, voice, volume, rate, pitch } } = payload;

    return `(Microsoft): Saying ${sentence} with language ${language} - ${voice} with ${volume} volume, ${rate} rate and ${pitch} pitch in guild ${guild.name} (${guild.id}).`;
  }
}

MicrosoftProvider.NAME = 'Microsoft';
MicrosoftProvider.FRIENDLY_NAME = 'Microsoft (TTS Tool) Provider';

MicrosoftProvider.EXTRA_FIELDS = ['language', 'voice', 'volume', 'rate', 'pitch'];
MicrosoftProvider.EXTRA_DEFAULTS = {
  language: 'en',
  voice: 'Microsoft US English (David)',
  volume: 'default',
  rate: 'medium',
  pitch: 'default'
};

MicrosoftProvider.getSupportedVolumeChoices = () => {
  return [
    ['Default Volume', 'default'],
    ['Silent', 'silent'],
    ['Extra Soft', 'x-soft'],
    ['Soft', 'soft'],
    ['Medium', 'medium'],
    ['Loud', 'loud'],
    ['Extra Loud', 'x-loud']
  ];
};

MicrosoftProvider.getSupportedRateChoices = () => {
  return [
    ['Extra Slow', 'x-slow'],
    ['Slow', 'slow'],
    ['Medium', 'medium'],
    ['Fast', 'fast'],
    ['Extra Fast', 'x-fast']
  ];
};

MicrosoftProvider.getSupportedPitchChoices = () => {
  return [
    ['Default Pitch', 'default'],
    ['Extra Low', 'x-low'],
    ['Low', 'low'],
    ['Medium', 'medium'],
    ['High', 'high'],
    ['Extra High', 'x-high']
  ];
};

module.exports = MicrosoftProvider;
