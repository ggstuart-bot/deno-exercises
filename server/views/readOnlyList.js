import { html } from "../tools/html.js";
import { avatarImage } from "./avatar.js";

export function readOnlyListView(ctx) {
    const { data: { list, items, owner } } = ctx;

    return html`
    <section class="list">
        <header>
            <h2>${list.title}</h2>
            <p>A public list by <a href="/users/${owner.id}">${avatarImage(owner)}${owner.username}</a></p>
        </header>
        <ul>
${items.map(itemToHTML)}
        </ul>
        <p><a href="/">Back to home</a></p>
    </section>
    `;
}

function itemToHTML(item) {
    return html`            <li>${item.label}</li>`;
}
