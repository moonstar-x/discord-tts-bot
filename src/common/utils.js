const { TTS_MAX_CHARS } = require('./constants');
const allowOver200 = process.env.ALLOW_OVER_200 || require('../../config/settings.json').allow_more_than_200_chars;

const splitToPlayable = (words) => {
  return new Promise((resolve, reject) => {
    const phrase = words.join(' ');
    const charCount = phrase.length;
    if (charCount <= TTS_MAX_CHARS) {
      resolve([phrase]);
      return;
    }

    if (allowOver200 !== 'yes') {
      reject(`your TTS message is ${charCount} characters long. Since the maximum number of characters is ${TTS_MAX_CHARS}, you'll need to remove ${charCount - TTS_MAX_CHARS} characters.`);
      return;
    }

    try {
      const splitPhrases = [];
      const remainingPhrase = words.reduce((phrase, word) => {
        const wordLength = word.length;

        if (wordLength > TTS_MAX_CHARS) {
          throw 'one or more of your words is over 200 characters.';
        }

        if (wordLength + 1 < TTS_MAX_CHARS - phrase.length) {
          phrase += `${word} `;
        } else {
          splitPhrases.push(phrase.trimEnd());
          phrase = `${word} `;
        }

        return phrase;
      }, '');

      if (remainingPhrase) {
        splitPhrases.push(remainingPhrase.trimEnd());
      }

      resolve(splitPhrases);
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  splitToPlayable
};
