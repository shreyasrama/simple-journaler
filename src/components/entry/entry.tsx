import { ClientOnly } from "@tanstack/react-router";

import TabBar from "@/components/layout/tab-bar";
import Editor from "./lexical";

export default function Entry() {
  return (
    <ClientOnly fallback={null}>
      <TabBar />

      <h1>Welcome, user. Today is date.</h1>
      <h2>What did you get up to today?</h2>

      <Editor />
    </ClientOnly>
  );
}
