const GuildExtension = (Guild) => (
  class TTSGuild extends Guild {
    constructor(client, data) {
      super(client, data);
      this.ttsPlayer = null;
    }
  }
);

module.exports = GuildExtension;
