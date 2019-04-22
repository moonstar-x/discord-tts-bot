module.exports = {
  name: 'stop',
  description: 'Stop the TTS bot and leave the channel.',
  emoji: ':x:',
  execute(message, options) {
    if (!message.guild.voiceConnection) {
      message.reply("I'm not in a voice channel.");
      return;
    }

    if (!message.member.voice.channel) {
      message.reply('you need to be in a voice channel to do that.');
      return;
    }

    const { channel } = message.guild.voiceConnection;
    options.tts.emit('stop', message.guild, channel)
    message.channel.send(`Successfully left the voice channel ${channel}.`)
  }
}