import { PromisePool } from '..';

const pool = new PromisePool();

process.nextTick(() => console.log('bar'));

pool.promise(30, 30).then(console.log);
pool.promise(10, 10).then(p => {
  console.log(p);
  process.nextTick(() => console.log('baz'));
});
pool.promise(20, 20).then(console.log);

pool.fulfill();
console.log('foo');