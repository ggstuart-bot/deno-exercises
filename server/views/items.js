import { html } from "../tools/html.js";

export function itemsView(ctx) {
    const { data: { items, list, errors, values } } = ctx;

    return html`
    <section>
        <h2>Items list</h2>
        <ul>
${items.map(itemToHTML)}
        </ul>
    </section>
    <aside>
        <h3>New item</h3>
        ${list ? newItemForm(list, errors, values) : html`<p>You don't have any lists yet</p>`}
    </aside>
    `;
}

function newItemForm(list, errors, values) {
    return html`<form method="POST" action="/lists/${list.id}/items">
            <label for="new">Label</label>
            <input id="new" name="label" value="${values?.label ?? ""}">
            <span class="error">${errors?.label ?? ""}</span>
            <button>create</button>
        </form>`;
}

function itemToHTML(item) {
    return html`            <li>
                <a href="/items/${item.id}">${item.label}</a>
            </li>`;
}
