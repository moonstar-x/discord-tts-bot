const UNICODE_EMOJI_PATTERN = /[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu;
const CUSTOM_EMOJI_PATTERN = /<a?:(.*?):(\d{17,19})>/g;
const URL_PATTERN = /https?:\/\/[^\s]+/g;
const MARKDOWN_LINK_PATTERN = /\[([^\]]*)\]\([^)]*\)?/g;
const USERS_PATTERN = /<@!?(\d+)>/g;
const CHANNELS_PATTERN = /<#(\d+)>/g;
const ROLES_PATTERN = /<@&(\d+)>/g;

const cleanMemberMentions = (message) => {
  return message.replace(USERS_PATTERN, '');
};

const cleanChannelMentions = (message) => {
  return message.replace(CHANNELS_PATTERN, '');
};

const cleanRoleMentions = (message) => {
  return message.replace(ROLES_PATTERN, '');
};

const cleanEmojis = (message) => {
  return message
    .replace(CUSTOM_EMOJI_PATTERN, '')
    .replace(UNICODE_EMOJI_PATTERN, '');
};

const cleanLinks = (message) => {
  // Remove markdown links like [sticker name](url) first, then remaining bare URLs
  return message
    .replace(/<https?:\/\/[^\s]+>/g, '')
    .replace(MARKDOWN_LINK_PATTERN, '')
    .replace(URL_PATTERN, '');
};

const cleanMessage = (message, { members, channels, roles }) => {
  let clean = message;

  clean = cleanMemberMentions(clean, members);
  clean = cleanChannelMentions(clean, channels);
  clean = cleanRoleMentions(clean, roles);
  clean = cleanEmojis(clean);
  clean = cleanLinks(clean);

  return clean;
};

module.exports = {
  cleanMessage,
  cleanMemberMentions,
  cleanChannelMentions,
  cleanRoleMentions,
  cleanEmojis,
  cleanLinks
};
