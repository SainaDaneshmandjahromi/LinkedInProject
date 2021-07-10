import { getDb } from '@/db'

export async function createMessagesTable() {
    await getDb().exec(`
        CREATE TABLE IF NOT EXISTS messages (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            userId INTEGER NOT NULL,
            chatId INTEGER NOT NULL,
            content TEXT NOT NULL,  
            date NTEXT,
            FOREIGN KEY (userId) REFERENCES users (id)
            FOREIGN KEY (chatId) REFERENCES chats (id)
        )
    `)
}


////Not checked
export async function getAllMessages(chatId) {
    return getDb().all(`
        SELECT * FROM messages WHERE messages.chatId = ?
    `,
    chatId
    )
}

export async function sendMessage(message) {
    return getDb().run(
        `
        INSERT INTO messages (userId, chatId, content, date) values (?, ?, ?, ?)
       `,
        message.userId,
        message.chatId,
        message.content,
        message.date
    )
}

