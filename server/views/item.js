import { html } from "../tools/html.js";

export function itemView(ctx) {
    const { data: { item, errors, values } } = ctx;    
    return html`
    <section>
        <h2>${item.label}</h2>
        <p>This is item ${item.id}</p>
        <p><a href="/items">Back to items list</a></p>
    </section>

    <aside>
        <h3>Edit item</h3>
        <form method="POST" action="/items/${item.id}/edit">
            <label for="label">Label</label>
            <input id="label" name="label" value="${
                values?.label ?? item.label
            }">
            <span class="error">${errors?.label ?? ""}</span>
            <button>save</button>
        </form>
        <h3>Delete item</h3>
        <form method="POST" action="/items/${item.id}/delete">
            <button>delete</button>
        </form>
    </aside>
    `;
}
