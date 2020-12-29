const fs = require('fs');
const path = require('path');

const configFilePath = path.join(__dirname, '../../config/settings.json');
const configFromFile = fs.existsSync(configFilePath) ? JSON.parse(fs.readFileSync(configFilePath)) : {};

const discordToken = process.env.DISCORD_TOKEN || configFromFile.discord_token || null;
const prefix = process.env.PREFIX || configFromFile.prefix || '$';

module.exports = {
  discordToken,
  prefix
};
