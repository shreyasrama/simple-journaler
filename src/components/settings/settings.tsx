import { ClientOnly } from "@tanstack/react-router";

import TabBar from "@/components/layout/tab-bar";

export default function Settings() {
  return (
    <ClientOnly fallback={null}>
      <TabBar />

      <div>Hello "/settings"!</div>
    </ClientOnly>
  );
}
