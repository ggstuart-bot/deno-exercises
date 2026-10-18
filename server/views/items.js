import { html } from "../tools/html.js";

export function itemsView(ctx) {
    const { data: { items, errors = {} } } = ctx;

    return html`
    <section>
        <h2>Items list</h2>
        <ul>
${items.map(itemToHTML)}
        </ul>
    </section>
    <aside>
        <h3>New item</h3>
        <form method="POST">
            <label for="new">Label</label>
            <input id="new" name="label" value="${errors.label?.value ?? ""}">
            <span class="error">${errors.label?.message ?? ""}</span>
            <button>create</button>
        </form>
    </aside>
    `;
}

function itemToHTML(item) {
    return html`            <li>
                <a href="/items/${item.id}">${item.label}</a>
            </li>`;
}
