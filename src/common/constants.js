const MAX_EMBED_FIELD_SIZE = 1024;

const MESSAGE_EMBED = {
  color: '#20B2AA',
  langThumbnail: 'https://i.imgur.com/QbNXO4q.jpg',
  langURL: 'https://github.com/moonstar-x/discord-tts-bot#language-support',
  helpThumbnail: 'https://i.imgur.com/Tqnk48j.png',
  helpURL: 'https://github.com/moonstar-x/discord-tts-bot/issues'
};

const PERMISSIONS = {
  administrator: 'ADMINISTRATOR',
  createInstantInvite: 'CREATE_INSTANT_INVITE',
  kickMembers: 'KICK_MEMBERS',
  banMembers: 'BAN_MEMBERS',
  manageChannels: 'MANAGE_CHANNELS',
  manageGuild: 'MANAGE_GUILD',
  addReactions: 'ADD_REACTIONS',
  viewAuditLog: 'VIEW_AUDIT_LOG',
  prioritySpeaker: 'PRIORITY_SPEAKER',
  stream: 'STREAM',
  viewChannel: 'VIEW_CHANNEL',
  sendMessages: 'SEND_MESSAGES',
  sendTTSMessages: 'SEND_TTS_MESSAGES',
  manageMessages: 'MANAGE_MESSAGES',
  embedLinks: 'EMBED_LINKS',
  attachFiles: 'ATTACH_FILES',
  readMessageHistory: 'READ_MESSAGE_HISTORY',
  mentionEveryone: 'MENTION_EVERYONE',
  useExternalEmojis: 'USE_EXTERNAL_EMOJIS',
  connect: 'CONNECT',
  speak: 'SPEAK',
  muteMembers: 'MUTE_MEMBERS',
  deafenMembers: 'DEAFEN_MEMBERS',
  moveMembers: 'MOVE_MEMBERS',
  useVAD: 'USE_VAD',
  changeNickname: 'CHANGE_NICKNAME',
  manageNicknames: 'MANAGE_NICKNAMES',
  manageRoles: 'MANAGE_ROLES',
  manageWebhooks: 'MANAGE_WEBHOOKS',
  manageEmojis: 'MANAGE_EMOJIS'
};

const PRESENCE_STATUS = {
  online: 'online',
  idle: 'idle',
  offline: 'offline',
  dnd: 'dnd'
};

const ACTIVITY_TYPE = {
  playing: 'PLAYING',
  streaming: 'STREAMING',
  listening: 'LISTENING',
  watching: 'WATCHING'
};

const CHANNEL_TYPE = {
  dm: 'dm',
  text: 'text',
  voice: 'voice',
  category: 'category',
  unknown: 'unknown'
};

const NUMBER_EMOJI_UNICODE = [
  '\u0030\u20E3', // 0
  '\u0031\u20E3', // 1
  '\u0032\u20E3', // 2
  '\u0033\u20E3', // 3
  '\u0034\u20E3', // 4
  '\u0035\u20E3', // 5
  '\u0036\u20E3', // 6
  '\u0037\u20E3', // 7
  '\u0038\u20E3', // 8
  '\u0039\u20E3' // 9
];

module.exports = {
  MAX_EMBED_FIELD_SIZE,
  MESSAGE_EMBED,
  PERMISSIONS,
  PRESENCE_STATUS,
  ACTIVITY_TYPE,
  CHANNEL_TYPE,
  NUMBER_EMOJI_UNICODE
};