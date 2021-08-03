class InvalidProviderError extends Error {
  constructor(message) {
    super(message);

    this.name = 'InvalidProviderError';
  }
}

module.exports = InvalidProviderError;
