const getCantConnectToChannelReason = (channel) => {
  if (!channel.viewable) {
    return 'error.channel.not_viewable';
  }

  if (channel.full) {
    return 'error.channel.full';
  }

  if (!channel.joinable) {
    return 'error.channel.not_joinable';
  }

  if (channel.isVoiceBased() && !channel.speakable) {
    return 'error.channel.not_speakable';
  }
};

module.exports = {
  getCantConnectToChannelReason
};
