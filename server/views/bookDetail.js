import { html } from "../tools/html.js";

export function bookDetailView(ctx) {
    const { data: { book } } = ctx;

    return html`
    <section class="book">
        ${book.coverUrl ? html`<img class="cover" src="${book.coverUrl}" alt="Cover of '${book.title}'">` : ""}
        <h2>${book.title}</h2>
        <p>by ${book.author}</p>
        ${book.year ? html`<p>Published ${book.year}</p>` : ""}
        <p><a href="/books">Back to all books</a></p>
    </section>
    `;
}
