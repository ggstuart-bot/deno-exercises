import { html } from "../tools/html.js";
import { DEFAULT_COVER } from "./book.js";

export function bookDetailView(ctx) {
    const { user, data: { book, shelves } } = ctx;

    return html`
    <section>
        <header>
            <h1>${book.title}</h1>
            <p>by ${book.author}</p>
        </header>
        <img src="${book.coverUrl ?? DEFAULT_COVER}" alt="Cover of '${book.title}'">
        ${book.year ? html`<p>Published ${book.year}</p>` : ""}
        <p><a href="/books">Back to all books</a></p>
    </section>
    <aside>
        <h2>Add to a shelf</h2>
        ${user ? addToShelfForms(book, shelves) : html`<p><a href="/signin">Sign in</a> to add this book to a shelf</p>`}
    </aside>
    `;
}

function addToShelfForms(book, shelves) {
    return shelves.length
        ? shelves.map((shelf) => html`<form method="POST" action="/shelves/${shelf.id}/books/${book.id}/add">
            <button>add to '${shelf.title}'</button>
        </form>`)
        : html`<p>You don't have any shelves yet</p>`;
}
