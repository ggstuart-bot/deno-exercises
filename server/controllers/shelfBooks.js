import { addBookToShelf, removeBookFromShelf } from "../models/shelfBooks.js";
import { redirect } from "../tools/redirect.js";

export function addBookController(ctx) {
    const { data: { shelf, book } } = ctx;
    const changes = addBookToShelf(shelf.id, book.id);
    ctx.flash = changes
        ? `Book '${book.title}' added to '${shelf.title}'`
        : `Book '${book.title}' is already on '${shelf.title}'`;
    return redirect(`/books/${book.id}`, ctx);
}

export function removeBookController(ctx) {
    const { data: { shelf, book } } = ctx;
    removeBookFromShelf(shelf.id, book.id);
    ctx.flash = `Book '${book.title}' removed`;
    return redirect(`/shelves/${shelf.id}`, ctx);
}
