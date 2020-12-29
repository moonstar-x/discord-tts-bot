const { prefix } = require('../common/settings');

module.exports = {
  name: 'speed',
  description: 'Change the TTS spoken speed (must be either **normal** for normal speed or **slow** for slow speed).',
  emoji: ':fast_forward:',
  execute(message, options) {
    const [newSpeed] = options.args;
    const { ttsPlayer } = message.guild;

    if (!newSpeed) {
      message.reply(`to set-up the TTS speed, type: **${prefix}speed <speed>** and replace *<speed>* with either *normal* or *slow*.`);
      return;
    }

    ttsPlayer.setSpeed(newSpeed)
      .then((setSpeed) => {
        message.reply(`speaking speed has been set to: **${setSpeed}**`);
      })
      .catch((error) => {
        message.reply(error);
      });
  }
};
