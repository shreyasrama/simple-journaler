<script lang="ts">
    import { Textarea } from '$lib/components/ui/textarea';

    import {
        getEntriesForDayFromDb,
        insertNewEntryIntoDb,
        insertNewEntryOnDayIntoDb
    } from '$lib/services/entry';
    import { convertIsoDateToDatabaseDate } from '$lib/utils/date';

    import LoaderCircle from 'lucide-svelte/icons/loader-circle';
    import { fade } from 'svelte/transition';

    export let date;

    const day = date.toLocaleDateString('en-US', { weekday: 'long' }); // 'Sunday'
    const month = date.toLocaleDateString('en-US', { month: 'long' }); // 'September'
    const dayNum = date.getDate(); // 15

    let databaseDate = convertIsoDateToDatabaseDate(date); // 2024-09-15

    let detailList: { detail: string }[] = [];
    let detailInput: string = '';

    // TODO: refactor out to service
    async function handleEnter(event: KeyboardEvent) {
        if (event.key === 'Enter' && /\d|[A-z]/.test(detailInput)) {
            let success = false;

            if (isToday()) {
                success = await insertNewEntryIntoDb(detailInput);
            } else {
                success = await insertNewEntryOnDayIntoDb(detailInput, databaseDate);
            }

            if (success) {
                detailList = [...detailList, { detail: detailInput }];
                detailInput = '';
            }
        }
    }

    function isToday() {
        if (databaseDate == convertIsoDateToDatabaseDate(new Date())) return true;

        return false;
    }

    // Allow the textarea to scale with the text
    document.querySelector('textarea')?.addEventListener('input', function () {
        this.style.height = '0px';
        this.style.height = this.scrollHeight + 'px';
    });
</script>

<div class="flex flex-col items-center">
    {#if isToday()}
        <h2
            class="mt-12 scroll-m-20 text-3xl font-medium tracking-tight opacity-70 transition-colors first:mt-0"
        >
            Today is
        </h2>

        <h1 class="scroll-m-20 py-4 text-4xl font-extrabold tracking-tight lg:text-5xl">
            {day}, {month}
            {dayNum}
        </h1>

        <h2
            class="scroll-m-20 text-3xl font-medium tracking-tight opacity-70 transition-colors first:mt-0"
        >
            What did you get done today?
        </h2>
    {:else}
        <h2
            class="mt-12 scroll-m-20 text-3xl font-medium tracking-tight opacity-70 transition-colors first:mt-0"
        >
            Viewing the past
        </h2>

        <h1 class="scroll-m-20 py-4 text-4xl font-extrabold tracking-tight lg:text-5xl">
            {day}, {month}
            {dayNum}
        </h1>

        <h2
            class="scroll-m-20 text-3xl font-medium tracking-tight opacity-70 transition-colors first:mt-0"
        >
            What did you get done?
        </h2>
    {/if}

    <Textarea
        bind:value={detailInput}
        on:keyup={handleEnter}
        id="detailForm"
        placeholder="Press Enter to apply..."
        class="mt-8 min-h-40 max-w-xs resize-none border-none text-center placeholder:italic focus:!ring-transparent"
        inputmode="none"
    />

    {#await getEntriesForDayFromDb(databaseDate)}
        <LoaderCircle class="mx-auto my-4 block h-6 w-6 animate-spin" />
    {:then entries}
        {#if entries.length > 0 || detailList.length > 0}
            <h2
                class="mt-12 scroll-m-20 text-3xl font-medium tracking-tight opacity-70 transition-colors first:mt-0"
            >
                {#if isToday()}
                    Earlier today
                {:else}
                    Earlier on this day
                {/if}
            </h2>

            <ul class="my-6 list-none text-center [&>li]:mt-2">
                {#each entries as entry}
                    <li transition:fade={{ delay: 250, duration: 300 }} class="mb-4">
                        {entry.detail}
                    </li>
                {/each}
                {#each detailList as detail}
                    <li transition:fade={{ delay: 250, duration: 300 }} class="mb-4">
                        {detail.detail}
                    </li>
                {/each}
            </ul>
        {/if}
    {/await}

    <!-- TODO: add jump to today button and maybe refactor out today view and past view -->
</div>
