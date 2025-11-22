import { Link } from "@tanstack/react-router";
import { Tabs } from "@base-ui-components/react/tabs";
import { CalendarSearch, NotebookPen, Settings } from "lucide-react";

export default function TabBar() {
  return (
    <Tabs.Root defaultValue="entry">
      <Tabs.List className="flex flex-row justify-center gap-10 py-4">
        <Link to="/search">
          <Tabs.Tab value="calendar">
            <CalendarSearch />
          </Tabs.Tab>
        </Link>

        <Link to="/entry">
          <Tabs.Tab value="entry">
            <NotebookPen />
          </Tabs.Tab>
        </Link>

        <Link to="/settings">
          <Tabs.Tab value="settings">
            <Settings />
          </Tabs.Tab>
        </Link>

        <Tabs.Indicator />
      </Tabs.List>

      <Tabs.Panel value="calendar"></Tabs.Panel>

      <Tabs.Panel value="entry"></Tabs.Panel>

      <Tabs.Panel value="settings"></Tabs.Panel>
    </Tabs.Root>
  );
}
