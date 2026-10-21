import { db } from "./db.js";

export const PAGE_SIZE = 20;

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

export function searchBooks(q, page = 1) {
    return db.prepare(`
        SELECT id, title, author, year, coverUrl FROM books
        WHERE title LIKE :pattern OR author LIKE :pattern
        LIMIT :limit OFFSET :offset
    `).all({ pattern: `%${q}%`, limit: PAGE_SIZE, offset: (page - 1) * PAGE_SIZE });
}

export function countBooks(q) {
    return db.prepare(`
        SELECT count(*) AS count FROM books
        WHERE title LIKE :pattern OR author LIKE :pattern
    `).get({ pattern: `%${q}%` }).count;
}
