import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

// user
import { createUsersTable } from '@/db/user/users'
import { createAccomplishmentsTable } from '@/db/user/accomplishments'
import { createSkillsTable } from '@/db/user/skills'
import { createLanguagesTable } from '@/db/user/languages'
import { createUserLanguageTable } from '@/db/user/userLanguage'

// posting
import { createPostsTable } from '@/db/posting/posts'

// messaging
import { createMessagesTable } from '@/db/messaging/messages'

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
    await createAccomplishmentsTable()
    await createSkillsTable()
    await createLanguagesTable()
    await createUserLanguageTable()

    await createPostsTable()

    await createMessagesTable()

    //add other tables here
}

// TODO: add fake data generator function
