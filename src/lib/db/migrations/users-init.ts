import { type Kysely, type Migration } from 'kysely';

export type UsersTable = {
    id: string;
    username: string;
};

export const UsersInit: Migration = {
    async up(db: Kysely<any>) {
        await db.schema
            .createTable('users')
            .addColumn('id', 'uuid', (cb) => cb.primaryKey())
            .addColumn('username', 'varchar(25)', (cb) => cb.notNull())
            .execute();
    },
    async down(db: Kysely<any>) {
        await db.schema.dropTable('users').execute();
    }
};
