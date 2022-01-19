const APP = {
  'app.message.deprecated': 'Commands have been turned into slash commands and you may not use them with the prefix anymore. You can run the command you tried to input by running: **/{commandName}**'
};

const ERROR = {
  'error.channel.not_viewable': 'I cannot see your voice channel. Do I have enough permissions to view it?',
  'error.channel.full': 'Your voice channel is full.',
  'error.channel.not_joinable': 'I cannot join your voice channel. Do I have enough permissions to join it?',
  'error.channel.not_speakable': 'I cannot speak in your voice channel. Do I have enough permissions to speak in it?'
};

const COMMAND = {
  'command.settings.default.no_settings': 'No settings associated to this provider.',
  'command.settings.default.embed.title': "Here's the current default settings for this guild",
  'command.settings.default.embed.description': 'Keep in mind that these settings do not reflect what your personal may be. These settings will be used if you have not set your own.',
  'command.settings.default.current.provider': 'Current provider'
};

module.exports = {
  ...APP,
  ...ERROR,
  ...COMMAND
};
