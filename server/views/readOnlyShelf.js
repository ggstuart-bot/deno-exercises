import { html } from "../tools/html.js";
import { avatarImage } from "./avatar.js";
import { bookSummary } from "./book.js";

export function readOnlyShelfView(ctx) {
    const { data: { shelf, books, owner } } = ctx;

    return html`
    <section class="list">
        <header>
            <h2>${shelf.title}</h2>
            <p>A public shelf by <a href="/users/${owner.id}">${avatarImage(owner)}${owner.username}</a></p>
        </header>
        <ul class="striped">
${books.map(bookToHTML)}
        </ul>
        <p><a href="/">Back to home</a></p>
    </section>
    `;
}

function bookToHTML(book) {
    return html`            <li>${bookSummary(book)}</li>`;
}
