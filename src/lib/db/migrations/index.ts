import { type Migration } from 'kysely';

import { UsersInit, type UsersTable } from './users-init';
import { EntriesInit, type EntriesTable } from './entries-init';

export const initMigrations: Record<string, Migration> = {
    users_init: UsersInit,
    entries_init: EntriesInit
};

export type SimpleJournalerDatabase = {
    users: UsersTable;
    entries: EntriesTable;
};
