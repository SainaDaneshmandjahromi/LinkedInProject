import { getDb } from '@/db'


export async function createUsersTable() {
    await getDb().exec(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL,
            avatar NVARCHAR(3),
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

export async function getUserByUsername(username) {
    return getDb().get(`
        SELECT * FROM users
        WHERE username = ?
        `,
        username
    )
}

export async function getUsersThatUsernameLike(username) { // TODO: unsafe
    return getDb().all(`
        SELECT * FROM users
        WHERE username LIKE '%${username}%' 
        `
    )
}

export async function getUsersThatLocationLike(location) { // TODO: unsafe
    return getDb().all(`
        SELECT * FROM users
        WHERE location LIKE '%${location}%' 
        `
    )
}

export async function getUsersThatCurrentCompanyLike(currentCompany) { // TODO: unsafe
    return getDb().all(`
        SELECT * FROM users
        WHERE currentCompany LIKE '%${currentCompany}%' 
        `
    )
}

export async function getAllUsers() {
    return getDb().all(`
        SELECT * FROM users
    `)
}

export async function insertUser(user) {
    return getDb().run(`
        INSERT INTO users (username, password, avatar, birthday, intro, about, background, location, currentCompany) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `,
        user.username,
        user.password,
        user.avatar,
        user.birthday,
        user.intro,
        user.about,
        user.background,
        user.location,
        user.currentCompany,
    )
}

export async function updateUser(id, newUser) {
    return getDb().run(`
        UPDATE users
        SET username = ?,
            password = ?,
            avatar = ?,
            birthday = ?,
            intro = ?,
            about = ?,
            background = ?,
            location = ?,
            currentCompany = ?
        WHERE id = ?
        `,
        newUser.username,
        newUser.password,
        newUser.avatar,
        newUser.birthday,
        newUser.intro,
        newUser.about,
        newUser.background,
        newUser.location,
        newUser.currentCompany,
        id
    )
}

