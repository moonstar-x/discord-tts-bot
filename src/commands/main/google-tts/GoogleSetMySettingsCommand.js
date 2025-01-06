const { SlashCommand } = require('@greencoast/discord.js-extended');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageFlags } = require('discord.js');
const logger = require('@greencoast/logger');
const GoogleProvider = require('../../../classes/tts/providers/GoogleProvider');
const languages = require('../../../../provider-data/google_languages.json');

class GoogleSetMySettingsCommand extends SlashCommand {
  constructor(client) {
    super(client, {
      name: 'google_set_my',
      description: 'Sets the settings to be used by the say and google_say command for yourself.',
      emoji: ':pencil2:',
      group: 'google-tts',
      guildOnly: true,
      dataBuilder: new SlashCommandBuilder()
        .addSubcommand((input) => {
          return input
            .setName('language')
            .setDescription('Sets the language to be used by the say and google_say command for yourself.')
            .addStringOption((input) => {
              return input
                .setName('value')
                .setDescription('The language to use from now. Use /google_langs to see a list of supported languages.')
                .setRequired(true);
            });
        })
        .addSubcommand((input) => {
          return input
            .setName('speed')
            .setDescription('Sets the speed to be used by the say and google_say command for yourself.')
            .addStringOption((input) => {
              return input
                .setName('value')
                .setDescription('The speed to use from now.')
                .setRequired(true)
                .setChoices(...GoogleProvider.getSupportedSpeedChoices());
            });
        })
    });
  }

  async handleLanguage(interaction, localizer) {
    const language = interaction.options.getString('value');
    const languageInfo = languages[language];

    if (!languageInfo) {
      return interaction.reply({ content: localizer.t('command.google.settings.my.language.invalid'), flags: MessageFlags.Ephemeral }
);
    }

    await this.client.ttsSettings.set(interaction.member, { [GoogleProvider.NAME]: { language } });

    logger.info(`User ${interaction.member.displayName} in ${interaction.guild.name} has changed their google language to ${language}.`);
    return interaction.reply({ content: localizer.t('command.google.settings.my.language.success', { language: languageInfo.name }), flags: MessageFlags.Ephemeral }
);
  }

  async handleSpeed(interaction, localizer) {
    const speed = interaction.options.getString('value');

    await this.client.ttsSettings.set(interaction.member, { [GoogleProvider.NAME]: { speed } });

    logger.info(`User ${interaction.member.displayName} in ${interaction.guild.name} has changed their google speed to ${speed}.`);
    return interaction.reply({ content: localizer.t('command.google.settings.my.speed.success', { speed }), flags: MessageFlags.Ephemeral }
);
  }

  async run(interaction) {
    const localizer = this.client.localizer.getLocalizer(interaction.guild);
    const subCommand = interaction.options.getSubcommand();

    switch (subCommand) {
      case 'language':
        return this.handleLanguage(interaction, localizer);
      case 'speed':
        return this.handleSpeed(interaction, localizer);
      default:
        throw new Error(`Invalid subcommand ${subCommand} supplied to GoogleSetMySettingsCommand.`);
    }
  }
}

module.exports = GoogleSetMySettingsCommand;
