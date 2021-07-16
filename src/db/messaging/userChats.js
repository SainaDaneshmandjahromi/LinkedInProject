import { getDb } from '@/db'

export async function createUserChatsTable() {
    await getDb().exec(`
        CREATE TABLE IF NOT EXISTS userChats (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            userId INTEGER NOT NULL,
            chatId INTEGER NOT NULL,
            messageUnreadCount INTEGER NOT NULL,
            archiveChatStat TEXT NOT NULL,
            readChatStat TEXT NOT NULL, 
            FOREIGN KEY (userId) REFERENCES users (id),
            FOREIGN KEY (chatId) REFERENCES chats (id)
        )
    `)
}

export async function insertUserChat(userChat) {
    return getDb().run(
        `
        INSERT INTO userChats (userId, chatId, messageUnreadCount, archiveChatStat, 
            readChatStat) values (?, ?, ?, ?, ?)
       `,
        userChat.userId,
        userChat.chatId,
        0,
        "NotArchived",
        "NotRead",
    )
}

export async function getUserChat(chatId, userId) {
    return getDb().get(
        `
        SELECT * FROM userChats 
        WHERE userId = ? AND chatId = ?
        `,
        userId,
        chatId
    )
}

export async function getArchivedChats(userId) {
    return getDb().all(
        `
        SELECT * FROM userChats JOIN chats 
        ON userChats.chatId = chats.id 
        WHERE userId = ? AND archiveChatStat = ?
        `,
        userId,
        "Archived"
    )
}

export async function getNotReadChats(userId) {
    return getDb().all(
        `
        SELECT * FROM userChats JOIN chats 
        ON userChats.chatId = chats.id 
        WHERE userId = ? AND readChatStat = ?
        `,
        userId,
        "NotRead"
    )
}