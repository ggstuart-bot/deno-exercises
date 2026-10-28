import { html } from "../tools/html.js";
import { cardGrid } from "./partials/cardGrid.js";
import { shelfCard } from "./partials/shelfCard.js";
import { visibilityButton } from "./partials/visibilityButton.js";

export function myShelvesView(ctx) {
    const { user, data: { shelves, errors, values } } = ctx;
    const publicShelves = shelves.filter((shelf) => shelf.isPublic);
    const privateShelves = shelves.filter((shelf) => !shelf.isPublic);

    return html`
        <section>
            <header>
                <h1>My shelves</h1>
                <p>Make a shelf, then add books to it from any book's page.</p>
            </header>
            <h2>Public shelves</h2>
            <p>Anyone can see these shelves</p>
            ${cardGrid(
                publicShelves.map((shelf) => shelfCard(shelf, visibilityButton(user, shelf))),
                "No public shelves yet",
            )}
            <h2>Private shelves</h2>
            <p>Only you can see these shelves</p>
            ${cardGrid(
                privateShelves.map((shelf) => shelfCard(shelf, visibilityButton(user, shelf))),
                "No private shelves yet",
            )}
            ${user.isPublic
                ? ""
                : html`<p><a href="/profile">Publish your profile</a> to share shelves</p>`}
        </section>
        <aside>
            <h2>New shelf</h2>
            <form class="secondary" method="POST" action="/shelves">
                <label for="title">Title</label>
                <input id="title" name="title" value="${values?.title ?? ""}"
                    aria-describedby="title-error" aria-invalid="${Boolean(errors?.title)}">
                <span id="title-error" class="error">${errors?.title ?? ""}</span>
                <button>create</button>
            </form>
        </aside>
    `;
}
