import { html } from "../tools/html.js";

export function readOnlyListView(ctx) {
    const { data: { list, items, owner } } = ctx;

    return html`
    <section>
        <h2>${list.title}</h2>
        <p>A public list by '${owner.username}'</p>
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
