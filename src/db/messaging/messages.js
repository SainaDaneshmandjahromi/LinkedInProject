import { getDb } from '@/db'

export async function createMessagesTable() {
    await getDb().exec(`
        CREATE TABLE IF NOT EXISTS messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        userId INTEGER,
        chatId INTEGER,
        text TEXT NOT NULL,
        date DATE,
        FOREIGN KEY (userId) REFERENCES users (id)
        FOREIGN KEY (chatId) REFERENCES chats (id)
        )
    `)
}


////Not checked
export async function getAllMessages(chat) {
    return getDb().all(`
        SELECT * FROM messages WHERE messages.chatId = ?
    `,
    chat.id
    )
}

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

