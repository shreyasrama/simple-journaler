<script lang="ts">
    import * as Command from "$lib/components/ui/command";
	import { searchEntries } from "$lib/db/db-functions";
	import SearchResult from "$lib/components/search/search-result.svelte";

    let searchString = '';
</script>

<div class="w-80 mx-auto md:w-1/2">
    <Command.Root>
        <Command.Input 
            bind:value={searchString} 
            placeholder="Search for an entry..." 
        />
    
        {#if searchString.length > 2}
            {#await searchEntries(searchString)}
                <p>Loading...</p>
            {:then results}
                {#each results as result}
                    <SearchResult detail={result}/>
                {/each}
            {/await}
        {/if}
    
    </Command.Root>
</div>
