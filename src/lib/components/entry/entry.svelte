<script lang="ts">
    import { Button } from '$lib/components/ui/button';
    import { getUser, insertNewEntries } from "$lib/db/db-functions";
	import { EntryInput } from "$lib/components/ui/entry-input";

	import { fade } from "svelte/transition";

    const date = new Date();
    const day = date.toLocaleDateString('en-US', {weekday: 'long'});
    const dayNum = date.getDate();
    const month = date.toLocaleDateString('en-US', {month: 'long'});

    let detailList: {detail: string}[] = [];
    let detailInput: string = '';

    function handleEnter(event: KeyboardEvent) {
        if (event.key === 'Enter') {
            detailList = [...detailList, {detail: detailInput}]
            detailInput = '';
        }
    }

    function handleSave() {
        insertNewEntries(detailList);

        // add a toast
        // go to view entry screen
    }
</script>

{#await getUser()}
    <p>Loading...</p>
{:then user}
    <p>Hello, { user?.username }</p>
{/await}

<h2 class="scroll-m-20 text-3xl font-medium opacity-70 tracking-tight transition-colors mt-12 first:mt-0 ">
    Today is
</h2>

<h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
    {day}, {month} {dayNum}
</h1>

<h2 class="scroll-m-20 text-3xl font-medium opacity-70 tracking-tight transition-colors first:mt-0">
    What did you get done today?
</h2>

<EntryInput bind:value={detailInput} on:keyup={handleEnter} type="email" placeholder="Walked the dog" class="max-w-xs" autofocus/>

<ul class="list-none my-6 ml-6 [&>li]:mt-2">
    {#if detailList && detailList.length > 0}
        {#each detailList as detail}
            <li transition:fade={{ delay: 250, duration: 300 }}>{detail.detail}</li>
        {/each}
    {/if}
</ul>

<Button on:click={() => {handleSave()}}>Save</Button>


