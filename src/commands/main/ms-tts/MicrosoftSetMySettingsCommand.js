const { SlashCommand } = require('@greencoast/discord.js-extended');
const { SlashCommandBuilder } = require('@discordjs/builders');
const logger = require('@greencoast/logger');
const MicrosoftProvider = require('../../../classes/tts/providers/MicrosoftProvider');
const languageData = require('../../../../provider-data/ttstool_microsoft_languages.json');

class MicrosoftSetMySettingsCommand extends SlashCommand {
  constructor(client) {
    super(client, {
      name: 'ms_set_my',
      description: 'Sets the settings to be used by the say and ms_say commands for yourself.',
      emoji: ':pencil2:',
      group: 'ms-tts',
      guildOnly: true,
      dataBuilder: new SlashCommandBuilder()
        .addSubcommand((input) => {
          return input
            .setName('language')
            .setDescription('Sets the language to be used by the say and ms_say commands for yourself.')
            .addStringOption((input) => {
              return input
                .setName('value')
                .setDescription('The language to use from now. Use /ms_langs to see a list of supported languages.')
                .setRequired(true);
            });
        })
        .addSubcommand((input) => {
          return input
            .setName('voice')
            .setDescription('Sets the voice to be used by the say and ms_say commands for yourself.')
            .addStringOption((input) => {
              return input
                .setName('value')
                .setDescription('The voice to be used from now. Use /ms_voices to see a list of supported voices.')
                .setRequired(true);
            });
        })
        .addSubcommand((input) => {
          return input
            .setName('volume')
            .setDescription('Sets the volume to be used used by the say and ms_say commands for yourself.')
            .addStringOption((input) => {
              return input
                .setName('value')
                .setDescription('The volume to be used from now.')
                .setRequired(true)
                .setChoices(MicrosoftProvider.getSupportedVolumeChoices());
            });
        })
        .addSubcommand((input) => {
          return input
            .setName('rate')
            .setDescription('Sets the rate to be used by the say and ms_say commands for yourself.')
            .addStringOption((input) => {
              return input
                .setName('value')
                .setDescription('The rate to be used from now.')
                .setRequired(true)
                .setChoices(MicrosoftProvider.getSupportedRateChoices());
            });
        })
        .addSubcommand((input) => {
          return input
            .setName('pitch')
            .setDescription('Sets the pitch to be used by the say and ms_say commands for yourself.')
            .addStringOption((input) => {
              return input
                .setName('value')
                .setDescription('The pitch to be used from now.')
                .setRequired(true)
                .setChoices(MicrosoftProvider.getSupportedPitchChoices());
            });
        })
    });
  }

  async handleLanguage(interaction, localizer) {
    const language = interaction.options.getString('value');
    const languageInfo = languageData[language];

    if (!languageInfo) {
      return interaction.reply({ content: localizer.t('command.microsoft.settings.my.language.unsupported', { language }), ephemeral: true });
    }

    const [defaultVoice] = languageInfo.voices;

    await this.client.ttsSettings.set(interaction.member, {
      [MicrosoftProvider.NAME]: {
        language,
        voice: defaultVoice.id
      }
    });

    logger.info(`User ${interaction.member.displayName} in ${interaction.guild.name} has changed their microsoft language to ${language} with voice ${defaultVoice.name}.`);
    return interaction.reply({ content: localizer.t('command.microsoft.settings.my.language.success', { language, voice: defaultVoice.name }), ephemeral: true });
  }

  async handleVoice(interaction, localizer) {
    const voice = interaction.options.getString('value').toLowerCase();

    const settings = await this.client.ttsSettings.getCurrent(interaction);
    const { language } = settings[MicrosoftProvider.NAME];
    const languageInfo = languageData[language];

    if (!languageInfo) {
      return interaction.reply({ content: localizer.t('command.microsoft.settings.my.voice.invalidated'), ephemeral: true });
    }

    const voiceInfo = languageInfo.voices.find((v) => v.name.toLowerCase() === voice);

    if (!voiceInfo) {
      return interaction.reply({ content: localizer.t('command.microsoft.settings.my.voice.unsupported', { voice }), ephemeral: true });
    }

    await this.client.ttsSettings.set(interaction.member, {
      [MicrosoftProvider.NAME]: {
        language,
        voice: voiceInfo.id
      }
    });

    logger.info(`User ${interaction.member.displayName} in ${interaction.guild.name} has changed their microsoft voice to ${voiceInfo.name}.`);
    return interaction.reply({ content: localizer.t('command.microsoft.settings.my.voice.success', { voice: voiceInfo.name }), ephemeral: true });
  }

  async handleVolume(interaction, localizer) {
    const volume = interaction.options.getString('value');

    await this.client.ttsSettings.set(interaction.member, { [MicrosoftProvider.NAME]: { volume } });

    logger.info(`User ${interaction.member.displayName} in ${interaction.guild.name} has changed their microsoft volume to ${volume}.`);
    return interaction.reply({ content: localizer.t('command.microsoft.settings.my.volume.success', { volume }), ephemeral: true });
  }

  async handleRate(interaction, localizer) {
    const rate = interaction.options.getString('value');

    await this.client.ttsSettings.set(interaction.member, { [MicrosoftProvider.NAME]: { rate } });

    logger.info(`User ${interaction.member.displayName} in ${interaction.guild.name} has changed their microsoft rate to ${rate}.`);
    return interaction.reply({ content: localizer.t('command.microsoft.settings.my.rate.success', { rate }), ephemeral: true });
  }

  async handlePitch(interaction, localizer) {
    const pitch = interaction.options.getString('value');

    await this.client.ttsSettings.set(interaction.member, { [MicrosoftProvider.NAME]: { pitch } });

    logger.info(`User ${interaction.member.displayName} in ${interaction.guild.name} has changed their microsoft pitch to ${pitch}.`);
    return interaction.reply({ content: localizer.t('command.microsoft.settings.my.pitch.success', { pitch }), ephemeral: true });
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
        throw new Error(`Invalid subcommand ${subCommand} supplied to MicrosoftSetMySettingsCommand.`);
    }
  }
}

module.exports = MicrosoftSetMySettingsCommand;
