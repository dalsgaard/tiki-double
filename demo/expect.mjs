import { plugin, expect } from 'tiki-spec';
import { DoubleExpection } from '../expect';
import { stub } from '..';

plugin(DoubleExpection);

const foo = stub().returns(42);

try {
  expect(foo).to.have.been.called();
} catch (ex) {
  console.log(ex.message);
}

foo(1, 2, { foo: 42 });

expect(foo).to.have.been.called();
expect(foo).to.have.been.called.once();

foo();

expect(foo).to.have.been.called.with(1, 2, { foo: 42 });

try {
  expect(foo).to.have.been.called.once;
} catch (ex) {
  console.log(ex.message);
}

expect(foo).to.have.been.called(2).times();
