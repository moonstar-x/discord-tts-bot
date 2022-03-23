const { SlashCommand } = require('@greencoast/discord.js-extended');
const { SlashCommandBuilder } = require('@discordjs/builders');
const logger = require('@greencoast/logger');
const AmazonProvider = require('../../../classes/tts/providers/AmazonProvider');
const languageData = require('../../../../provider-data/ttstool_amazon_languages.json');

class AmazonSetDefaultSettingsCommand extends SlashCommand {
  constructor(client) {
    super(client, {
      name: 'amazon_set_default',
      description: 'Sets the settings to be used by the say and amazon_say commands by default.',
      emoji: ':pencil2:',
      group: 'amazon-tts',
      guildOnly: true,
      userPermissions: ['MANAGE_GUILD'],
      dataBuilder: new SlashCommandBuilder()
        .addSubcommand((input) => {
          return input
            .setName('language')
            .setDescription('Sets the language to be used by the say and amazon_say commands by default.')
            .addStringOption((input) => {
              return input
                .setName('value')
                .setDescription('The language to use from now. Use /amazon_langs to see a list of supported languages.')
                .setRequired(true);
            });
        })
        .addSubcommand((input) => {
          return input
            .setName('voice')
            .setDescription('Sets the voice to be used by the say and amazon_say commands by default.')
            .addStringOption((input) => {
              return input
                .setName('value')
                .setDescription('The voice to be used from now. Use /amazon_voices to see a list of supported voices.')
                .setRequired(true);
            });
        })
        .addSubcommand((input) => {
          return input
            .setName('volume')
            .setDescription('Sets the volume to be used used by the say and amazon_say commands by default.')
            .addStringOption((input) => {
              return input
                .setName('value')
                .setDescription('The volume to be used from now.')
                .setRequired(true)
                .setChoices(AmazonProvider.getSupportedVolumeChoices());
            });
        })
        .addSubcommand((input) => {
          return input
            .setName('rate')
            .setDescription('Sets the rate to be used by the say and amazon_say commands by default.')
            .addStringOption((input) => {
              return input
                .setName('value')
                .setDescription('The rate to be used from now.')
                .setRequired(true)
                .setChoices(AmazonProvider.getSupportedRateChoices());
            });
        })
        .addSubcommand((input) => {
          return input
            .setName('pitch')
            .setDescription('Sets the pitch to be used by the say and amazon_say commands by default.')
            .addStringOption((input) => {
              return input
                .setName('value')
                .setDescription('The pitch to be used from now.')
                .setRequired(true)
                .setChoices(AmazonProvider.getSupportedPitchChoices());
            });
        })
    });
  }

  async handleLanguage(interaction, localizer) {
    const language = interaction.options.getString('value');
    const languageInfo = languageData[language];

    if (!languageInfo) {
      return interaction.reply({ content: localizer.t('command.amazon.settings.default.language.unsupported', { language }) });
    }

    const [defaultVoice] = languageInfo.voices;

    await this.client.ttsSettings.set(interaction.guild, {
      [AmazonProvider.NAME]: {
        language,
        voice: defaultVoice.id
      }
    });

    logger.info(`${interaction.guild.name} has changed its default amazon language to ${language} with voice ${defaultVoice.name}.`);
    return interaction.reply({ content: localizer.t('command.amazon.settings.default.language.success', { language, voice: defaultVoice.name }) });
  }

  async handleVoice(interaction, localizer) {
    const voice = interaction.options.getString('value').toLowerCase();

    const settings = await this.client.ttsSettings.getCurrentForGuild(interaction.guild);
    const { language } = settings[AmazonProvider.NAME];
    const languageInfo = languageData[language];

    if (!languageInfo) {
      return interaction.reply({ content: localizer.t('command.amazon.settings.default.voice.invalidated') });
    }

    const voiceInfo = languageInfo.voices.find((v) => v.name.toLowerCase() === voice);

    if (!voiceInfo) {
      return interaction.reply({ content: localizer.t('command.amazon.settings.default.voice.unsupported', { voice }) });
    }

    await this.client.ttsSettings.set(interaction.guild, {
      [AmazonProvider.NAME]: {
        language,
        voice: voiceInfo.id
      }
    });

    logger.info(`${interaction.guild.name} has changed its default amazon voice to ${voiceInfo.name}.`);
    return interaction.reply({ content: localizer.t('command.amazon.settings.default.voice.success', { voice: voiceInfo.name }) });
  }

  async handleVolume(interaction, localizer) {
    const volume = interaction.options.getString('value');

    await this.client.ttsSettings.set(interaction.guild, { [AmazonProvider.NAME]: { volume } });

    logger.info(`${interaction.guild.name} has changed its default amazon volume to ${volume}.`);
    return interaction.reply({ content: localizer.t('command.amazon.settings.default.volume.success', { volume }) });
  }

  async handleRate(interaction, localizer) {
    const rate = interaction.options.getString('value');

    await this.client.ttsSettings.set(interaction.guild, { [AmazonProvider.NAME]: { rate } });

    logger.info(`${interaction.guild.name} has changed its default amazon rate to ${rate}.`);
    return interaction.reply({ content: localizer.t('command.amazon.settings.default.rate.success', { rate }) });
  }

  async handlePitch(interaction, localizer) {
    const pitch = interaction.options.getString('value');

    await this.client.ttsSettings.set(interaction.guild, { [AmazonProvider.NAME]: { pitch } });

    logger.info(`${interaction.guild.name} has changed its default amazon pitch to ${pitch}.`);
    return interaction.reply({ content: localizer.t('command.amazon.settings.default.pitch.success', { pitch }) });
  }

  async run(interaction) {
    const localizer = this.client.localizer.getLocalizer(interaction.guild);
    const subCommand = interaction.options.getSubcommand();

    switch (subCommand) {
      case 'language':
        return this.handleLanguage(interaction, localizer);
      case 'voice':
        return this.handleVoice(interaction, localizer);
      case 'volume':
        return this.handleVolume(interaction, localizer);
      case 'rate':
        return this.handleRate(interaction, localizer);
      case 'pitch':
        return this.handlePitch(interaction, localizer);
      default:
        throw new Error(`Invalid subcommand ${subCommand} supplied to AmazonSetDefaultSettingsCommand.`);
    }
  }
}

module.exports = AmazonSetDefaultSettingsCommand;
