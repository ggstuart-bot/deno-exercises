import { html } from "../tools/html.js";
import { bookDetails } from "./book.js";

export function booksView(ctx) {
    const { data: { books } } = ctx;

    return html`
    <section class="list">
        <header>
            <h2>Books</h2>
        </header>
        <ul>
${books.map(bookToHTML)}
        </ul>
    </section>
    `;
}

function bookToHTML(book) {
    return html`            <li>${bookDetails(book)}</li>`;
}
