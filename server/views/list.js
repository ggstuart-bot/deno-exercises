import { html } from "../tools/html.js";

export function listView(ctx) {
    const { data: { list, items, errors, values } } = ctx;

    return html`
    <section>
        <h2>${list.title}</h2>
        <ul>
${items.map((item) => itemToHTML(list, item))}
        </ul>
        <p><a href="/">Back to your lists</a></p>
    </section>
    <aside>
        <h3>New item</h3>
        <form method="POST" action="/lists/${list.id}/items">
            <label for="new">Label</label>
            <input id="new" name="label" value="${values?.label ?? ""}">
            <span class="error">${errors?.label ?? ""}</span>
            <button>create</button>
        </form>
    </aside>
    `;
}

function itemToHTML(list, item) {
    return html`            <li>
                <a href="/lists/${list.id}/items/${item.id}">${item.label}</a>
            </li>`;
}
