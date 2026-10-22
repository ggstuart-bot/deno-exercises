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
        ${pagination(q, page, hasNext)}
    </section>
    `;
}

// Previous, the current page and next. Nothing at all if there's only one page
function pagination(q, page, hasNext) {
    if (page === 1 && !hasNext) return "";
    return html`<nav aria-label="Pagination">
            <ul class="row">
                ${page > 1 ? html`<li><a href="${pageUrl(q, page - 1)}" rel="prev">previous</a></li>` : ""}
                <li><a href="${pageUrl(q, page)}" aria-current="page">page ${page}</a></li>
                ${hasNext ? html`<li><a href="${pageUrl(q, page + 1)}" rel="next">next</a></li>` : ""}
            </ul>
        </nav>`;
}

function pageUrl(q, page) {
    return `/books?${new URLSearchParams({ q, page })}`;
}
