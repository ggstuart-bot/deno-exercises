import { countPages, searchBooks } from "../models/books.js";
import { getShelvesByOwnerId } from "../models/shelves.js";
import { render } from "../tools/render.js";
import { NotFoundError } from "../tools/errors.js";
import { booksView } from "../views/books.js";
import { bookView } from "../views/book.js";

const PAGE_SIZE = 16;

export function booksController(ctx) {
    const { url } = ctx;
    const q = url.searchParams.get("q") ?? "";
    const pageParam = url.searchParams.get("page");
    const page = pageParam === null ? 1 : Number(pageParam);
    const pageCount = Math.max(1, countPages(q, PAGE_SIZE));
    if (!Number.isSafeInteger(page) || page < 1 || page > pageCount) {
        throw new NotFoundError(`Page ${pageParam} not found`);
    }
    ctx.data.q = q;
    ctx.data.page = page;
    ctx.data.books = searchBooks(q, page, PAGE_SIZE);
    ctx.data.pageCount = pageCount;
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
