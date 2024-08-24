<script lang="ts">
    import { getEntriesForToday, insertNewEntry } from "$lib/db/db-functions";
    
    import { toast } from "svelte-sonner";
    import LoaderCircle from "lucide-svelte/icons/loader-circle";

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

    <Textarea
        bind:value={detailInput} 
        on:keyup={handleEnter}
        placeholder="Press Enter to apply..."
        class="resize-none border-none text-center min-h-40 max-w-xs mt-8 placeholder:italic focus:!ring-transparent"
        autofocus
      />
        
        
    {#await getEntriesForToday()}
        <LoaderCircle class="block mx-auto my-4 h-6 w-6 animate-spin" />
    {:then entries}
        <h2 class="scroll-m-20 text-3xl font-medium opacity-70 tracking-tight transition-colors mt-12 first:mt-0 ">
            Earlier today
        </h2>

        <ul class="list-none my-6 text-center [&>li]:mt-2">
            {#each entries as entry}
                <li
                    transition:fade={{ delay: 250, duration: 300 }}
                    class="mb-4"
                >
                    {entry.detail}
                </li>                 
            {/each}
            {#each  detailList as detail}
                <li
                transition:fade={{ delay: 250, duration: 300 }}
                class="mb-4"
            >
                {detail.detail} 
                </li>
            {/each}
        </ul>
    {/await}
</div>
