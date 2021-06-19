import { getDb } from '@/db'

export async function createSkillsTable() {
    await getDb().exec(`
        CREATE TABLE IF NOT EXISTS skills (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        FOREIGN KEY (userId) REFERENCES users (id)
        )
    `)
}

export async function getSkillsByUserId(id) {
    return getDb().all(`
        SELECT * FROM skills
        WHERE userId = ?
        `,
        id
    )
}

export async function insertSkill(skill) {
    return getDb().run(`
        INSERT INTO skills (name, userId) values (?, ?)
        `,
        skill.name,
        skill.userId
    )
}

export async function updateSkill(id, newSkill){
    return getDb().run(`
        UPDATE skills
        SET
            name = ?,
        WHERE id = ?
        `,
        newSkill.name,
        id
    )
}

export async function deleteSkill(id){
    return getDb().run(`
        DELETE FROM skills
        WHERE id = ?
        `,
        id
    )
}
