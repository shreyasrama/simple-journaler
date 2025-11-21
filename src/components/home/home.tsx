import { useState } from "react";
import { ClientOnly } from "@tanstack/react-router";
import { SQLocalDrizzle } from "sqlocal/drizzle";
import { drizzle } from "drizzle-orm/sqlite-proxy";

import { isInitialized } from "@/db/init";

function HomeMessage() {
  const [isNewUser, setIsNewUser] = useState<boolean>(true);

  const initCheck = async () => {
    const { driver, batchDriver } = new SQLocalDrizzle(
      "simplejournaler.sqlite3",
    );
    const db = drizzle(driver, batchDriver);

    // TODO: get name
    const existingUser = await isInitialized(db);
    setIsNewUser(existingUser ? false : true);
  };

  initCheck();

  return isNewUser ? (
    <div>
      <h1>Welcome to SimpleJournaler</h1>
      <h2>Fast and free. Completely private and stored in your browser.</h2>
    </div>
  ) : (
    <div>
      <h1>Welcome back (then redirect to /entry)</h1>
    </div>
  );
}

export default function Home() {
  return (
    <ClientOnly fallback={null}>
      <HomeMessage />
    </ClientOnly>
  );
}
