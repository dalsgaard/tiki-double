import util from 'util';

const nextTick = util.promisify(process.nextTick);

class PromiseRef {

  constructor (value, priority=0, rejects=false) {
    this.value = value;
    this.priority = priority;
    this.rejects = rejects;
    this.promise = new Promise((resolve, reject) => {
      this._resolve = resolve;
      this._reject = reject;
    });
  }

  fulfill () {
    if (this.rejects) {
      this._reject(this.value);
    } else {
      this._resolve(this.value);
    }
  }
}

export class PromisePool {

  constructor () {
    this.refs = [];
    this.fulfilled = false;
  }

  promise (value, priority, rejects=false) {
    const ref = new PromiseRef(value, priority, rejects=false);
    this.refs.push(ref);
    return ref.promise;
  }

  fulfill () {
    if (!this.fulfilled) {
      this.refs.sort((a, b) => a.priority - b.priority);
      this._fulfill();
      this.fulfilled = true;
    }
  }

  async _fulfill () {
    for (const ref of this.refs) {
      await nextTick();
      ref.fulfill();        
    }
  }
}