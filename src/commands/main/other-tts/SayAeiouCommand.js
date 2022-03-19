const SayBaseCommand = require('../../base/SayBaseCommand');
const AeiouProvider = require('../../../classes/tts/providers/AeiouProvider');

class SayAeiouCommand extends SayBaseCommand {
  constructor(client) {
    super(client, {
      name: 'aeiou_say',
      description: 'Send an aeiou (sounds like Stephen Hawking) TTS message in your voice channel.',
      emoji: ':robot:',
      group: 'other-tts',
      providerName: AeiouProvider.NAME
    });
  }
}

module.exports = SayAeiouCommand;
