import { Kysely, Migrator } from 'kysely';
import { SQLocalKysely } from 'sqlocal/kysely';

import type { SimpleJournalerDatabase } from '$lib/db/migrations';

const { dialect } = new SQLocalKysely('database.sqlite3');

export const db = new Kysely<SimpleJournalerDatabase>({ dialect });

export const migrator = new Migrator({
    db,
    provider: {
        async getMigrations() {
            const { initMigrations } = await import('$lib/db/migrations');

            return initMigrations;
        }
    }
});
