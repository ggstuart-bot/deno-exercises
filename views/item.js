export default function itemView(ctx) {
    const { data: { item } } = ctx;
    return `
    <section>
        <h2>${item.label}</h2>
        <p>This is item ${item.id}</p>
        <p>
            <a href="/items">Back to items list</a>
        </p>
    </section>
    `
}