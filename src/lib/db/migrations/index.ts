import { type Migration } from 'kysely';

import { UsersInit } from "./users-init";
import { EntriesInit } from './entries-init';

export const initMigrations: Record<string, Migration> = {
    'users_init': UsersInit,
    'entries_init': EntriesInit
};
