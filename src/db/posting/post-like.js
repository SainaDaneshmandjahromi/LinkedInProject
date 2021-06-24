import { getDb } from '@/db'


export async function createPostLikesTable() {
    await getDb().exec(`
        CREATE TABLE IF NOT EXISTS post_likes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        userID INTEGER,
        postID INTEGER,
        FOREIGN KEY (userId) REFERENCES users (id),
        FOREIGN KEY (postId) REFERENCES posts (id)
    
        )
    `)
}



export async function like_post(user,post) {
    return getDb().run(
        `
        INSERT INTO post_likes (postID,userID) values (?, ?)
       `,
        post.id,
        user.id
    )
}
