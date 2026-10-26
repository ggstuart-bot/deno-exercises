import { html } from "../tools/html.js";
import { DEFAULT_COVER } from "./book.js";

// A shelf as a card in a .grid list, with a fanned row of its first few covers.
// Pass extra content (e.g. the owner) to show it in the card footer.
// Shelf lists always sit under an <h2>, so the title is an <h3>
export function shelfCard(shelf, footer = "") {
    return html`<li class="card shelf">
    ${shelf.thumbnails.length
        ? html`<div class="covers">${shelf.thumbnails.map(coverImage)}</div>`
        : html`<p class="covers">No books yet</p>`}
        <div>
            <div class="row">
                <h3><a href="/shelves/${shelf.id}">${shelf.title}</a></h3>
                <p>${shelf.bookCount} ${shelf.bookCount === 1 ? "book" : "books"}</p>
            </div>
            ${footer ? html`<footer>${footer}</footer>` : ""}
        </div>
    </li>`;
}

function coverImage(book) {
    return html`<img src="${book.thumbnailUrl ?? DEFAULT_COVER}" alt="" width="64" height="96" loading="lazy">`;
}
