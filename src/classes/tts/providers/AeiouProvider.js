const axios = require('axios');
const AbstractProvider = require('./AbstractProvider');
const Payload = require('../Payload');

const API_URL = 'http://tts.cyzon.us';
const REQUEST_TIMEOUT = 10000;

/**
 * A concrete TTS provider for the Moonbase Alpha TTS.
 */
class AeiouProvider extends AbstractProvider {
  async createPayload(sentence, extras) {
    const response = await axios.get(`${API_URL}/tts`, {
      params: {
        text: sentence
      },
      timeout: REQUEST_TIMEOUT
    });

    if (!response.request || !response.request.path) {
      throw new Error('Aeiou TTS API returned an unexpected response.');
    }

    return new Payload(`${API_URL}${response.request.path}`, sentence, AeiouProvider.NAME, extras);
  }

  getPlayLogMessage(payload, guild) {
    const { sentence } = payload;

    return `(Aeiou): Saying ${sentence} in guild ${guild.name}.`;
  }
}

AeiouProvider.NAME = 'aeiou';
AeiouProvider.FRIENDLY_NAME = 'Aeiou Provider';

AeiouProvider.EXTRA_FIELDS = [];
AeiouProvider.EXTRA_DEFAULTS = {};

module.exports = AeiouProvider;
