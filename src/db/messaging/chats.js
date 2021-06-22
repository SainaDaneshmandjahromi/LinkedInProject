import { getDb } from '@/db'

export async function createChatsTable() {
    await getDb().exec(`
        CREATE TABLE IF NOT EXISTS chats (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        firstParticipantId INTEGER,
        secondParticipantId INTEGER,
        archiveStat TEXT CHECK(archive IN ('isNotArchive', 'isArchive')) NOT NULL DEFAULT 'isNotArchive',
        FOREIGN KEY (firstParticipantId) REFERENCES users (id),
        FOREIGN KEY (secondParticipantId) REFERENCES users (id)
        )
    `)
}

/////Not Checked
export async function getAllChats(user) {
    return getDb().all(
        `
        SELECT * FROM messages 
        WHERE firstParticipantId = ? or 
              secondParticipantId = ? 
        `,
         user.id,
         user.id
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

export async function deleteChat(chat) {
    return getDb().all(
        `
        DELETE FROM chats 
        WHERE id = ?
        `,
         chat.id
    )
}

export async function archiveChat(chat) {
    return getDb().all(
        `
        UPDATE chats SET archiveStat = ? 
        WHERE id = ?
        `,
         'isArchive',
         chat.id
    )
}

export async function unarchiveChat(chat) {
    return getDb().all(
        `
        UPDATE chats SET archiveStat = ? 
        WHERE id = ?
        `,
         'isNotArchive',
         chat.id
    )
}

