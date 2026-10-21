import { db } from "./db.js";

export function createBook({ title, author, year, coverUrl }) {
    return db.prepare(`
        INSERT INTO books(title, author, year, coverUrl)
        VALUES (:title, :author, :year, :coverUrl)
        RETURNING id, title, author, year, coverUrl
    `).get({ title, author, year, coverUrl });
}

export function getBookById(id) {
    return db.prepare(
        `SELECT id, title, author, year, coverUrl FROM books WHERE id=:id`
    ).get({ id });
}
