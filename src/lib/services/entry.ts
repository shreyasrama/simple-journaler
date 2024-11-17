import { toast } from 'svelte-sonner';

import { deleteEntry, getEntriesForDay, getEntriesForMonth, getEntriesInRange } from '$lib/db/db-functions';
import { convertDate, getDayBoundariesInUtc } from '$lib/utils/date';
import type { Entry } from '$lib/models/types';

export async function createEntriesByDate(month: string, year: string) {
    const entries = await getEntriesForMonth(month, year);
    const entriesByDate = new Map<string, Entry[]>();

    for (const entry of entries) {
        let convertedEntry = convertDate(entry.created_at);

        if (!entriesByDate.has(convertedEntry)) {
            entriesByDate.set(convertedEntry, []);
        }

        entriesByDate.get(convertedEntry)?.push({ id: entry.id, detail: entry.detail });
    }

    return entriesByDate;
}

export async function deleteEntryFromDatabase(id: string) {
    // TODO: investigate why deleteEntry returns 0n for numDeletedRows
    await deleteEntry(id);

    toast.success('Deleted entry.');

    return true;
}

export async function getEntriesForDayFromDatabase(databaseDate: string) {
    const { startOfDayUtc, endOfDayUtc } = getDayBoundariesInUtc(databaseDate);

    return await getEntriesInRange(startOfDayUtc, endOfDayUtc);
}
