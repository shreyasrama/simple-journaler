<script lang="ts">
    import { Button } from "$lib/components/ui/button";
    import { SQLocal } from 'sqlocal';
    import { Input } from "$lib/components/ui/input";
    import { Label } from "$lib/components/ui/label";
    import { AlertCircle } from "lucide-svelte";
    import * as Alert from "$lib/components/ui/alert";
	import Faq from "$lib/components/welcome/faq.svelte";

    export const { getDatabaseFile } = new SQLocal('database.sqlite3');
    export const { overwriteDatabaseFile } = new SQLocal('database.sqlite3');

    let file: any;

    async function exportDatabase() {
        const databaseFile = await getDatabaseFile();
        const fileUrl = URL.createObjectURL(databaseFile);

        const a = document.createElement('a');
        a.href = fileUrl;
        a.download = 'SimpleJournalerDB.sqlite3';
        a.click();
        a.remove();

        URL.revokeObjectURL(fileUrl);
    }

    async function handleImport(file: any) {
        const databaseFile = file.files[0];
        await overwriteDatabaseFile(databaseFile);
    }
</script>

<div class="w-full mx-auto md:w-4/5">
    <!-- Import -->
    <div class="max-w-3xl mx-auto pb-16">
        <h2 class="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 mt-12">
            Import database
        </h2>

        <Alert.Root>
            <AlertCircle class="h-5 w-5" />
            <Alert.Title>Warning</Alert.Title>
            <Alert.Description class="text-muted-foreground">
                Ensure you only import a database that you exported from SimpleJournaler. Or things might break.
            </Alert.Description>
        </Alert.Root>
        <div class="mt-4">
            <Label for="import">Select your SimpleJournaler database</Label>
            <Input id="import" type="file" bind:value={file} />
        </div>
        
        <Button class="mt-2" on:click={() => handleImport(document.querySelector('input[type="file"]'))} disabled={file == undefined ? true : false}>Import</Button>
    </div>
    
    <!-- Export -->
    <div class="max-w-3xl mx-auto pb-16">
        <h2 class="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 mt-12">
            Export database
        </h2>
        <p class="text-sm text-muted-foreground">Save a database file to your current device if you're planning on using SimpleJournaler on another device.</p>
        <Button class="mt-2" on:click={() => exportDatabase()}>Export database</Button>
    </div>
    
    
    <!-- FAQs -->
    <h2 class="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        SimpleJournaler FAQs
    </h2>
    <Faq />
</div>
