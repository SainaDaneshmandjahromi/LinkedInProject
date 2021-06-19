import { getDb } from '@/db'

//exec for parameterless query 
export async function createUsersTable() {
    await getDb().exec(`
        CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL,
        password TEXT NOT NULL,
        birthday DATE,
        intro TEXT,
        about TEXT,
        background TEXT,
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

//all for getting list multiple rows
// get for one row 
export async function getAllUsers() {
    return getDb().all(`
        SELECT * FROM users
    `)
}

// run is like exec but has param 
export async function insertUser(user) {
    return getDb().run(`
        INSERT INTO users (username, password) values (?, ?)
        `,
        user.username,
        user.password
    )
}

export async function updateUser(id, newUser){
    return getDb().run(`
        UPDATE users
        SET
            username = ?,
            password = ?,
            birthday = ?,
            intro = ?,
            about = ?,
            background = ?,
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
