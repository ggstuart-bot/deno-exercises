import { db } from "./db.js";

export function createList({ title, ownerId, isPublic = 0 }) {
    return db.prepare(`
        INSERT INTO lists(title, ownerId, isPublic)
        VALUES (:title, :ownerId, :isPublic)
        RETURNING id, title, ownerId
    `).get({ title, ownerId, isPublic });
}

export function getListById(id) {
    return db.prepare(
        `SELECT id, title, ownerId, isPublic FROM lists WHERE id=:id`
    ).get({ id });
}

export function getListsByOwnerId(ownerId) {
    return db.prepare(`
        SELECT id, title, ownerId,
            (SELECT count(*) FROM items WHERE listId = lists.id) AS itemCount
        FROM lists WHERE ownerId=:ownerId
    `).all({ ownerId });
}

// Other people's public lists, with the owner's username for display
export function getPublicLists(excludeUserId) {
    return db.prepare(`
        SELECT lists.id, title, ownerId, username,
            (SELECT count(*) FROM items WHERE listId = lists.id) AS itemCount
        FROM lists JOIN users ON users.id = lists.ownerId
        WHERE isPublic = 1 AND ownerId != :excludeUserId
    `).all({ excludeUserId });
}

export function updateListTitle(id, title) {
    return db.prepare(
        `UPDATE lists SET title=:title WHERE id=:id RETURNING id, title, ownerId`
    ).get({ id, title });
}

export function updateIsPublic(id, isPublic) {
    return db.prepare(
        `UPDATE lists SET isPublic=:isPublic WHERE id=:id RETURNING id, title, ownerId, isPublic`
    ).get({ id, isPublic });
}

export function deleteList(id) {
    return db.prepare(
        `DELETE FROM lists WHERE id=:id RETURNING id, title, ownerId`
    ).get({ id });
}
