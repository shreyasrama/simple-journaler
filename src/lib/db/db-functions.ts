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

export async function insertNewEntries(details: {}[]) {
	const res = await db
		.insertInto('entries')
		.values(details)
		.execute();
}

export async function getEntriesOnDay(date: string) {
	const res = await db
		.selectFrom('entries')
		.selectAll()
		.where('created_at', '>', date+' 00:00:00')
		.where('created_at', '<', date+' 23:59:59')
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
