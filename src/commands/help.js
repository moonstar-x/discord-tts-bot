const { MessageEmbed } = require('discord.js');
const { MESSAGE_EMBED } = require('../common/constants');
const prefix = process.env.PREFIX || require('../../config/settings.json').prefix;

module.exports = {
  name: 'help',
  description: 'Display a help message with all the available commands.',
  emoji: ':question:',
  execute(message, options) {
    const { commands } = options;
    const orderedCommands = ['say', 'aeiou', 'stop', 'lang', 'langs', 'speed', 'help'];

    const helpMessage = orderedCommands.reduce((commandsList, commandName) => {
      const command = commands.get(commandName);
      commandsList += `${command.emoji} **${prefix}${command.name}** - ${command.description}\n`;
      return commandsList;
    }, '');

    const embed = new MessageEmbed()
      .setTitle('Text-to-Speech Help Message')
      .setColor(MESSAGE_EMBED.color)
      .setThumbnail(MESSAGE_EMBED.helpThumbnail)
      .addField('List of available commands:', helpMessage)
      .addField('Spotted a bug?', `This bot is far from perfect, so in case you found a bug, please report it in this bot's [**GitHub Issues Page**](${MESSAGE_EMBED.helpURL}).`);
    
    message.channel.send(embed);
  }
}