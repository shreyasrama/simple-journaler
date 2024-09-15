<script lang="ts">
    import EntryDisplay from "./entry-display.svelte";

    import { swipe, type SwipeCustomEvent, type SwipePointerEventDetail } from 'svelte-gestures';

    let date = new Date();

    function handleSwipe(event: SwipeCustomEvent) {
        modifyDate(date, event.detail);
    }

    // Based on swipe direction will increment or decrement the date
    function modifyDate(dateToModify: Date, swipeEvent: SwipePointerEventDetail) {
        if (swipeEvent.direction == 'right') {
            dateToModify.setDate(dateToModify.getDate() - 1);

            date = dateToModify;
        }
        else if (swipeEvent.direction == 'left') {
            if (dateToModify.toDateString() !== new Date().toDateString()) {
                dateToModify.setDate(dateToModify.getDate() + 1);

                date = dateToModify;
            }
        }
    }
</script>

<div class="w-full h-full" use:swipe={{ timeframe: 300, minSwipeDistance: 100, touchAction: 'pan-y' }} on:swipe={handleSwipe}>
    {#key date}
        <EntryDisplay date={date}/>
    {/key}
</div>
