import {v4 as uuidv4} from 'uuid';

import { db } from "./db-init";

export async function insertNewUser(username: string) {
	const res = await db
		.insertInto('users')
		.values({
			id: uuidv4(),
			username: username
		})
		.execute();
}

export async function getUser() {
	const user = await db
		.selectFrom('users')
		.select(['username'])
		.limit(1)
		.executeTakeFirst();
	
	if (user) { return user; }
}

export async function insertNewEntry(newEntry: any) {
	const res = await db
		.insertInto('entries')
		.values({
			id: uuidv4(),
			detail: newEntry
		})
		.execute();

	return res;
}

export async function deleteEntry(entryId: string) {
	const res = await db
		.deleteFrom('entries')
		.where('entries.id', '=', entryId)
		.execute();

	return res;
}

export async function getEntriesForMonth(month: string, year: string) {
	const res = await db
		.selectFrom('entries')
		.selectAll()
		.where('created_at', '>', year+'-'+month+'-01')
		.where('created_at', '<', year+'-'+month+'-31')
		.execute();
	
	return res;
}

export async function searchEntries(search: string) {
	const res = await db
		.selectFrom('entries')
		.selectAll()
		.where('detail', 'like', '%'+search+'%')
		.execute()

	return res;
}

export async function getYearRange() {
	const earliestYear = await db
		.selectFrom('entries')
		.select('entries.created_at as date')
		.limit(1)
		.orderBy('date', 'asc')
		.executeTakeFirst();

	const date1 = new Date(earliestYear?.date).toLocaleDateString('en-US', {year: 'numeric'});

	const latestYear = await db
		.selectFrom('entries')
		.select('entries.created_at as date')
		.limit(1)
		.orderBy('date', 'desc')
		.executeTakeFirst();

	const date2 = new Date(latestYear?.date).toLocaleDateString('en-US', {year: 'numeric'});

	let yearList = [];
	for (let i = Number(date1); i <= Number(date2); i++) {
		yearList.push(i)
	}

	return yearList.reverse()
}
