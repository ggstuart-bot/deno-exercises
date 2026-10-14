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

function itemToHTML(item) {
    return `<li>${item}</li>`;
}
