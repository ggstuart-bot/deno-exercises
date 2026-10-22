import { html } from "../tools/html.js";
import { bookCard } from "./book.js";

export function booksView(ctx) {
    const { data: { books, q, page, hasNext } } = ctx;

    return html`
    <section class="list">
        <header>
            <h1>Books</h1>
        </header>
        <search>
            <form class="inline" method="GET" action="/books">
                <label for="q">Search by title or author</label>
                <input id="q" type="search" name="q" value="${q}">
                <button>search</button>
            </form>
        </search>
        ${books.length
            ? html`<ul class="grid">
${books.map((book) => bookCard(book))}
        </ul>`
            : html`<p>No books found</p>`}
        <p>
            ${page > 1 ? html`<a href="${pageUrl(q, page - 1)}">previous</a>` : ""}
            Page ${page}
            ${hasNext ? html`<a href="${pageUrl(q, page + 1)}">next</a>` : ""}
        </p>
    </section>
    `;
}

function pageUrl(q, page) {
    return `/books?${new URLSearchParams({ q, page })}`;
}
