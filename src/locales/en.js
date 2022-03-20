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
  'command.settings.default.current.provider': 'Current provider',

  'command.settings.my.no_settings': 'No settings associated to this provider.',
  'command.settings.my.embed.title': "Here's your current settings, {name}",
  'command.settings.my.embed.description': "Keep in mind that if you haven't set a setting yet you will see the default ones here.",
  'command.settings.my.current.provider': 'Current provider',

  'command.set.default.provider.success': 'You have successfully changed the default provider to **{name}**.',

  'command.set.my.provider.success': 'You have successfully changed your provider to **{name}**.',

  'command.say.no_channel': 'You need to be in a voice channel first.',
  'command.say.different_channel': 'You need to be in my same voice channel to say something.',
  'command.say.success': 'I will say that now.',
  'command.say.joined': 'Joined {channel}.',

  'command.stop.no_connection': "I'm not in a voice channel.",
  'command.stop.different_channel': 'You need to be in my voice channel to stop me.',
  'command.stop.success': 'Successfully left the voice channel {channel}.',

  'command.help.embed.title': 'Text-to-Speech Help Message',
  'command.help.links.bug': 'Spotted a bug? Report it!',
  'command.help.links.website': 'Visit my website',

  'command.amazon.langs.embed.title': 'List of supported languages by the Amazon provider:',
  'command.amazon.langs.embed.description': `This is a full list of all the languages that are supported by the Amazon provider.
    
      To change the language for yourself, use **/amazon_set_my language LANG_CODE**.
      You may also use **/amazon_set_default language LANG_CODE** to change the default language in case someone else does not have one set.`,
  'command.amazon.langs.embed.page': 'Page {number}:',

  'command.google.settings.default.language.invalid': "That's not a valid language. Type **/google_langs** for a list of available languages.",
  'command.google.settings.default.language.success': 'You have successfully changed the default language to **{language}**.',
  'command.google.settings.default.speed.success': 'You have successfully changed the default speed to **{speed}**.',

  'command.google.settings.my.language.invalid': "That's not a valid language. Type **/google_langs** for a list of available languages.",
  'command.google.settings.my.language.success': 'You have successfully changed your language to **{language}**.',
  'command.google.settings.my.speed.success': 'You have successfully changed your speed to **{speed}**.',

  'command.google.langs.embed.title': 'List of supported languages by the Google provider:',
  'command.google.langs.embed.description': `This is a full list of all the languages that are supported by the Google Translate provider.
    
      To change the language for yourself, use **/google_set_my language LANG_CODE**.
      You may also use **/google_set_default language LANG_CODE** to change the default language in case someone else does not have one set.`,
  'command.google.langs.embed.page': 'Page {number}:',

  'command.microsoft.langs.embed.title': 'List of supported languages by the Microsoft provider:',
  'command.microsoft.langs.embed.description': `This is a full list of all the languages that are supported by the Microsoft provider.
    
      To change the language for yourself, use **/ms_set_my language LANG_CODE**.
      You may also use **/ms_set_default language LANG_CODE** to change the default language in case someone else does not have one set.`,
  'command.microsoft.langs.embed.page': 'Page {number}:',

  'command.locale.success': "You have changed the bot's locale to **{locale}**.",

  'command.timeout.out_of_range': 'Invalid time, it must be between **{min}** and **{max}**.',
  'command.timeout.success': 'I will now leave from the voice channel after **{timeout}** minutes of inactivity.'
};

const CHANNEL_COMMANDS = {
  'channel_commands.set.success': 'You have successfully changed the provider for this channel to **{name}**.',

  'channel_commands.settings.enabled.embed.title': "Here's the current settings for the channel **#{channel}**",
  'channel_commands.settings.enabled.embed.description': 'Keep in mind that these settings are the ones used when sending regular messages to this channel.',
  'channel_commands.settings.enabled.current.provider': 'Current provider',
  'channel_commands.settings.enabled.no_settings': 'No settings associated to this provider.',

  'channel_commands.settings.disabled.embed.title': 'Message-only based TTS is disabled on this channel',
  'channel_commands.settings.disabled.embed.description': 'You can enable message-only based TTS here by running **/set_channel_provider** and choosing a provider to be used.',

  'channel_commands.delete.already_disabled': 'Message-only based TTS is already disabled on this channel.',
  'channel_commands.delete.success': 'Message-only based TTS has been disabled on this channel and its settings have been removed.',

  'channel_commands.google.settings.language.invalid': "That's not a valid language. Type **/google_langs** for a list of available languages.",
  'channel_commands.google.settings.language.success': 'You have successfully changed the language for this channel to **{language}**.',
  'channel_commands.google.settings.speed.success': 'You have successfully changed the speed for this channel to **{speed}**.'
};

module.exports = {
  ...APP,
  ...ERROR,
  ...COMMAND,
  ...CHANNEL_COMMANDS
};
