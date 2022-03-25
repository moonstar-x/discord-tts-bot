const { SlashCommand } = require('@greencoast/discord.js-extended');
const { SlashCommandBuilder } = require('@discordjs/builders');
const logger = require('@greencoast/logger');
const AmazonProvider = require('../../../../classes/tts/providers/AmazonProvider');
const languageData = require('../../../../../provider-data/ttstool_amazon_languages.json');

class AmazonSetChannelSettingsCommand extends SlashCommand {
  constructor(client) {
    super(client, {
      name: 'amazon_set_channel',
      description: 'Sets the settings to be used with message-only based TTS from Amazon.',
      emoji: ':pencil2:',
      group: 'amazon-tts',
      guildOnly: true,
      userPermissions: ['MANAGE_CHANNELS'],
      dataBuilder: new SlashCommandBuilder()
        .addSubcommand((input) => {
          return input
            .setName('language')
            .setDescription('Sets the language to be used by the message-only based TTS.')
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
            .setDescription('Sets the voice to be used by the message-only based TTS.')
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
            .setDescription('Sets the volume to be used used by the message-only based TTS.')
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
            .setDescription('Sets the rate to be used by the message-only based TTS.')
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
            .setDescription('Sets the pitch to be used by the message-only based TTS.')
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
      return interaction.reply({ content: localizer.t('channel_commands.amazon.settings.language.unsupported', { language }) });
    }

    const [defaultVoice] = languageInfo.voices;

    await this.client.ttsSettings.set(interaction.channel, {
      [AmazonProvider.NAME]: {
        language,
        voice: defaultVoice.id
      }
    });

    logger.info(`${interaction.guild.name} has changed the amazon language for the channel ${interaction.channel.name} to ${language} with voice ${defaultVoice.name}.`);
    return interaction.reply({ content: localizer.t('channel_commands.amazon.settings.language.success', { language, voice: defaultVoice.name }) });
  }

  async handleVoice(interaction, localizer) {
    const voice = interaction.options.getString('value').toLowerCase();

    const settings = await this.client.ttsSettings.getCurrentForChannel(interaction.channel);
    const { language } = settings[AmazonProvider.NAME];
    const languageInfo = languageData[language];

    const voiceInfo = languageInfo.voices.find((v) => v.name.toLowerCase() === voice);

    if (!voiceInfo) {
      return interaction.reply({ content: localizer.t('channel_commands.amazon.settings.voice.unsupported', { voice }) });
    }

    await this.client.ttsSettings.set(interaction.channel, {
      [AmazonProvider.NAME]: {
        language,
        voice: voiceInfo.id
      }
    });

    logger.info(`${interaction.channel.name} has changed the amazon voice for the channel ${interaction.channel.name} to ${voiceInfo.name}.`);
    return interaction.reply({ content: localizer.t('channel_commands.amazon.settings.voice.success', { voice: voiceInfo.name }) });
  }

  async handleVolume(interaction, localizer) {
    const volume = interaction.options.getString('value');

    await this.client.ttsSettings.set(interaction.channel, { [AmazonProvider.NAME]: { volume } });

    logger.info(`${interaction.guild.name} has changed the amazon volume for the channel ${interaction.channel.name} to ${volume}.`);
    return interaction.reply({ content: localizer.t('channel_commands.amazon.settings.volume.success', { volume }) });
  }

  async handleRate(interaction, localizer) {
    const rate = interaction.options.getString('value');

    await this.client.ttsSettings.set(interaction.channel, { [AmazonProvider.NAME]: { rate } });

    logger.info(`${interaction.guild.name} has changed the amazon rate for the channel ${interaction.channel.name} to ${rate}.`);
    return interaction.reply({ content: localizer.t('channel_commands.amazon.settings.rate.success', { rate }) });
  }

  async handlePitch(interaction, localizer) {
    const pitch = interaction.options.getString('value');

    await this.client.ttsSettings.set(interaction.channel, { [AmazonProvider.NAME]: { pitch } });

    logger.info(`${interaction.guild.name} has changed the amazon pitch for the channel ${interaction.channel.name} to ${pitch}.`);
    return interaction.reply({ content: localizer.t('channel_commands.amazon.settings.pitch.success', { pitch }) });
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
        throw new Error(`Invalid subcommand ${subCommand} supplied to AmazonSetChannelSettingsCommand.`);
    }
  }
}

module.exports = AmazonSetChannelSettingsCommand;
