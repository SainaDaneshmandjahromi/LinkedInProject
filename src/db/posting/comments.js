import { getDb } from '@/db'

//exec for parameterless query 
export async function createCommentsTable() {
    await getDb().exec(`
        CREATE TABLE IF NOT EXISTS comments (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            userId INTEGER,
            postId INTEGER,
            repliedCommentId INTEGER,
            text TEXT NOT NULL,
            date DATE,
            FOREIGN KEY (userId) REFERENCES users (id),
            FOREIGN KEY (postId) REFERENCES posts (id),
            FOREIGN KEY (repliedCommentId) REFERENCES comments(id)
            )
    `)
}


export async function insertComment(userId,postId,comment) {
    return getDb().run(
        `
        INSERT INTO comments (text,date,userId,postId) values (?, ?, ?, ?)
       `,
        
        comment.text,
        comment.date, 
        userId,
        postId
    )
}


export async function insertReply(userId,postId,commentId,reply) {
    return getDb().run(
        `
        INSERT INTO comments (text,date,userId,postId,repliedCommentId) values (?, ?, ?, ?, ?)
       `,
        
        reply.text,
        reply.date, 
        userId,
        postId,
        commentId,
        
    )
}


//get post comments and likes of each comment
export async function getPostComments(postId) {
    return getDb().all(`
        SELECT * FROM comments
        WHERE
        postId =? and repliedCommentId is NULL
    `, 
    postId)
}
//get one comment replies and likes of each reply
export async function getCommentReplies(commentId) {
    return getDb().all(`
        SELECT * FROM comments
        WHERE
        repliedCommentId = ? 
    `,
    commentId)
}