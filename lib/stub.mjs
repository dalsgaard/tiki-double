
const prototype = Object.create(Function.prototype);

prototype.returns = function (value) {
  this._responder = () => value;
  return this;
}

function stub (responder) {
  const calls = []
  const stub = (...args) => {
    calls.push(args);
    return stub._responder && stub._responder(...args);
  }
  Object.setPrototypeOf(stub, prototype);
  stub._responder = responder;
  stub.calls = calls;
  return stub;
}

export { stub };