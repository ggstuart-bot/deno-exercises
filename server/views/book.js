import { html } from "../tools/html.js";
import { DEFAULT_COVER } from "./partials/bookCard.js";
import { postButton } from "./partials/postButton.js";

export function bookView(ctx) {
    const { user, data: { book, shelves } } = ctx;

    return html`
        <section>
            <header>
                <h1>${book.title}</h1>
                <p>by ${book.author}</p>
            </header>
            <div class="row">
                <img class="cover" src="${book.coverUrl ?? DEFAULT_COVER}"
                    alt="Cover of '${book.title}'">
                <div>
                    ${book.year ? html`<p>Published ${book.year}</p>` : ""}
                    <p><a href="/books">Back to all books</a></p>
                </div>
            </div>
        </section>
        <aside>
            <h2>Add to a shelf</h2>
            <div class="grid">
            ${user
                ? addToShelfForms(book, shelves)
                : html`<p><a href="/signin">Sign in</a> to add this book to a shelf</p>`}
            </div>
        </aside>
    `;
}

function addToShelfForms(book, shelves) {
    return shelves.length
        ? shelves.map((shelf) =>
            postButton(`/shelves/${shelf.id}/books/${book.id}/add`, html`add to '${shelf.title}'`)
        )
        : html`<p>You don't have any shelves yet</p>`;
}
