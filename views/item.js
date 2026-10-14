export default function itemView(ctx) { 
    const { data: { item } } = ctx;
    return `
    <section>
        <h2>${item.name}</h2>
        <p>Item number ${item.id}</p>
        <p><a href="/items">Back to the items list</a></p>
    </section>
    `;
}
