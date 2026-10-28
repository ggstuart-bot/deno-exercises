import { html } from "../tools/html.js";
import { avatarImage } from "./avatar.js";
import { bookCard } from "./book.js";

export function publicShelfView(ctx) {
    const { data: { shelf, books, owner } } = ctx;

    return html`
        <section>
            <header>
                <h1>${shelf.title}</h1>
                <p>A public shelf by <a href="/users/${owner.id}">${avatarImage(owner)}${owner
                    .username}</a></p>
            </header>
            <ul class="grid">
        ${books.map((book) => bookCard(book))}
                </ul>
            <p><a href="/">Back to home</a></p>
        </section>
    `;
}
