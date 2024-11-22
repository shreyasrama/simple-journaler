<script lang="ts">
    import LoaderCircle from 'lucide-svelte/icons/loader-circle';

    import { getYearRange } from '$lib/db/db-functions';
    import { deleteEntryFromDb, createEntriesByDate } from '$lib/services/entry';
    import { months, entryDates } from '$lib/utils/date';

    import EntryByDate from './entry-by-date.svelte';

    // Event dispatching for a delete from a child component
    interface EntryDeleteEvent {
        id: string;
        mouseEvent: MouseEvent;
    }

    // Set initial values
    const date = new Date();
    let selectedMonth: any = date.toLocaleDateString('en-US', { month: '2-digit' });
    let selectedYear: any = date.toLocaleDateString('en-US', { year: 'numeric' });

    // Handle deleting an entry when the ❌ is clicked
    async function handleDelete(data: EntryDeleteEvent) {
        const isDeleted = await deleteEntryFromDb(data.id);

        if (isDeleted) {
            // Remove element from list
            if (data.mouseEvent instanceof MouseEvent) {
                let spanElem = data.mouseEvent.target;

                if (spanElem instanceof HTMLSpanElement) {
                    spanElem.parentElement?.remove();
                }
            }
        }
    }
</script>

<div class="flex flex-row justify-center gap-2">
    <select
        class="w-32 border"
        bind:value={selectedMonth}
        on:change={(event) => {
            if (event.target instanceof HTMLSelectElement) {
                entryDates.clear();
                selectedMonth = event.target.value;
            }
        }}
    >
        {#each months as month}
            <option value={month.value}>{month.label}</option>
        {/each}
    </select>

    <select
        class="w-20 border"
        bind:value={selectedYear}
        on:change={(event) => {
            if (event.target instanceof HTMLSelectElement) {
                entryDates.clear();
                selectedYear = event.target.value;
            }
        }}
    >
        {#await getYearRange()}
            <p>Loading...</p>
        {:then years}
            {#each years as year}
                <option value={year.toString()}>{year.toString()}</option>
            {/each}
        {/await}
    </select>
</div>

<div class="mx-auto w-80 md:w-96 lg:w-1/2">
    {#await createEntriesByDate(selectedMonth, selectedYear)}
        <LoaderCircle class="mx-auto my-4 block h-6 w-6 animate-spin" />
    {:then entriesMap}
        <ul>
            {#each entriesMap.entries() as [k, v]}
                <EntryByDate date={k} entries={v} on:delete={(e) => handleDelete(e.detail)} />
            {/each}
        </ul>
    {/await}
</div>
