import { html } from "../tools/html.js";
import { avatarImage } from "./avatar.js";

export function homeView(ctx) {
    const { user, data: { shelves, publicShelves, errors, values } } = ctx;
    if (!user) return guestHome();

    return html`
    <section>
        <h2>My shelves</h2>
        ${shelves.length
            ? html`<ul>
${shelves.map(shelfToHTML)}
        </ul>`
            : html`<p>You don't have any shelves yet</p>`}
        <h2>Public shelves</h2>
        ${publicShelves.length
            ? html`<ul>
${publicShelves.map(publicShelfToHTML)}
        </ul>`
            : html`<p>Nobody else has shared a shelf yet</p>`}
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

function guestHome() {
    return html`
    <section>
        <h2>Home</h2>
        <p>This is the home page</p>
    </section>
    `;
}

function shelfToHTML(shelf) {
    return html`            <li>
                <a href="/shelves/${shelf.id}">${shelf.title}</a>
                <span>${shelf.bookCount} ${shelf.bookCount === 1 ? "book" : "books"}</span>
            </li>`;
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
