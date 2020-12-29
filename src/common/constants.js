const MAX_EMBED_FIELD_SIZE = 1024;

const TTS_MAX_CHARS = 200;

const MESSAGE_EMBED = {
  color: '#20B2AA',
  langThumbnail: 'https://i.imgur.com/QbNXO4q.jpg',
  langURL: 'https://github.com/moonstar-x/discord-tts-bot#language-support',
  helpThumbnail: 'https://i.imgur.com/Tqnk48j.png',
  helpURL: 'https://github.com/moonstar-x/discord-tts-bot/issues'
};

const ACTIVITY_TYPE = {
  playing: 'PLAYING',
  streaming: 'STREAMING',
  listening: 'LISTENING',
  watching: 'WATCHING'
};

const TTS_ENGINES = {
  google: 'google',
  aeiou: 'aeiou'
};

const AEIOU_API_URL = 'http://tts.cyzon.us';

module.exports = {
  MAX_EMBED_FIELD_SIZE,
  TTS_MAX_CHARS,
  MESSAGE_EMBED,
  ACTIVITY_TYPE,
  TTS_ENGINES,
  AEIOU_API_URL
};
