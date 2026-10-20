import { html } from "../tools/html.js";
import { LABEL_MAX, LABEL_MIN } from "../schema/item.js";

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
        <h3>Visibility</h3>
        ${list.isPublic
            ? html`<p>Anyone signed in can see this list</p>
        <form method="POST" action="/lists/${list.id}/unpublish">
            <button>make private</button>
        </form>`
            : html`<p>Only you can see this list</p>
        <form method="POST" action="/lists/${list.id}/publish">
            <button>make public</button>
        </form>`}
        <h3>Delete list</h3>
        <p>This also deletes all of its items</p>
        <form method="POST" action="/lists/${list.id}/delete">
            <button>delete list</button>
        </form>
    </aside>
    `;
}

function itemToHTML(list, item) {
    const itemUrl = `/lists/${list.id}/items/${item.id}`;
    return html`            <li>
                <form class="item" method="POST" action="${itemUrl}/edit">
                    <input name="label" value="${item.label}" aria-label="Item label"
                        required minlength="${LABEL_MIN}" maxlength="${LABEL_MAX}">
                    <button class="save">save</button>
                    <button class="delete" formaction="${itemUrl}/delete" formnovalidate>delete</button>
                </form>
            </li>`;
}
