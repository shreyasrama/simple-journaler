<script lang="ts">
    import { db, InitDB } from '$lib/db'
    import { groceries } from '$lib/schema';

    test();

    async function test() {
        try {
            const data = await db
                .select({ name: groceries.name, id: groceries.id })
                .from(groceries)
                .orderBy(groceries.name)
                .all();
            console.log(data);
        } catch(error) {
            InitDB();
        }
    }
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
