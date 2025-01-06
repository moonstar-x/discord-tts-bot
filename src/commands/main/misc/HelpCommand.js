const { SlashCommand } = require('@greencoast/discord.js-extended');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require('discord.js');
const { MESSAGE_EMBED, WEBSITE_URL } = require('../../../common/constants');

class HelpCommand extends SlashCommand {
  constructor(client) {
    super(client, {
      name: 'help',
      description: 'Display a help message with all the available commands.',
      emoji: ':question:',
      group: 'misc',
      guildOnly: true,
      dataBuilder: new SlashCommandBuilder()
    });
  }

  prepareFields() {
    return this.client.registry.groups.map((group) => {
      const listOfCommands = group.commands.reduce((text, command) => {
        return text.concat(`${command.emoji} **/${command.name}** - ${command.description}\n`);
      }, '');

      return { title: group.name, text: listOfCommands };
    });
  }

  run(interaction) {
    const localizer = this.client.localizer.getLocalizer(interaction.guild);
    const fields = this.prepareFields();
    const embed = new EmbedBuilder()
      .setTitle(localizer.t('command.help.embed.title'))
      .setColor(MESSAGE_EMBED.color)
      .setThumbnail(MESSAGE_EMBED.helpThumbnail);

    const embedFields = fields.map((field) => ({
      name: field.title,
      value: field.text
    }));

    embed.addFields(embedFields);

    const row = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setStyle('Link')
          .setEmoji('🐛')
          .setLabel(localizer.t('command.help.links.bug'))
          .setURL(MESSAGE_EMBED.helpURL),
        new ButtonBuilder()
          .setStyle('Link')
          .setEmoji('🌎')
          .setLabel(localizer.t('command.help.links.website'))
          .setURL(WEBSITE_URL)
      );

    return interaction.reply({ embeds: [embed], components: [row] });
  }
}

module.exports = HelpCommand;
