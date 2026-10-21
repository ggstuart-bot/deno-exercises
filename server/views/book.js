import { html } from "../tools/html.js";

export function bookSummary(book) {
    return html`<span>
                    ${book.coverUrl ? html`<img class="cover" src="${book.coverUrl}" alt="">` : ""}
                    <a href="/books/${book.id}">${book.title}</a> by ${book.author} ${book.year ? `(${book.year})` : ""}
                </span>`;
}
