import { html } from "../tools/html.js";
import { shelfCard } from "./shelfCard.js";

export function myShelvesView(ctx) {
    const { data: { shelves, errors, values } } = ctx;
    const publicShelves = shelves.filter((shelf) => shelf.isPublic);
    const privateShelves = shelves.filter((shelf) => !shelf.isPublic);

    return html`
    <section>
        <h1>My shelves</h1>
        <h2>Public shelves</h2>
        ${shelfList(publicShelves, "No public shelves yet")}
        <h2>Private shelves</h2>
        ${shelfList(privateShelves, "No private shelves yet")}
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

function shelfList(shelves, emptyMessage) {
    return shelves.length
        ? html`<ul class="grid wide">
${shelves.map((shelf) => shelfCard(shelf, "", 3))}
        </ul>`
        : html`<p>${emptyMessage}</p>`;
}
