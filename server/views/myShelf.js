import { html } from "../tools/html.js";
import { canPublishShelf } from "../tools/permissions.js";
import { bookCard } from "./partials/bookCard.js";
import { cardGrid } from "./partials/cardGrid.js";
import { postButton } from "./partials/postButton.js";
import { shelfTitleForm } from "./partials/shelfTitleForm.js";
import { visibilityButton } from "./partials/visibilityButton.js";

export function myShelfView(ctx) {
    const { user, data: { shelf, books, errors, values } } = ctx;

    return html`
        <section>
            <header>
                <h1>${shelf.title}</h1>
            </header>
            ${cardGrid(
                books.map((book) => bookCard(book, removeForm(shelf, book))),
                html`No books yet, <a href="/books">find some books</a> to add`,
            )}
            <p><a href="/shelves">Back to my shelves</a></p>
        </section>
        <aside>
            <h2>Rename shelf</h2>
            ${shelfTitleForm(
                `/shelves/${shelf.id}/edit`,
                values?.title ?? shelf.title,
                errors?.title,
                "rename",
            )}
            <h2>Visibility</h2>
            ${visibilityControls(user, shelf)}
            <h2>Delete shelf</h2>
            <p>The books stay in the catalogue</p>
            ${postButton(`/shelves/${shelf.id}/delete`, "delete shelf")}
        </aside>
    `;
}

// Who can see the shelf, then the button, or a link if the profile is private
function visibilityControls(user, shelf) {
    if (shelf.isPublic) {
        return html`<p>Anyone can see this shelf</p>
        ${visibilityButton(shelf)}`;
    }
    const control = canPublishShelf(user, shelf)
        ? visibilityButton(shelf)
        : html`<p><a href="/profile">Publish your profile</a> to share shelves</p>`;
    return html`<p>Only you can see this shelf</p>
        ${control}`;
}

function removeForm(shelf, book) {
    return postButton(`/shelves/${shelf.id}/books/${book.id}/delete`, "remove");
}
