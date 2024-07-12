<script lang="ts">
    export let detail;

    function formatDate(date: Date) {
        const dateString = new Date(date).toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });

        return dateString;
    }
</script>

<div class="py-4 mx-10">
    <h4 class="scroll-m-20 text-xl font-semibold tracking-tight">{detail.detail}</h4>
    <p>{formatDate(detail.created_at)}</p>
</div>
