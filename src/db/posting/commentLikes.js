import { getDb } from '@/db'


export async function createCommentLikesTable() {
    await getDb().exec(`
        CREATE TABLE IF NOT EXISTS comment_likes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            userId INTEGER,
            commentId INTEGER,
            FOREIGN KEY (userId) REFERENCES users (id),
            FOREIGN KEY (commentId) REFERENCES comments (id)
        
            )
    `)
}



export async function like_comment(userId,commentId) {
    return getDb().run(
        `
        INSERT INTO comment_likes (userId,commentId) values (?, ?)
       `,
        userId,
        commentId
    )
} 

export async function getCommentLikes(commentId) {
    return getDb().all(
        `
        select * from comment_likes
         where
         commentId = ?
       `,
        
        commentId
    )
}
