import { readFileSync } from 'fs';
import Redis from 'ioredis';
import './performance-observer.js';

(async () => {

  performance.mark('ioredis-read-file');
  const data = readFileSync('./data.txt', 'utf-8');
  performance.measure('ioredis-read-file', 'ioredis-read-file');

  performance.mark('ioredis-parse-text');
  const dataObject = JSON.parse(data);
  performance.measure('ioredis-parse-text', 'ioredis-parse-text');

  const redisClient = await new Redis({enableAutoPipelining: true});
  redisClient.on('error', (e) => console.error(e));
  redisClient.on('connect', () => {
    console.log('Redis connected...');
  });

  performance.mark('ioredis-json-stringify');
  const stringifiedData = JSON.stringify(dataObject);
  performance.measure('ioredis-json-stringify', 'ioredis-json-stringify');

  for (let i = 0; i < 100; i++) {
    performance.mark('ioredis-set-text');
    await redisClient.set('ioredis-test', stringifiedData);
    performance.measure('ioredis-set-text', 'ioredis-set-text');

    performance.mark('ioredis-get-text');
    await redisClient.get('ioredis-test');
    performance.measure('ioredis-get-text', 'ioredis-get-text');
  }

  // console.log('dataFromIOredis.length:', dataFromIOredis.length);
  //
  // performance.mark('ioredis-parse-data-from-redis');
  // const dataArray = JSON.parse(dataFromIOredis);
  // performance.measure('ioredis-parse-data-from-redis', 'ioredis-parse-data-from-redis');
  //
  // console.log('dataArray.length:', dataArray.length);

})();

// obs.disconnect();
