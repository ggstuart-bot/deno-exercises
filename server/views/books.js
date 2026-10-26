import { html } from "../tools/html.js";
import { bookCard } from "./book.js";

export function booksView(ctx) {
    const { data: { title, books, q, page, hasNext } } = ctx;

    return html`
    <section>
        <header>
            <h1>${title}</h1>
            ${q ? html`<p><a href="/books">show all books</a></p>` : ""}
        </header>
        <search>
            <form method="GET" action="/books">
                <label for="q">Search by title or author</label>
                <input id="q" type="search" name="q" value="${q}">
                <button>search</button>
            </form>
        </search>
        ${books.length
            ? html`<ul class="grid">
${books.map((book) => bookCard(book))}
        </ul>`
            : html`<p>${q ? `No books match "${q}"` : "No books found"}</p>`}
        ${pagination(q, page, hasNext)}
    </section>
    `;
}

// Previous, the current page and next. Nothing at all if there's only one page
function pagination(q, page, hasNext) {
    if (page === 1 && !hasNext) return "";
    return html`<nav aria-label="Pagination">
            ${page > 1 ? html`<a href="${pageUrl(q, page - 1)}" rel="prev">previous</a>` : ""}
            <a href="${pageUrl(q, page)}" aria-current="page">page ${page}</a>
            ${hasNext ? html`<a href="${pageUrl(q, page + 1)}" rel="next">next</a>` : ""}
        </nav>`;
}

// Only keep q in the link if there's a search
function pageUrl(q, page) {
    const params = q ? { q, page } : { page };
    return `/books?${new URLSearchParams(params)}`;
}
