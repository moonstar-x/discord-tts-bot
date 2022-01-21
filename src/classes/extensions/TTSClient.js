const { Collection } = require('discord.js');
const { ExtendedClient } = require('@greencoast/discord.js-extended');
const TTSPlayer = require('../tts/TTSPlayer');
const CachedTTSSettings = require('../tts/CachedTTSSettings');
const TTSChannelHandler = require('../tts/TTSChannelHandler');
const Scheduler = require('../Scheduler');

class TTSClient extends ExtendedClient {
  constructor(options) {
    super(options);

    this.ttsPlayers = new Collection();
    this.disconnectSchedulers = new Collection();
    this.ttsSettings = new CachedTTSSettings(this);
    this.ttsChannelHandler = new TTSChannelHandler(this);
  }

  async initializeDependencies() {
    await this.initializeDisconnectSchedulers();
    this.initializeTTSPlayers();
  }

  initializeTTSPlayers() {
    this.guilds.cache.each((guild) => {
      const scheduler = this.disconnectSchedulers.get(guild.id);

      this.ttsPlayers.set(guild.id, new TTSPlayer(this, guild, scheduler));
    });
  }

  async initializeDisconnectSchedulers() {
    return Promise.all(this.guilds.cache.map(async(guild) => {
      const timeout = await this.dataProvider.get(guild, 'disconnectTimeout', this.config.get('DEFAULT_DISCONNECT_TIMEOUT'));
      const scheduler = new Scheduler(this, guild, timeout);

      this.disconnectSchedulers.set(guild.id, scheduler);
    }));
  }

  getTTSPlayer(guild) {
    return this.ttsPlayers.get(guild.id);
  }
}

module.exports = TTSClient;
