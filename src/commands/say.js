const { Logger } = require('logger');
const { allow_more_than_200_chars } = require('../../config/settings.json');

const logger = new Logger();

function splitToPlayable(phraseArr, queue, message) {
  const phrase = phraseArr.join(' ');
  const charCount = phrase.length;
  if (charCount <= 200) {
    queue.push(phrase);
    return;
  }

  if (allow_more_than_200_chars == 'yes') {
    let toPush = false;
    let pushToQueue = "";
    let wordToPush = undefined;
    while (phraseArr.length > 0) {
      if (!toPush) {
        wordToPush = phraseArr.shift();
        if (wordToPush.length > 200) {
          message.reply('one or more of your words is over 200 characters.');
          break;
        }
      }
      if (pushToQueue.length < 200 - wordToPush.length) {
        pushToQueue = pushToQueue.concat(' ', wordToPush);
        toPush = false;
      } else {
        toPush = true;
        queue.push(pushToQueue);
        pushToQueue = "";
      }
    }
    queue.push(pushToQueue);
  } else {
    message.reply(`your TTS message is ${charCount} characters long. Since the maximum number of characters is 200, you'll need to remove ${charCount - 200} characters.`);
  }
}

module.exports = {
  name: 'say',
  description: 'Send a TTS message in your voice channel (up to 200 characters).',
  emoji: ':speaking_head:',
  execute(message, options) {
    const { channel } = message.member.voice;

    if (!channel) {
      message.reply('you need to be in a voice channel first.');
      return;
    }

    if (!channel.joinable) {
      message.reply('I cannot join your voice channel.');
      return;
    }

    if (!options.args[0]) {
      message.reply('you need to specify a message.');
      return;
    }

    if (channel.connection) {
      splitToPlayable(options.args, options.ttsData[message.guild.id].queue, message);
      options.tts.emit('say', message.guild, channel.connection);
    } else {
      channel.join().then( connection => {
        logger.info(`Joined ${channel.name} in ${message.guild.name}.`);
        message.channel.send(`Joined ${channel}.`);
        splitToPlayable(options.args, options.ttsData[message.guild.id].queue, message);
        options.tts.emit('say', message.guild, connection);
      });
    }

  }
}