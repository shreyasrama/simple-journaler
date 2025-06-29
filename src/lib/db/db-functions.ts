import { v4 as uuidv4 } from 'uuid';

export async function insertNewUser(username: string) {
    const { db } = await import('./db-init');
    const res = await db
        .insertInto('users')
        .values({
            id: uuidv4(),
            username: username
        })
        .execute();
}

export async function getUser() {
    const { db } = await import('./db-init');
    const user = await db.selectFrom('users').select(['username']).limit(1).executeTakeFirst();

    if (user) {
        return user;
    }
}

export async function insertNewEntry(newEntry: string) {
    const { db } = await import('./db-init');
    const res = await db
        .insertInto('entries')
        .values({
            id: uuidv4(),
            detail: newEntry
        })
        .returning("id")
        .execute();

    return res;
}

export async function insertNewEntryOnDay(newEntry: any, date: string) {
    const { db } = await import('./db-init');
    const res = await db
        .insertInto('entries')
        .values({
            id: uuidv4(),
            created_at: date + ' 00:00:00',
            detail: newEntry
        })
        .returning("id")
        .execute();

    return res;
}

export async function deleteEntry(entryId: string) {
    const { db } = await import('./db-init');
    const res = await db.deleteFrom('entries').where('entries.id', '=', entryId).executeTakeFirst();

    return res;
}

export async function getEntriesForDay(day: string) {
    const { db } = await import('./db-init');
    const res = await db
        .selectFrom('entries')
        .selectAll()
        .where('created_at', '>=', day + ' 00:00:00')
        .where('created_at', '<=', day + ' 23:59:59')
        .execute();

    return res;
}

export async function getEntriesInRange(start: string, end: string) {
    const { db } = await import('./db-init');
    const res = await db
        .selectFrom('entries')
        .selectAll()
        .where('created_at', '>=', start)
        .where('created_at', '<=', end)
        .execute();

    return res;
}

export async function getEntriesForMonth(month: string, year: string) {
    const { db } = await import('./db-init');
    const res = await db
        .selectFrom('entries')
        .selectAll()
        .where('created_at', '>=', year + '-' + month + '-01')
        .where('created_at', '<=', year + '-' + month + '-31')
        .orderBy('created_at', 'asc')
        .execute();

    return res;
}

export async function getEntriesForToday() {
    const { db } = await import('./db-init');
    const today = new Date().toISOString().slice(0, 10);

    const res = await db
        .selectFrom('entries')
        .selectAll()
        .where('created_at', '>=', today)
        .execute();

    return res;
}

export async function searchEntries(search: string) {
    const { db } = await import('./db-init');
    const res = await db
        .selectFrom('entries')
        .selectAll()
        .where('detail', 'like', '%' + search + '%')
        .execute();

    return res;
}

export async function getYearRange() {
    const { db } = await import('./db-init');
    const earliestYear = await db
        .selectFrom('entries')
        .select('entries.created_at as date')
        .limit(1)
        .orderBy('date', 'asc')
        .executeTakeFirst();

    const date1 = new Date(earliestYear!.date).toLocaleDateString('en-US', { year: 'numeric' });

    const latestYear = await db
        .selectFrom('entries')
        .select('entries.created_at as date')
        .limit(1)
        .orderBy('date', 'desc')
        .executeTakeFirst();

    const date2 = new Date(latestYear!.date).toLocaleDateString('en-US', { year: 'numeric' });

    let yearList = [];
    for (let i = Number(date1); i <= Number(date2); i++) {
        yearList.push(i);
    }

    return yearList.reverse();
}
