/* eslint-disable max-params */
const { Collection, Guild, GuildMember, BaseChannel } = require('discord.js');
const ProviderManager = require('./providers/ProviderManager');
const merge = require('deepmerge');

class CachedTTSSettings {
  constructor(client) {
    this.client = client;

    this.guildCache = new Collection();
    this.channelCache = new Collection();
    this.memberCache = new Collection();

    this.initialize();
  }

  initialize() {
    this.client.on('channelDelete', async (channel) => {
      if (!channel.guild) {
        return;
      }

      try {
        await this.delete(channel);
      } catch (error) {
        this.client.emit('warn', `Could not delete settings for channel ${channel.id}. Most likely no settings were saved for this channel in the first place. If this is the case then it is safe to ignore this warning.`);
        this.client.emit('error', error);
      }
    });
  }

  async _get(key, cache, guild) {
    const fromCache = cache.get(key);

    if (fromCache) {
      return fromCache;
    }

    const fromProvider = await this.client.dataProvider.get(guild, key, {});
    cache.set(key, fromProvider);
    return fromProvider;
  }

  async get(entity) {
    const key = `${entity.id}:tts_settings`;

    if (entity instanceof BaseChannel) {
      return this._get(key, this.channelCache, entity.guild);
    }

    if (entity instanceof GuildMember) {
      return this._get(key, this.memberCache, entity.guild);
    }

    if (entity instanceof Guild) {
      return this._get(key, this.guildCache, entity);
    }

    throw new Error('Invalid entity instance passed to CachedTTSSettings.get');
  }

  async getCurrent(interaction) {
    const memberSettings = await this.get(interaction.member);
    const guildSettings = await this.get(interaction.guild);

    return merge.all([ProviderManager.DEFAULT_SETTINGS, guildSettings, memberSettings]);
  }

  async getCurrentForGuild(guild) {
    const guildSettings = await this.get(guild);

    return merge(ProviderManager.DEFAULT_SETTINGS, guildSettings);
  }

  async getCurrentForChannel(channel) {
    const channelSettings = await this.get(channel);

    return merge(ProviderManager.DEFAULT_SETTINGS, channelSettings);
  }

  async _set(key, settings, cache, guild) {
    const stored = await this._get(key, cache, guild);
    const newSettings = merge(stored, settings);

    await this.client.dataProvider.set(guild, key, newSettings);
    cache.set(key, newSettings);
  }

  async set(entity, settings) {
    const key = `${entity.id}:tts_settings`;

    if (entity instanceof BaseChannel) {
      return this._set(key, settings, this.channelCache, entity.guild);
    }

    if (entity instanceof GuildMember) {
      return this._set(key, settings, this.memberCache, entity.guild);
    }

    if (entity instanceof Guild) {
      return this._set(key, settings, this.guildCache, entity);
    }

    throw new Error('Invalid entity instance passed to CachedTTSSettings.get');
  }

  async _delete(key, cache, guild) {
    await this.client.dataProvider.delete(guild, key);
    cache.delete(key);
  }

  async delete(entity) {
    const key = `${entity.id}:tts_settings`;

    if (entity instanceof BaseChannel) {
      return this._delete(key, this.channelCache, entity.guild);
    }

    if (entity instanceof GuildMember) {
      return this._delete(key, this.memberCache, entity.guild);
    }

    if (entity instanceof Guild) {
      return this._delete(key, this.guildCache, entity);
    }

    throw new Error('Invalid entity instance passed to CachedTTSSettings.get');
  }
}

module.exports = CachedTTSSettings;
