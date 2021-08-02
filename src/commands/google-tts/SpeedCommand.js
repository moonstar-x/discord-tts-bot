const { Command } = require('@greencoast/discord.js-extended');

class SpeedCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'speed',
      description: 'Change the TTS spoken speed (must be either **normal** for normal speed or **slow** for slow speed).',
      emoji: ':fast_forward:',
      group: 'google-tts',
      guildOnly: true
    });
  }

  run(message, args) {
    const [newSpeed] = args;
    const { ttsPlayer } = message.guild;

    if (!newSpeed) {
      message.reply(`to set-up the TTS speed, type: **${this.client.prefix}speed <speed>** and replace *<speed>* with either *normal* or *slow*.`);
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
}

module.exports = SpeedCommand;
