const SayBaseCommand = require('../../base/SayBaseCommand');

class SayCommand extends SayBaseCommand {
  constructor(client) {
    super(client, {
      name: 'say',
      description: 'Send a TTS message in your voice channel with your own settings or the ones saved for this server.',
      emoji: ':speaking_head:',
      group: 'all-tts'
    });
  }

  getProviderName(currentSettings) {
    return currentSettings.provider;
  }
}

module.exports = SayCommand;
