const logger = require('@greencoast/logger');
const { createAudioResource } = require('@discordjs/voice');
const Queue = require('../Queue');
const VoiceManager = require('../VoiceManager');

class TTSPlayer {
  constructor(client, guild, disconnectScheduler) {
    this.client = client;
    this.guild = guild;
    this.disconnectScheduler = disconnectScheduler;
    this.providerManager = client.providerManager;

    this.queue = new Queue();
    this.speaking = false;
    this.voice = new VoiceManager(guild);

    this.initializePlayer();
    this.initializeScheduler();
  }

  initializePlayer() {
    this.voice.player.on('error', (error) => {
      logger.error(error);
      this.speaking = false;
      this.play();
    });

    this.voice.player.on('idle', () => {
      if (this.speaking) {
        this.speaking = false;
        this.play();
      }
    });
  }

  initializeScheduler() {
    this.disconnectScheduler.set(() => {
      const channel = this.stop();
      logger.warn(`Left ${channel.name} from ${this.guild.name} due to inactivity.`);
    });
  }

  async say(sentence, providerName, extras = {}) {
  // URL Detector
  const urlRegex = /(https?:\/\/[^\s]+)/g;

  // Replace URL with SUS
  let sanitizedSentence = sentence.replace(urlRegex, 'ඞ');

  const provider = this.providerManager.getProvider(providerName);
  const payload = await provider.createPayload(sanitizedSentence, extras);

  if (Array.isArray(payload)) {
    payload.forEach((p) => this.queue.enqueue(p));
  } else {
    this.queue.enqueue(payload);
  }

  this.startDisconnectScheduler();

  if (!this.speaking) {
    this.play();
  }
}
  async play() {
    if (this.queue.isEmpty()) {
      return;
    }

    const payload = this.queue.dequeue();
    const provider = this.providerManager.getProvider(payload.providerName);

    logger.info(provider.getPlayLogMessage(payload, this.guild));

    this.speaking = true;
    this.voice.play(createAudioResource(payload.resource, {
      metadata: {
        title: payload.sentence
      }
    }));
  }

    skip() {
    this.stopDisconnectScheduler();

    if (this.queue.length > 0) {
      this.queue.shift();
    }

    this.speaking = false;
    this.voice.player.stop(true);

    if (this.queue.length > 0) {
      const nextMessage = this.queue[0];
      this.say(nextMessage.text, nextMessage.provider, nextMessage.extras);
    } else {
      this.voice.disconnect();
    }
  }
    
  stop() {
    const { channel } = this.guild.me.voice;

    this.stopDisconnectScheduler();

    this.queue.clear();
    this.speaking = false;
    this.voice.disconnect();
    this.voice.player.stop(true);

    return channel || { name: 'null' };
  }

  startDisconnectScheduler() {
    if (!this.disconnectScheduler) {
      return;
    }

    if (this.disconnectScheduler.isAlive()) {
      this.disconnectScheduler.refresh();
    } else {
      this.disconnectScheduler.start(this);
    }
  }

  stopDisconnectScheduler() {
    if (!this.disconnectScheduler) {
      return;
    }

    if (this.disconnectScheduler.isAlive()) {
      this.disconnectScheduler.stop();
    }
  }
}

module.exports = TTSPlayer;
