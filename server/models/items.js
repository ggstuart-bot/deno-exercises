import { db } from "./db.js";

export function getItems() {
    return db.prepare("SELECT id, label FROM items").all();
}

export function getItemById(id) {
    return db.prepare("SELECT id, label FROM items WHERE id = ?").get(id);
}

export function createItem(label) {
    return db.prepare("INSERT INTO items (label) VALUES (?) RETURNING id, label").get(label);
}

export function updateItem(id, label) {
    return db.prepare("UPDATE items SET label = ? WHERE id = ? RETURNING id, label").get(label, id);
}

export function deleteItem(id) {
    return db.prepare("DELETE FROM items WHERE id = ? RETURNING id, label").get(id);
}
