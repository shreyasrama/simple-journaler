import { Kysely, type Migration, Migrator } from 'kysely';
import { SQLocalKysely } from 'sqlocal/kysely';

const { dialect } = new SQLocalKysely('database.sqlite3');

export const db = new Kysely<any>({ dialect });

export const migrator = new Migrator({
	db,
	provider: {
		async getMigrations() {
			const { initMigrations } = await import('$lib/db/migrations');

			return initMigrations;
		},
	},
});
