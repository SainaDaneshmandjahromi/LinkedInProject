import { getDb } from '@/db'


export async function createAccomplishmentsTable() {
    await getDb().exec(`
        CREATE TABLE IF NOT EXISTS accomplishments (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            userId INTEGER NOT NULL,
            FOREIGN KEY (userId) REFERENCES users(id)
        )
    `)
}

export async function getAccomplishmentsByUserId(userId) {
    return getDb().all(`
        SELECT * FROM accomplishments
        WHERE userId = ?
        `,
        userId
    )
}

export async function insertAccomplishment(accomplishment) {
    return getDb().run(`
        INSERT INTO accomplishments (name, userId) 
        VALUES (?, ?)
        `,
        accomplishment.name,
        accomplishment.userId
    )
}

export async function updateAccomplishment(id, newAccomplishment) {
    return getDb().run(`
        UPDATE accomplishments
        SET name = ?
        WHERE id = ?
        `,
        newAccomplishment.name,
        id
    )
}

export async function deleteAccomplishment(id) {
    return getDb().run(`
        DELETE FROM accomplishments
        WHERE id = ?
        `,
        id
    )
}
