import { ClientOnly } from "@tanstack/react-router";

import TabBar from "@/components/layout/tab-bar";

export default function Entry() {
  return (
    <ClientOnly fallback={null}>
      <TabBar />

      <div>Hello "/entry"!</div>
    </ClientOnly>
  );
}
