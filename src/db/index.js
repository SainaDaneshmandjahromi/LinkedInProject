import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

// user
import { createUsersTable } from '@/db/user/users'
import { createAccomplishmentsTable } from '@/db/user/accomplishments'
import { createSkillsTable } from '@/db/user/skills'
import { createLanguagesTable } from '@/db/user/languages'
import { createUserLanguageTable } from '@/db/user/userLanguage'
import { createFavoritesTable } from '@/db/user/favorites'
import { createUserEndorsedSkillTable } from '@/db/user/userEndorsedSkill'
import { createInvitationTable } from '@/db/user/invitations'

// posting
import { createPostsTable } from '@/db/posting/posts'
import {createCommentsTable}  from '@/db/posting/comments'
import {createPostLikesTable } from '@/db/posting/postLikes'
// import {createCommentLikesTable } from '@/db/posting/commentLikes'

// messaging
import { createChatsTable } from '@/db/messaging/chats'
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

// HELPERS:
// exec for parameterless query
// all for getting list multiple rows
// get for one row
// run is like exec but has param
// https://github.com/kriasoft/node-sqlite
export async function createTables() {

    // TODO set ON DELETE and ON UPDATE for all tables


    // user tables
    await createUsersTable()
    await createAccomplishmentsTable()
    await createSkillsTable()
    await createLanguagesTable()
    await createUserLanguageTable()
    await createFavoritesTable()
    await createUserEndorsedSkillTable()
    await createInvitationTable()

        
    // messaging tables  //DO NOT CHANGE THE PLACE
    await createChatsTable()
    await createMessagesTable()
 
    // posting tables
    await createPostsTable()
    await createCommentsTable() 
    await createPostLikesTable() 
    await createCommentLikesTable() 
}

export async function generateRealData() {
    // to be filled!
}

export async function generateFakeData() {
    // to be filled!
}
