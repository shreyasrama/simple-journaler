import { toast } from 'svelte-sonner';

export async function getDatabaseFile() {
    const { SQLocal } = await import('sqlocal');
    return new SQLocal('database.sqlite3').getDatabaseFile();
}

export async function overwriteDatabaseFile(file: File) {
    const { SQLocal } = await import('sqlocal');
    return new SQLocal('database.sqlite3').overwriteDatabaseFile(file);
}

const ENTRIES_HASH = '82e81eff8fdb5188cbadaa4754e41b0adc3108568125a7f65fece0475d932f94';
const USERS_HASH = 'd827049039f82a8b65a9b0f52e637cf3bc5d1e0dec7d6198edf901a5e3dcae7d';

export async function exportDatabase() {
    const databaseFile = await getDatabaseFile();
    const fileUrl = URL.createObjectURL(databaseFile);

    const a = document.createElement('a');
    a.href = fileUrl;
    a.download = 'SimpleJournalerDB.sqlite3';
    a.click();
    a.remove();

    URL.revokeObjectURL(fileUrl);
}

export async function importDatabase(file: HTMLInputElement) {
    if (!file.files || file.files.length === 0) {
        toast.error('No file selected.');
    } else {
        const backup = await getDatabaseFile();

        const databaseFile = file.files[0];

        await overwriteDatabaseFile(databaseFile);

        const { SQLocal } = await import('sqlocal');
        const { sql } = new SQLocal('database.sqlite3');
        const entries = await sql`PRAGMA table_info('entries')`;
        const users = await sql`PRAGMA table_info('users')`;

        const entriesHash = await hashObject(entries);
        const usersHash = await hashObject(users);

        if (entriesHash !== ENTRIES_HASH && usersHash !== USERS_HASH) {
            toast.error('Invalid database file.');

            await overwriteDatabaseFile(backup);
        } else {
            toast.success('Database imported successfully.');
        }
    }
}

async function hashObject(obj: Record<string, any>): Promise<string> {
    const sortedString = JSON.stringify(obj, Object.keys(obj).sort());
    const encoder = new TextEncoder();
    const data = encoder.encode(sortedString);

    // Compute the hash
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);

    // Convert the hash to a hex string
    return Array.from(new Uint8Array(hashBuffer))
        .map((b) => b.toString(16).padStart(2, '0'))
        .join('');
}
