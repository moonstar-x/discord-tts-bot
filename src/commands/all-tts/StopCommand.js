const { Command } = require('@greencoast/discord.js-extended');

class StopCommand extends Command {
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
    const { ttsPlayer, voice } = message.guild;
    const connection = voice ? voice.connection : null;
    const channel = voice ? voice.channel : null;

    if (!connection) {
      message.reply("I'm not in a voice channel.");
      return;
    }

    if (!channel) {
      message.reply('you need to be in a voice channel to do that.');
      return;
    }

    ttsPlayer.stop()
      .then(() => {
        message.channel.send(`Successfully left the voice channel ${channel}.`);
      })
      .catch((error) => {
        throw error;
      });
  }
}

module.exports = StopCommand;
