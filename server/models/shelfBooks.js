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

// Up to 5 small covers to show on a shelf card
export function getThumbnailsByShelfId(shelfId) {
    return db.prepare(`
        SELECT books.id, thumbnailUrl
        FROM shelfBooks JOIN books ON books.id = shelfBooks.bookId
        WHERE shelfId=:shelfId
        LIMIT 5
    `).all({ shelfId });
}

// Adds the covers to each shelf in a list.
// This runs one small query per shelf, which is fine for a handful of shelves
export function addThumbnails(shelves) {
    for (const shelf of shelves) {
        shelf.thumbnails = getThumbnailsByShelfId(shelf.id);
    }
    return shelves;
}
