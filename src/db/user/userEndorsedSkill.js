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

export async function getEndorsedUsersBySkillId(skillId) {
    return getDb().all(`
        SELECT users.* FROM user_endorsed_skill
        JOIN users ON user_endorsed_skill.userId = users.id
        WHERE skillId = ?
        `,
        skillId
    )
}

export async function insertUserEndorsedSkill(userId, skillId) {
    return getDb().run(`
        INSERT INTO user_endorsed_skill (userId, skillId) 
        VALUES (?, ?)
        `,
        userId,
        skillId
    )
}

export async function deleteUserEndorsedSkill(userId, skillId) {
    return getDb().run(`
        DELETE FROM user_endorsed_skill
        WHERE userId = ? AND skillId = ?
        `,
        userId,
        skillId
    )
}


