
const prototype = Object.create(Function.prototype);

function stub (responder) {
  const calls = []
  const stub = (...args) => {
    calls.push(args);
    return responder && responder(...args);
  }
  Object.setPrototypeOf(stub, prototype);
  stub.responder = responder;
  stub.calls = calls;
  return stub;
}

export { stub };