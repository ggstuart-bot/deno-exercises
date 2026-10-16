export function itemsView(ctx) { 
    const { data: { items, errors: { label } = {} } } = ctx;
    
    return `
    <section>
        <h2>Items list</h2>

        <form method="POST">
            <label for="new">New item</label>
            <input id="new" name="label" value="${label?.value ?? ""}">
            <span class="error">${label?.message ?? ""}</span>
            <button>create</button>
        </form>

        <ul>
            ${items.map(itemToHTML).join("\n\t\t\t")}
        </ul>
    </section>
    `;
}

function itemToHTML(item) {
    return `<li>
    <a href="/items/${item.id}">${item.label}</a>
    </li>`;
}
