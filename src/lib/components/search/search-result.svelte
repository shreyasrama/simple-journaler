<script lang="ts">
    export let detail;

    const dateFormat: Intl.DateTimeFormatOptions = {
        day: 'numeric',
        weekday: 'short',
        month: 'short',
        year: 'numeric'
    };

    function formatDate(date: Date) {
        const dateString = new Date(date + '+00:00').toLocaleDateString('en-US', dateFormat);

        return dateString;
    }
</script>

<div class="mx-10 py-4">
    <h4 class="scroll-m-20 text-xl font-semibold tracking-tight">{detail.detail}</h4>
    <p>{formatDate(detail.created_at)}</p>
</div>
