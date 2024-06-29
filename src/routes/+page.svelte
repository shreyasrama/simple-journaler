<script lang="ts">
	import Welcome from '$lib/components/welcome/welcome.svelte';
    import Home from '$lib/components/app/home.svelte';

	import { db } from '$lib/db/db-init';
	import { migrator } from '$lib/db/db-init';

	init();

	async function init() {
		const { error, results } = await migrator.migrateToLatest()

		//console.log(error);

		// results?.forEach((it) => {
		// if (it.status === 'Success') {
		// 	console.log(`migration "${it.migrationName}" was executed successfully`)
		// } else if (it.status === 'Error') {
		// 	console.error(`failed to execute migration "${it.migrationName}"`)
		// }
		// })

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

<div class="h-screen px-4">
    {#await init()}
        <p>Loading...</p>
    {:then isDatabaseEmpty}
        {#if isDatabaseEmpty}
            <Welcome />
        {:else}
            <Home />
        {/if}
    {/await}
</div>
