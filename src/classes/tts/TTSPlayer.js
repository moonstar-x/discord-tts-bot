const logger = require('@greencoast/logger');
const GoogleProvider = require('./providers/GoogleProvider');
const AeiouProvider = require('./providers/AeiouProvider');
const Queue = require('../Queue');
const { InvalidProviderError } = require('../../errors');

class TTSPlayer {
  constructor(guild) {
    this.guild = guild;

    this.queue = new Queue();
    this.speaking = false;

    this.googleProvider = new GoogleProvider();
    this.aeiouProvider = new AeiouProvider();
  }

  getProvider(providerName) {
    switch (providerName) {
      case GoogleProvider.NAME:
        return this.googleProvider;
    
      case AeiouProvider.NAME:
        return this.aeiouProvider;

      default:
        throw new InvalidProviderError(`${providerName} is not a valid provider!`);
    }
  }

  async say(sentence, providerName) {
    const provider = this.getProvider(providerName);

    const payload = await provider.createPayload(sentence);

    if (Array.isArray(payload)) {
      payload.forEach((p) => this.queue.enqueue(p));
    } else {
      this.queue.enqueue(payload);
    }

    if (!this.speaking) {
      this.play();
    }
  }

  async play() {
    if (this.queue.isEmpty()) {
      return;
    }

    const payload = this.queue.dequeue();
    const provider = this.getProvider(payload.providerName);

    logger.info(provider.getPlayLogMessage(payload, this.guild));

    this.speaking = true;
    const { connection } = this.guild.voice;
    const dispatcher = await connection.play(payload.resource);

    dispatcher.on('speaking', (speaking) => {
      if (!speaking) {
        this.speaking = false;
        this.play();
      }
    });

    dispatcher.on('error', (error) => {
      logger.error(error);
      this.speaking = false;
      this.play();
    });
  }

  stop() {
    const { channel } = this.guild.voice;

    this.queue.clear();
    this.speaking = false;
    channel.leave();

    return channel;
  }
}

module.exports = TTSPlayer;
