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

// Set of dates that have entries, used for grouping entries
export let entryDates = new Set<string>();

// Format for displaying entries under the dates
// e.g. Sunday, January 1
const entryDateFormat: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
};

// Converts the database date to a human-friendly one
// Takes in: 2006-01-01 (no TZ)
// Returns: Sunday, January 1
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

// Helper function to calculate dates for day lookup
// Takes in: a local date of the format 2006-01-01
// Returns: the start and end of that day in UTC
export function getDayBoundariesInUtc(inputDate: string): { startOfDayUtc: string; endOfDayUtc: string } {
    // Parse the input date
    const [year, month, day] = inputDate.split("-").map(Number);

    // Create local dates
    const localStartOfDay = new Date(year, month - 1, day, 0, 0, 0, 0);
    const localEndOfDay = new Date(year, month - 1, day, 23, 59, 59, 999);

    // Convert both to UTC
    const utcMidnight = new Date(localStartOfDay.toISOString());
    const utcEndOfDay = new Date(localEndOfDay.toISOString());

    return {
        startOfDayUtc: formatDateToDatabaseUtc(utcMidnight),
        endOfDayUtc: formatDateToDatabaseUtc(utcEndOfDay),
    };
}

// Helper function for formatting dates for database lookups
// Takes in: a Date object
// Returns: a string representing a UTC date in the format YYYY-MM-DD HH:MM:SS
function formatDateToDatabaseUtc(date: Date): string {
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(date.getUTCDate()).padStart(2, '0');
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
