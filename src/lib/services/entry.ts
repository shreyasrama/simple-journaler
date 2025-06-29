import { toast } from 'svelte-sonner';

import { deleteEntry, getEntriesForMonth, getEntriesInRange, insertNewEntry, insertNewEntryOnDay } from '$lib/db/db-functions';
import { convertDate, getDayBoundariesInUtc } from '$lib/utils/date';
import type { Entry } from '$lib/models/types';

// TODO: doc
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

// TODO: doc
export async function deleteEntryFromDb(id: string) {
    // TODO: investigate why deleteEntry returns 0n for numDeletedRows
    await deleteEntry(id);

    toast.success('Deleted entry.');

    return true;
}

// TODO: doc
export async function getEntriesForDayFromDb(databaseDate: string) {
    const { startOfDayUtc, endOfDayUtc } = getDayBoundariesInUtc(databaseDate);

    return await getEntriesInRange(startOfDayUtc, endOfDayUtc);
}

// TODO: doc
export async function insertNewEntryIntoDb(detail: string) {
    const res = await insertNewEntry(detail);

    if (!res[0].id) {
        toast.error('Failed to add entry.');

        return false;
    }

    toast.success('Added entry.');

    return true;
}

// TODO: doc
export async function insertNewEntryOnDayIntoDb(detail: string, date: string) {
    const res = await insertNewEntryOnDay(detail, date);

    if (!res[0].id) {
        toast.error('Failed to add entry.');

        return false;
    }

    toast.success('Added entry.');

    return true;
}
