import { html } from "../tools/html.js";
import { avatarImage } from "./avatar.js";

export function homeView(ctx) {
    const { data: { publicShelves } } = ctx;

    return html`
    <section>
        <h2>Find a book</h2>
        <form class="inline" method="GET" action="/books">
            <input name="q" aria-label="Search books" placeholder="search by title or author">
            <button>search</button>
        </form>
        <h2>Public shelves</h2>
        ${publicShelves.length
            ? html`<ul class="striped">
${publicShelves.map(publicShelfToHTML)}
        </ul>`
            : html`<p>Nobody has shared a shelf yet</p>`}
    </section>
    `;
}

function publicShelfToHTML(shelf) {
    return html`            <li>
                <a href="/shelves/${shelf.id}">${shelf.title}</a>
                <span>
                    <a href="/users/${shelf.ownerId}">${avatarImage({ id: shelf.ownerId, avatarId: shelf.avatarId })}${shelf.username}</a>
                    ${shelf.bookCount} ${shelf.bookCount === 1 ? "book" : "books"}
                </span>
            </li>`;
}
