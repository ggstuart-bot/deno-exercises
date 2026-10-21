import { html } from "../tools/html.js";
import { avatarImage } from "./avatar.js";
import { bookSummary } from "./book.js";

export function readOnlyListView(ctx) {
    const { data: { list, books, owner } } = ctx;

    return html`
    <section class="list">
        <header>
            <h2>${list.title}</h2>
            <p>A public list by <a href="/users/${owner.id}">${avatarImage(owner)}${owner.username}</a></p>
        </header>
        <ul>
${books.map(bookToHTML)}
        </ul>
        <p><a href="/">Back to home</a></p>
    </section>
    `;
}

function bookToHTML(book) {
    return html`            <li>${bookSummary(book)}</li>`;
}
