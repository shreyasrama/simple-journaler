import { createFileRoute } from "@tanstack/react-router";

import Entry from "@/components/entry/entry";

export const Route = createFileRoute("/entry")({
  component: Entry,
});
