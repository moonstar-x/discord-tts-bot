const TTSPlayer = require('../TTSPlayer');

const GuildExtension = (Guild) => {
  return class TTSGuild extends Guild {
    constructor(client, data) {
      super(client, data);
      this.ttsPlayer = new TTSPlayer(this);
    }
  };
};

module.exports = GuildExtension;
