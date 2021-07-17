import { getDb } from '@/db'

export async function createMessagesTable() {
    await getDb().exec(`
        CREATE TABLE IF NOT EXISTS messages (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            userId INTEGER NOT NULL,
            chatId INTEGER NOT NULL,
            messageStat TEXT NOT NULL,
            content TEXT NOT NULL,  
            date NTEXT,
            FOREIGN KEY (userId) REFERENCES users (id)
            FOREIGN KEY (chatId) REFERENCES chats (id)
        )
    `)
}



export async function getAllMessages(chatId) {
    return getDb().all(`
        SELECT * FROM messages WHERE messages.chatId = ?
    `,
    chatId
    )
}

export async function getSearchedMessages(chatId,content) {
    return getDb().all(`
        SELECT * FROM messages WHERE messages.chatId = ? AND messages.content LIKE  '%${content}%'
    `,
    chatId
    )
}

export async function sendMessage(message) {
    return getDb().run(
        `
        INSERT INTO messages (userId, chatId, content, date,  messageStat) values (?, ?, ?, ?, ?)
       `,
        message.userId,
        message.chatId,
        message.content,
        message.date,
        message.messageStat
    )
}

export async function updateMessagesStat(thischatId, thisuserId, newStat) {
    return getDb().all(
        `
        UPDATE messages SET messageStat = ? 
        WHERE chatId = ? AND userId != ?
        `,
        newStat,
        thischatId,
        thisuserId
    )
}


