import { toast } from 'svelte-sonner';

import { deleteEntry, getYearRange } from '$lib/db/db-functions';

export async function deleteEntryFromDatabase(id: string) {
    // TODO: investigate why deleteEntry returns 0n for numDeletedRows
    await deleteEntry(id);

    toast.success('Deleted entry.');

    return true;
}
