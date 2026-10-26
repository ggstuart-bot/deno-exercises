import { db } from "./db.js";

export function createSession(userId, expires) {
    const id = crypto.randomUUID();
    return db.prepare(`
        INSERT INTO sessions(id, userId, expires)
        VALUES (:id, :userId, :expires)
        RETURNING *;
    `).get({ id, userId, expires });
}

export function getSessionById(id) {
    return db.prepare(
        `SELECT * FROM sessions WHERE id=:id AND expires > :now`,
    ).get({ id, now: Date.now() });
}

export function deleteSessionById(id) {
    db.prepare(`DELETE FROM sessions WHERE id=:id`).run({ id });
}
