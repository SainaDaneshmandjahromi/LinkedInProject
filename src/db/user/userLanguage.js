import { getDb } from '@/db'


export async function createUserLanguageTable() {
    await getDb().exec(`
        CREATE TABLE IF NOT EXISTS user_language (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            userId INTEGER NOT NULL,
            languageId INTEGER NOT NULL,
            FOREIGN KEY (userId) REFERENCES users(id),
            FOREIGN KEY (languageId) REFERENCES languages(id)
        )
    `)
}

export async function getUserLanguagesByUserId(userId) {
    return getDb().get(`
        SELECT * FROM user_language
        JOIN languages ON user_language.languageId = languages.id
        WHERE userId = ?
        `,
        userId
    )
}

export async function insertUserLanguage(userLanguage) {
    return getDb().run(`
        INSERT INTO user_language (userId, languageId) 
        VALUES (?, ?)
        `,
        userLanguage.userId,
        userLanguage.languageId
    )
}

export async function deleteUserLanguage(id) {
    return getDb().run(`
        DELETE FROM user_language
        WHERE id = ?
        `,
        id
    )
}
