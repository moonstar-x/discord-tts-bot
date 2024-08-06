const { SlashCommand } = require('@greencoast/discord.js-extended');
const { SlashCommandBuilder } = require('@discordjs/builders');
const logger = require('@greencoast/logger');

class SetJoinOnMessage extends SlashCommand {
  constructor(client) {
    super(client, {
      name: 'set_join_on_message',
      description: 'Sets if the bot joins the VC automatically when a message is sent on specific channels.',
      emoji: ':pencil2:',
      group: 'config',
      guildOnly: true,
      userPermissions: ['MANAGE_CHANNELS'],
      dataBuilder: new SlashCommandBuilder()
        .addStringOption((option) =>
          option.setName('state')
            .setDescription('Enable or disable the join on message option.')
            .setRequired(false)
            .addChoice('enabled', 'enabled')
            .addChoice('disabled', 'disabled')
        )
    });
  }

  async run(interaction) {
    const localizer = this.client.localizer.getLocalizer(interaction.guild);
    const state = interaction.options.getString('join_on_message');
    const currentSettings = await this.client.ttsSettings.getCurrentForChannel(interaction.channel);
    let newState;

    if (state) {
      newState = state === 'enabled';
    } else {
      newState = !currentSettings.joinOnMessage;
    }

    await this.client.ttsSettings.set(interaction.channel, { joinOnMessage: newState });

    logger.info(`${interaction.guild.name} has ${newState ? 'enabled' : 'disabled'} the "join on message" option for ${interaction.channel.name}.`);
    return interaction.reply({ content: localizer.t(`channel_commands.join.${newState ? 'enabled' : 'disabled'}`) });
  }
}

module.exports = SetJoinOnMessage;
