import { ClientOnly } from "@tanstack/react-router";

import TabBar from "@/components/layout/tab-bar";

export default function Search() {
  return (
    <ClientOnly fallback={null}>
      <TabBar />

      <div>Hello "/search"!</div>
    </ClientOnly>
  );
}
