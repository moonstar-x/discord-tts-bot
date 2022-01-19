/* eslint-disable max-params */

/**
 * This class represents the data that is used to run the TTSPlayer.
 */
class Payload {
  constructor(resource, sentence, providerName, extras) {
    /**
     * The readable stream or URL that points to a readable stream of the TTS message to be played.
     * @type {string|ReadableStream}
     */
    this.resource = resource;

    /**
     * The sentence that will be played for TTS.
     * @type {string}
     */
    this.sentence = sentence;

    /**
     * The name of the provider. Generally should be set to the NAME static property of any concrete provider.
     * @type {string}
     */
    this.providerName = providerName;

    /**
     * Any extra information that the payload should contain.
     * @type {object}
     */
    this.extras = extras;
  }
}

module.exports = Payload;
