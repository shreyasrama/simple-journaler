<script lang="ts">
    import type { HTMLInputAttributes } from 'svelte/elements';
    import type { InputEvents } from './index.js';
    import { cn } from '$lib/utils.js';

    type $$Props = HTMLInputAttributes;
    type $$Events = InputEvents;

    let className: $$Props['class'] = undefined;
    export let value: $$Props['value'] = undefined;
    export { className as class };

    // Workaround for https://github.com/sveltejs/svelte/issues/9305
    // Fixed in Svelte 5, but not backported to 4.x.
    export let readonly: $$Props['readonly'] = undefined;
</script>

<input
    class={cn(
        'flex h-10 w-full border-b border-black bg-background px-3 py-2 text-sm outline-hidden ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50',
        className
    )}
    bind:value
    {readonly}
    on:blur
    on:change
    on:click
    on:focus
    on:focusin
    on:focusout
    on:keydown
    on:keypress
    on:keyup
    on:mouseover
    on:mouseenter
    on:mouseleave
    on:mousemove
    on:paste
    on:input
    on:wheel|passive
    {...$$restProps}
/>
