<script lang="ts">
    import { db } from '$lib/db'
    import { migrator } from '$lib/db'

    test();

    async function test() {
        await migrator.migrateToLatest();

        // check if db is empty
        const res = await db
            .selectFrom('users')
            .select([
                b => b.fn.count('users.id').as('count')
            ])
            .execute();
        
        console.log(res);

        if (res[0].count == 0) {
            //
        } else {
            //
        }
    }
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
