import { html } from "../tools/html.js";
import { shelfCard } from "./shelfCard.js";
import { visibilityControls } from "./shelf.js";

export function myShelvesView(ctx) {
    const { user, data: { shelves, errors, values } } = ctx;
    const publicShelves = shelves.filter((shelf) => shelf.isPublic);
    const privateShelves = shelves.filter((shelf) => !shelf.isPublic);

    return html`
    <section>
        <h1>My shelves</h1>
        <h2>Public shelves</h2>
        ${shelfList(user, publicShelves, "No public shelves yet")}
        <h2>Private shelves</h2>
        ${shelfList(user, privateShelves, "No private shelves yet")}
    </section>
    <aside>
        <h2>New shelf</h2>
        <form method="POST" action="/shelves">
            <label for="title">Title</label>
            <input id="title" name="title" value="${values?.title ?? ""}">
            <span class="error">${errors?.title ?? ""}</span>
            <button>create</button>
        </form>
    </aside>
    `;
}

// Each card has buttons to make the shelf public or private
function shelfList(user, shelves, emptyMessage) {
    return shelves.length
        ? html`<ul class="grid wide">
${shelves.map((shelf) => shelfCard(shelf, visibilityControls(user, shelf)))}
        </ul>`
        : html`<p>${emptyMessage}</p>`;
}
