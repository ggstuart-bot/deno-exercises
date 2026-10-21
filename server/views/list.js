import { html } from "../tools/html.js";
import { canPublishList } from "../tools/permissions.js";
import { bookDetails } from "./book.js";

export function listView(ctx) {
    const { user, data: { list, books, errors, values } } = ctx;

    return html`
    <section class="list">
        <header>
            <h2>${list.title}</h2>
        </header>
        <ul>
${books.map((book) => bookToHTML(list, book))}
        </ul>
        <p><a href="/">Back to your lists</a></p>
    </section>
    <aside>
        <h3>Rename list</h3>
        <form method="POST" action="/lists/${list.id}/edit">
            <label for="title">Title</label>
            <input id="title" name="title" value="${values?.title ?? list.title}">
            <span class="error">${errors?.title ?? ""}</span>
            <button>rename</button>
        </form>
        <h3>Visibility</h3>
        ${visibilityControls(user, list)}
        <h3>Delete list</h3>
        <p>The books stay in the catalogue</p>
        <form method="POST" action="/lists/${list.id}/delete">
            <button>delete list</button>
        </form>
    </aside>
    `;
}

function visibilityControls(user, list) {
    if (list.isPublic) {
        return html`<p>Anyone signed in can see this list</p>
        <form method="POST" action="/lists/${list.id}/unpublish">
            <button>make private</button>
        </form>`;
    }
    if (canPublishList(user, list)) {
        return html`<p>Only you can see this list</p>
        <form method="POST" action="/lists/${list.id}/publish">
            <button>make public</button>
        </form>`;
    }
    return html`<p>Only you can see this list</p>
        <p><a href="/profile">Publish your profile</a> to share lists</p>`;
}

function bookToHTML(list, book) {
    return html`            <li>
                ${bookDetails(book)}
                <form method="POST" action="/lists/${list.id}/books/${book.id}/delete">
                    <button>remove</button>
                </form>
            </li>`;
}
