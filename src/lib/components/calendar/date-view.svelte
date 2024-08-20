<script lang="ts">
	import { deleteEntry, getYearRange, getEntriesForMonth } from "$lib/db/db-functions";

	import { toast } from "svelte-sonner";
    import LoaderCircle from "lucide-svelte/icons/loader-circle";

    const months = [
        {value: '01', label: 'January'},
        {value: '02', label: 'February'},
        {value: '03', label: 'March'},
        {value: '04', label: 'April'},
        {value: '05', label: 'May'},
        {value: '06', label: 'June'},
        {value: '07', label: 'July'},
        {value: '08', label: 'August'},
        {value: '09', label: 'September'},
        {value: '10', label: 'October'},
        {value: '11', label: 'November'},
        {value: '12', label: 'December'}
    ]

    let datesToShow = new Set<string>;

    const dateFormat: Intl.DateTimeFormatOptions = {
        weekday: "long",
        day: "numeric",
        month: "long",
    };

    // Set initial values
    const date = new Date();
    let selectedMonth: any = date.toLocaleDateString('en-US', {month: '2-digit'});
    let selectedYear: any = date.toLocaleDateString('en-US', {year: 'numeric'});

    // Handle deleting an entry when the ❌ is clicked
    function handleDelete(id: string, event: MouseEvent) {
        deleteEntry(id);
        toast("Deleted entry.");

        // todo: check error

        // Remove element from list
        if (event instanceof MouseEvent) {
            let spanElem = event.target;

            if (spanElem instanceof HTMLSpanElement) {
                spanElem.parentElement?.remove();
            }
        }
    }

    // Used to determine whether a date should be shown (in order to avoid
    // showing the same date for entries from the same day)
    function storeDate(storedDate: string) {
        const d = new Date(storedDate+'+00:00')
        
        if (!datesToShow.has(d.toLocaleDateString('en-US', dateFormat))) {
            datesToShow.add(d.toLocaleDateString('en-US', dateFormat));

            return true;
        } else {
            return false;
        }
    }

    // Converts the database date to a human-friendly one
    function convertDate(isoDate: string) {
        const d = new Date(isoDate+'+00:00');
        
        return d.toLocaleDateString('en-US', dateFormat);
    }
</script>

<div class="flex flex-row justify-center gap-2">
    <select
        class="w-32 border"
        bind:value={selectedMonth} 
        on:change={(event) => {
                if (event.target instanceof HTMLSelectElement) {
                    datesToShow.clear();
                    selectedMonth = event.target.value;
                }
            }
        }
    >
        {#each months as month}
            <option value="{month.value}">{month.label}</option>
        {/each}
    </select>

    <select
        class="w-20 border"
        bind:value={selectedYear} 
        on:change={(event) => {
                if (event.target instanceof HTMLSelectElement) {
                    datesToShow.clear();
                    selectedYear = event.target.value;
                }
            }
        }
    >
        {#await getYearRange()}
            <p>Loading...</p>
        {:then years} 
            {#each years as year}
                <option value="{year.toString()}">{year.toString()}</option>
            {/each}
        {/await}
    </select>
</div>

<div class="w-80 mx-auto">
    {#await getEntriesForMonth(selectedMonth, selectedYear)}
        <LoaderCircle class="block mx-auto my-4 h-6 w-6 animate-spin" />
    {:then entries}
        <ul>
            {#each entries as entry}
                <div>
                    {#if storeDate(entry.created_at) != false}
                        <h2 
                            class="scroll-m-20 text-2xl font-medium opacity-70 
                            tracking-tight transition-colors pt-4 first:mt-0"
                        >
                            {convertDate(entry.created_at)}
                        </h2>
                    {/if}
                    
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <!-- svelte-ignore a11y-no-static-element-interactions -->
                    <li>
                        <span 
                            on:click={(event) => handleDelete(entry.id, event)}
                            class="cursor-pointer"
                        >
                        ❌ 
                        </span>
                        {entry.detail}
                    </li>
                </div>
            {/each}
        </ul>
    {/await}
</div>
