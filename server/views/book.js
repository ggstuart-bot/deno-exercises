import { html } from "../tools/html.js";

export function bookSummary(book) {
    return html`<span>
                    ${book.thumbnailUrl ? html`<img class="thumbnail" src="${book.thumbnailUrl}" alt="">` : ""}
                    <a href="/books/${book.id}">${book.title}</a> by ${book.author} ${book.year ? `(${book.year})` : ""}
                </span>`;
}
