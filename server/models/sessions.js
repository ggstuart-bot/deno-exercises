import { db } from "./db.js";

export function createSession(username) {
    const id = crypto.randomUUID();
    return db.prepare(`
        INSERT INTO sessions(id, username)
        VALUES (:id, :username)
        RETURNING *;
    `).get({ id, username });
}

export function getSessionById(id) {
    return db.prepare(`SELECT * FROM sessions WHERE id=:id`).get({ id });
}

export function deleteSessionById(id) {
    db.prepare(`DELETE FROM sessions WHERE id=:id`).run({ id });
}