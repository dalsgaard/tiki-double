import assert from 'assert';
import deepEqual from 'deep-equal';

class Called {

  get once () {
    assert.equal(this._expection._actual.calls.length, 1);
    return () => {};
  }

  get times () {
    return () => {};
  }

  with (...args) {
    const calls = this._expection._actual.calls;
    if (!calls.find(call => deepEqual(call, args))) {
      assert.fail();
    }
  }

}

const prototype = Object.create(Called.prototype);

function DoubleExpection (Base) {

  return class extends Base {

    get have () {
      return this;
    }

    get been () {
      return this;
    }

    get called () {
      const called = n => {
        if (n) {
          assert.equal(this._actual.calls.length, n);
        } else {
          assert(this._actual.calls.length);
        }
        return called;
      }
      Object.setPrototypeOf(called, prototype);
      called._expection = this;
      return called;
    }   

  }
}

export { DoubleExpection };