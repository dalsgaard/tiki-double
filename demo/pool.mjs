import { PromisePool } from '..';

const pool = new PromisePool();

process.nextTick(() => console.log('#2'));

pool.promise(30, 30).then(console.log);
pool.promise(10, 10).then(p => {
  console.log(p);
  process.nextTick(() => console.log('#3'));
});
pool.promise(20, 20).then(console.log);

pool.fulfill().then(() => {
  console.log('#4');
});
console.log('#1');