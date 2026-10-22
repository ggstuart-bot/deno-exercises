import { html } from "../tools/html.js";
import { canPublishShelf } from "../tools/permissions.js";
import { bookCard } from "./book.js";

export function shelfView(ctx) {
    const { user, data: { shelf, books, errors, values } } = ctx;

    return html`
    <section class="list">
        <header>
            <h2>${shelf.title}</h2>
        </header>
        ${books.length
            ? html`<ul class="grid">
${books.map((book) => bookCard(book, removeForm(shelf, book)))}
        </ul>`
            : html`<p>No books yet, <a href="/books">find some books</a> to add</p>`}
        <p><a href="/shelves">Back to my shelves</a></p>
    </section>
    <aside>
        <h3>Rename shelf</h3>
        <form method="POST" action="/shelves/${shelf.id}/edit">
            <label for="title">Title</label>
            <input id="title" name="title" value="${values?.title ?? shelf.title}">
            <span class="error">${errors?.title ?? ""}</span>
            <button>rename</button>
        </form>
        <h3>Visibility</h3>
        ${visibilityControls(user, shelf)}
        <h3>Delete shelf</h3>
        <p>The books stay in the catalogue</p>
        <form method="POST" action="/shelves/${shelf.id}/delete">
            <button>delete shelf</button>
        </form>
    </aside>
    `;
}

function visibilityControls(user, shelf) {
    if (shelf.isPublic) {
        return html`<p>Anyone signed in can see this shelf</p>
        <form method="POST" action="/shelves/${shelf.id}/unpublish">
            <button>make private</button>
        </form>`;
    }
    if (canPublishShelf(user, shelf)) {
        return html`<p>Only you can see this shelf</p>
        <form method="POST" action="/shelves/${shelf.id}/publish">
            <button>make public</button>
        </form>`;
    }
    return html`<p>Only you can see this shelf</p>
        <p><a href="/profile">Publish your profile</a> to share shelves</p>`;
}

function removeForm(shelf, book) {
    return html`<form method="POST" action="/shelves/${shelf.id}/books/${book.id}/delete">
                    <button>remove</button>
                </form>`;
}
