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

export async function getMutualConnectionsCount(userOneId,userTwoId) {
    return getDb().get(
        `
        SELECT count(distinct connectedId) as cnt FROM (SELECT connectedOneId as connectedId FROM connections 
        WHERE connectedTwoId = ? 
        UNION
        SELECT connectedTwoId as connectedId FROM connections 
        WHERE connectedOneId = ?) 
        WHERE connectedId IN (SELECT connectedOneId as connectedId FROM connections 
            WHERE connectedTwoId = ? 
            UNION
            SELECT connectedTwoId as connectedId FROM connections 
            WHERE connectedOneId = ?)
        `,
        userOneId,
        userOneId,
        userTwoId,
        userTwoId
    )
}

export async function getAllPeopleYouMayKnow(userId) {
    return getDb().all(
        ` 
        SELECT distinct connectedTwoId as connectedId FROM connections WHERE connectedOneId IN (
            SELECT connectedOneId as connectedId FROM connections 
            WHERE connectedTwoId = ? 
            UNION
            SELECT connectedTwoId as connectedId FROM connections 
            WHERE connectedOneId = ?) AND connectedTwoId NOT IN(
            SELECT connectedOneId FROM connections WHERE 
            connectedTwoId = ?
            UNION
            SELECT connectedTwoId as connectedId FROM connections 
            WHERE connectedOneId = ?
            ) AND connectedTwoId != ?
        UNION
        SELECT distinct connectedOneId as connectedId FROM connections WHERE connectedTwoId IN (
            SELECT connectedOneId as connectedId FROM connections 
            WHERE connectedTwoId = ? 
            UNION
            SELECT connectedTwoId as connectedId FROM connections 
            WHERE connectedOneId = ?) AND connectedOneId NOT IN(
            SELECT connectedOneId FROM connections WHERE 
            connectedTwoId = ?
            UNION
            SELECT connectedTwoId as connectedId FROM connections 
            WHERE connectedOneId = ?
            ) AND connectedOneId != ?
             

        `,
        userId,
        userId,
        userId,
        userId,
        userId,
        userId,
        userId,
        userId,
        userId,
        userId
    )
}