import { html } from "../tools/html.js";
import { canPublishShelf } from "../tools/permissions.js";
import { bookCard } from "./book.js";

export function shelfView(ctx) {
    const { user, data: { shelf, books, errors, values } } = ctx;

    return html`
    <section class="list">
        <header>
            <h1>${shelf.title}</h1>
        </header>
        ${books.length
            ? html`<ul class="grid">
${books.map((book) => bookCard(book, removeForm(shelf, book)))}
        </ul>`
            : html`<p>No books yet, <a href="/books">find some books</a> to add</p>`}
        <p><a href="/shelves">Back to my shelves</a></p>
    </section>
    <aside>
        <h2>Rename shelf</h2>
        <form method="POST" action="/shelves/${shelf.id}/edit">
            <label for="title">Title</label>
            <input id="title" name="title" value="${values?.title ?? shelf.title}">
            <span class="error">${errors?.title ?? ""}</span>
            <button>rename</button>
        </form>
        <h2>Visibility</h2>
        ${visibilityControls(user, shelf)}
        <h2>Delete shelf</h2>
        <p>The books stay in the catalogue</p>
        <form method="POST" action="/shelves/${shelf.id}/delete">
            <button>delete shelf</button>
        </form>
    </aside>
    `;
}

// Who can see the shelf, then the button, or a link if the profile is private
function visibilityControls(user, shelf) {
    if (shelf.isPublic) {
        return html`<p>Anyone signed in can see this shelf</p>
        ${visibilityButton(user, shelf)}`;
    }
    if (canPublishShelf(user, shelf)) {
        return html`<p>Only you can see this shelf</p>
        ${visibilityButton(user, shelf)}`;
    }
    return html`<p>Only you can see this shelf</p>
        <p><a href="/profile">Publish your profile</a> to share shelves</p>`;
}

// Just the button. Also used on the cards in My shelves
export function visibilityButton(user, shelf) {
    if (shelf.isPublic) {
        return html`<form method="POST" action="/shelves/${shelf.id}/unpublish">
            <button>make private</button>
        </form>`;
    }
    if (canPublishShelf(user, shelf)) {
        return html`<form method="POST" action="/shelves/${shelf.id}/publish">
            <button>make public</button>
        </form>`;
    }
    return "";
}

function removeForm(shelf, book) {
    return html`<form method="POST" action="/shelves/${shelf.id}/books/${book.id}/delete">
                    <button>remove</button>
                </form>`;
}
