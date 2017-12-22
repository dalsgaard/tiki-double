import { stub } from '..';

const foo = stub(i => 42 + i);
console.log(foo(5));
console.log(foo(2, 3));
console.log(foo.calls);