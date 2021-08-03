const logger = require('@greencoast/logger');
const TTSPlayer = require('../tts/TTSPlayer');
const Scheduler = require('../Scheduler');

const GuildExtension = (Guild) => {
  return class TTSGuild extends Guild {
    constructor(client, data) {
      super(client, data);

      this.ttsPlayer = new TTSPlayer(this);
      this.disconnectScheduler = client.config.get('DISCONNECT_TIMEOUT') !== null ?
        new Scheduler(client, client.config.get('DISCONNECT_TIMEOUT'), (channel) => {
          channel.leave();
          logger.warn(`Left ${channel.name} from ${this.name} due to inactivity.`);
        }) :
        null;
    }
  };
};

module.exports = GuildExtension;
