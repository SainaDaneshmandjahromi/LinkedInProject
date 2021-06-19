import { getDb } from '@/db/index'

//exec for parameterless query 
export async function createUsersTable() {
    await getDb().exec(`
        CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        firstName TEXT NOT NULL,
        lastName TEXT NOT NULL
        )
    `)
}

//all for getting list multiple rows
// get for one row 
export async function getAllUsers() {
    return getDb().all(`
        SELECT * FROM users
    `)
}

// run is like exec but has param 
export async function insertUser(user) {
    return getDb().run(
        `
        INSERT INTO users (firstName, lastName) values (?, ?)
       `,
        user.firstName,
        user.lastName
    )
}
