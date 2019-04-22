module.exports = {
  name: 'speed',
  description: 'Change the TTS spoken speed (must be between 1% and 100%).',
  emoji: ':fast_forward:',
  execute(message, options) {
    if (!options.args[0]) {
      message.reply(`to set-up the TTS speed, type: **${options.prefix}speed <speed>** and replace *<speed>* with a number between 1 and 100.`);
      return;
    }

    const speed = parseInt(options.args[0]);

    if (isNaN(speed) || speed < 1 || speed > 100) {
      message.reply('invalid speed, it must be between 1 and 100.');
      return;
    }

    options.tts.emit('speed', message.guild, speed);
    message.reply(`speaking speed has been set to: **${speed}%**`);
  }
}