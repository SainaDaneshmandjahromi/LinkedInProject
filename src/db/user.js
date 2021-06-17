import { getDatabase } from './db'

export const queryAllProduct = () => {
    return new Promise((resolve, reject) => {

        getDatabase().all('select id, name from ProductTable', (err, rows) => {
            if (err) reject(err)
            resolve(rows || [])
        })
    })
}

export const insertProduct = (product) => {
    return new Promise((resolve, reject) => {
        let prepare = getDatabase().prepare('replace into ProductTable (id, name) values (?, ?)')
        prepare.run(product.id, product.name)
        prepare.finalize(err => {
            if (!err) resolve()
        })
    })
}
