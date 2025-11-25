import type { SqliteRemoteDatabase } from "drizzle-orm/sqlite-proxy";
import { createClientOnlyFn } from "@tanstack/react-start";
import { DrizzleQueryError, sql } from "drizzle-orm";

import { users } from "./schema";

export const getUsersName = createClientOnlyFn(
  async (
    db: SqliteRemoteDatabase<Record<string, never>>,
  ): Promise<string | null> => {
    try {
      const user = await db.select().from(users).limit(1);

      return user[0].name;
    } catch (error) {
      if (error instanceof DrizzleQueryError) {
        return null;
      }
    }

    return null;
  },
);

export const createTables = createClientOnlyFn(
  async (db: SqliteRemoteDatabase<Record<string, never>>) => {
    await db.run(sql`CREATE TABLE IF NOT EXISTS users (
      id integer NOT NULL,
      name text NOT NULL
      )`);
  },
);

export const insertUser = createClientOnlyFn(
  async (db: SqliteRemoteDatabase<Record<string, never>>, name: string) => {
    await db.insert(users).values({ id: 0, name: name });
  },
);
