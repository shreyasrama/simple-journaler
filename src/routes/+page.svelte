<script lang="ts">
	import Welcome from '$lib/components/Welcome/Welcome.svelte';

	import { db } from '$lib/db';
	import { migrator } from '$lib/db';

	let isDatabaseEmpty: boolean;

	init();

	async function init() {
		await migrator.migrateToLatest();

		// check if db is empty
		const res = await db
			.selectFrom('users')
			.select([(b) => b.fn.count('users.id').as('count')])
			.execute();

		if (res[0].count == 0) {
			isDatabaseEmpty = true;
		} else {
			isDatabaseEmpty = false;
		}
	}
</script>

<div class="h-screen">
	{#if isDatabaseEmpty}
		<Welcome />
	{:else}
		<p>add entry screen</p>
	{/if}
</div>
