import { removeBookFromList } from "../models/listBooks.js";
import { redirect } from "../tools/redirect.js";

export function removeBookController(ctx) {
    const { data: { list, book } } = ctx;
    removeBookFromList(list.id, book.id);
    ctx.flash = `Book '${book.title}' removed`;
    return redirect(`/lists/${list.id}`, ctx);
}
