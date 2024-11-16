import { getEntriesForMonth } from '$lib/db/db-functions';
import type { Entry } from '$lib/models/types';

export const months = [
    { value: '01', label: 'January' },
    { value: '02', label: 'February' },
    { value: '03', label: 'March' },
    { value: '04', label: 'April' },
    { value: '05', label: 'May' },
    { value: '06', label: 'June' },
    { value: '07', label: 'July' },
    { value: '08', label: 'August' },
    { value: '09', label: 'September' },
    { value: '10', label: 'October' },
    { value: '11', label: 'November' },
    { value: '12', label: 'December' }
];

// Initial values
const date = new Date();
let selectedMonth: any = date.toLocaleDateString('en-US', { month: '2-digit' });
let selectedYear: any = date.toLocaleDateString('en-US', { year: 'numeric' });

// Set of dates that have entries, used for grouping entries
export let entryDates = new Set<string>();

// Format for displaying entries under the dates
// e.g. Sunday, September 4
const entryDateFormat: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
};

// Converts the database date to a human-friendly one
export function convertDate(isoDate: string) {
    const d = new Date(isoDate + '+00:00');

    return d.toLocaleDateString('en-US', entryDateFormat);
}

export function addEntryDate(storedDate: string) {
    const d = new Date(storedDate + '+00:00');

    if (!entryDates.has(d.toLocaleDateString('en-US', entryDateFormat))) {
        entryDates.add(d.toLocaleDateString('en-US', entryDateFormat));

        return true;
    } else {
        return false;
    }
}

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
