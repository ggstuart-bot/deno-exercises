import { html } from "../tools/html.js";

export function listView(ctx) {
    const { data: { list, items, item: failedItem, errors, values } } = ctx;
    // ctx.data.item is only set when an item edit failed validation,
    // so the label error belongs to that row rather than the add form.
    const addErrors = failedItem ? {} : errors;
    const addValues = failedItem ? {} : values;

    return html`
    <section>
        <h2>${list.title}</h2>
        <form class="inline" method="POST" action="/lists/${list.id}/items">
            <input name="label" aria-label="New item" placeholder="new item" value="${addValues?.label ?? ""}">
            <button>add</button>
            <span class="error">${addErrors?.label ?? ""}</span>
        </form>
        <ul>
${items.map((item) =>
    item.id === failedItem?.id
        ? itemToHTML(list, item, values.label, errors.label)
        : itemToHTML(list, item)
)}
        </ul>
        <p><a href="/">Back to your lists</a></p>
    </section>
    <aside>
        <h3>Rename list</h3>
        <form method="POST" action="/lists/${list.id}/edit">
            <label for="title">Title</label>
            <input id="title" name="title" value="${values?.title ?? list.title}">
            <span class="error">${errors?.title ?? ""}</span>
            <button>rename</button>
        </form>
        <h3>Delete list</h3>
        <p>This also deletes all of its items</p>
        <form method="POST" action="/lists/${list.id}/delete">
            <button>delete list</button>
        </form>
    </aside>
    `;
}

function itemToHTML(list, item, label = item.label, error = "") {
    const action = `/lists/${list.id}/items/${item.id}`;
    const errorId = `item-${item.id}-error`;
    return html`            <li>
                <form class="item" method="POST" action="${action}/edit">
                    <input name="label" value="${label}" aria-label="Item label"${
        error ? html` aria-invalid="true" aria-describedby="${errorId}"` : ""
    }>
                    <button class="save">save</button>
                    <button class="delete" formaction="${action}/delete">delete</button>
                    ${error ? html`<span class="error" id="${errorId}">${error}</span>` : ""}
                </form>
            </li>`;
}
