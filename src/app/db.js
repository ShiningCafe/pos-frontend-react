import Dexie from 'dexie';

export const db = new Dexie('pos');
db.version(7).stores({
  orders: '&_id, serial, contents, price, createdAt, voidedAt, updatedAt, uploadedAt', // Primary key and indexed props
  commodities: '&_id, name, categories, price, specification, createdAt, updatedAt, uploadedAt',
});
