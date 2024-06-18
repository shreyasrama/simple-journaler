<script lang="ts">
	import Welcome from '$lib/components/welcome/welcome.svelte';

	import { db } from '$lib/db';
	import { migrator } from '$lib/db';

	init();

	async function init() {
		await migrator.migrateToLatest();

		// check if db is empty
		const res = await db
			.selectFrom('users')
			.select([(b) => b.fn.count('users.id').as('count')])
			.execute();

		if (res[0].count == 0) {
			return true;
		} else {
			return false;
		}
	}
</script>

<div class="h-screen">
    {#await init()}
        <p>Loading...</p>
    {:then isDatabaseEmpty} 
        {#if isDatabaseEmpty}
            <Welcome />
        {:else}
            <p>add entry screen</p>
        {/if}
    {/await}
</div>
