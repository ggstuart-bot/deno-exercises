import { html } from "../tools/html.js";
import { avatarImage } from "./avatar.js";

export function homeView(ctx) {
    const { user, data: { publicShelves } } = ctx;
    if (!user) return guestHome();

    return html`
    <section>
        <h2>Public shelves</h2>
        ${publicShelves.length
            ? html`<ul>
${publicShelves.map(publicShelfToHTML)}
        </ul>`
            : html`<p>Nobody else has shared a shelf yet</p>`}
    </section>
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

function publicShelfToHTML(shelf) {
    return html`            <li>
                <a href="/shelves/${shelf.id}">${shelf.title}</a>
                <span>
                    <a href="/users/${shelf.ownerId}">${avatarImage({ id: shelf.ownerId, avatarId: shelf.avatarId })}${shelf.username}</a>
                    ${shelf.bookCount} ${shelf.bookCount === 1 ? "book" : "books"}
                </span>
            </li>`;
}
