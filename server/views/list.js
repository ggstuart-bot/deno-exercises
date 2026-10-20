import { html } from "../tools/html.js";

export function listView(ctx) {
    const { data: { list, items, errors, values } } = ctx;

    return html`
    <section>
        <h2>${list.title}</h2>
        <form class="inline" method="POST" action="/lists/${list.id}/items">
            <input name="label" aria-label="New item" placeholder="new item" value="${values?.label ?? ""}">
            <button>add</button>
            <span class="error">${errors?.label ?? ""}</span>
        </form>
        <ul>
${items.map((item) => itemToHTML(list, item))}
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

function itemToHTML(list, item) {
    return html`            <li>
                <a href="/lists/${list.id}/items/${item.id}">${item.label}</a>
            </li>`;
}
