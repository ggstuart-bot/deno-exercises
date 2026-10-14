export default function itemsView(ctx) { 
    const { data: { items } } = ctx;
    return `
    <section>
        <h2>Items list</h2>
        <ul>
            ${items.map(itemToHTML).join("\n\t\t\t")}
        </ul>
    </section>
    `;
}

function itemToHTML({ id, name }) {
    return `<li><a href="/items/${id}">${name}</a></li>`;
}
