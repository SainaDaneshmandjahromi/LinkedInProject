import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

import { createUsersTable } from '@/db/users'

sqlite3.verbose()
let db

export async function openDb() {
    db = await open({
        filename: 'database.db',
        driver: sqlite3.Database
    })
}

export async function closeDb() {
    if (db) await db.close()
}

export function getDb() {
    return db
}

export async function createTables() {
    await createUsersTable()
    //add other tables here
}

// TODO: add fake data generator function
