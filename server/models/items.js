import { db } from "./db.js";

export function getItemsByOwnerId(ownerId) {
    return db.prepare(`
        SELECT items.id, items.label, items.listId
        FROM items JOIN lists ON items.listId = lists.id
        WHERE lists.ownerId = ?
    `).all(ownerId);
}

export function getItemById(id) {
    return db.prepare("SELECT id, label, listId FROM items WHERE id = ?").get(id);
}

export function createItem({ label, listId }) {
    return db.prepare(
        "INSERT INTO items (label, listId) VALUES (?, ?) RETURNING id, label, listId",
    ).get(label, listId);
}

export function updateItem(id, label) {
    return db.prepare(
        "UPDATE items SET label = ? WHERE id = ? RETURNING id, label, listId",
    ).get(label, id);
}

export function deleteItem(id) {
    return db.prepare("DELETE FROM items WHERE id = ? RETURNING id, label, listId").get(
        id,
    );
}
