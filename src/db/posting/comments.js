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


export async function insertComment(user,post,comment) {
    return getDb().run(
        `
        INSERT INTO comments (text,date,userId,postId) values (?, ?, ?, ?)
       `,
        
        comment.text,
        comment.date, 
        post.id,
        user.id
    )
}

//get post comments and likes of each comment
export async function getPostComments(post) {
    return getDb().all(`
        SELECT * FROM comments
        WHERE
        postId =${post.id} 
    `)
}
//get one comment replies and likes of each reply
export async function getCommentReplies(comment) {
    return getDb().all(`
        SELECT * FROM comments, comment_likes
        WHERE
        repliedCommentId =${comment.id} and comments.id = comment_likes.commentId
    `)
}