const SayBaseCommand = require('../../base/SayBaseCommand');
const AmazonProvider = require('../../../classes/tts/providers/AmazonProvider');

class AmazonSayCommand extends SayBaseCommand {
  constructor(client) {
    super(client, {
      name: 'amazon_say',
      description: 'Send an TTS Tool Amazon TTS message with multi-language support in your voice channel.',
      emoji: ':speaking_head:',
      group: 'amazon-tts'
    });
  }

  getProviderName() {
    return AmazonProvider.NAME;
  }
}

module.exports = AmazonSayCommand;
