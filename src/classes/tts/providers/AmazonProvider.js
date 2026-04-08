const axios = require('axios');
const AbstractProvider = require('./AbstractProvider');
const Payload = require('../Payload');
const languageData = require('../../../../provider-data/ttstool_amazon_languages.json');
const { oldChoiceListToNew } = require('../../../utils/upgrade-utils');


const POST_URL = 'https://support.readaloud.app/ttstool/createParts';
const GET_URL = 'https://support.readaloud.app/ttstool/getParts';
const REQUEST_TIMEOUT = 10000;

const escapeXml = (str) => str
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&apos;');

/**
 * A concrete TTS provider for TTS Tool Amazon.
 */
class AmazonProvider extends AbstractProvider {
  async createParts(sentence, extras) {
    const { language, voice, volume, rate, pitch } = extras;

    const response = await axios.post(POST_URL, [{
      voiceId: voice,
      ssml: `<speak version="1.0" xml:lang="${languageData[language].id}"><prosody volume="${volume}" rate="${rate}" pitch="${pitch}">${escapeXml(sentence)}</prosody></speak>`
    }], { timeout: REQUEST_TIMEOUT });

    if (!response.data || !response.data[0]) {
      throw new Error('Amazon TTS API returned an empty response.');
    }

    return response.data[0];
  }

  async createPayload(sentence, extras) {
    const partId = await this.createParts(sentence, extras);
    const url = `${GET_URL}?q=${partId}`;

    return new Payload(url, sentence, AmazonProvider.NAME, extras);
  }

  getPlayLogMessage(payload, guild) {
    const { sentence, extras: { language, voice, volume, rate, pitch } } = payload;

    return `(Amazon): Saying ${sentence} with language ${language} - ${voice} with ${volume} volume, ${rate} rate and ${pitch} pitch in guild ${guild.name}.`;
  }
}

AmazonProvider.NAME = 'Amazon';
AmazonProvider.FRIENDLY_NAME = 'Amazon (TTS Tool) Provider';

AmazonProvider.EXTRA_FIELDS = ['language', 'voice', 'volume', 'rate', 'pitch'];
AmazonProvider.EXTRA_DEFAULTS = {
  language: 'en',
  voice: 'Amazon US English (Salli)',
  volume: 'default',
  rate: 'medium',
  pitch: 'default'
};

AmazonProvider.getSupportedVolumeChoices = () => {
  return oldChoiceListToNew([
    ['Default Volume', 'default'],
    ['Silent', 'silent'],
    ['Extra Soft', 'x-soft'],
    ['Soft', 'soft'],
    ['Medium', 'medium'],
    ['Loud', 'loud'],
    ['Extra Loud', 'x-loud']
  ]);
};

AmazonProvider.getSupportedRateChoices = () => {
  return oldChoiceListToNew([
    ['Extra Slow', 'x-slow'],
    ['Slow', 'slow'],
    ['Medium', 'medium'],
    ['Fast', 'fast'],
    ['Extra Fast', 'x-fast']
  ]);
};

AmazonProvider.getSupportedPitchChoices = () => {
  return oldChoiceListToNew([
    ['Default Pitch', 'default'],
    ['Extra Low', 'x-low'],
    ['Low', 'low'],
    ['Medium', 'medium'],
    ['High', 'high'],
    ['Extra High', 'x-high']
  ]);
};

module.exports = AmazonProvider;
