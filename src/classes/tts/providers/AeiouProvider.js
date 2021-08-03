const axios = require('axios');
const AbstractProvider = require('./AbstractProvider');
const Payload = require('../Payload');

const API_URL = 'http://tts.cyzon.us';

/**
 * A concrete TTS provider for the Moonbase Alpha TTS.
 */
class AeiouProvider extends AbstractProvider {
  createPayload(sentence) {
    return axios.get(`${API_URL}/tts`, {
      params: {
        text: sentence
      }
    })
      .then((response) => {
        return new Payload(`${API_URL}${response.request.path}`, sentence, AeiouProvider.NAME);
      });
  }

  getPlayLogMessage(payload, guild) {
    const { sentence } = payload;
    
    return `(TTS): Playing aeiou for ${sentence} in guild ${guild.name}.`;
  }
}

AeiouProvider.NAME = 'aeiou';

module.exports = AeiouProvider;
