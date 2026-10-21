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
            (SELECT count(*) FROM listBooks WHERE listId = lists.id) AS bookCount
        FROM lists WHERE ownerId=:ownerId
    `).all({ ownerId });
}

// Other people's public lists, with the owner's username for display
export function getPublicLists(excludeUserId) {
    return db.prepare(`
        SELECT lists.id, title, ownerId, username, avatarId,
            (SELECT count(*) FROM listBooks WHERE listId = lists.id) AS bookCount
        FROM lists JOIN users ON users.id = lists.ownerId
        WHERE lists.isPublic = 1 AND ownerId != :excludeUserId
    `).all({ excludeUserId });
}

export function getPublicListsByOwnerId(ownerId) {
    return db.prepare(`
        SELECT id, title, ownerId,
            (SELECT count(*) FROM listBooks WHERE listId = lists.id) AS bookCount
        FROM lists WHERE isPublic = 1 AND ownerId=:ownerId
    `).all({ ownerId });
}

export function updateListTitle(id, title) {
    return db.prepare(
        `UPDATE lists SET title=:title WHERE id=:id RETURNING id, title, ownerId`
    ).get({ id, title });
}

export function updateListIsPublic(id, isPublic) {
    return db.prepare(
        `UPDATE lists SET isPublic=:isPublic WHERE id=:id RETURNING id, title, ownerId, isPublic`
    ).get({ id, isPublic });
}

export function unpublishListsByOwnerId(ownerId) {
    return db.prepare(
        `UPDATE lists SET isPublic=0 WHERE ownerId=:ownerId`
    ).run({ ownerId });
}

export function deleteList(id) {
    return db.prepare(
        `DELETE FROM lists WHERE id=:id RETURNING id, title, ownerId`
    ).get({ id });
}
