import { ClientOnly, useNavigate } from "@tanstack/react-router";
import { SQLocalDrizzle } from "sqlocal/drizzle";
import { drizzle } from "drizzle-orm/sqlite-proxy";

import { getUsersName, createTables, insertUser } from "@/db/init";
import NameForm from "./name-form";

function HomeMessage() {
  const { driver, batchDriver } = new SQLocalDrizzle("simplejournaler.sqlite3");
  const db = drizzle(driver, batchDriver);

  const navigate = useNavigate({ from: "/" });

  const userCheck = async () => {
    const usersName = await getUsersName(db);

    if (usersName !== null) navigate({ to: "/entry" });
  };

  userCheck();

  const setupNewUser = (name: string) => {
    createTables(db);
    insertUser(db, name);

    navigate({ to: "/entry" });
  };

  return (
    <div>
      <h1>Welcome to SimpleJournaler</h1>
      <h2>Fast and free. Completely private and stored in your browser.</h2>

      <NameForm onSubmitName={setupNewUser} />
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
