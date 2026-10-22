import { html } from "../tools/html.js";
import { avatarImage } from "./avatar.js";
import { shelfCard } from "./shelfCard.js";

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
            ? html`<ul class="grid wide">
${publicShelves.map((shelf) => shelfCard(shelf, ownerLink(shelf)))}
        </ul>`
            : html`<p>Nobody has shared a shelf yet</p>`}
    </section>
    `;
}

function ownerLink(shelf) {
    return html`<a href="/users/${shelf.ownerId}">${avatarImage({ id: shelf.ownerId, avatarId: shelf.avatarId })}${shelf.username}</a>`;
}
