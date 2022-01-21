const path = require('path');
const logger = require('@greencoast/logger');
const { ShardingManager } = require('discord.js');
const { ConfigProvider } = require('@greencoast/discord.js-extended');

// Just need the token in here, the rest will be handled by the actual client.
const config = new ConfigProvider({
  env: process.env,
  configPath: path.join(__dirname, '../config/settings.json'),
  types: {
    TOKEN: 'string'
  }
});

const manager = new ShardingManager(path.join(__dirname, './app.js'), { token: config.get('TOKEN') });

manager.on('shardCreate', (shard) => {
  logger.info(`Launched shard with ID: ${shard.id}`);
});

manager.spawn({ amount: 2 });
