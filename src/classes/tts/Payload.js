/* eslint-disable max-params */

class Payload {
  constructor(resource, sentence, providerName, extras = {}) {
    this.resource = resource;
    this.sentence = sentence;
    this.providerName = providerName;
    this.extras = extras;
  }
}

module.exports = Payload;
