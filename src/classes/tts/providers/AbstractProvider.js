/* eslint-disable no-unused-vars */

/**
 * This class represents an abstract TTS provider. Any TTS provider should create a concrete implementation of this class.
 */
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

  /**
   * Gets the message to log once a TTS message has been played.
   * @param {Payload} payload The payload for this TTS message.
   * @param {Discord.Guild} guild The guild where the TTS message was played.
   * @returns The message to log once the TTS message has been played.
   */
  getPlayLogMessage(payload, guild) {
    throw new Error('Method not implemented!');
  }
}

module.exports = AbstractProvider;
