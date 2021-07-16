import { getDb } from '@/db'

export async function createChatsTable() {
    await getDb().exec(`
        CREATE TABLE IF NOT EXISTS chats (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            firstParticipantId INTEGER NOT NULL,
            secondParticipantId INTEGER NOT NULL,
            archiveStat TEXT NOT NULL,
            FOREIGN KEY (firstParticipantId) REFERENCES users (id),
            FOREIGN KEY (secondParticipantId) REFERENCES users (id)
        )
    `)
}

export async function getAllChats(userId) {
    return getDb().all(
        `
        SELECT * FROM chats 
        WHERE firstParticipantId = ? OR secondParticipantId = ?
        `,
        userId,
        userId
    )
}

export async function getAllArchivedChats(userId) {
    return getDb().all(
        `
        SELECT * FROM chats 
        WHERE (firstParticipantId = ? OR secondParticipantId = ?) AND (archiveStat = 'Archived')
        `,
        userId,
        userId,
    )
}

// export async function getAllUnreadChats(userId) {
//     return getDb().all(
//         `
//         SELECT * FROM chats WHERE id IN (
//         SELECT chats.id FROM messages
//         JOIN chats ON chats.id = messages.chatId 
//         WHERE 
//         messages.messageStat = "Unread" AND  count(distinct messages.id) != 0 
//         AND messages.userId != ? )
//         `,
//         userId,
//     )
// }

export async function getChatByChatId(chatId) {
    return getDb().get(
        `
        SELECT * FROM chats 
        WHERE id = ? 
        `,
        chatId
    )
}

export async function insertChat(chat) {
    return getDb().run(
        `
        INSERT INTO chats (firstParticipantId, secondParticipantId, archiveStat) values (?, ?, ?)
       `,
        chat.firstParticipantId,
        chat.secondParticipantId,
        chat.archiveStat
    )
}

export async function deleteChat(chatId) {
    return getDb().all(
        `
        DELETE FROM chats 
        WHERE id = ?
        `,
         chatId
    )
}

export async function updateArchiveChatStat(chatId,newStat) {
    return getDb().all(
        `
        UPDATE chats SET archiveStat = ? 
        WHERE id = ?
        `,
        newStat,
        chatId
    )
}



