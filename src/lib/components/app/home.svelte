<script lang="ts">
	import { Separator } from "$lib/components/ui/separator";
    import { Button } from "$lib/components/ui/button";

    import { CalendarIcon, NotebookPenIcon, SearchIcon, SettingsIcon } from "lucide-svelte";
	import DayView from "$lib/components/calendar/day-view.svelte";
	import Entry from "$lib/components/entry/entry.svelte";
	import Search from "$lib/components/search/search.svelte";
    import Settings from "$lib/components/settings/settings.svelte";
    
    let selectedPage = 'entry';

    function selectPage(page: string) {
        selectedPage = page;
    }
</script>

<div>
    <div class="flex h-5 items-center space-x-4 text-sm">
        <Button on:click={() => selectPage('calendar')} variant="ghost"><CalendarIcon /></Button>
        <Separator orientation="vertical" />
        <Button on:click={() => selectPage('entry')} variant="ghost"><NotebookPenIcon /></Button>
        <Separator orientation="vertical" />
        <Button on:click={() => selectPage('search')} variant="ghost"><SearchIcon /></Button>
        <Separator orientation="vertical" />
        <Button on:click={() => selectPage('settings')} variant="ghost"><SettingsIcon /></Button>
    </div>
</div>

{#key selectedPage}
    {#if selectedPage == 'calendar'}
        <DayView />
    {:else if selectedPage == 'entry'}
        <Entry />
    {:else if selectedPage == 'search'}
        <Search />
    {:else if selectedPage == 'settings'}
        <Settings />
    {/if}
{/key}
