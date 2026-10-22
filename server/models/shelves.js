import { db } from "./db.js";

export function createShelf({ title, ownerId, isPublic = 0 }) {
    return db.prepare(`
        INSERT INTO shelves(title, ownerId, isPublic)
        VALUES (:title, :ownerId, :isPublic)
        RETURNING id, title, ownerId
    `).get({ title, ownerId, isPublic });
}

export function getShelfById(id) {
    return db.prepare(
        `SELECT id, title, ownerId, isPublic FROM shelves WHERE id=:id`
    ).get({ id });
}

export function getShelvesByOwnerId(ownerId) {
    return db.prepare(`
        SELECT id, title, ownerId, isPublic,
            (SELECT count(*) FROM shelfBooks WHERE shelfId = shelves.id) AS bookCount
        FROM shelves WHERE ownerId=:ownerId
    `).all({ ownerId });
}

// All public shelves, with the owner's username for display
export function getPublicShelves() {
    return db.prepare(`
        SELECT shelves.id, title, ownerId, username, avatarId,
            (SELECT count(*) FROM shelfBooks WHERE shelfId = shelves.id) AS bookCount
        FROM shelves JOIN users ON users.id = shelves.ownerId
        WHERE shelves.isPublic = 1
    `).all();
}

export function getPublicShelvesByOwnerId(ownerId) {
    return db.prepare(`
        SELECT id, title, ownerId,
            (SELECT count(*) FROM shelfBooks WHERE shelfId = shelves.id) AS bookCount
        FROM shelves WHERE isPublic = 1 AND ownerId=:ownerId
    `).all({ ownerId });
}

export function updateShelfTitle(id, title) {
    return db.prepare(
        `UPDATE shelves SET title=:title WHERE id=:id RETURNING id, title, ownerId`
    ).get({ id, title });
}

export function updateShelfIsPublic(id, isPublic) {
    return db.prepare(
        `UPDATE shelves SET isPublic=:isPublic WHERE id=:id RETURNING id, title, ownerId, isPublic`
    ).get({ id, isPublic });
}

export function unpublishShelvesByOwnerId(ownerId) {
    return db.prepare(
        `UPDATE shelves SET isPublic=0 WHERE ownerId=:ownerId`
    ).run({ ownerId });
}

export function deleteShelf(id) {
    return db.prepare(
        `DELETE FROM shelves WHERE id=:id RETURNING id, title, ownerId`
    ).get({ id });
}
