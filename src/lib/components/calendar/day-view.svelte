<script lang="ts">
    import { getEntriesOnDay } from "$lib/db/db-functions";
</script>

{#await getEntriesOnDay('2024-06-19')}
    <p>Loading...</p>
{:then entries}
    <ul>
        {#each entries as entry}
            <li>{entry.detail}</li>
        {/each}
    </ul>
{/await}
