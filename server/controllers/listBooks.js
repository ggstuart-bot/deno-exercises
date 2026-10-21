import { addBookToList, removeBookFromList } from "../models/listBooks.js";
import { redirect } from "../tools/redirect.js";

export function addBookController(ctx) {
    const { data: { list, book } } = ctx;
    const changes = addBookToList(list.id, book.id);
    ctx.flash = changes
        ? `Book '${book.title}' added to '${list.title}'`
        : `Book '${book.title}' is already on '${list.title}'`;
    return redirect(`/books/${book.id}`, ctx);
}

export function removeBookController(ctx) {
    const { data: { list, book } } = ctx;
    removeBookFromList(list.id, book.id);
    ctx.flash = `Book '${book.title}' removed`;
    return redirect(`/lists/${list.id}`, ctx);
}
