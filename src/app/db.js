import Dexie from 'dexie';

export const db = new Dexie('pos');
db.version(4).stores({
  orders: '&_id, serial, contents, price, createdAt, voidedAt, syncedAt', // Primary key and indexed props
  commodities: '&_id, name, categories, price, specification, syncedAt',
});
