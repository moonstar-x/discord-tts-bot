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
    const { channel: memberChannel } = message.member.voice;

    if (!connection) {
      return message.reply("I'm not in a voice channel.");
    }

    if (!memberChannel || channel !== memberChannel) {
      message.reply('you need to be in my voice channel to do that.');
      return;
    }

    ttsPlayer.stop();
    return message.channel.send(`Successfully left the voice channel ${voice.channel}.`);
  }
}

module.exports = StopCommand;
