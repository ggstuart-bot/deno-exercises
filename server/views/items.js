export function itemsView(ctx) { 
    const { data: { items, errors = {} } } = ctx;
    
    return `
    <section>
        <h2>Items list</h2>
        <ul>
            ${items.map(itemToHTML).join("\n\t\t\t")}
        </ul>
    </section>
    <aside>
        <h3>New item</h3>
        <form method="POST">
            <label for="new">New item</label>
            <input id="new" name="label" value="${errors.label?.value ?? ""}">
            <span class="error">${errors.label?.message ?? ""}</span>
            <button>create</button>
        </form>
    </aside>
    `;
}

function itemToHTML(item) {
    return `<li>
    <a href="/items/${item.id}">${item.label}</a>
    </li>`;
}
