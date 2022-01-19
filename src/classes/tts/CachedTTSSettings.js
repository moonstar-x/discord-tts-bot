/* eslint-disable max-params */
const { Collection, Guild, GuildMember, Channel } = require('discord.js');

class CachedTTSSettings {
  constructor(client) {
    this.client = client;

    this.guildCache = new Collection();
    this.channelCache = new Collection();
    this.memberCache = new Collection();
  }

  async _get(key, cache, guild) {
    const fromCache = cache.get(key);

    if (fromCache) {
      return fromCache;
    }

    const fromProvider = await this.client.dataProvider.get(guild, key);
    cache.set(key, fromProvider);
    return fromProvider;
  }

  async get(entity) {
    const key = `${entity.id}:tts_settings`;

    if (entity instanceof Channel) {
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

  async _set(key, settings, cache, guild) {
    const stored = await this._get(key, cache, guild);
    const newSettings = { ...stored, ...settings };

    await this.client.dataProvider.set(guild, key, newSettings);
    cache.set(key, newSettings);
  }

  async set(entity, settings) {
    const key = `${entity.id}:tts_settings`;

    if (entity instanceof Channel) {
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

    if (entity instanceof Channel) {
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
