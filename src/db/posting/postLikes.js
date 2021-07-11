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

export async function getPostLikes(post) {
    return getDb().all( `
        SELECT * FROM post_likes
        WHERE
        post_likes.postId =${post.id} 
        `
    )
}


export async function like_post(user,post) {
    return getDb().run(
        `
        INSERT INTO post_likes (postId,userId) values (?, ?)
       `,
        post.id,
        user.id
    )
}
