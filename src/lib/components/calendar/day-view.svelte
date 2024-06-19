<script lang="ts">
    import * as Select from "$lib/components/ui/select";
	import { getEntriesOnDay } from "$lib/db/db-functions";

    const months = [
        {value: '01', label: 'January'},
        {value: '02', label: 'February'},
        {value: '03', label: 'March'},
        {value: '04', label: 'April'},
        {value: '05', label: 'May'},
        {value: '06', label: 'June'},
        {value: '07', label: 'July'},
        {value: '08', label: 'August'},
        {value: '09', label: 'September'},
        {value: '10', label: 'October'},
        {value: '11', label: 'November'},
        {value: '12', label: 'December'}
    ]

    const days = Array.from({length: 31}, (_, i) => i + 1);

    //todo: work out oldest year

    let month: any = '';
    let day: any = '';
    let year: any = '';
</script>

<div class="flex flex-row">
    <Select.Root portal={null} onSelectedChange={(val) => {month = val?.value}}>
        <Select.Trigger class="">
            <Select.Value placeholder="Month" />
        </Select.Trigger>
        <Select.Content>
            <Select.Group>
                {#each months as month}
                    <Select.Item 
                        value={month.value}
                        label={month.label}
                        >
                        {month.label}
                    </Select.Item>
                {/each}
            </Select.Group>
        </Select.Content>
        <Select.Input name="month" />
    </Select.Root>
    
    <Select.Root portal={null} onSelectedChange={(val) => {day = val?.value}}>
        <Select.Trigger class="">
            <Select.Value placeholder="Day" />
        </Select.Trigger>
        <Select.Content class="overflow-y-auto max-h-[20rem]">
            <Select.Group>
                {#each days as day}
                    <Select.Item 
                        value={day.toString().length == 1 ? '0'+day.toString() : day.toString()}
                        >
                        {day.toString().length == 1 ? '0'+day.toString() : day.toString()}
                    </Select.Item>
                {/each}
            </Select.Group>
        </Select.Content>
        <Select.Input name="day" />
    </Select.Root>
    
    <Select.Root portal={null} onSelectedChange={(val) => {year = val?.value}}>
        <Select.Trigger class="">
            <Select.Value placeholder="Year" />
        </Select.Trigger>
        <Select.Content>
            <Select.Group>
                <Select.Item 
                    value='2024'
                    >
                    2024
                </Select.Item>
            </Select.Group>
        </Select.Content>
        <Select.Input name="year" />
    </Select.Root>    
</div>

{#await getEntriesOnDay(year+'-'+month+'-'+day)}
    <p>Loading...</p>
{:then entries}
    <ul>
        {#each entries as entry}
            <li>{entry.detail}</li>
        {/each}
    </ul>
{/await}
