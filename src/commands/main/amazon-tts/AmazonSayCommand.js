const SayBaseCommand = require('../../base/SayBaseCommand');
const AmazonProvider = require('../../../classes/tts/providers/AmazonProvider');

class AmazonSayCommand extends SayBaseCommand {
  constructor(client) {
    super(client, {
      name: 'amazon_say',
      description: 'Send an Amazon (TTS Tool) message with multi-language support in your voice channel.',
      emoji: ':speaking_head:',
      group: 'amazon-tts'
    });
  }

  getProviderName() {
    return AmazonProvider.NAME;
  }
}

module.exports = AmazonSayCommand;
