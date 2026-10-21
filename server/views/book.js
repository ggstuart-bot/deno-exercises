import { html } from "../tools/html.js";

export const DEFAULT_COVER = "/assets/default-cover.svg";

export function bookSummary(book) {
    return html`<span>
                    <img class="thumbnail" src="${book.thumbnailUrl ?? DEFAULT_COVER}" alt="">
                    <a href="/books/${book.id}">${book.title}</a> by ${book.author} ${book.year ? `(${book.year})` : ""}
                </span>`;
}
