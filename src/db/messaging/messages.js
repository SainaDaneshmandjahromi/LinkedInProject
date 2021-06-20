import { getDb } from '@/db'

export async function createMessagesTable() {
    await getDb().exec(`
        CREATE TABLE IF NOT EXISTS messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        userId INTEGER,
        text TEXT NOT NULL,
        date TEXT NOT NULL,
        FOREIGN KEY (userId) REFERENCES users (id)
        )
    `)
}

// export async function getAllUsers(userId) {
//     return getDb().all(`
//         SELECT * FROM messages WHERE messages.userId = userId
//     `)
// }

export async function sendMessage(message) {
    return getDb().run(
        `
        INSERT INTO messages (userId, text, date) values (?, ?, ?)
       `,
        message.userId,
        message.text,
        message.date
    )
}

