import { PerformanceObserver } from 'perf_hooks';

const average = arr => arr.reduce( ( p, c ) => p + c, 0 ) / arr.length;

let ioRedisGetText = [];
let ioRedisSetText = [];
let redisGetText = [];
let redisSetText = [];

const obs = new PerformanceObserver((list) => {
  list.getEntries().forEach(entry => {
    console.log(entry.name, entry.duration)

    switch (entry.name) {
      case 'ioredis-get-text':
        ioRedisGetText.push(entry.duration);
        break;
      case 'ioredis-set-text':
        ioRedisSetText.push(entry.duration);
        break;
      case 'redis-get-text':
        redisGetText.push(entry.duration);
        break;
      case 'redis-set-text':
        redisSetText.push(entry.duration);
        break;
    }

    console.log('ioRedisGetText average:', average(ioRedisGetText));
    console.log('ioRedisSetText average:', average(ioRedisSetText));
    console.log('redisGetText average:', average(redisGetText));
    console.log('redisSetText average:', average(redisSetText));
  });
});

obs.observe({ entryTypes: ['measure'] });
