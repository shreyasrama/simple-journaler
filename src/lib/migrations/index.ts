import { type Migration } from 'kysely';

import { UsersInit } from "./users_init";

export const initMigrations: Record<string, Migration> = {
    'users_init': UsersInit
};
