const { InvalidProviderError } = require('../../../errors');
const GoogleProvider = require('./GoogleProvider');
const AeiouProvider = require('./AeiouProvider');
const AmazonProvider = require('./AmazonProvider');
const MicrosoftProvider = require('./MicrosoftProvider');

class ProviderManager {
  constructor(client) {
    this.client = client;
    this._providers = new Map();

    for (const Provider of ProviderManager.SUPPORTED_PROVIDERS) {
      this._providers.set(Provider.NAME, new Provider(client));
    }
  }

  getProvider(providerName) {
    if (!this._providers.has(providerName)) {
      throw new InvalidProviderError(`${providerName} is not a valid provider!`);
    }

    return this._providers.get(providerName);
  }
}

ProviderManager.SUPPORTED_PROVIDERS = [GoogleProvider, AeiouProvider, AmazonProvider, MicrosoftProvider];
ProviderManager.DEFAULT_PROVIDER = GoogleProvider;

ProviderManager.PROVIDER_FRIENDLY_NAMES = ProviderManager.SUPPORTED_PROVIDERS.reduce((obj, Provider) => {
  return {
    ...obj,
    [Provider.NAME]: Provider.FRIENDLY_NAME
  };
}, {});
ProviderManager.PROVIDER_DEFAULTS = ProviderManager.SUPPORTED_PROVIDERS.reduce((obj, Provider) => {
  return {
    ...obj,
    [Provider.NAME]: Provider.EXTRA_DEFAULTS
  };
}, {});
ProviderManager.DEFAULT_SETTINGS = {
  provider: ProviderManager.DEFAULT_PROVIDER.NAME,
  ...ProviderManager.PROVIDER_DEFAULTS
};

module.exports = ProviderManager;
