import { Kysely, type Migration, Migrator } from 'kysely';
import { SQLocalKysely } from 'sqlocal/kysely';
import {v4 as uuidv4} from 'uuid';

const { dialect } = new SQLocalKysely('database.sqlite3');

export const db = new Kysely<any>({ dialect });

export const migrator = new Migrator({
	db,
	provider: {
		async getMigrations() {
			const { initMigrations } = await import('$lib/migrations');

			return initMigrations;
		},
	},
});

export async function insertNewUser(username: string) {
	const res = await db
		.insertInto('users')
		.values({
			id: uuidv4(),
			username: username
		})
		.execute();
}
