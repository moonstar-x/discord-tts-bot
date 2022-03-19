const SayBaseCommand = require('../../base/SayBaseCommand');
const GoogleProvider = require('../../../classes/tts/providers/GoogleProvider');

class GoogleSayCommand extends SayBaseCommand {
  constructor(client) {
    super(client, {
      name: 'google_say',
      description: 'Send a Google Translate TTS message with multi-language support in your voice channel.',
      emoji: ':speaking_head:',
      group: 'google-tts',
      providerName: GoogleProvider.NAME
    });
  }
}

module.exports = GoogleSayCommand;
