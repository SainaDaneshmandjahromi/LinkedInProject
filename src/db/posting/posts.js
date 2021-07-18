import { getDb } from '@/db'

//exec for parameterless query 
export async function createPostsTable() {
    await getDb().exec(`
        CREATE TABLE IF NOT EXISTS posts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            userId INTEGER,
            sharedPostId INTEGER DEFAULT NULL ,
            text TEXT NOT NULL,
            media TEXT ,
            date DATE,
            FOREIGN KEY (userId) REFERENCES users (id),
            FOREIGN KEY (sharedPostId) REFERENCES posts (id)
            )
    `)
}

//all for getting list multiple rows
// get for one row 
export async function getUserPosts(userId) {
    return getDb().all(`
        SELECT * FROM posts
         WHERE
          userId = ?
    `,
    userId
    )
}

export async function getFeedPosts(userId) {
    return getDb().all(`
    SELECT * From posts
     where
        (id In  
            (SELECT id FROM posts 
                where
                    posts.userId in 
                        (SELECT connectedOneId from connections
                            where connectedTwoId = ?) or
                    posts.userId in 
                    (SELECT connectedTwoId from connections
                            where connectedOneId = ?)
                )
            )  or
        
        ( id In (
        SELECT post_likes.postId FROM post_likes, connections
            WHERE(
            (connectedOneId = ? and connectedTwoId = post_likes.userId)
            or
            (connectedTwoId = ? and connectedOneId  = post_likes.userId)
            )
        )
        ) or 
        (id In (
        SELECT comments.postId from comments,connections
        WHERE (
            (connectedOneId = ? and connectedTwoId = comments.userId)
            or
            (connectedTwoId = ? and connectedOneId  = comments.userId)
            )
        )
        )
    `,
    userId,
    userId,
    userId,
    userId,
    userId,
    userId
    )
}


export async function getPostById(postId) {
    return getDb().get(`
        SELECT * FROM posts
         WHERE
          id = ?
    `,
    postId
    )
}
export async function getUserPostsAndPostLikes(userId) {
    return getDb().all(`
        SELECT * FROM posts, post_likes
         WHERE
          posts.userId = ? and posts.id = post_likes.postId
    `,
    userId
    )
}

// run is like exec but has param 
export async function insertPost(userId,post) {
    return getDb().run(
        `
        INSERT INTO posts (text,media,date,userId) values (?,?,?,?)
       `,
        post.text,
        post.media, 
        post.date,
        userId
    )
}
// run is like exec but has param 
export async function sharePost(userId,post,sharepostid) {
    return getDb().run(
        `
        INSERT INTO posts (text,media,date,userId, sharedPostId) values (?,?,?,?,?)
       `,

        post.text,
        post.media, 
        post.date,
        userId,
        sharepostid
    )
}
