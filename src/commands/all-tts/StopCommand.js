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
    const localizer = this.client.localizer.getLocalizer(interaction.guild);
    const ttsPlayer = this.client.getTTSPlayer(interaction.guild);
    const connection = ttsPlayer.voice.getConnection();

    const { me: { voice: myVoice }, name: guildName } = interaction.guild;
    const myChannel = myVoice?.channel;
    const { channel: memberChannel } = interaction.member.voice;

    if (!connection) {
      return interaction.reply({ content: localizer.t('command.stop.no_connection'), ephemeral: true });
    }

    if (!memberChannel || myChannel !== memberChannel) {
      return interaction.reply({ content: localizer.t('command.stop.different_channel'), ephemeral: true });
    }

    ttsPlayer.stop();
    logger.info(`Successfully left the voice channel ${myChannel.name} from guild ${guildName}.`);
    return interaction.reply({ content: localizer.t('command.stop.success', { channel: myChannel.toString() }) });
  }
}

module.exports = StopCommand;
