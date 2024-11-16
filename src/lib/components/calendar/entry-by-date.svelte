<script lang="ts">
    import { createEventDispatcher } from 'svelte';

    import type { Entry } from '$lib/models/types';

    export let date: string;
    export let entries: Entry[];

    const dispatch = createEventDispatcher<{ delete: { id: string; mouseEvent: MouseEvent } }>();

    function handleDelete(idToDelete: string) {
        return (mouseEvent: MouseEvent) => {
            dispatch('delete', {
                id: idToDelete,
                mouseEvent
            });
        };
    }
</script>

<div>
    <h2
        class="scroll-m-20 pt-4 text-2xl font-medium
    tracking-tight opacity-70 transition-colors first:mt-0"
    >
        {date}
    </h2>

    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    {#each entries as entry}
        <li>
            <span on:click={handleDelete(entry.id)} class="cursor-pointer"> ❌ </span>
            {entry.detail}
        </li>
    {/each}
</div>
