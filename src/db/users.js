import { getDatabase } from './db'

export const getAllUsers = () => {
    return new Promise((resolve, reject) => {
        // getDatabase().all('select id, name from ProductTable', (err, rows) => {
        getDatabase().all('select * from users', (err, rows) => {
            if (err) reject(err)
            resolve(rows || [])
        })
    })
}

export const insertUser = (user) => {
    return new Promise((resolve, reject) => {
        // let prepare = getDatabase().prepare('replace into ProductTable (id, name) values (?, ?)')
        let prepare = getDatabase().prepare('INSERT INTO users (firstName, lastName) values (?, ?)')
        prepare.run(user.firstName, user.lastName)
        prepare.finalize(err => {
            if (!err) resolve()
        })
    })
}
