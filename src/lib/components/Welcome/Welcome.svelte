<script lang="ts">
    import LoaderCircle from 'lucide-svelte/icons/loader-circle';

    import { Button } from '$lib/components/ui/button/index.js';
    import { Input } from '$lib/components/ui/input/index.js';
    import { Label } from '$lib/components/ui/label/index.js';
    import { scrollIntoView } from '$lib/utils';
    import { insertNewUser } from '$lib/db/db-functions';
    import Faq from '$lib/components/welcome/faq.svelte';

    let faqAnchor: HTMLAnchorElement;
    let nameInput: string;

    function handleGetStarted() {
        document.getElementById('get-started-btn')?.toggleAttribute('disabled');
        document.getElementById('loader-circle')?.classList.remove('hidden');

        insertNewUser(nameInput);

        setTimeout(() => {
            location.reload();
        }, 1000);
    }
</script>

<div class="mx-auto flex h-screen flex-col px-4 pt-4">
    <h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Welcome to SimpleJournaler
    </h1>

    <h3 class="mt-4 scroll-m-20 text-2xl font-semibold tracking-tight">
        A private, easy, and free to use journaling app with no sign-up required.
    </h3>

    <h2
        class="mt-12 scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0"
    >
        Let's get you started
    </h2>

    <p class="text-sm text-muted-foreground">Importing a SimpleJournaler database? Click here.</p>

    <div class="mt-6 flex w-full max-w-sm flex-col gap-1.5">
        <Label class="text-xl" for="name">Enter a name</Label>
        <Input bind:value={nameInput} type="name" id="name" placeholder="Name" />
        <Button on:click={() => handleGetStarted()} id="get-started-btn">
            <LoaderCircle id="loader-circle" class="mr-2 hidden h-4 w-4 animate-spin" />
            Get started
        </Button>
    </div>
</div>

<h4
    class="absolute bottom-0 left-1/2 translate-x-[-50%] scroll-m-20 pb-4 text-xl font-semibold tracking-tight text-muted-foreground"
>
    <a
        href="#faq"
        id="faq"
        bind:this={faqAnchor}
        on:click|preventDefault={() => scrollIntoView(faqAnchor)}
        class="">SimpleJournaler FAQs</a
    >
</h4>

<Faq />
