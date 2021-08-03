const { Command } = require('@greencoast/discord.js-extended');
const { GoogleProviderError } = require('../../errors');

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
    const { googleProvider } = message.guild.ttsPlayer;

    if (!newSpeed) {
      message.reply(`to set-up the TTS speed, type: **${this.client.prefix}speed <speed>** and replace *<speed>* with either *normal* or *slow*.`);
      return;
    }

    try {
      const setSpeed = googleProvider.setSpeed(newSpeed);
      return message.reply(`speaking speed has been set to: **${setSpeed}**`);
    } catch (error) {
      if (error instanceof GoogleProviderError) {
        if (error.reason === GoogleProviderError.REASON.invalid) {
          return message.reply('invalid speed, it must be either *normal* or *slow*.');
        }

        throw error;
      }

      throw error;
    }
  }
}

module.exports = SpeedCommand;
