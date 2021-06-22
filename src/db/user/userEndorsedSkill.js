import { getDb } from '@/db'


export async function createUserEndorsedSkillTable() {
    await getDb().exec(`
        CREATE TABLE IF NOT EXISTS user_endorsed_skill (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            userId INTEGER NOT NULL,
            skillId INTEGER NOT NULL,
            FOREIGN KEY (userId) REFERENCES users(id),
            FOREIGN KEY (skillId) REFERENCES skills(id)
        )
    `)
}

export async function getUserEndorsedSkillsByUserId(userId) {
    return getDb().get(`
        SELECT * FROM user_endorsed_skill
        JOIN skills ON user_endorsed_skill.skillId = skills.id
        WHERE userId = ?
        `,
        userId
    )
}

export async function insertUserEndorsedSkill(userEndorsedSkill) {
    return getDb().run(`
        INSERT INTO user_endorsed_skill (userId, skillId) 
        VALUES (?, ?)
        `,
        userEndorsedSkill.userId,
        userEndorsedSkill.skillId
    )
}

export async function deleteUserEndorsedSkill(id) {
    return getDb().run(`
        DELETE FROM user_endorsed_skill
        WHERE id = ?
        `,
        id
    )
}


