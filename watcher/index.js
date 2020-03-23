class Watcher {
  constructor (onCompleteCb) {
    this.onCompleteCb = onCompleteCb;
    this.process = [];
    this.isStarted = false;
  }

  started () {
    this.isStarted = true;
  }

  startProcess (elem) {
    this.process.push(elem);
  }

  endProcess (elem) {
    const index = this.process.findIndex(item => item === elem);
    this.process.splice(index, 1);
    this._checkAllComplete();
  }

  _checkAllComplete () {
    if (this.isStarted && this.process.length === 0) {
      this.onCompleteCb();
    }
  }
}

module.exports = Watcher;
