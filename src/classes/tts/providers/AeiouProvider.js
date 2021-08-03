const axios = require('axios');
const AbstractProvider = require('./AbstractProvider');
const Payload = require('../Payload');

const API_URL = 'http://tts.cyzon.us';

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
}

AeiouProvider.NAME = 'aeiou';

module.exports = AeiouProvider;
