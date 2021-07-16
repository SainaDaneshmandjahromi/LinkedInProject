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
        userChat.messageUnreadCount,
        userChat.archiveChatStat,
        userChat.readChatStat,
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
        WHERE userId = ? AND (readChatStat = ? OR messageUnreadCount != 0)
        `,
        userId,
        "NotRead"
    )
}

export async function updateReadStat(thischatId, thisuserId, newStat) {
    return getDb().run(
        `
        UPDATE userChats SET readChatStat = ? 
        WHERE chatId = ? AND userId = ?
        `,
        newStat,
        thischatId,
        thisuserId
    )
}

export async function updateArchiveStat(thischatId, thisuserId, newStat) {
    return getDb().run(
        `
        UPDATE userChats SET archiveChatStat = ? 
        WHERE chatId = ? AND userId = ?
        `,
        newStat,
        thischatId,
        thisuserId
    )
}

export async function clearUnreadCount(thischatId, thisuserId) {
    return getDb().run(
        `
        UPDATE userChats SET  messageUnreadCount = ? 
        WHERE chatId = ? AND userId = ?
        `,
        0,
        thischatId,
        thisuserId
    )
}

export async function addUnreadCount(thischatId, thisuserId) {
    return getDb().run(
        `
        UPDATE userChats SET  messageUnreadCount = messageUnreadCount + 1
        WHERE chatId = ? AND userId != ?
        `,
        thischatId,
        thisuserId
    )
}