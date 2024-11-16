<script lang="ts">
    import { AlertCircle } from 'lucide-svelte';
    import { onMount } from 'svelte';

    import { Button } from '$lib/components/ui/button';
    import { Input } from '$lib/components/ui/input';
    import { Label } from '$lib/components/ui/label';
    import * as Alert from '$lib/components/ui/alert';

    import Faq from '$lib/components/welcome/faq.svelte';

    import { importDatabase, exportDatabase } from '$lib/services/database';

    let file: File;
    let fileInput: HTMLInputElement;

    $: importButtonDisabled = file == undefined;

    onMount(() => {
        fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    });

    async function handleImportDatabase() {
        await importDatabase(fileInput);

        fileInput.value = '';
        importButtonDisabled = true;
    }
</script>

<div class="mx-auto w-full md:w-4/5">
    <!-- Import -->
    <div class="mx-auto max-w-3xl pb-16">
        <h2
            class="mt-12 scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0"
        >
            Import database
        </h2>

        <Alert.Root>
            <AlertCircle class="h-5 w-5" />
            <Alert.Title>Warning</Alert.Title>
            <Alert.Description class="text-muted-foreground">
                Ensure you only import a database that you exported from SimpleJournaler. Or things
                might break.
            </Alert.Description>
        </Alert.Root>
        <div class="mt-4">
            <Label for="import">Select your SimpleJournaler database</Label>
            <Input id="import" type="file" accept=".sqlite3" bind:value={file} />
        </div>

        <Button class="mt-2" on:click={() => handleImportDatabase()} disabled={importButtonDisabled}
            >Import</Button
        >
    </div>

    <!-- Export -->
    <div class="mx-auto max-w-3xl pb-16">
        <h2
            class="mt-12 scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0"
        >
            Export database
        </h2>
        <p class="text-sm text-muted-foreground">
            Save a database file to your current device if you're planning on using SimpleJournaler
            on another device.
        </p>
        <Button class="mt-2" on:click={() => exportDatabase()}>Export database</Button>
    </div>

    <!-- FAQs -->
    <h2 class="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        SimpleJournaler FAQs
    </h2>
    <Faq />
</div>
