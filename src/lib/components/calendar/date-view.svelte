<script lang="ts">
	import { getEntriesOnDay, deleteEntry } from "$lib/db/db-functions";
	import { Mouse } from "lucide-svelte";
	import { toast } from "svelte-sonner";

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

    const days = Array.from({length: 31}, (_, i) => i + 1);

    //todo: work out oldest year

    const date = new Date();

    let selectedMonth: any = date.toLocaleDateString('en-US', {month: '2-digit'});
    let selectedDay: any = date.toLocaleDateString('en-US', {day: 'numeric'});
    let selectedYear: any = date.toLocaleDateString('en-US', {year: 'numeric'});

    function handleDelete(id: string, event: MouseEvent) {
        deleteEntry(id);
        toast("Deleted entry.");

        // todo: check error

        if (event instanceof MouseEvent) {
            let spanElem = event.target;

            if (spanElem instanceof HTMLSpanElement) {
                spanElem.parentElement?.remove();
            }
        }
    }
</script>

<div class="flex flex-row">
    <select 
        bind:value={selectedMonth} 
        on:change={(event) => {
                if (event.target instanceof HTMLSelectElement)
                selectedMonth = event.target.value
            }
        }
    >
        {#each months as month}
            <option value="{month.value}">{month.label}</option>
        {/each}
    </select>

    <select 
        bind:value={selectedDay} 
        on:change={(event) => {
                if (event.target instanceof HTMLSelectElement)
                selectedDay = event.target.value.toString();
            }
        }
    >
        {#each days as day}
            <option value="{day.toString()}">{day.toString()}</option>
        {/each}
    </select>

    <select
        placeholder="blah"
        bind:value={selectedYear} 
        on:change={(event) => {
                if (event.target instanceof HTMLSelectElement)
                selectedYear = event.target.value
            }
        }
    >
        <option value="2024">2024</option>
    </select>
</div>

{#await getEntriesOnDay(selectedYear+'-'+selectedMonth+'-'+(selectedDay.length == 1 ? '0'+selectedDay : selectedDay))}
    <p>Loading...</p>
{:then entries}
    <ul>
        {#each entries as entry}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <li><span on:click={(event) => handleDelete(entry.id, event)}>❌ </span>{entry.detail}</li>
        {/each}
    </ul>
{/await}
