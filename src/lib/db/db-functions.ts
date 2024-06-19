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

export async function insertNewEntry(detail: string) {
	const res = await db
		.insertInto('entries')
		.values({detail: detail})
		.execute();
}
