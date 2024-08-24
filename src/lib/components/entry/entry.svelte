<script lang="ts">
    import { insertNewEntry } from "$lib/db/db-functions";
	import { EntryInput } from "$lib/components/ui/entry-input";
    
    import { toast } from "svelte-sonner";

	import { fade } from "svelte/transition";
	import { Textarea } from "$lib/components/ui/textarea";

    const date = new Date();
    const day = date.toLocaleDateString('en-US', {weekday: 'long'});
    const dayNum = date.getDate();
    const month = date.toLocaleDateString('en-US', {month: 'long'});

    let detailList: {detail: string}[] = [];
    let detailInput: string = '';

    function handleEnter(event: KeyboardEvent) {
        if (event.key === 'Enter' && /\d|[A-z]/.test(detailInput)) {
            insertNewEntry(detailInput);

            // todo: check error
            
            toast('Added "' + detailInput + '"');

            detailList = [...detailList, {detail: detailInput}]
            detailInput = '';
        }
    }

    document.querySelector('textarea')?.addEventListener("input", function(){
        this.style.height = '0px';
        this.style.height = this.scrollHeight + 'px';
    })
</script>

<div class="flex flex-col items-center">
    <h2 class="scroll-m-20 text-3xl font-medium opacity-70 tracking-tight transition-colors mt-12 first:mt-0 ">
        Today is
    </h2>
    
    <h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight py-4 lg:text-5xl">
        {day}, {month} {dayNum}
    </h1>
    
    <h2 class="scroll-m-20 text-3xl font-medium opacity-70 tracking-tight transition-colors first:mt-0">
        What did you get done today?
    </h2>

    <!-- <EntryInput 
        bind:value={detailInput} 
        on:keyup={handleEnter}
        placeholder="Press Enter to apply..." 
        class="max-w-xs mt-8 placeholder:italic"
        autofocus
    /> -->

    <Textarea
        bind:value={detailInput} 
        on:keyup={handleEnter}
        placeholder="Press Enter to apply..."
        class="resize-none border-none text-center min-h-80 max-w-xs mt-8 placeholder:italic focus:!ring-transparent"
        autofocus
      />

    <ul class="list-none my-6 [&>li]:mt-2">
        {#if detailList && detailList.length > 0}
            {#each detailList as detail}
                <li
                    transition:fade={{ delay: 250, duration: 300 }}
                    class="mb-4"
                >
                    {detail.detail}
                </li>
            {/each}
        {/if}
    </ul>

    <!-- <Button on:click={() => {handleSave()}} disabled={detailList.length > 0 ? false : true}>Save</Button> -->
</div>
