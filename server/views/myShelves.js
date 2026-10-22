import { html } from "../tools/html.js";
import { shelfCard } from "./shelfCard.js";
import { visibilityButton } from "./shelf.js";

export function myShelvesView(ctx) {
    const { user, data: { shelves, errors, values } } = ctx;
    const publicShelves = shelves.filter((shelf) => shelf.isPublic);
    const privateShelves = shelves.filter((shelf) => !shelf.isPublic);

    return html`
    <section>
        <h1>My shelves</h1>
        <h2>Public shelves</h2>
        <p>Anyone signed in can see these shelves</p>
        ${shelfList(user, publicShelves, "No public shelves yet")}
        <h2>Private shelves</h2>
        <p>Only you can see these shelves</p>
        ${user.isPublic ? "" : html`<p><a href="/profile">Publish your profile</a> to share them</p>`}
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

// Each card has a button to make the shelf public or private
function shelfList(user, shelves, emptyMessage) {
    return shelves.length
        ? html`<ul class="grid wide">
${shelves.map((shelf) => shelfCard(shelf, visibilityButton(user, shelf)))}
        </ul>`
        : html`<p>${emptyMessage}</p>`;
}
