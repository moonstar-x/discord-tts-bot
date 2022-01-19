const { Collection } = require('discord.js');
const { ExtendedClient } = require('@greencoast/discord.js-extended');
const TTSPlayer = require('../tts/TTSPlayer');
const CachedTTSSettings = require('../tts/CachedTTSSettings');
const Scheduler = require('../Scheduler');
const logger = require('@greencoast/logger');

class TTSClient extends ExtendedClient {
  constructor(options) {
    super(options);

    this.ttsPlayers = new Collection();
    this.disconnectSchedulers = new Collection();
    this.ttsSettings = new CachedTTSSettings(this);
  }

  initializeDependencies() {
    this.initializeDisconnectSchedulers();
    this.initializeTTSPlayers();
  }

  initializeTTSPlayers() {
    this.guilds.cache.each((guild) => {
      const scheduler = this.disconnectSchedulers.get(guild.id);

      this.ttsPlayers.set(guild.id, new TTSPlayer(this, guild, scheduler));
    });
  }

  initializeDisconnectSchedulers() {
    this.guilds.cache.each((guild) => {
      const scheduler = this.config.get('DISCONNECT_TIMEOUT') !== null ?
        new Scheduler(this, this.config.get('DISCONNECT_TIMEOUT'), (ttsPlayer) => {
          const channel = ttsPlayer.stop();
          logger.warn(`Left ${channel.name} from ${ttsPlayer.guild.name} due to inactivity.`);
        }) :
        null;

      this.disconnectSchedulers.set(guild.id, scheduler);
    });
  }

  getTTSPlayer(guild) {
    return this.ttsPlayers.get(guild.id);
  }
}

module.exports = TTSClient;
