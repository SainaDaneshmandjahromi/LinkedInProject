import { getDb } from '@/db/index'

export async function createUsersTable() {
    await getDb().exec(`
        CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        firstName TEXT NOT NULL,
        lastName TEXT NOT NULL
        )
    `)
}

export async function getAllUsers() {
    return getDb().all(`
        SELECT * FROM users
    `)
}

export async function insertUser(user) {
    return getDb().run(
        `
        INSERT INTO users (firstName, lastName) values (?, ?)
       `,
        user.firstName,
        user.lastName
    )
}
