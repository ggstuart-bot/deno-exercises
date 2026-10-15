export function itemView(ctx) {
    const { data: { item } } = ctx;
    return `
    <section>
        <h2>${item.label}</h2>
        <p>This is item ${item.id}</p>

        <div class="controls">
            <button popovertarget="edit-item">edit</button>
            <form method="POST" action="/items/${item.id}/delete">
                <button>delete</button>
            </form>
        </div>

        <div id="edit-item" popover>
            <form method="POST" action="/items/${item.id}/edit">
                <label for="label">Label</label>
                <input id="label" name="label" value="${item.label}">
                <button>save</button>
                <button type="button" popovertarget="edit-item" popovertargetaction="hide">cancel</button>
            </form>
        </div>

        <p>
            <a href="/items">Back to items list</a>
        </p>
    </section>
    `
}
