import { getDb } from '@/db'


export async function createFavoritesTable() {
    await getDb().exec(`
        CREATE TABLE IF NOT EXISTS favorites (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            content TEXT NOT NULL,
            userId INTEGER NOT NULL,
            FOREIGN KEY (userId) REFERENCES users(id)
        )
    `)
}

export async function getFavoritesByUserId(userId) {
    return getDb().all(`
        SELECT * FROM favorites
        WHERE userId = ?
        `,
        userId
    )
}

export async function insertFavorite(favorite) {
    return getDb().run(`
        INSERT INTO favorites (content, userId) 
        VALUES (?, ?)
        `,
        favorite.content,
        favorite.userId
    )
}

export async function updateFavorite(id, newFavorite) {
    return getDb().run(`
        UPDATE favorites
        SET content = ?
        WHERE id = ?
        `,
        newFavorite.content,
        id
    )
}

export async function deleteFavorite(id) {
    return getDb().run(`
        DELETE FROM favorites
        WHERE id = ?
        `,
        id
    )
}
