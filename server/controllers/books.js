import { countBooks, PAGE_SIZE, searchBooks } from "../models/books.js";
import { getListsByOwnerId } from "../models/lists.js";
import { render } from "../tools/render.js";
import { booksView } from "../views/books.js";
import { bookDetailView } from "../views/bookDetail.js";

export function booksController(ctx) {
    const { url } = ctx;
    const q = url.searchParams.get("q") ?? "";
    let page = Number(url.searchParams.get("page"));
    if (!Number.isSafeInteger(page) || page < 1) page = 1;
    ctx.data.q = q;
    ctx.data.page = page;
    ctx.data.books = searchBooks(q, page);
    ctx.data.hasNext = page * PAGE_SIZE < countBooks(q);
    return render(booksView, ctx);
}

export function bookController(ctx) {
    const { user } = ctx;
    if (user) {
        ctx.data.lists = getListsByOwnerId(user.id);
    }
    return render(bookDetailView, ctx);
}
