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

    const existingUser = await isInitialized(db);
    setIsNewUser(existingUser ? false : true);
  };

  initCheck();

  return <div>{isNewUser ? "New user" : "Existing user"}</div>;
}

export default function Home() {
  return (
    <ClientOnly fallback={null}>
      <HomeMessage />
    </ClientOnly>
  );
}
