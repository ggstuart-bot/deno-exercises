import { db } from "./db.js";

export function getBooksByListId(listId) {
    return db.prepare(`
        SELECT books.id, title, author, year, coverUrl
        FROM listBooks JOIN books ON books.id = listBooks.bookId
        WHERE listId=:listId
    `).all({ listId });
}

export function addBookToList(listId, bookId) {
    return db.prepare(
        `INSERT OR IGNORE INTO listBooks(listId, bookId) VALUES (:listId, :bookId)`
    ).run({ listId, bookId });
}

export function removeBookFromList(listId, bookId) {
    return db.prepare(
        `DELETE FROM listBooks WHERE listId=:listId AND bookId=:bookId`
    ).run({ listId, bookId });
}
