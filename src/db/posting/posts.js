import { getDb } from '@/db'

//exec for parameterless query 
export async function createPostsTable() {
    await getDb().exec(`
        CREATE TABLE IF NOT EXISTS posts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            userId INTEGER,
            text TEXT NOT NULL,
            media TEXT ,
            date DATE,
            FOREIGN KEY (userId) REFERENCES users (id)
            )
    `)
}

//all for getting list multiple rows
// get for one row 
export async function getUserPosts(user) {
    return getDb().all(`
        SELECT * FROM posts
         WHERE
          userId =${user.id}
    `)
}

export async function getUserPostsAndPostLikes(user) {
    return getDb().all(`
        SELECT * FROM posts, post_likes
         WHERE
          posts.userId =${user.id} and posts.id = post_likes.postId
    `)
}

// run is like exec but has param 
export async function insertPost(user,post) {
    return getDb().run(
        `
        INSERT INTO posts (text,media,date,userId) values (?,?,?,?)
       `,
        post.text,
        post.media, 
        post.date,
        user.id
    )
}
