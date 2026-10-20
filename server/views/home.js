import { html } from "../tools/html.js";

export function homeView(ctx) {
    const { user, data: { lists, errors, values } } = ctx;
    if (!user) return guestHome();

    return html`
    <section>
        <h2>Your lists</h2>
        ${lists.length
            ? html`<ul>
${lists.map(listToHTML)}
        </ul>`
            : html`<p>You don't have any lists yet</p>`}
    </section>
    <aside>
        <h3>New list</h3>
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
                <span>${list.itemCount} ${list.itemCount === 1 ? "item" : "items"}</span>
            </li>`;
}
