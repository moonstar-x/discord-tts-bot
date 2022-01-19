const getCantConnectToChannelReason = (channel) => {
  if (!channel.viewable) {
    return 'I cannot see your voice channel. Do I have enough permissions to view it?';
  }

  if (channel.full) {
    return 'Your voice channel is full.';
  }

  if (!channel.joinable) {
    return 'I cannot join your voice channel. Do I have enough permissions to join it?';
  }

  if (channel.type === 'GUILD_VOICE' && !channel.speakable) {
    return 'I cannot speak in your voice channel. Do I have enough permissions to speak in it?';
  }
};

module.exports = {
  getCantConnectToChannelReason
};
