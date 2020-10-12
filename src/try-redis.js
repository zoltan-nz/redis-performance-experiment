import { readFileSync } from 'fs';
import { createClient } from 'redis';
import './performance-observer.js';

(async () => {

  performance.mark('redis-read-file');
  const data = readFileSync('./data.txt', 'utf-8');
  performance.measure('redis-read-file', 'redis-read-file');

  performance.mark('redis-parse-text-data');
  const dataObject = JSON.parse(data);
  performance.measure('redis-parse-text-data', 'redis-parse-text-data');

  const redisClient = createClient();
  redisClient.on('error', (e) => console.error(e));
  redisClient.on('connect', () => {
    console.log('Redis connected...');
  });

  await redisClient.connect();

  performance.mark('redis-json-stringify');
  const stringifiedData = JSON.stringify(dataObject);
  performance.measure('redis-json-stringify', 'redis-json-stringify')

  for (let i=0; i<100; i++) {
    performance.mark('redis-set-text');
    await  redisClient.set('redis-test', stringifiedData)
    performance.measure('redis-set-text', 'redis-set-text');

    performance.mark('redis-get-text');
    await redisClient.get('redis-test');
    performance.measure('redis-get-text', 'redis-get-text');
  }


  // console.log('dataFromRedis.length:', dataFromRedis.length);
  //
  // performance.mark('redis-parse-data-from-redis');
  // const dataArray = JSON.parse(dataFromRedis);
  // performance.measure('redis-parse-data-from-redis', 'redis-parse-data-from-redis');
  //
  // console.log('dataArray.length:', dataArray.length);
})();
