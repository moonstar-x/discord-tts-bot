class GoogleProviderError extends Error {
  constructor(message, reason) {
    super(message);

    this.name = 'GoogleProviderError';
    this.reason = reason;
  }
}

GoogleProviderError.REASON = {
  invalid: 'invalid',
  same: 'same'
};

module.exports = GoogleProviderError;
