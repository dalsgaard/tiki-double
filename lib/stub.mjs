
const prototype = Object.create(Function.prototype);

prototype.returns = function (value) {
  this.responder = () => value;
  return this;
}

function stub (responder) {
  const calls = []
  const stub = (...args) => {
    calls.push(args);
    return stub.responder && stub.responder(...args);
  }
  Object.setPrototypeOf(stub, prototype);
  stub.responder = responder;
  stub.calls = calls;
  return stub;
}

export { stub };