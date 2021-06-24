import { getDb } from '@/db'

//exec for parameterless query 
export async function createCommentsTable() {
    await getDb().exec(`
        CREATE TABLE IF NOT EXISTS comments (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            userID INTEGER,
            postID INTEGER,
            text TEXT NOT NULL,
            date DATE,
            FOREIGN KEY (userId) REFERENCES users (id),
            FOREIGN KEY (postId) REFERENCES posts (id)
            )
    `)
}


export async function insertComment(user,post,comment) {
    return getDb().run(
        `
        INSERT INTO comments (text,date,userID,postID) values (?, ?,?, ?)
       `,
        comment.text,
        comment.date, 
        post.id,
        user.id
    )
}

