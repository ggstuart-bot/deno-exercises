import { db } from "./db.js";

export function createList({ title, ownerId }) {
    return db.prepare(`
        INSERT INTO lists(title, ownerId)
        VALUES (:title, :ownerId)
        RETURNING id, title, ownerId
    `).get({ title, ownerId });
}

export function getListById(id) {
    return db.prepare(
        `SELECT id, title, ownerId FROM lists WHERE id=:id`
    ).get({ id });
}

export function getListsByOwnerId(ownerId) {
    return db.prepare(`
        SELECT id, title, ownerId,
            (SELECT count(*) FROM items WHERE listId = lists.id) AS itemCount
        FROM lists WHERE ownerId=:ownerId
    `).all({ ownerId });
}

export function updateListTitle(id, title) {
    return db.prepare(
        `UPDATE lists SET title=:title WHERE id=:id RETURNING id, title, ownerId`
    ).get({ id, title });
}

export function deleteList(id) {
    return db.prepare(
        `DELETE FROM lists WHERE id=:id RETURNING id, title, ownerId`
    ).get({ id });
}
