const { EMBED_FIELD_MAX_SIZE } = require('./constants');

const splitContentForEmbedFields = (lines) => {
  return lines.reduce((fields, line) => {
    let lastIndex = fields.length - 1;
    if (lastIndex < 0) {
      lastIndex = 0;
    }

    const currentLength = fields[lastIndex] ? fields[lastIndex].length : 0;

    if (currentLength + line.length >= EMBED_FIELD_MAX_SIZE) {
      fields.push(line);
    } else {
      if (!fields[lastIndex]) {
        fields[lastIndex] = '';
      }
      fields[lastIndex] += line;
    }

    return fields;
  }, []);
};

module.exports = {
  splitContentForEmbedFields
};
