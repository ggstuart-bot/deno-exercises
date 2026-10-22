import { html } from "../tools/html.js";
import { shelfCard } from "./shelfCard.js";

export function myShelvesView(ctx) {
    const { data: { shelves, errors, values } } = ctx;

    return html`
    <section>
        <h1>My shelves</h1>
        ${shelves.length
            ? html`<ul class="grid wide">
${shelves.map((shelf) => shelfCard(shelf))}
        </ul>`
            : html`<p>You don't have any shelves yet</p>`}
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
