/* eslint-disable max-statements */
const { SlashCommand } = require('@greencoast/discord.js-extended');
const { SlashCommandBuilder } = require('@discordjs/builders');
const logger = require('@greencoast/logger');
const { getCantConnectToChannelReason } = require('../../utils/channel');
const { cleanMessage } = require('../../utils/mentions');

class SayBaseCommand extends SlashCommand {
  constructor(client, options) {
    super(client, {
      name: options.name,
      description: options.description,
      emoji: options.emoji,
      group: options.group,
      guildOnly: true,
      dataBuilder: new SlashCommandBuilder()
        .addStringOption((input) => {
          return input
            .setName('message')
            .setDescription('The message to say in your voice channel.')
            .setRequired(true);
        })
    });
  }

  getProviderName() {
    throw new Error('getProviderName() not implemented!');
  }

  async run(interaction) {
    await interaction.deferReply({ ephemeral: true });

    const localizer = this.client.localizer.getLocalizer(interaction.guild);
    const ttsPlayer = this.client.getTTSPlayer(interaction.guild);
    const connection = ttsPlayer.voice.getConnection();

    const currentSettings = await this.client.ttsSettings.getCurrent(interaction);
    const providerName = this.getProviderName(currentSettings);
    const extras = currentSettings[providerName];

    const { me: { voice: myVoice }, name: guildName, members, channels, roles } = interaction.guild;
    const { channel: memberChannel } = interaction.member.voice;
    const myChannel = myVoice?.channel;

    const messageIntro = this.client.config.get('ENABLE_WHO_SAID') ? `${interaction.member.displayName} said ` : '';
    const userMessage = interaction.options.getString('message');

    const message = cleanMessage(`${messageIntro}${userMessage}`, {
      members: members.cache,
      channels: channels.cache,
      roles: roles.cache
    });

    if (!memberChannel) {
      await interaction.editReply(localizer.t('command.say.no_channel'));
      return;
    }

    if (connection) {
      if (myChannel !== memberChannel) {
        await interaction.editReply(localizer.t('command.say.different_channel'));
        return;
      }

      await interaction.editReply(localizer.t('command.say.success', { request: userMessage }));
      return ttsPlayer.say(message, providerName, extras);
    }

    const cantConnectReason = getCantConnectToChannelReason(memberChannel);
    if (cantConnectReason) {
      await interaction.editReply(localizer.t(cantConnectReason));
      return;
    }

    await ttsPlayer.voice.connect(memberChannel);
    logger.info(`Joined ${memberChannel.name} in ${guildName}.`);
    await interaction.editReply(localizer.t('command.say.joined', { channel: memberChannel.toString(), request: userMessage }));
    return ttsPlayer.say(message, providerName, extras);
  }
}

module.exports = SayBaseCommand;
