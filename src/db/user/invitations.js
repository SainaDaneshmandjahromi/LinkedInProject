import { getDb } from '@/db'


export async function createInvitationsTable() {
    await getDb().exec(`
        CREATE TABLE IF NOT EXISTS invitations (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            invitorId INTEGER NOT NULL,
            invitedId INTEGER NOT NULL,
            date NTEXT,
            FOREIGN KEY (invitorId) REFERENCES users(id),
            FOREIGN KEY (invitedId) REFERENCES users(id)
        )
    `)
}

export async function getAllSentInvitations(userId) {
    return getDb().all(
        `
        SELECT * FROM invitations 
        WHERE invitorId = ?
        `,
        userId
    )
}

export async function getAllReceivedInvitations(userId) {
    return getDb().all(
        `
        SELECT * FROM invitations 
        WHERE invitedId = ?
        `,
        userId
    )
}

export async function sendInvitation(invitation) {
    return getDb().run(
        `
        INSERT INTO invitations (invitorId, invitedId, date) values (?, ?, ?)
       `,
        invitation.invitorId,
        invitation.invitedId,
        invitation.date
    )
}

export async function withdrawInvitation(invitationId) {
    return getDb().all(
        `
        DELETE FROM invitations 
        WHERE id = ?
        `,
        invitationId
    )
}