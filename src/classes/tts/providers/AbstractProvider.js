/* eslint-disable no-unused-vars */

class AbstractProvider {
  constructor() {
    if (new.target === AbstractProvider) {
      throw new TypeError('Cannot instantiate AbstractProvider!');
    }
  }

  /**
   * Receives a sentence and returns a promise that resolves to the corresponding TTS payload (or array of payloads) for the TTSPlayer.
   * @param {string} sentence The sentence for the TTSPlayer.
   * @returns {Promise<Payload> | Promise<Payload[]>} A promise that resolves to the TTS payload.
   */
  createPayload(sentence) {
    throw new Error('Method not implemented!');
  }
}

module.exports = AbstractProvider;
