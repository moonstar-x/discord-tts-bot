const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'help',
  description: 'Display a help message with all the available commands.',
  emoji: ':question:',
  execute(message, options) {
    // Since this bot will have only these commands, we can safely assume that the message field won't go over the 1024 character limit.
    // Also, we can easily define a command order like we do below.
    const orderedCommands = ['say', 'stop', 'lang', 'langs', 'speed', 'help'];
    let helpMessage = "";
    for (const commandName of orderedCommands) {
      const command = options.commands.get(commandName);
      helpMessage = helpMessage.concat('\n', `${command.emoji} **${options.prefix}${command.name}** - ${command.description}`);
    }

    const embed = new MessageEmbed()
      .setTitle('Text-to-Speech Help Message')
      .setColor('#20B2AA')
      .setThumbnail('https://i.imgur.com/Tqnk48j.png')
      .addField('List of available commands:', helpMessage)
      .addField('Spotted a bug?', 
      "This bot is far from perfect, so in case you found a bug, \
      please report it in this bot's [**GitHub Issues Page**](https://github.com/moonstar-x/discord-tts-bot/issues).");
    
    message.channel.send(embed);
  }
}