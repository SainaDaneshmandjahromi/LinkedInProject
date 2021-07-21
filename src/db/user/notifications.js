import { getDb } from '@/db'


export const TYPE_BIRTHDAY = 'TYPE_BIRTHDAY'
export const TYPE_PROFILE_SEEN = 'TYPE_PROFILE_SEEN'
export const TYPE_POST_LIKE = 'TYPE_POST_LIKE'
export const TYPE_POST_COMMENT = 'TYPE_POST_COMMENT'
export const TYPE_COMMENT_LIKE = 'TYPE_COMMENT_LIKE'
export const TYPE_COMMENT_REPLAY = 'TYPE_COMMENT_REPLAY'
export const TYPE_ENDORSE = 'TYPE_ENDORSE'
export const TYPE_CHANGE_JOB_POSITION = 'TYPE_CHANGE_JOB_POSITION'

export async function createNotificationsTable() {
    await getDb().exec(`
        CREATE TABLE IF NOT EXISTS notifications (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            receiverUserId INTEGER NOT NULL,
            transmitterUserId INTEGER NOT NULL,
            type TEXT NOT NULL,
            isRead INTEGER NOT NULL,
            postId INTEGER,
            commentId INTEGER,
            FOREIGN KEY (receiverUserId) REFERENCES users(id),
            FOREIGN KEY (transmitterUserId) REFERENCES users(id),
            FOREIGN KEY (postId) REFERENCES posts(id),
            FOREIGN KEY (commentId) REFERENCES comments(id)
        )
    `)
}

export async function getUnreadNotificationByReceiverUserId(id) {
    return getDb().all(`
        SELECT * FROM notifications
        WHERE receiverUserId = ? AND isRead = 0
        `,
        id
    )
}

export async function getReadNotificationByReceiverUserId(id) {
    return getDb().all(`
        SELECT * FROM notifications
        WHERE receiverUserId = ? AND isRead = 1
        `,
        id
    )
}

export async function insertNotification(notification) {
    return getDb().run(`
        INSERT INTO notifications (receiverUserId, transmitterUserId, type, isRead, postId, commentId)
        VALUES (?, ?, ?, ?, ?, ?)
        `,
        notification.receiverUserId,
        notification.transmitterUserId,
        notification.type,
        notification.isRead,
        notification.postId,
        notification.commentId
    )
}

export async function updateNotification(id, newNotification) {
    return getDb().run(`
        UPDATE notifications
        SET isRead = ?
        WHERE id = ?
        `,
        newNotification.isRead,
        id
    )
}

export async function updateNotificationsByUserId(receiverUserId, newNotification) {
    return getDb().run(`
        UPDATE notifications
        SET isRead = ?
        WHERE receiverUserId = ?
        `,
        newNotification.isRead,
        receiverUserId
    )
}