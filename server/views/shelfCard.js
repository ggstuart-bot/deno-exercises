import { html } from "../tools/html.js";
import { DEFAULT_COVER } from "./book.js";

// A shelf as a card in a .grid list, with a fanned row of its first few covers.
// Pass extra content (e.g. the owner) to show it in the card footer.
// The title is an <h2>, or pass 3 when the list sits under its own <h2>
export function shelfCard(shelf, footer = "", level = 2) {
    return html`<li class="card">
                ${shelf.thumbnails.length
                    ? html`<div class="covers">${shelf.thumbnails.map(coverImage)}</div>`
                    : html`<p class="covers">No books yet</p>`}
                <h${level}><a href="/shelves/${shelf.id}">${shelf.title}</a></h${level}>
                <p>${shelf.bookCount} ${shelf.bookCount === 1 ? "book" : "books"}</p>
                ${footer ? html`<footer>${footer}</footer>` : ""}
            </li>`;
}

function coverImage(book) {
    return html`<img src="${book.thumbnailUrl ?? DEFAULT_COVER}" alt="" width="64" height="96" loading="lazy">`;
}
