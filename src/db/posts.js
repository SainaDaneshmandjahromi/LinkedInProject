import { getDb } from '@/db/index'

//exec for parameterless query 
export async function createPostsTable() {
    await getDb().exec(`
        CREATE TABLE IF NOT EXISTS posts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        userID INTEGER,
        text TEXT NOT NULL,
        media TEXT DEFAULT NULL
        )
    `)
}

//all for getting list multiple rows
// get for one row 
export async function getUserPosts(user) {
    return getDb().all(`
        SELECT * FROM POSTS
         WHERE
          userID =${user.id}
    `)
}


// run is like exec but has param 
export async function insertPost(user,post) {
    return getDb().run(
        `
        INSERT INTO POSTS (text,media,userID) values (?, ?, ?)
       `,
        post.text,
        post.media, 
        user.id
    )
}
