<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
</script>

<h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
	Welcome to SimpleJournaler
</h1>

<h3 class="scroll-m-20 text-2xl font-semibold tracking-tight">
	Private, easy, and free to use journaling app with no sign-up required.
</h3>

<h2 class="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
	Let's get you started
</h2>

<p class="text-sm text-muted-foreground">Importing a SimpleJournaler database? Click here.</p>

<div class="flex w-full max-w-sm flex-col gap-1.5">
	<Label for="name">Enter your name, or whatever you'd like to be called</Label>
	<Input type="name" id="name" placeholder="Name" />
	<Button>Get started</Button>
</div>

<h4
	class="absolute bottom-0 left-1/2 translate-x-[-50%] scroll-m-20 text-xl font-semibold tracking-tight text-muted-foreground"
>
	FAQ v
</h4>
