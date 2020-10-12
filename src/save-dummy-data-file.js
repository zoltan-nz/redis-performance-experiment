import fs from 'fs';
import { data } from './data.js';
import './performance-observer.js';

performance.mark('stringify-data');
const converted = JSON.stringify(data);
performance.measure('stringify-data', 'stringify-data');

performance.mark('save-list-file');
fs.writeFileSync('./data.txt', converted, 'utf-8');
performance.measure('save-list-file', 'save-list-file');



