<script lang="ts">
    import Welcome from '$lib/components/welcome/welcome.svelte';
    import Home from '$lib/components/app/home.svelte';
    import { onMount } from 'svelte';

    let isDatabaseEmpty: boolean | null = null;
    let loading = true;

    onMount(async () => {
        // Dynamically import db and migrator so it only runs client-side
        const { db, migrator } = await import('$lib/db/db-init');
        await migrator.migrateToLatest();
        const res = await db
            .selectFrom('users')
            .select([(b) => b.fn.count('users.id').as('count')])
            .execute();
        isDatabaseEmpty = res[0].count == 0;
        loading = false;
    });
</script>

<div class="mx-auto h-screen w-full max-w-200 px-4">
    {#if loading}
        <p>Loading...</p>
    {:else if isDatabaseEmpty}
        <Welcome />
    {:else}
        <Home />
    {/if}
</div>
