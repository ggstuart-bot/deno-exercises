import { html } from "../tools/html.js";
import { avatarImage } from "./avatar.js";

export function homeView(ctx) {
    const { user, data: { lists, publicLists, errors, values } } = ctx;
    if (!user) return guestHome();

    return html`
    <section>
        <h2>My shelves</h2>
        ${lists.length
            ? html`<ul>
${lists.map(listToHTML)}
        </ul>`
            : html`<p>You don't have any shelves yet</p>`}
        <h2>Public shelves</h2>
        ${publicLists.length
            ? html`<ul>
${publicLists.map(publicListToHTML)}
        </ul>`
            : html`<p>Nobody else has shared a shelf yet</p>`}
    </section>
    <aside>
        <h3>New shelf</h3>
        <form method="POST" action="/lists">
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

function listToHTML(list) {
    return html`            <li>
                <a href="/lists/${list.id}">${list.title}</a>
                <span>${list.bookCount} ${list.bookCount === 1 ? "book" : "books"}</span>
            </li>`;
}

function publicListToHTML(list) {
    return html`            <li>
                <a href="/lists/${list.id}">${list.title}</a>
                <span>
                    <a href="/users/${list.ownerId}">${avatarImage({ id: list.ownerId, avatarId: list.avatarId })}${list.username}</a>
                    ${list.bookCount} ${list.bookCount === 1 ? "book" : "books"}
                </span>
            </li>`;
}
