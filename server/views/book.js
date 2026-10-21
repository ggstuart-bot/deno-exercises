import { html } from "../tools/html.js";

export function bookDetails(book) {
    return html`<span>
                    ${book.coverUrl ? html`<img class="cover" src="${book.coverUrl}" alt="">` : ""}
                    ${book.title} by ${book.author} ${book.year ? `(${book.year})` : ""}
                </span>`;
}
