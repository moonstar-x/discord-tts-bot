const { Collection } = require('discord.js');
const { ExtendedClient } = require('@greencoast/discord.js-extended');
const ProviderManager = require('../tts/providers/ProviderManager');
const TTSPlayer = require('../tts/TTSPlayer');
const CachedTTSSettings = require('../tts/CachedTTSSettings');
const TTSChannelHandler = require('../tts/TTSChannelHandler');
const Scheduler = require('../Scheduler');

class TTSClient extends ExtendedClient {
  constructor(options) {
    super(options);

    this.ttsPlayers = new Collection();
    this.disconnectSchedulers = new Collection();

    this.providerManager = new ProviderManager(this);
    this.ttsSettings = new CachedTTSSettings(this);
    this.ttsChannelHandler = new TTSChannelHandler(this);
  }

  async initializeDependencies() {
    return Promise.all(this.guilds.cache.map((guild) => this.initializeDependenciesForGuild(guild)));
  }

  async initializeDependenciesForGuild(guild) {
    const timeout = await this.dataProvider.get(guild, 'disconnectTimeout', this.config.get('DEFAULT_DISCONNECT_TIMEOUT') * 60 * 1000);
    const scheduler = new Scheduler(this, guild, timeout);

    this.disconnectSchedulers.set(guild.id, scheduler);
    this.ttsPlayers.set(guild.id, new TTSPlayer(this, guild, scheduler));
  }

  deleteDependenciesForGuild(guild) {
    this.ttsPlayers.delete(guild.id);
    this.disconnectSchedulers.delete(guild.id);
  }

  getTTSPlayer(guild) {
    return this.ttsPlayers.get(guild.id);
  }
}

module.exports = TTSClient;
