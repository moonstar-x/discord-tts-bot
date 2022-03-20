const { InvalidProviderError } = require('../../../errors');
const GoogleProvider = require('./GoogleProvider');
const AeiouProvider = require('./AeiouProvider');
const AmazonProvider = require('./AmazonProvider');

class ProviderManager {
  constructor(client) {
    this.client = client;
    this._providers = new Map();

    this._providers.set(GoogleProvider.NAME, new GoogleProvider(client));
    this._providers.set(AeiouProvider.NAME, new AeiouProvider(client));
    this._providers.set(AmazonProvider.NAME, new AmazonProvider(client));
  }

  getProvider(providerName) {
    if (!this._providers.has(providerName)) {
      throw new InvalidProviderError(`${providerName} is not a valid provider!`);
    }

    return this._providers.get(providerName);
  }
}

module.exports = ProviderManager;
