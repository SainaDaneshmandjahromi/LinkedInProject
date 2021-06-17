const sqlite3 = require('sqlite3').verbose()
let db

export const getDatabase = () => {
    if (!db || !db.open) {
        db = new sqlite3.Database('base.db')
    }
    return db
}

export const closeDatabase = () => {
    if (db){
        db.close()
    }
}

export const initialTables = () => {
    return new Promise((resolve, reject) => {
        let db = getDatabase()
        db.serialize(() => {
            db.run(`CREATE TABLE if not exists TreeTable (id int primary key, name varchar(64), fatherId int)`)
            db.run(`CREATE TABLE IF NOT EXISTS ProductTable (id int primary key, name varchar(64))`)
            resolve()
        })
    })
}
