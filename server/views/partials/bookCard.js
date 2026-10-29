import { html } from "../../tools/html.js";

export const DEFAULT_COVER = "/assets/default-cover.svg";

// A book as a card in a .grid list. Pass extra content (e.g. a form) to show it in the card footer
export function bookCard(book, footer = "") {
    const cover = book.coverUrl ?? DEFAULT_COVER;
    return html`
        <li class="card book">
            <img class="cover" src="${cover}" alt="" width="200" height="300" loading="lazy">
            <div>
                <h2><a href="/books/${book.id}">${book.title}</a></h2>
                <p>${book.author}${book.year ? ` (${book.year})` : ""}</p>
                ${footer ? html`<footer>${footer}</footer>` : ""}
            </div>
        </li>
    `;
}
