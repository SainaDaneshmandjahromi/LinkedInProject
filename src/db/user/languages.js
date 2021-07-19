import { getDb } from '@/db'


export async function createLanguagesTable() {
    await getDb().exec(`
        CREATE TABLE IF NOT EXISTS languages (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL UNIQUE
        )
    `)
}

export async function dropLanguagesTable() {
    return getDb().exec(`
        DROP TABLE IF EXISTS languages
        `
    )
}

export async function getLanguageById(id) {
    return getDb().get(`
        SELECT * FROM languages
        WHERE id = ?
        `,
        id
    )
}

export async function getAllLanguages() {
    return getDb().all(`
        SELECT * FROM languages
    `)
}

export async function insertLanguage(language) {
    return getDb().run(`
        INSERT INTO languages (name) 
        VALUES (?)
        `,
        language.name
    )
}

export async function updateLanguage(id, newLanguage) {
    return getDb().run(`
        UPDATE languages
        SET name = ?
        WHERE id = ?
        `,
        newLanguage.name,
        id
    )
}

export async function deleteLanguage(id) {
    return getDb().run(`
        DELETE FROM languages
        WHERE id = ?
        `,
        id
    )
}
