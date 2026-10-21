import { getAllBooks } from "../models/books.js";
import { render } from "../tools/render.js";
import { booksView } from "../views/books.js";
import { bookDetailView } from "../views/bookDetail.js";

export function booksController(ctx) {
    ctx.data.books = getAllBooks();
    return render(booksView, ctx);
}

export function bookController(ctx) {
    return render(bookDetailView, ctx);
}
