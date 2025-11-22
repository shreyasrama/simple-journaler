import { useState } from "react";
import { ClientOnly } from "@tanstack/react-router";
import { SQLocalDrizzle } from "sqlocal/drizzle";
import { drizzle } from "drizzle-orm/sqlite-proxy";

import { isInitialized, createTables, insertUser } from "@/db/init";
import NameForm from "./name-form";

function HomeMessage() {
  const [usersName, setUsersName] = useState<string | null>(null);

  const { driver, batchDriver } = new SQLocalDrizzle("simplejournaler.sqlite3");
  const db = drizzle(driver, batchDriver);

  const userCheck = async () => {
    // TODO: get name
    const usersName = await isInitialized(db);
    setUsersName(usersName!);
  };

  userCheck();

  const setupNewUser = (name: string) => {
    createTables(db);
    insertUser(db, name);
  };

  return usersName === null ? (
    <div>
      <h1>Welcome to SimpleJournaler</h1>
      <h2>Fast and free. Completely private and stored in your browser.</h2>

      <NameForm onSubmitName={setupNewUser} />
    </div>
  ) : (
    <div>
      <h1>Welcome back {usersName} (then redirect to /entry)</h1>
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
