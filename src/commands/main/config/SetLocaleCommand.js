const { SlashCommand } = require('@greencoast/discord.js-extended');
const { PermissionsBitField, SlashCommandBuilder } = require('discord.js');
const logger = require('@greencoast/logger');
const { supported } = require('../../../locales');
const { oldChoiceListToNew } = require('../../../utils/upgrade-utils');

class SetLocaleCommand extends SlashCommand {
  constructor(client) {
    super(client, {
      name: 'set_locale',
      description: 'Sets locale to be used by the bot in this guild.',
      emoji: ':earth_americas:',
      group: 'config',
      guildOnly: true,
      userPermissions: [PermissionsBitField.Flags.ManageGuild],
      dataBuilder: new SlashCommandBuilder()
        .addStringOption((input) => {
          return input
            .setName('locale')
            .setDescription('The locale to be used by the bot in this guild.')
            .setRequired(true)
            .addChoices(...oldChoiceListToNew(Object.keys(supported).map((key) => [supported[key], key])));
        })
    });
  }

  async run(interaction) {
    const localizer = this.client.localizer.getLocalizer(interaction.guild);
    const locale = interaction.options.getString('locale');
    const localeFriendlyName = supported[locale];

    await localizer.updateLocale(locale);

    logger.info(`${interaction.guild.name} has changed its locale to ${locale}.`);
    return interaction.reply({ content: localizer.t('command.locale.success', { locale: localeFriendlyName }) });
  }
}

module.exports = SetLocaleCommand;
