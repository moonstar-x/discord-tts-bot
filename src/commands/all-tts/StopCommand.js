const { RegularCommand } = require('@greencoast/discord.js-extended');
const logger = require('@greencoast/logger');

class StopCommand extends RegularCommand {
  constructor(client) {
    super(client, {
      name: 'stop',
      aliases: ['leave'],
      description: 'Stop the TTS bot and leave the channel.',
      emoji: ':x:',
      group: 'all-tts',
      guildOnly: true
    });
  }

  run(message) {
    const { ttsPlayer, voice, name: guildName } = message.guild;
    const connection = voice ? voice.connection : null;
    const channel = voice ? voice.channel : null;
    const { channel: memberChannel } = message.member.voice;

    if (!connection) {
      return message.reply("I'm not in a voice channel.");
    }

    if (!memberChannel || channel !== memberChannel) {
      return message.reply('you need to be in my voice channel to do that.');
    }

    ttsPlayer.stop();
    logger.info(`Successfully left the voice channel ${channel.name} from guild ${guildName}`);
    return message.channel.send(`Successfully left the voice channel ${channel}.`);
  }
}

module.exports = StopCommand;
