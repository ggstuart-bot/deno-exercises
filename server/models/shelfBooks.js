import { db } from "./db.js";

export function getBooksByShelfId(shelfId) {
    return db.prepare(`
        SELECT books.id, title, author, year, thumbnailUrl, coverUrl
        FROM shelfBooks JOIN books ON books.id = shelfBooks.bookId
        WHERE shelfId=:shelfId
    `).all({ shelfId });
}

export function addBookToShelf(shelfId, bookId) {
    return db.prepare(
        `INSERT OR IGNORE INTO shelfBooks(shelfId, bookId) VALUES (:shelfId, :bookId)`
    ).run({ shelfId, bookId });
}

export function removeBookFromShelf(shelfId, bookId) {
    return db.prepare(
        `DELETE FROM shelfBooks WHERE shelfId=:shelfId AND bookId=:bookId`
    ).run({ shelfId, bookId });
}
