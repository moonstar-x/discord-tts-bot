const { SlashCommand } = require('@greencoast/discord.js-extended');
const { SlashCommandBuilder } = require('@discordjs/builders');
const logger = require('@greencoast/logger');

class StopCommand extends SlashCommand {
  constructor(client) {
    super(client, {
      name: 'stop',
      aliases: ['leave'],
      description: 'Stop the TTS bot and leave the channel.',
      emoji: ':x:',
      group: 'all-tts',
      guildOnly: true,
      dataBuilder: new SlashCommandBuilder()
    });
  }

  run(interaction) {
    const ttsPlayer = this.client.getTTSPlayer(interaction.guild);
    const connection = ttsPlayer.voice.getConnection();

    const { me: { voice: myVoice }, name: guildName } = interaction.guild;
    const myChannel = myVoice?.channel;
    const { channel: memberChannel } = interaction.member.voice;

    if (!connection) {
      return interaction.reply({ content: "I'm not in a voice channel.", ephemeral: true });
    }

    if (!memberChannel || myChannel !== memberChannel) {
      return interaction.reply({ content: 'You need to be in my voice channel to stop me.', ephemeral: true });
    }

    ttsPlayer.stop();
    logger.info(`Successfully left the voice channel ${myChannel.name} from guild ${guildName}.`);
    return interaction.reply({ content: `Successfully left the voice channel ${myChannel}.` });
  }
}

module.exports = StopCommand;
