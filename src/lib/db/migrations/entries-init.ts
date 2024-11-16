import { type Kysely, type Migration, type Generated, sql } from 'kysely';

export type EntriesTable = {
    id: string;
    created_at: Generated<string>;
    detail: string;
};

export const EntriesInit: Migration = {
    async up(db: Kysely<any>) {
        await db.schema
            .createTable('entries')
            .addColumn('id', 'uuid', (cb) => cb.primaryKey())
            .addColumn('created_at', 'timestamptz', (cb) => cb.defaultTo(sql`current_timestamp`))
            .addColumn('detail', 'text')
            .execute();
    },
    async down(db: Kysely<any>) {
        await db.schema.dropTable('entries').execute();
    }
};
