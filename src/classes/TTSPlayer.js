const googleTTS = require('google-tts-api');

class TTSPlayer {
  constructor(guild) {
    this.guild = guild;

    this.queue = [];
    this.speaking = false;
    this.lang = 'en';
    this.speed = 1;
  }
}

module.exports = TTSPlayer;
