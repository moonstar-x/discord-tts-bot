const SayBaseCommand = require('../../base/SayBaseCommand');
const MicrosoftProvider = require('../../../classes/tts/providers/MicrosoftProvider');

class MicrosoftSayCommand extends SayBaseCommand {
  constructor(client) {
    super(client, {
      name: 'ms_say',
      description: 'Send a Microsoft (TTS Tool) message with multi-language support in your voice channel.',
      emoji: ':speaking_head:',
      group: 'ms-tts'
    });
  }

  getProviderName() {
    return MicrosoftProvider.NAME;
  }
}

module.exports = MicrosoftSayCommand;
