import { html } from "../tools/html.js";
import { bookSummary } from "./book.js";

export function booksView(ctx) {
    const { data: { books, q, page, hasNext } } = ctx;

    return html`
    <section class="list">
        <header>
            <h2>Books</h2>
        </header>
        <form class="inline" method="GET" action="/books">
            <input name="q" aria-label="Search books" placeholder="search by title or author" value="${q}">
            <button>search</button>
        </form>
        ${books.length
            ? html`<ul>
${books.map(bookToHTML)}
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

function bookToHTML(book) {
    return html`            <li>${bookSummary(book)}</li>`;
}
