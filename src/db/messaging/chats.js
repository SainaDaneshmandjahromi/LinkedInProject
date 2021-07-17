import { getDb } from '@/db'

export async function createChatsTable() {
    await getDb().exec(`
        CREATE TABLE IF NOT EXISTS chats (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            firstParticipantId INTEGER NOT NULL,
            secondParticipantId INTEGER NOT NULL, 
            date TEXT,      
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


export async function getChatId(userOneId,userSecondId) {
    return getDb().get(
        `
        SELECT id FROM chats 
        WHERE (firstParticipantId = ? AND secondParticipantId = ?)
        `,
        userOneId,
        userSecondId,
    )
}

export async function checkChatExists(userOneId,userSecondId) {
    return getDb().get(
        `
        SELECT id,count(id) as cnt FROM chats 
        WHERE (firstParticipantId = ? AND secondParticipantId = ?)
        OR
        (secondParticipantId = ? AND firstParticipantId = ?)
        `,
        userOneId,
        userSecondId,
        userOneId,
        userSecondId,
    )
}



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
        INSERT INTO chats (firstParticipantId, secondParticipantId) values (?, ?)
       `,
        chat.firstParticipantId,
        chat.secondParticipantId,
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




