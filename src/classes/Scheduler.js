class Scheduler {
  constructor(client, guild, timeout) {
    this.client = client;
    this.guild = guild;
    this.timeout = timeout;

    this.fn = null;
    this.timeoutHandle = null;
  }

  set(fn) {
    this.fn = fn;
  }

  start() {
    if (!this.fn) {
      throw new Error('Attempted to start a Scheduler without a function set.');
    }

    this.timeoutHandle = setTimeout(() => {
      this.fn();
      this.timeoutHandle = null;
      this.client.emit('debug', 'Scheduler has been executed.');
    }, this.timeout);

    this.client.emit('debug', `Scheduler has started, next execution will be in: ${this.timeout}ms.`);
  }

  stop() {
    clearTimeout(this.timeoutHandle);
    this.timeoutHandle = null;
    this.client.emit('debug', 'Scheduler has stopped.');
  }

  refresh() {
    this.timeoutHandle.refresh();
    this.client.emit('debug', 'Scheduler has refreshed.');
  }

  isAlive() {
    return !!this.timeoutHandle;
  }

  async updateTimeout(timeout) {
    this.timeout = timeout;
    this.stop();
    this.start();

    await this.client.dataProvider.set(this.guild, 'disconnectTimeout', timeout);
  }
}

module.exports = Scheduler;
