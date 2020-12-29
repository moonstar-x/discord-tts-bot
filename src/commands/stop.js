module.exports = {
  name: 'stop',
  description: 'Stop the TTS bot and leave the channel.',
  emoji: ':x:',
  execute(message) {
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
};
