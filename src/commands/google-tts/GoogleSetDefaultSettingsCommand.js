const { SlashCommand } = require('@greencoast/discord.js-extended');
const { SlashCommandBuilder } = require('@discordjs/builders');
const logger = require('@greencoast/logger');
const GoogleProvider = require('../../classes/tts/providers/GoogleProvider');
const languages = require('../../../provider-data/google_languages.json');

class GoogleSetDefaultSettingsCommand extends SlashCommand {
  constructor(client) {
    super(client, {
      name: 'google_set_default',
      description: 'Sets the settings to be used by the say and google_say command by default.',
      emoji: ':pencil2:',
      group: 'google-tts',
      guildOnly: true,
      dataBuilder: new SlashCommandBuilder()
        .addSubcommand((input) => {
          return input
            .setName('language')
            .setDescription('Sets the language to be used by the say and google_say command by default.')
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
            .setDescription('Sets the speed to be used by the say and google_say command by default.')
            .addStringOption((input) => {
              return input
                .setName('value')
                .setDescription('The speed to use from now.')
                .setRequired(true)
                .setChoices(GoogleProvider.getSupportedSpeedChoices());
            });
        })
    });
  }

  async handleLanguage(interaction) {
    const language = interaction.options.getString('value');
    const languageName = languages[language].name;

    await this.client.ttsSettings.set(interaction.guild, { extras: { language } });

    logger.info(`${interaction.guild.name} has changed its default google language to ${language}.`);
    return interaction.reply({ content: `You have successfully changed the default language to **${languageName}**.` });
  }

  async handleSpeed(interaction) {
    const speed = interaction.options.getString('value');

    await this.client.ttsSettings.set(interaction.guild, { extras: { speed } });

    logger.info(`${interaction.guild.name} has changed its default google google speed to ${speed}.`);
    return interaction.reply({ content: `You have successfully changed the default speed to **${speed}**.` });
  }

  async run(interaction) {
    const subCommand = interaction.options.getSubcommand();

    switch (subCommand) {
      case 'language':
        return this.handleLanguage(interaction);
      case 'speed':
        return this.handleSpeed(interaction);
      default:
        throw new Error(`Invalid subcommand ${subCommand} supplied to GoogleSetDefaultSettingsCommand.`);
    }
  }
}

module.exports = GoogleSetDefaultSettingsCommand;
