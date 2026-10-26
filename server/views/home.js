import { html } from "../tools/html.js";
import { avatarImage } from "./avatar.js";
import { shelfCard } from "./shelfCard.js";
import { searchForm } from "./searchForm.js";

export function homeView(ctx) {
    const { data: { publicShelves } } = ctx;

    return html`
        <section>
            <header>
                <h1>Find a book</h1>
            </header>
            ${searchForm()}
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
