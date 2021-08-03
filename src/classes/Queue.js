class Queue {
  constructor(initial = []) {
    if (!Array.isArray(initial)) {
      throw new TypeError('Queue may only contain an array as a store.');
    }

    this.store = initial;
  }

  enqueue(item) {
    this.store.push(item);
  }

  dequeue() {
    return this.store.shift();
  }

  clear() {
    this.store = [];
  }

  isEmpty() {
    return this.store.length === 0;
  }
}

module.exports = Queue;
