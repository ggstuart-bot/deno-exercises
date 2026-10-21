import { getAllBooks } from "../models/books.js";
import { render } from "../tools/render.js";
import { booksView } from "../views/books.js";

export function booksController(ctx) {
    ctx.data.books = getAllBooks();
    return render(booksView, ctx);
}
