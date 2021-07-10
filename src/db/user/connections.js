import { getDb } from '@/db'


export async function createConnectionsTable() {
    await getDb().exec(`
        CREATE TABLE IF NOT EXISTS connections (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            connectedOneId INTEGER NOT NULL,
            connectedTwoId INTEGER NOT NULL,
            date NTEXT,
            FOREIGN KEY (connectedOneId) REFERENCES users(id),
            FOREIGN KEY (connectedTwoId) REFERENCES users(id)
        )
    `)
}

export async function newConnection(connection) {
    return getDb().run(
        `
        INSERT INTO connections (connectedOneId, connectedTwoId, date) values (?, ?, ?)
       `,
        connection.connectedOneId,
        connection.connectedTwoId,
        connection.date
    )
}

export async function removeConnection(connectionId) {
    return getDb().all(
        `
        DELETE FROM connections 
        WHERE id = ?
        `,
        connectionId
    )
}

export async function getAllConnections(userId) {
    return getDb().all(
        `
        SELECT * FROM connections 
        WHERE connectedOneId = ? OR connectedTwoId = ?
        `,
        userId,
        userId
    )
}
