const { RegularCommand } = require('@greencoast/discord.js-extended');
const { MessageEmbed } = require('discord.js');
const { MESSAGE_EMBED } = require('../../common/constants');

class HelpCommand extends RegularCommand {
  constructor(client) {
    super(client, {
      name: 'help',
      aliases: ['h'],
      description: 'Display a help message with all the available commands.',
      emoji: ':question:',
      group: 'misc',
      guildOnly: true
    });
  }

  prepareFields() {
    return this.client.registry.groups.map((group) => {
      const listOfCommands = group.commands.reduce((text, command) => {
        return text.concat(`${command.emoji} **${this.client.prefix}${command.name}** - ${command.description}\n`);
      }, '');

      return { title: group.name, text: listOfCommands };
    });
  }

  run(message) {
    const fields = this.prepareFields();
    const embed = new MessageEmbed()
      .setTitle('Text-to-Speech Help Message')
      .setColor(MESSAGE_EMBED.color)
      .setThumbnail(MESSAGE_EMBED.helpThumbnail);

    for (const key in fields) {
      const field = fields[key];
      embed.addField(field.title, field.text);
    }

    embed.addField('Spotted a bug?', `This bot is far from perfect, so in case you found a bug, please report it in this bot's [**GitHub Issues Page**](${MESSAGE_EMBED.helpURL}).`);

    return message.reply({ embeds: [embed] });
  }
}

module.exports = HelpCommand;
