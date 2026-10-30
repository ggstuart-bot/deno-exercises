import { countBooks, PAGE_SIZE, searchBooks } from "../models/books.js";
import { getShelvesByOwnerId } from "../models/shelves.js";
import { render } from "../tools/render.js";
import { booksView } from "../views/books.js";
import { bookView } from "../views/book.js";

export function booksController(ctx) {
    const { url } = ctx;
    const q = url.searchParams.get("q") ?? "";
    let page = Number(url.searchParams.get("page"));
    if (!Number.isSafeInteger(page) || page < 1) page = 1;
    ctx.data.q = q;
    ctx.data.page = page;
    ctx.data.books = searchBooks(q, page);
    ctx.data.pageCount = Math.ceil(countBooks(q) / PAGE_SIZE);
    ctx.data.title = q ? `Books matching "${q}"` : "Books";
    return render(booksView, ctx);
}

export function bookController(ctx) {
    const { user } = ctx;
    if (user) {
        ctx.data.shelves = getShelvesByOwnerId(user.id);
    }
    ctx.data.title = ctx.data.book.title;
    return render(bookView, ctx);
}
