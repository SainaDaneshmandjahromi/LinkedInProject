import { getDb } from '@/db'

export async function createLanguagesTable() {
    await getDb().exec(`
        CREATE TABLE IF NOT EXISTS languages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL
        )
    `)
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
        INSERT INTO language (name) values (?)
        `,
        language.name
    )
}