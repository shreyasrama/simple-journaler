import { SQLocal } from 'sqlocal';
import { drizzle } from 'drizzle-orm/sqlite-proxy';
import { SQLocalDrizzle } from 'sqlocal/drizzle';

const { sql } = new SQLocal('database.sqlite3');
const { driver, batchDriver } = new SQLocalDrizzle('database.sqlite3');

export const db = drizzle(driver, batchDriver);

export async function InitDB() {
    await sql`CREATE TABLE groceries (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)`;
}
