import { SQLocal } from 'sqlocal';

export const { getDatabaseFile } = new SQLocal('database.sqlite3');

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
