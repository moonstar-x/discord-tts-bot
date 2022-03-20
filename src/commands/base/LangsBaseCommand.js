const { SlashCommand } = require('@greencoast/discord.js-extended');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { Collection } = require('discord.js');

class LangsBaseCommand extends SlashCommand {
  constructor(client, options) {
    super(client, {
      name: options.name,
      description: options.description,
      emoji: options.emoji,
      group: options.group,
      guildOnly: true,
      dataBuilder: new SlashCommandBuilder()
    });

    this.embeds = new Collection();
  }

  createEmbed() {
    throw new Error('createEmbed() not implemented!');
  }

  run(interaction) {
    const localizer = this.client.localizer.getLocalizer(interaction.guild);
    let embed;

    if (!this.embeds.has(localizer.locale)) {
      embed = this.createEmbed(localizer);
      this.embeds.set(localizer.locale, embed);
    } else {
      embed = this.embeds.get(localizer.locale);
    }

    return interaction.reply({ embeds: [embed] });
  }
}

module.exports = LangsBaseCommand;
