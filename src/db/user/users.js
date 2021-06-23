import { getDb } from '@/db'


export async function createUsersTable() {
    await getDb().exec(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL,
            birthday TEXT,
            intro TEXT,
            about TEXT,
            background TEXT,
            location TEXT,
            currentCompany TEXT
        )
    `)
}

export async function getUserById(id) {
    return getDb().get(`
        SELECT * FROM users
        WHERE id = ?
        `,
        id
    )
}

export async function getUserByUsername(username){
    return getDb().get(`
        SELECT * FROM users
        WHERE username = ?
        `,
        username
    )
}

export async function getAllUsers() {
    return getDb().all(`
        SELECT * FROM users
    `)
}

export async function insertUser(user) {
    return getDb().run(`
        INSERT INTO users (username, password) 
        VALUES (?, ?)
        `,
        user.username,
        user.password
    )
}

export async function updateUser(id, newUser) {
    return getDb().run(`
        UPDATE users
        SET username = ?,
            password = ?,
            birthday = ?,
            intro = ?,
            about = ?,
            background = ?
        WHERE id = ?
        `,
        newUser.username,
        newUser.password,
        newUser.birthday,
        newUser.intro,
        newUser.about,
        newUser.background,
        id
    )
}
