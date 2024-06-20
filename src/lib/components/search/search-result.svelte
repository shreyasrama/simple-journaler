<script lang="ts">
    export let detail;

    function formatDate(date: Date) {
        const dateString = new Date(date).toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });

        return dateString;
    }
</script>

<p>{detail.detail}</p>
<p>{formatDate(detail.created_at)}</p>
