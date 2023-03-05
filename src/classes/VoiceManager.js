const {
  joinVoiceChannel,
  getVoiceConnection,
  entersState,
  AudioPlayer,
  VoiceConnectionStatus
} = require('@discordjs/voice');

class VoiceManager {
  constructor(guild, options = {}) {
    this.guild = guild;

    this.player = options.audioPlayer || new AudioPlayer();
  }

  connect(channel) {
    return new Promise((resolve) => {
      const current = this.getConnection();

      if (current) {
        return resolve(this);
      }

      const connection = joinVoiceChannel({
        channelId: channel.id,
        guildId: channel.guild.id,
        adapterCreator: channel.guild.voiceAdapterCreator,
        selfDeaf: false,
        selfMute: false
      });
      connection.on('stateChange', (old_state, new_state) => {
        if (old_state.status === VoiceConnectionStatus.Ready && new_state.status === VoiceConnectionStatus.Connecting) {
            connection.configureNetworking();
        }
    });
      // Resolve this voice manager once the connection is ready.
      connection.on(VoiceConnectionStatus.Ready, () => {
        connection.subscribe(this.player);
        return resolve(this);
      });

      // Automatically handle potential recoverable disconnects.
      connection.on(VoiceConnectionStatus.Disconnected, async() => {
        try {
          await Promise.race([
            entersState(connection, VoiceConnectionStatus.Signalling, 5000),
            entersState(connection, VoiceConnectionStatus.Connecting, 5000)
          ]);
        } catch (error) {
          this.disconnect();
        }
      });
    });
  }

  disconnect() {
    const connection = this.getConnection();

    if (connection) {
      connection.destroy();
    }
  }

  getConnection() {
    return getVoiceConnection(this.guild.id);
  }

  play(resource) {
    this.player.play(resource);
  }
}

module.exports = VoiceManager;
