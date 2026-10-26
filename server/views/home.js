import { html } from "../tools/html.js";
import { avatarImage } from "./avatar.js";
import { shelfCard } from "./shelfCard.js";

export function homeView(ctx) {
    const { data: { publicShelves } } = ctx;

    return html`
        <section>
            <header>
                <h1>Find a book</h1>
            </header>
            <search>
                <form method="GET" action="/books">
                    <label for="q">Search by title or author</label>
                    <input id="q" type="search" name="q">
                    <button>search</button>
                </form>
            </search>
            <h2>Public shelves</h2>
            ${publicShelves.length
                ? html`<ul class="grid">
${publicShelves.map((shelf) => shelfCard(shelf, ownerLink(shelf)))}
        </ul>`
                : html`<p>Nobody has shared a shelf yet</p>`}
        </section>
    `;
}

function ownerLink(shelf) {
    return html`<a href="/users/${shelf.ownerId}">${
        avatarImage({ id: shelf.ownerId, avatarId: shelf.avatarId })
    }${shelf.username}</a>`;
}
