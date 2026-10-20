import { db } from "./db.js";

export function createList({ title, ownerId }) {
    return db.prepare(`
        INSERT INTO lists(title, ownerId)
        VALUES (:title, :ownerId)
        RETURNING id, title, ownerId
    `).get({ title, ownerId });
}

export function getListsByOwnerId(ownerId) {
    return db.prepare(
        `SELECT id, title, ownerId FROM lists WHERE ownerId=:ownerId`
    ).all({ ownerId });
}
