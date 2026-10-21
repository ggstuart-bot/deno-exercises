import { html } from "../tools/html.js";

export function myShelvesView(ctx) {
    const { data: { shelves, errors, values } } = ctx;

    return html`
    <section>
        <h2>My shelves</h2>
        ${shelves.length
            ? html`<ul>
${shelves.map(shelfToHTML)}
        </ul>`
            : html`<p>You don't have any shelves yet</p>`}
    </section>
    <aside>
        <h3>New shelf</h3>
        <form method="POST" action="/shelves">
            <label for="title">Title</label>
            <input id="title" name="title" value="${values?.title ?? ""}">
            <span class="error">${errors?.title ?? ""}</span>
            <button>create</button>
        </form>
    </aside>
    `;
}

function shelfToHTML(shelf) {
    return html`            <li>
                <a href="/shelves/${shelf.id}">${shelf.title}</a>
                <span>${shelf.bookCount} ${shelf.bookCount === 1 ? "book" : "books"}</span>
            </li>`;
}
