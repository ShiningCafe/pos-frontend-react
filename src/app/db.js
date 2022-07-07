import Dexie from 'dexie';

export const db = new Dexie('pos');
db.version(1).stores({
  orders: '_id, serial, contents, price, createdAt', // Primary key and indexed props
  commoditys: '_id, name, categories, price, specification',
});
