class Scheduler {
  constructor(client, timeout, fn) {
    this.client = client;
    this.timeout = timeout;
    this.fn = fn;

    this.timeoutHandle = null;
  }

  start(...args) {
    this.timeoutHandle = setTimeout((...args) => {
      this.fn(...args);
      this.timeoutHandle = null;
      this.client.emit('debug', 'Scheduler has been executed.');
    }, this.timeout, ...args);
    
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
}

module.exports = Scheduler;
