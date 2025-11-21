import type { SqliteRemoteDatabase } from "drizzle-orm/sqlite-proxy";
import { createClientOnlyFn } from "@tanstack/react-start";
import { count, DrizzleQueryError } from "drizzle-orm";

import { users } from "./schema";

export const isInitialized = createClientOnlyFn(
  async (db: SqliteRemoteDatabase<Record<string, never>>): Promise<boolean> => {
    try {
      const data = await db.select({ count: count() }).from(users);

      return data.length > 0;
    } catch (error) {
      if (error instanceof DrizzleQueryError) {
        return false;
      }
    }

    return false;
  },
);
