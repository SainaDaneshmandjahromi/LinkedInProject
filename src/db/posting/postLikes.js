import { getDb } from '@/db'


export async function createPostLikesTable() {
    await getDb().exec(`
        CREATE TABLE IF NOT EXISTS post_likes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            userId INTEGER,
            postId INTEGER,
            FOREIGN KEY (userId) REFERENCES users (id),
            FOREIGN KEY (postId) REFERENCES posts (id)
        )
    `)
}

export async function getPostLikes(postId) {
    return getDb().all( `
        SELECT * FROM post_likes
        WHERE
        post_likes.postId = ?
        `,
        postId
    )
}


export async function getPostLikesCount(postId) {
    return getDb().get( `
    SELECT 
    count(distinct id) as cnt from post_likes
     WHERE 
     post_likes.postId = ?
    `,
    postId
    )
}


export async function like_post(userId,postId) {
    return getDb().run(
        `
        INSERT INTO post_likes (postId,userId) values (?, ?)
       `,
        postId,
        userId
    )
}
