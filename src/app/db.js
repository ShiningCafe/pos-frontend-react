import Dexie from 'dexie';

export const db = new Dexie('pos');
db.version(6).stores({
  orders: '&_id, serial, contents, price, createdAt, voidedAt, updatedAt', // Primary key and indexed props
  commodities: '&_id, name, categories, price, specification, createdAt, updatedAt',
});
