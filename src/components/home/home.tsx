import { useEffect, useState } from "react";
import { useHydrated } from "@tanstack/react-router";
import { SQLocalDrizzle } from "sqlocal/drizzle";
import { drizzle } from "drizzle-orm/sqlite-proxy";

import { isInitialized } from "@/db/init";

export default function Home() {
  const hydrated = useHydrated();
  const [isNewUser, setIsNewUser] = useState<boolean>(true);

  useEffect(() => {
    const initDB = async () => {
      if (hydrated) {
        const { driver, batchDriver } = new SQLocalDrizzle(
          "simplejournaler.sqlite3",
        );
        const db = drizzle(driver, batchDriver);

        const existingUser = await isInitialized(db);
        setIsNewUser(existingUser ? false : true);
      }
    };

    initDB();
  }, [hydrated]);

  if (!hydrated) {
    return <div>Loading...</div>;
  }

  return <div>{isNewUser ? "New user" : "Existing user"}</div>;
}
